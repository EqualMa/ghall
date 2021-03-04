import Head from "next/head";
import GraphiQL from "graphiql";
import styles from "./graphiql.module.css";
import GraphiQLExplorer from "graphiql-explorer";
import * as React from "react";
import * as q from "../src/graphiql/query";
import { fetchGraphQlSchema, defaultSchema } from "../src/graphiql/schema";

const graphQLFetcher: import("graphiql").Fetcher = (graphQLParams) => {
  return fetch(window.location.origin + "/api", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphQLParams),
  }).then((response) => response.json());
};

export default function GraphiQLPage() {
  const [query, setQuery] = React.useState<string | undefined>(q.DEFAULT_QUERY);
  const [schema, setSchema] = React.useState<import("graphql").GraphQLSchema>(
    defaultSchema,
  );
  const [explorerIsOpen, setExplorerIsOpen] = React.useState(true);

  const refGq = React.useRef<GraphiQL | null>(null);

  const handleEditQuery = React.useCallback((query?: string) => {
    setQuery(query);
  }, []);

  const handleToggleExplorer = React.useCallback(() => {
    setExplorerIsOpen((old) => !old);
  }, []);

  React.useEffect(() => {
    fetchGraphQlSchema(graphQLFetcher).then((s) => setSchema(s));
  }, []);

  return (
    <>
      <Head>
        <link
          key="graphiql-style"
          rel="stylesheet"
          href="https://unpkg.com/graphiql@1.x/graphiql.min.css"
        />
      </Head>
      <div className={`graphiql-container ${styles["graphiql-wrapper"]}`}>
        <GraphiQLExplorer
          schema={schema}
          query={query}
          onEdit={handleEditQuery}
          onRunOperation={(operationName?: string) =>
            refGq.current?.handleRunQuery(operationName)
          }
          explorerIsOpen={explorerIsOpen}
          onToggleExplorer={handleToggleExplorer}
        />
        <GraphiQL
          ref={refGq}
          schema={schema}
          fetcher={graphQLFetcher}
          query={query}
          onEditQuery={handleEditQuery}
          defaultVariableEditorOpen
          toolbar={{
            additionalContent: (
              <GraphiQL.Button
                onClick={handleToggleExplorer}
                label="Explorer"
                title="Toggle Explorer"
              />
            ),
          }}
        />
      </div>
    </>
  );
}
