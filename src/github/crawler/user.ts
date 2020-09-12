import { WebPageCrawler, CheerioExtractor } from "./web-crawler";
import { ghUserUrl, ghUserResUrl } from "../url";
import { memoizeWithThis } from "../../memo";
import { encodeNodeId } from "../id";
import { extractUserPinnedItemsFromCheerio } from "../../extract-pinned-item";
import {
  PinnableItemConnection,
  ResolversTypes,
} from "../../graphql/generated";
import got from "got/dist/source";
import { ApolloError } from "apollo-server-micro";

const getAvatarUrlObj = memoizeWithThis(function (this: UserExtractor) {
  const $ = this.$;
  const a = $("a[itemprop=image] > img.avatar.avatar-user").attr("src");
  if (!a) throw new Error("avatar url not found");
  return new URL(a);
});

const REGEX_DATABASE_ID_FROM_URL = /^\/u\/(\d+)$/;
const getDatabaseId = memoizeWithThis(function (this: UserExtractor) {
  const res = REGEX_DATABASE_ID_FROM_URL.exec(this._avatarUrlObj.pathname);
  if (!res)
    throw new Error(`not found: User.databaseId in ${this._avatarUrlObj.href}`);

  return parseInt(res[1]);
});

const getId = memoizeWithThis(function (this: UserExtractor) {
  return encodeNodeId({
    __typename: "User",
    value: this.databaseId,
  });
});

const getName = memoizeWithThis(function (this: UserExtractor) {
  const $ = this.$;
  const a = $("[itemprop=name]").text();
  return a || null;
});

const $company = memoizeWithThis(function (this: UserExtractor) {
  const $ = this.$;
  const $a = $("[itemprop=worksFor]");

  return $a;
});

const getCompany = memoizeWithThis(function (this: UserExtractor) {
  const $el = this.$company;
  const v = $el.attr("aria-label")?.split(": ")[1];
  return v ?? null;
});

const getCompanyHTML = memoizeWithThis(function (this: UserExtractor) {
  const v = this.$company.find(":scope > span:last-child > div").html();
  return v ?? "";
});

const getLocation = memoizeWithThis(function (this: UserExtractor) {
  const $el = this.$("[itemprop=homeLocation]");
  return $el.length ? $el.text() : null;
});

const getEmail = memoizeWithThis(function (this: UserExtractor): string {
  const mailTo = this.$("[itemprop=email] > a").attr("href");
  return mailTo?.startsWith("mailto:") ? mailTo.slice("mailto:".length) : "";
});

const getWebsiteUrl = memoizeWithThis(function (
  this: UserExtractor,
): string | null {
  return this.$("[itemprop=url] > a").attr("href") ?? null;
});

const getPinnedItems = memoizeWithThis(function (
  this: UserExtractor,
): PinnableItemConnection {
  const nodes = extractUserPinnedItemsFromCheerio(this.$);

  return {
    totalCount: nodes.length,
    // TODO:
    nodes: nodes as any,
  };
});

const $bio = memoizeWithThis(function (this: UserExtractor) {
  return this.$(".user-profile-bio");
});

const getBio = memoizeWithThis(function (this: UserExtractor) {
  return this.$bio.text();
});

const getBioHTML = memoizeWithThis(function (this: UserExtractor) {
  return this.$bio.html() ?? "";
});

const status = memoizeWithThis(function (
  this: UserExtractor,
): ResolversTypes["UserStatus"] | null {
  const $el = this.$(".user-status-circle-badge-container");

  if (!$el.length) return null;

  const $gEmoji = $el.find("g-emoji");

  const alias = $gEmoji.attr("alias");
  const emoji: string | null = alias ? `:${alias}:` : null;
  const emojiHTML: string | null = this.$.html($gEmoji.parent());

  const message =
    $el.find(".user-status-message-wrapper").text().trim() || null;

  return {
    emoji,
    emojiHTML,
    message,
    user: this,
  };
});

const TWITTER_BASE_URL = "https://twitter.com/";
const twitterUsername = memoizeWithThis(function (this: UserExtractor) {
  const href = this.$("[itemprop=twitter] > a").attr("href");

  return href && href.startsWith(TWITTER_BASE_URL)
    ? href.slice(TWITTER_BASE_URL.length)
    : null;
});

export class UserExtractor extends CheerioExtractor {
  constructor($: CheerioStatic, public readonly login: string) {
    super($);
  }

  get resourcePath() {
    return ghUserResUrl(this.login);
  }

  get url() {
    return ghUserUrl(this.login);
  }

  get _avatarUrlObj(): URL {
    return getAvatarUrlObj.call(this);
  }

  get databaseId(): number {
    return getDatabaseId.call(this);
  }

  get id(): string {
    return getId.call(this);
  }

  get name(): string | null {
    return getName.call(this);
  }

  get $bio(): Cheerio {
    return $bio.call(this);
  }
  get bio(): string | null {
    return getBio.call(this);
  }
  get bioHTML(): string {
    return getBioHTML.call(this);
  }

  get status() {
    return status.call(this);
  }

  get twitterUsername() {
    return twitterUsername.call(this);
  }

  get $company(): Cheerio {
    return $company.call(this);
  }
  get company(): string | null {
    return getCompany.call(this);
  }
  get companyHTML(): string {
    return getCompanyHTML.call(this);
  }

  get location(): string | null {
    return getLocation.call(this);
  }

  get email(): string {
    return getEmail.call(this);
  }

  get websiteUrl(): string | null {
    return getWebsiteUrl.call(this);
  }

  get pinnedItems(): PinnableItemConnection {
    return getPinnedItems.call(this);
  }

  getAvatarUrl(size?: number | null): string {
    const ab = this._avatarUrlObj.origin + this._avatarUrlObj.pathname;
    return `${ab}?${typeof size === "number" ? `s=${size}&` : ""}v=4`;
  }
  get avatarUrl(): string {
    return this.getAvatarUrl();
  }
}

export class UserNotFoundApolloError extends ApolloError {
  constructor(public readonly login: string) {
    super(
      `Could not resolve to a User with the login of '${login}'.`,
      "USER_NOT_FOUND",
      { type: "NOT_FOUND" },
    );
  }
}

export class UserCrawler extends WebPageCrawler<UserExtractor> {
  constructor(public readonly login: string) {
    super(ghUserUrl(login), ($) => new UserExtractor($, login));
  }

  async handleError(err: unknown) {
    if (err instanceof got.HTTPError && err.response.statusCode === 404)
      throw new UserNotFoundApolloError(this.login);

    return super.handleError(err);
  }
}
