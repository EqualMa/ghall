import { Resolvers } from "./generated";
import { decodeNodeId } from "../github/id";
import { queryUserPinnedItemsFromHomepage } from "../pinned-items";
import { UserExtractor, UserCrawler } from "../github/crawler/user";

const resolvers: Resolvers = {
  Query: {
    user: async (parent, args) => {
      const { login } = args;

      const e = await new UserCrawler(login).getResource();

      return e;
    },
  },
  Node: {
    __resolveType: (parent) => {
      const { __typename: typeName } = decodeNodeId(parent.id);
      if (typeName !== "Gist")
        throw new Error(`unresolvable Node type: ${typeName}`);

      return typeName;
    },
  },
};

export default resolvers;
