import {
  Gist,
  Repository,
  ResolversParentTypes,
} from "../../../graphql/generated";
import { cacheOwnGetters } from "../../../util/cache-getters";
import { tryParseInt } from "../../../util/parse";
import { encodeNodeId } from "../../id";
import { Common } from "../../../util/type-utils";
import { UserExtractor, UserLazyExtractorWithPreloaded } from "../user";

export type PinnableItemCommon = Common<
  ResolversParentTypes["Gist"] | ResolversParentTypes["Repository"]
>;

export class PinnableItemCommonExtractor implements PinnableItemCommon {
  constructor(
    protected readonly $: CheerioStatic,
    protected readonly dom: CheerioElement,
    protected readonly rootOwner: UserExtractor,
  ) {}

  private get $elTitleAnchor() {
    return this.$(
      ".pinned-item-list-item-content a[data-hydro-click][data-hydro-click-hmac][href]",
      this.dom,
    );
  }

  private get urlObj(): URL | null {
    const href = this.$elTitleAnchor.attr("href");
    const url: URL | null = href ? new URL(href, "https://github.com") : null;
    return url;
  }
  private get isGist(): boolean {
    return this.urlObj?.host === "gist.github.com";
  }
  private get cardTitle(): string {
    return this.$("span.repo[title]", this.$elTitleAnchor).attr("title") ?? "";
  }

  protected get $elDesc() {
    return this.$(".pinned-item-desc", this.dom);
  }
  private _extractDescriptionFromDom(): string | null {
    const $el = this.$elDesc;
    if (!$el.length) return null;
    const desc = $el.attr("title") || $el.text();
    return desc.trim();
  }
  get description(): string | null {
    return this.isGist ? this.cardTitle : this._extractDescriptionFromDom();
  }

  get stargazers(): PinnableItemCommon["stargazers"] {
    const str = this.$(".pinned-item-meta > svg.octicon.octicon-star", this.dom)
      .parent()
      .text();
    const num = tryParseInt(str);

    return { totalCount: num };
  }

  get stargazerCount() {
    return this.stargazers.totalCount;
  }

  get resourcePath(): PinnableItemCommon["resourcePath"] {
    return this.urlObj?.pathname ?? "";
  }

  get url(): PinnableItemCommon["url"] {
    return this.urlObj?.toString() ?? "";
  }

  get name(): PinnableItemCommon["name"] {
    if (this.isGist) {
      return this.urlObj?.pathname.slice(1) ?? "";
    } else {
      return this.cardTitle;
    }
  }

  protected get ownerLogin(): string {
    return (
      this.$("span.owner[title]", this.$elTitleAnchor).attr("title") ??
      this.rootOwner.login
    );
  }

  get forkCount(): number {
    const str = this.$(
      ".pinned-item-meta > svg.octicon.octicon-repo-forked",
      this.dom,
    )
      .parent()
      .text();
    return tryParseInt(str);
  }

  get owner(): ResolversParentTypes["RepositoryOwner"] {
    return this.ownerLogin === this.rootOwner.login
      ? this.rootOwner
      : new UserLazyExtractorWithPreloaded(this.ownerLogin);
  }

  public asPinnableItem(): PinnableGistExtractor | PinnableRepositoryExtractor {
    const clazz = this.isGist
      ? PinnableGistExtractor
      : PinnableRepositoryExtractor;

    return new clazz(this.$, this.dom, this.rootOwner);
  }
}
cacheOwnGetters(PinnableItemCommonExtractor.prototype);

type GistParentType = Required<ResolversParentTypes["Gist"]>;
export class PinnableGistExtractor
  extends PinnableItemCommonExtractor
  implements GistParentType {
  __typename = "Gist" as const;

  get id(): Gist["id"] {
    return encodeNodeId({ __typename: "Gist", value: this.name });
  }

  get forks(): GistParentType["forks"] {
    return {
      __typename: "GistConnection",
      totalCount: this.forkCount,
    };
  }
}

cacheOwnGetters(PinnableGistExtractor.prototype);

type RepositoryParentType = Required<ResolversParentTypes["Repository"]>;

export class PinnableRepositoryExtractor
  extends PinnableItemCommonExtractor
  implements RepositoryParentType {
  __typename = "Repository" as const;

  get descriptionHTML(): Repository["descriptionHTML"] {
    return this.$elDesc.html() ?? "";
  }

  get nameWithOwner(): Repository["nameWithOwner"] {
    return `${this.ownerLogin}/${this.name}`;
  }
  get shortDescriptionHTML(): Repository["shortDescriptionHTML"] {
    throw new Error("Not implemented");
  }

  get forks(): RepositoryParentType["forks"] {
    return {
      __typename: "RepositoryConnection",
      totalCount: this.forkCount,
    };
  }

  get isFork(): Repository["isFork"] {
    throw new Error("Not implemented");
  }

  get parent(): RepositoryParentType["parent"] {
    throw new Error("Not implemented");
  }
  get primaryLanguage(): Repository["primaryLanguage"] {
    throw new Error("Not implemented");
  }
  get sshUrl(): Repository["sshUrl"] {
    throw new Error("Not implemented");
  }
}
cacheOwnGetters(PinnableRepositoryExtractor.prototype);
