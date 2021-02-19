import { promises as fsp } from "fs";
import * as path from "path";
import { ApolloServer } from "apollo-server-micro";
import * as gq from "graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { cached } from "../../src/cached";
import { resolvers } from "../../src/graphql";

const getApolloServerHandler = cached(async () => {
  const schema = await fsp.readFile(
    path.join(process.cwd(), "schema.ghall.graphql"),
    "utf-8",
  );
  const typeDefs = gq.parse(schema);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  return server.createHandler({ path: "/api" });
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const h = await getApolloServerHandler();
  return h(req, res);
};

// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
};
