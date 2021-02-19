import {
  PinnableItem,
  PinnableItemEdge,
  PinnableItemType,
  ProfileOwnerPinnedItemsArgs,
} from "../../../graphql/generated";
import {
  numberToCursor,
  PageInfoFull,
  PaginationOptionsParser,
} from "../../pagination";
import { extractUserPinnedItemFromDom } from "../../../extract-pinned-item";
import { cacheOwnGetters } from "../../../util/cache-getters";
import { PinnableItemConnectionInstanceResolver } from "../../../graphql/auto-resolvers";

export class PinnableItemConnectionExtractor
  implements PinnableItemConnectionInstanceResolver {
  public readonly pagination: PaginationOptionsParser;
  private _allNodesOfTypes: Required<PinnableItem>[];

  public totalCount: number;

  constructor(
    private readonly $: CheerioStatic,
    $els: Cheerio,
    public readonly args: ProfileOwnerPinnedItemsArgs,
  ) {
    const allNodes = $els
      .toArray()
      .map((el) => extractUserPinnedItemFromDom(this.$, el));
    const types = new Set(args.types);
    const allNodesOfTypes =
      types.size > 0
        ? allNodes.filter((n) => types.has(PinnableItemType[n.__typename]))
        : allNodes;

    const totalCount = allNodesOfTypes.length;
    this._allNodesOfTypes = allNodesOfTypes;
    this.totalCount = totalCount;

    this.pagination = new PaginationOptionsParser(
      { args, totalCount },
      "pinnedItems",
    );
  }

  get pageInfo(): PageInfoFull {
    return this.pagination.pageInfo;
  }

  get nodes(): Required<PinnableItem>[] {
    const [gt, lte] = this.pagination.range;
    return this._allNodesOfTypes.slice(gt + 1, lte + 1);
  }

  get edges(): Required<PinnableItemEdge>[] {
    return this.nodes.map(
      (node, i): Required<PinnableItemEdge> => ({
        __typename: "PinnableItemEdge",
        cursor: numberToCursor(i + 1),
        node,
      }),
    );
  }
}

cacheOwnGetters(PinnableItemConnectionExtractor);
