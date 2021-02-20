import { WebPageResource } from "./web-crawler";
import { ghUserUrl, ghUserResUrl } from "../url";
import { encodeNodeId } from "../id";
import {
  RequireFields,
  ResolversTypes,
  UserAvatarUrlArgs,
  UserPinnedItemsArgs,
} from "../../graphql/generated";
import got from "got/dist/source";
import { ApolloError } from "apollo-server-micro";
import { PinnableItemConnectionExtractor } from "./pinned-item";
import {
  UserInstanceResolver,
  UserInstanceResolverProxy,
} from "../../graphql/auto-resolvers";

export class UserExtractor implements UserInstanceResolver {
  __resolveType = "User" as const;

  constructor(
    private readonly $: CheerioStatic,
    public readonly login: string,
  ) {}

  avatarUrl({ size }: RequireFields<UserAvatarUrlArgs, never>) {
    const ab = this._avatarUrlObj.origin + this._avatarUrlObj.pathname;
    return `${ab}?${typeof size === "number" ? `s=${size}&` : ""}v=4`;
  }

  pinnedItems(args: RequireFields<UserPinnedItemsArgs, never>) {
    return new PinnableItemConnectionExtractor(
      this.$,
      this.$pinnedItemsEls,
      {
        after: args.after ?? null,
        before: args.before ?? null,
        first: args.first ?? null,
        last: args.last ?? null,
        types: args.types ?? null,
      },
      this,
    );
  }

  get resourcePath() {
    return ghUserResUrl(this.login);
  }

  get url() {
    return ghUserUrl(this.login);
  }

  get _avatarUrlObj(): URL {
    const $ = this.$;
    const a = $("a[itemprop=image] > img.avatar.avatar-user").attr("src");
    if (!a) throw new Error("avatar url not found");
    return new URL(a);
  }

  private static REGEX_DATABASE_ID_FROM_URL = /^\/u\/(\d+)$/;
  get databaseId(): number {
    const res = UserExtractor.REGEX_DATABASE_ID_FROM_URL.exec(
      this._avatarUrlObj.pathname,
    );
    if (!res)
      throw new Error(
        `not found: User.databaseId in ${this._avatarUrlObj.href}`,
      );

    return parseInt(res[1]);
  }

  get id(): string {
    return encodeNodeId({
      __typename: "User",
      value: this.databaseId,
    });
  }

  get name(): string | null {
    const $ = this.$;
    const a = $("[itemprop=name]").text();
    return a || null;
  }

  get $bio(): Cheerio {
    return this.$(".user-profile-bio");
  }
  get bio(): string | null {
    return this.$bio.text();
  }
  get bioHTML(): string {
    return this.$bio.html() ?? "";
  }

  get status(): ResolversTypes["UserStatus"] | null {
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
  }

  get twitterUsername() {
    const TWITTER_BASE_URL = "https://twitter.com/";
    const href = this.$("[itemprop=twitter] > a").attr("href");

    return href && href.startsWith(TWITTER_BASE_URL)
      ? href.slice(TWITTER_BASE_URL.length)
      : null;
  }

  get $company(): Cheerio {
    return this.$("[itemprop=worksFor]");
  }
  get company(): string | null {
    const $el = this.$company;
    const v = $el.attr("aria-label")?.split(": ")[1];
    return v ?? null;
  }
  get companyHTML(): string {
    const v = this.$company.find(":scope > span:last-child > div").html();
    return v ?? "";
  }

  get location(): string | null {
    const $el = this.$("[itemprop=homeLocation]");
    return $el.length ? $el.text() : null;
  }

  get email(): string {
    const mailTo = this.$("[itemprop=email] > a").attr("href");
    return mailTo?.startsWith("mailto:") ? mailTo.slice("mailto:".length) : "";
  }

  get websiteUrl(): string | null {
    return this.$("[itemprop=url] > a").attr("href") ?? null;
  }

  private get $pinnedItemsEls() {
    return this.$(
      ".js-pinned-items-reorder-container > ol > li > .js-pinned-item-list-item",
    );
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

export class UserResource extends WebPageResource<UserExtractor> {
  constructor(public readonly login: string) {
    super(ghUserUrl(login), ($) => new UserExtractor($, login));
  }

  async handleError(err: unknown) {
    if (err instanceof got.HTTPError && err.response.statusCode === 404)
      throw new UserNotFoundApolloError(this.login);

    return super.handleError(err);
  }
}

export class UserLazyExtractor extends UserInstanceResolverProxy {
  resource: UserResource;
  constructor(login: string) {
    super();
    this.resource = new UserResource(login);
  }

  getInstanceResolver() {
    return this.resource.use();
  }
}

export class UserLazyExtractorWithPreloaded extends UserLazyExtractor {
  // TODO: remove after RepositoryOwnerExtractor implemented
  __resolveType = "User" as const;

  #login: string;
  constructor(login: string) {
    super(login);
    this.#login = login;
  }

  login() {
    return Promise.resolve(this.#login);
  }

  resourcePath() {
    return Promise.resolve(ghUserResUrl(this.#login));
  }

  url() {
    return Promise.resolve(ghUserUrl(this.#login));
  }
}
