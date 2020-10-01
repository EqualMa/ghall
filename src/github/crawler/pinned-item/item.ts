import { Gist, PinnableItem, Repository } from "../../../graphql/generated";
import { memoizeWithThis } from "../../../memo";
import { cacheOwnGetters } from "../../../util/cache-getters";
import { tryParseInt } from "../../../util/parse";
import { encodeNodeId } from "../../id";
import { CheerioExtractor } from "../web-crawler";
import {
  RemoveNeverFields,
  UnionToIntersection,
  Common,
} from "../../../util/type-utils";

export type PinnableItemCommon = Common<Gist | Repository>;

export class PinnableItemCommonExtractor
  extends CheerioExtractor
  implements PinnableItemCommon {
  constructor($: CheerioStatic, private readonly dom: CheerioElement) {
    super($);
  }

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

    return this;
  }

  get forks(): Common<PinnableItem["forks"]> {
    return {
      totalCount,
    };
  }

  get owner(): PinnableItem["owner"] {
    return {};
  }
}
cacheOwnGetters(PinnableItemCommonExtractor.prototype);

class PinnableGistExtractor
  extends PinnableItemCommonExtractor
  implements Gist {
  get id(): Gist["id"] {
    return encodeNodeId({ __typename: "Gist", value: this.name });
  }
}

cacheOwnGetters(PinnableGistExtractor.prototype);

class PinnableRepositoryExtractor
  extends PinnableItemCommonExtractor
  implements Repository {
  get descriptionHTML(): Repository["descriptionHTML"] {
    return this.$elDesc.html();
  }

  get nameWithOwner(): Repository["nameWithOwner"] {
    return `${this.owner.login}/${this.name}`;
  }
  get shortDescriptionHTML(): Repository["shortDescriptionHTML"] {}

  get forkCount(): Repository["forkCount"] {
    return this.forks.totalCount;
  }

  get isFork(): Repository["isFork"] {}

  get owner(): Repository["owner"] {
    const o = this.owner;
    if (!o) throw new Error("invalid null owner");

    return o;
  }
}
cacheOwnGetters(PinnableRepositoryExtractor.prototype);
