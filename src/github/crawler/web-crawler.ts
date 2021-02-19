import got from "got";
import cheerio from "cheerio";
import LazyResource from "../../util/lazy-resource";
import { createFieldResolversForType } from "../../graphql/field-resolver";

type GetCheerioExtractor<T> = ($: CheerioStatic) => T;

export class WebPageResource<T> extends LazyResource<T> {
  #url: string | (() => Promise<string> | string);
  #getCheerioExtractor: GetCheerioExtractor<T>;
  constructor(
    url: string | (() => Promise<string> | string),
    getCheerioExtractor: GetCheerioExtractor<T>,
  ) {
    super();
    this.#url = url;
    this.#getCheerioExtractor = getCheerioExtractor;
  }

  protected async queryPage(): Promise<string> {
    const _url = this.#url;
    const url = typeof _url === "string" ? _url : await _url();
    return got(url).text();
  }

  protected handleError(err: unknown): never | Promise<never> {
    throw err;
  }

  protected async loadResource(): Promise<T> {
    try {
      const html = await this.queryPage();
      const $ = cheerio.load(html);
      const g = this.#getCheerioExtractor;

      return g($);
    } catch (err) {
      await this.handleError(err);
      throw new Error("handleError should throw errors");
    }
  }
}
