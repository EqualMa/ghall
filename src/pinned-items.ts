import got from "got";
import { extractUserPinnedItemsFromHtml } from "./extract-pinned-item";
import { PinnableItem } from "./graphql/generated";

export type UserPinnedItemBasicInfo = Required<PinnableItem>;

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
  userLogin: string,
): Promise<UserPinnedItemBasicInfo[]> {
  const html = await queryUserHomepageHtml(userLogin);
  return extractUserPinnedItemsFromHtml(html);
}
