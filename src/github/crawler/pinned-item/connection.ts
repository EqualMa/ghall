import {
  PinnableItem,
  PinnableItemEdge,
  ProfileOwnerPinnedItemsArgs,
} from "../../../graphql/generated";
import {
  numberToCursor,
  PageInfoFull,
  PaginationOptionsParser,
} from "../../pagination";
import { CheerioExtractor } from "../web-crawler";
import {
  extractUserPinnedItemFromDom,
  filterUserPinnedItemsCheerio,
} from "../../../extract-pinned-item";
import { memoizeWithThis } from "../../../memo";

export const nodes = memoizeWithThis(function (
  this: PinnableItemConnectionExtractor,
): Required<PinnableItem>[] {
  const [gt, lte] = this.pagination.range;
  const $els = this.$els.toArray().slice(gt + 1, lte + 1);
  return $els.map((el) => extractUserPinnedItemFromDom(this.$, el));
});

export const edges = memoizeWithThis(function (
  this: PinnableItemConnectionExtractor,
): Required<PinnableItemEdge>[] {
  return this.nodes.map(
    (node, i): Required<PinnableItemEdge> => ({
      __typename: "PinnableItemEdge",
      cursor: numberToCursor(i + 1),
      node,
    }),
  );
});

export class PinnableItemConnectionExtractor extends CheerioExtractor {
  public readonly pagination: PaginationOptionsParser;

  public readonly $els: Cheerio;
  get totalCount(): number {
    return this.$els.length;
  }

  constructor(
    $: CheerioStatic,
    $els: Cheerio,
    public readonly args: ProfileOwnerPinnedItemsArgs,
  ) {
    super($);

    this.$els = filterUserPinnedItemsCheerio($els, args.types);
    this.pagination = new PaginationOptionsParser(
      {
        args: this.args,
        totalCount: this.totalCount,
      },
      "pinnedItems",
    );
  }

  get pageInfo(): PageInfoFull {
    return this.pagination.pageInfo;
  }

  get nodes(): Required<PinnableItem>[] {
    return nodes.call(this);
  }

  get edges(): Required<PinnableItemEdge>[] {
    return edges.call(this);
  }
}
