import got from "got";
import { extractUserPinnedItemsFromHtml } from "./extract-pinned-item";

export interface UserPinnedItemBasicInfo {
  __typename: "Repository" | "Gist";
  /**
   * the name of a gist is its id in the url
   */
  name: string;
  url: string;
  /**
   * the description of a gist is often seen as its name
   */
  description: string;

  stargazers: { totalCount: number };
  forks: { totalCount: number };

  /**
   * if it is a repo and forked from another repo
   */
  parent: null | { name: string; url: string; owner: { login: string } };

  /**
   * if it is a repo
   */
  languages?: {
    nodes: [
      {
        /** #f1e05a */
        color: string;
        /** JavaScript */
        name: string;
      }
    ];
  };
}

export interface UserBasicInfo {
  name: null;
  login: "EqualMa";
  email: string;
  url: string;

  avatarUrl: string;
  bio: string | null;

  websiteUrl: string | null;
  twitterUsername: null;

  location: null | string;

  status: null | {
    /** ":rainbow:" */
    emoji: null | string;
    message: null | string;
    emojiHTML: null | string;
  };
}

export interface UserBasicInfoWIthPinnedItems extends UserBasicInfo {
  pinnedItems: {
    nodes: UserPinnedItemBasicInfo[];
  };
}

async function queryUserHomepageHtml(userLogin: string): Promise<string> {
  const resp = await got(`https://github.com/${userLogin}`);
  return resp.body;
}

// export async function queryUserInfoWithPinnedItemsFromHomepage(
//   userLogin: string
// ): Promise<{
//   UserInfoWIthPinnedItems;
// }> {
//   const html = await queryUserHomepageHtml(userLogin);

//   return {
//     pinnedItems: {
//       nodes: extractUserPinnedItemsFromHtml(html),
//     },
//   };
// }

export async function queryUserPinnedItemsFromHomepage(
  userLogin: string
): Promise<UserPinnedItemBasicInfo[]> {
  const html = await queryUserHomepageHtml(userLogin);
  return extractUserPinnedItemsFromHtml(html);
}
