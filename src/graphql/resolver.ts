import { Resolvers } from "./generated";
import { decodeNodeId } from "../github/id";
import { UserExtractor, UserLazyExtractor } from "../github/crawler/user";
import { pick } from "../util/type-utils";
import * as AutoResolvers from "./auto-resolvers";

const resolvers: Partial<Resolvers> = {
  Actor: {
    __resolveType() {
      return "User";
    },
    ...pick(AutoResolvers.UserAutoResolvers, [
      "avatarUrl",
      "login",
      "resourcePath",
      "url",
    ]),
  },
  PinnableItemConnection: AutoResolvers.PinnableItemConnectionAutoResolvers,
  Query: {
    user: async (parent, args) => {
      const { login } = args;
      return new UserLazyExtractor(login);
    },
  },
  User: AutoResolvers.UserAutoResolvers,
  RepositoryOwner: AutoResolvers.RepositoryOwnerAutoResolvers,
  Node: {
    __resolveType: async (parent, ...params) => {
      if (parent instanceof UserExtractor) {
        return "User";
      }
      const parentId: string = await AutoResolvers.resolveField(
        "id",
        parent,
        {},
        ...params,
      );
      const { __typename: typeName } = decodeNodeId(parentId);
      if (typeName !== "Gist")
        throw new Error(`unresolvable Node type: ${typeName}`);

      return typeName;
    },
    id: AutoResolvers.resolverForField("id"),
  },
};

export default resolvers;
