import cheerio from "cheerio";
import { UserPinnedItemBasicInfo } from "./pinned-items";

type DomExtractor<T = string> = ($: CheerioStatic, dom: CheerioElement) => T;

const extractDescriptionFromDom: DomExtractor = ($, dom) => {
  const $el = $(".pinned-item-desc", dom);
  const desc = $el.attr("title") || $el.text();

  return desc.trim();
};

function extractGistNameFromUrl(url: URL | null) {
  return url?.pathname.slice(1) ?? "";
}

function tryParseInt(str: string): number {
  const num = parseInt(str, 10);
  return Number.isNaN(num) ? 0 : num;
}

const extractStarCountFromDom: DomExtractor<number> = ($, dom) => {
  const str = $(".pinned-item-meta > svg.octicon.octicon-star", dom)
    .parent()
    .text();
  return tryParseInt(str);
};
const extractForkCountFromDom: DomExtractor<number> = ($, dom) => {
  const str = $(".pinned-item-meta > svg.octicon.octicon-repo-forked", dom)
    .parent()
    .text();
  return tryParseInt(str);
};

const extractForkParentFromDom: DomExtractor<
  UserPinnedItemBasicInfo["parent"]
> = () => null;

const extractLangFromDom: DomExtractor<{
  color: string;
  name: string;
} | null> = ($, dom) => {
  const $el = $(".repo-language-color + [itemprop=programmingLanguage]", dom);

  if ($el.length > 0) {
    const color = $el.prev().css("background-color");
    const name = $el.text().trim();
    return {
      color,
      name,
    };
  } else return null;
};

const extractUserPinnedItemFromDom: DomExtractor<UserPinnedItemBasicInfo> = (
  $,
  dom
) => {
  const $elTitleAnchor = $(
    ".pinned-item-list-item-content a[data-hydro-click][data-hydro-click-hmac][href]",
    dom
  );
  const href = $elTitleAnchor.attr("href");
  const url: URL | null = href ? new URL(href, "https://github.com") : null;

  const cardTitle = $("span.repo[title]", $elTitleAnchor).attr("title") ?? "";

  const isGist = url?.host === "gist.github.com";

  const name = isGist ? extractGistNameFromUrl(url) ?? "" : cardTitle;
  const description = isGist ? cardTitle : extractDescriptionFromDom($, dom);

  const parent = extractForkParentFromDom($, dom);

  const elMetaRow =
    $(".pinned-item-list-item-content > *:last-child", dom)[0] ?? dom;
  const starCount: number = extractStarCountFromDom($, elMetaRow);
  const forkCount: number = extractForkCountFromDom($, elMetaRow);
  const lang = extractLangFromDom($, elMetaRow);

  return {
    __typeName: isGist ? "Gist" : "Repository",

    url: url?.toString() ?? "",
    name,
    description,

    stargazers: { totalCount: starCount },
    forks: { totalCount: forkCount },

    parent,

    languages:
      !isGist && lang
        ? { nodes: [{ color: lang.color, name: lang.name }] }
        : undefined,
  };
};

export function extractUserPinnedItemsFromHtml(
  html: string
): UserPinnedItemBasicInfo[] {
  const $ = cheerio.load(html);

  const elms = $(
    ".js-pinned-items-reorder-container > ol > li > .js-pinned-item-list-item"
  ).toArray();

  return elms.map((elm) => extractUserPinnedItemFromDom($, elm));
}
