import { Resolvers } from "./generated";
import { decodeNodeId } from "../github/id";
import { queryUserPinnedItemsFromHomepage } from "../pinned-items";

const resolvers: Resolvers = {
  Query: {
    user: async (parent, args) => {
      const { login } = args;
      const pinnedItems = await queryUserPinnedItemsFromHomepage(login);
      return {
        pinnedItems: { totalCount: pinnedItems.length, nodes: pinnedItems },
      };
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
