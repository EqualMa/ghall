import cheerio from "cheerio";
import {
  Gist,
  Language,
  Repository,
  ResolversParentTypes,
} from "./graphql/generated";
import { UserPinnedItemBasicInfo } from "./pinned-items";
import { tryParseInt } from "./util/parse";
import { createData } from "./util/type-utils";

type DomExtractor<T = string> = ($: CheerioStatic, dom: CheerioElement) => T;

const extractDescriptionFromDom: DomExtractor = ($, dom) => {
  const $el = $(".pinned-item-desc", dom);
  const desc = $el.attr("title") || $el.text();

  return desc.trim();
};

function extractGistNameFromUrl(url: URL | null) {
  return url?.pathname.slice(1) ?? "";
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

// TODO: extract fork parent
// const extractForkParentFromDom: DomExtractor<
//   UserPinnedItemBasicInfo["parent"]
// > = () => null;

const extractLangFromDom: DomExtractor<Required<Language> | null> = (
  $,
  dom,
) => {
  const $el = $(".repo-language-color + [itemprop=programmingLanguage]", dom);

  if ($el.length > 0) {
    const color = $el.prev().css("background-color");
    const name = $el.text().trim();
    return {
      __typename: "Language",
      color,
      name,
    };
  } else return null;
};

export const extractUserPinnedItemFromDom: DomExtractor<UserPinnedItemBasicInfo> = (
  $,
  dom,
) => {
  const $elTitleAnchor = $(
    ".pinned-item-list-item-content a[data-hydro-click][data-hydro-click-hmac][href]",
    dom,
  );
  const href = $elTitleAnchor.attr("href");
  const url: URL | null = href ? new URL(href, "https://github.com") : null;

  const cardTitle = $("span.repo[title]", $elTitleAnchor).attr("title") ?? "";

  const isGist = url?.host === "gist.github.com";

  const name = isGist ? extractGistNameFromUrl(url) ?? "" : cardTitle;
  const description = isGist ? cardTitle : extractDescriptionFromDom($, dom);

  // const parent = extractForkParentFromDom($, dom);

  const elMetaRow =
    $(".pinned-item-list-item-content > *:last-child", dom)[0] ?? dom;
  const starCount: number = extractStarCountFromDom($, elMetaRow);
  const forkCount: number = extractForkCountFromDom($, elMetaRow);

  const commonData = createData<
    Partial<
      Pick<
        ResolversParentTypes["Gist"] & ResolversParentTypes["Repository"],
        keyof ResolversParentTypes["Gist"] &
          keyof ResolversParentTypes["Repository"]
      >
    >
  >()({
    url: url?.toString() ?? "",
    name,
    description,
    stargazerCount: starCount,
    stargazers: { totalCount: starCount },
    forks: { totalCount: forkCount },
    owner: {
      __resolveType: "User",
      url: "",
      avatarUrl: "",
      id: "",
      login: "",
      resourcePath: "",
    },
    resourcePath: "", // TODO:
  });

  if (isGist) {
    const info: Required<Gist> = {
      ...commonData,
      __typename: "Gist",
      id: "", //TODO:
    };
    return info;
  } else {
    // Repository
    const primaryLanguage = extractLangFromDom($, elMetaRow);

    const info: Required<Repository> = {
      __typename: "Repository",
      descriptionHTML: "", // TODO:
      shortDescriptionHTML: "", // TODO:
      nameWithOwner: "", // TODO:
      sshUrl: "", // TODO:
      forkCount,
      isFork: false,
      parent: null, // TODO:
      primaryLanguage,
      ...commonData,
    };
    return info;
  }
};

export function extractUserPinnedItemsFromHtml(
  html: string,
): UserPinnedItemBasicInfo[] {
  const $ = cheerio.load(html);

  return extractUserPinnedItemsFromCheerio($);
}

export function extractUserPinnedItemsFromCheerio(
  $: CheerioStatic,
): UserPinnedItemBasicInfo[] {
  const elms = $(
    ".js-pinned-items-reorder-container > ol > li > .js-pinned-item-list-item",
  ).toArray();

  return elms.map((elm) => extractUserPinnedItemFromDom($, elm));
}
