import {
  PinnableItemType,
  ProfileOwnerPinnedItemsArgs,
  ResolversTypes,
} from "../../../graphql/generated";
import {
  numberToCursor,
  PageInfoFull,
  PaginationOptionsParser,
} from "../../pagination";
import { cacheOwnGetters } from "../../../util/cache-getters";
import { PinnableItemConnectionInstanceResolver } from "../../../graphql/auto-resolvers";
import {
  PinnableGistExtractor,
  PinnableItemCommonExtractor,
  PinnableRepositoryExtractor,
} from "./item";
import { UserExtractor } from "../user";

export class PinnableItemConnectionExtractor
  implements PinnableItemConnectionInstanceResolver {
  public readonly pagination: PaginationOptionsParser;
  private _allNodesOfTypes: (
    | PinnableRepositoryExtractor
    | PinnableGistExtractor
  )[];

  public totalCount: number;

  constructor(
    private readonly $: CheerioStatic,
    $els: Cheerio,
    public readonly args: ProfileOwnerPinnedItemsArgs,
    protected readonly rootOwner: UserExtractor,
  ) {
    const allNodes = $els
      .toArray()
      .map((el) =>
        new PinnableItemCommonExtractor(
          this.$,
          el,
          this.rootOwner,
        ).asPinnableItem(),
      );
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

  get nodes(): (PinnableRepositoryExtractor | PinnableGistExtractor)[] {
    const [gt, lte] = this.pagination.range;
    return this._allNodesOfTypes.slice(gt + 1, lte + 1);
  }

  get edges(): PinnableItemConnectionInstanceResolver["edges"] {
    return this.nodes.map((node, i): ResolversTypes["PinnableItemEdge"] => ({
      __typename: "PinnableItemEdge",
      cursor: numberToCursor(i + 1),
      node,
    }));
  }
}

cacheOwnGetters(PinnableItemConnectionExtractor);
