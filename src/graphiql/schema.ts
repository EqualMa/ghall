import { Fetcher } from "graphiql";
import { getIntrospectionQuery, buildClientSchema } from "graphql";
import defaultSchemaJson from "../../graphql.schema.json";

export const defaultSchema = buildClientSchema(defaultSchemaJson as never);

export async function fetchGraphQlSchema(fetcher: Fetcher) {
  const result = await fetcher({
    query: getIntrospectionQuery(),
  } as never);

  //
  const schema = buildClientSchema(
    (result as { data: import("graphql").IntrospectionQuery }).data,
  );
  return schema;
}
