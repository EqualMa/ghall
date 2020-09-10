import type { NextApiRequest } from "next";
import * as yup from "yup";
import { defApi } from "../../src/def-api";
import { queryUserPinnedItemsFromHomepage } from "../../src/pinned-items";

const querySchema = yup
  .object()
  .required()
  .shape({
    login: yup.string().required(),
    graphql: yup.boolean().default(false).required(),
  });

export default defApi(
  async (reqUtil) => {
    const query = reqUtil.query;

    const userLogin = query.login;
    const graphql = query.graphql;

    const pinnedItems = await queryUserPinnedItemsFromHomepage(userLogin);

    if (graphql) {
      return {
        data: {
          user: {
            pinnedItems: { nodes: pinnedItems },
          },
        },
      };
    } else return pinnedItems;
  },
  {
    querySchema,
    allowedMethods: "GET",
  },
);
