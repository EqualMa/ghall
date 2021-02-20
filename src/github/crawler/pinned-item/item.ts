import {
  Gist,
  Repository,
  ResolversParentTypes,
} from "../../../graphql/generated";
import { cacheOwnGetters } from "../../../util/cache-getters";
import { tryParseInt } from "../../../util/parse";
import { encodeNodeId } from "../../id";
import { Common } from "../../../util/type-utils";

export type PinnableItemCommon = Common<
  ResolversParentTypes["Gist"] | ResolversParentTypes["Repository"]
>;

export class PinnableItemCommonExtractor implements PinnableItemCommon {
  constructor(
    private readonly $: CheerioStatic,
    private readonly dom: CheerioElement,
  ) {}

  private get $elTitleAnchor() {
    return this.$(
      ".pinned-item-list-item-content a[data-hydro-click][data-hydro-click-hmac][href]",
      this.dom,
    );
  }

  get urlObj(): URL | null {
    const href = this.$elTitleAnchor.attr("href");
    const url: URL | null = href ? new URL(href, "https://github.com") : null;
    return url;
  }
  get isGist(): boolean {
    return this.urlObj?.host === "gist.github.com";
  }
  get cardTitle(): string {
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

  public asPinnableItem(): PinnableGistExtractor | PinnableRepositoryExtractor {
    const clazz = this.isGist
      ? PinnableGistExtractor
      : PinnableRepositoryExtractor;

    Reflect.setPrototypeOf(this, clazz.prototype);

    return this as never;
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
    throw new Error("Not implemented");
  }
  get owner(): GistParentType["owner"] {
    throw new Error("Not implemented");
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
    return `${this.owner.login}/${this.name}`;
  }
  get shortDescriptionHTML(): Repository["shortDescriptionHTML"] {
    throw new Error("Not implemented");
  }

  get forks(): RepositoryParentType["forks"] {
    throw new Error("Not implemented");
  }
  get forkCount(): Repository["forkCount"] {
    return this.forks.totalCount;
  }

  get isFork(): Repository["isFork"] {
    throw new Error("Not implemented");
  }

  get owner(): RepositoryParentType["owner"] {
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
