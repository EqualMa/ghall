import { Resolvers } from "./generated";
import { decodeNodeId } from "../github/id";
import { UserCrawler } from "../github/crawler/user";

const resolvers: Resolvers = {
  Query: {
    user: async (parent, args) => {
      const { login } = args;
      const e = new UserCrawler(login);
      return e.getResource();
    },
  },
  User: {
    avatarUrl: (e, args) => e.getAvatarUrl(args.size),
    pinnedItems: (e, args) => e.getPinnedItemsConnection(args),
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
