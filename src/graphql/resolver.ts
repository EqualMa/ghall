import { Resolvers } from "./generated";
import { decodeNodeId } from "../github/id";
import { queryUserPinnedItemsFromHomepage } from "../pinned-items";
import { UserExtractor, UserCrawler } from "../github/crawler/user";

const resolvers: Resolvers = {
  Query: {
    user: async (parent, args) => {
      const { login } = args;
      const e = new UserCrawler(login);
      return e;
    },
  },
  User: {
    url: async (parent) => {
      const e = await parent.getResource();
      return e.url;
    },
    websiteUrl: async (parent) => {
      const e = await parent.getResource();
      return e.websiteUrl;
    },
    avatarUrl: async (parent, args) => {
      const e = await parent.getResource();
      return e.getAvatarUrl(args.size);
    },
  },
  Node: {
    __resolveType: (parent) => {
      if (parent instanceof UserCrawler) {
        return "User";
      }
      const { __typename: typeName } = decodeNodeId(parent.id);
      if (typeName !== "Gist")
        throw new Error(`unresolvable Node type: ${typeName}`);

      return typeName;
    },
  },
};

export default resolvers;
