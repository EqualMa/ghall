import { ApolloError } from "apollo-server-micro";
import { PageInfo } from "../graphql/generated";
import { decodeBase64, encodeBase64 } from "../util/base64";

export type PageInfoFull = Required<
  Pick<PageInfo, Exclude<keyof PageInfo, "__typename">>
>;

export interface PaginationOptions {
  args: {
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
  };
  totalCount: number;
}

export function cursorToNumber(cur: string): number {
  return parseInt(decodeBase64(cur));
}

export function numberToCursor(num: number): string {
  return encodeBase64(num.toString(10));
}

export class PaginationOptionsParser {
  public readonly first: number | undefined;
  public readonly last: number | undefined;
  public readonly after: string | undefined;
  public readonly before: string | undefined;
  public readonly totalCount: number;

  constructor(
    {
      args: { first, last, after, before },
      //
      totalCount,
    }: PaginationOptions,
    field: string,
  ) {
    if (first === undefined && last === undefined)
      throw new ApolloError(
        `You must provide a \`first\` or \`last\` value to properly paginate the \`${field}\` connection.`,
        undefined,
        {
          type: "MISSING_PAGINATION_BOUNDARIES",
        },
      );
    else if (first !== undefined && last !== undefined) {
      throw new ApolloError(
        `Passing both \`first\` and \`last\` to paginate the \`${field}\` connection is not supported.`,
      );
    }

    this.first = first ?? undefined;
    this.last = last ?? undefined;
    this.after = after ?? undefined;
    this.before = before ?? undefined;
    this.totalCount = totalCount;
  }

  get beforeAsNumber(): number | undefined {
    return this.before ? cursorToNumber(this.before) : undefined;
  }

  get afterAsNumber(): number | undefined {
    return this.after ? cursorToNumber(this.after) : undefined;
  }

  /**
   * [isFirst, value]
   */
  get firstOrLast(): [isFirst: boolean, value: number] {
    return this.first === undefined ? [false, this.last!] : [true, this.first];
  }

  #range: [number, number] | undefined;
  /**
   * excluding start, including end
   * (start, end]
   */
  get range(): [gt: number, lte: number] {
    if (!this.#range) {
      const after = this.afterAsNumber;
      const before = this.beforeAsNumber;
      const [isFirst, len] = this.firstOrLast;
      const totalCount = this.totalCount;

      if (isFirst) {
        const start = after ?? 0;
        const end =
          typeof before === "undefined"
            ? start + len
            : Math.min(start + len, before);
        this.#range = [start, end];
      } else {
        const end = before ?? totalCount;
        const start =
          typeof after === "undefined"
            ? end - len
            : //
              Math.max(end - len, after);
        this.#range = [start, end];
      }
    }

    return this.#range;
  }

  get pageInfo(): PageInfoFull {
    const [gt, lte] = this.range;
    return {
      startCursor: numberToCursor(gt + 1),
      endCursor: numberToCursor(lte),
      hasNextPage: lte < this.totalCount,
      hasPreviousPage: gt >= 0,
    };
  }
}
