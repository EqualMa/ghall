import got from "got";
import cheerio from "cheerio";

export abstract class WebCrawler<R = string> {
  #resource: R | undefined;
  async getResource(): Promise<R> {
    if (this.#resource === undefined) {
      this.#resource = await this.queryResource();
    }
    return this.#resource;
  }

  protected abstract queryResource(): Promise<R>;
}

type GetCheerioExtractor<T extends CheerioExtractor> = ($: CheerioStatic) => T;

export class WebPageCrawler<T extends CheerioExtractor> extends WebCrawler<T> {
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
    const url = this.#url;
    return typeof url === "string" ? got(url).text() : url();
  }

  protected async queryResource(): Promise<T> {
    const html = await this.queryPage();
    const $ = cheerio.load(html);
    const g = this.#getCheerioExtractor;

    return g($);
  }
}

export class CheerioExtractor {
  constructor(public readonly $: CheerioStatic) {}
}
