import { WebPageCrawler, CheerioExtractor } from "./web-crawler";
import { ghUserUrl, ghUserResUrl } from "../url";
import { memoizeWithThis } from "../../memo";
import { encodeNodeId } from "../id";
import { extractUserPinnedItemsFromCheerio } from "../../extract-pinned-item";
import { PinnableItemConnection } from "../../graphql/generated";

const getBaseAvatarUrl = memoizeWithThis(function (this: UserExtractor) {
  const $ = this.$;
  const a = $("a[itemprop=image] > img.avatar.avatar-user").attr("src");
  if (!a) throw new Error("avatar url not found");
  return new URL(a);
});

const REGEX_DATABASE_ID_FROM_URL = /^\/u\/\d+$$/;
const getDatabaseId = memoizeWithThis(function (this: UserExtractor) {
  const res = REGEX_DATABASE_ID_FROM_URL.exec(this.avatarBaseUrl.pathname);
  if (!res)
    throw new Error(`not found: User.databaseId in ${this.avatarBaseUrl.href}`);

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

const getEmail = memoizeWithThis(function (this: UserExtractor) {
  return this.$("[itemprop=email]").text();
});

const getWebsiteUrl = memoizeWithThis(function (this: UserExtractor) {
  return this.$("[itemprop=url]").text();
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

  get avatarBaseUrl(): URL {
    return getBaseAvatarUrl.call(this);
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

  getAvatarUrl(size?: number): string {
    const ab = this.avatarBaseUrl;
    return `${ab}?${typeof size === "number" ? `s=${size}&` : ""}v=4`;
  }
  get avatarUrl(): string {
    return this.getAvatarUrl();
  }
}

export class UserCrawler extends WebPageCrawler<UserExtractor> {
  constructor(login: string) {
    super(ghUserUrl(login), ($) => new UserExtractor($, login));
  }
}
