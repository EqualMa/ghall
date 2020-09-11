import Head from "next/head";
import GraphiQL from "graphiql";
import styles from "./graphiql.module.css";

const graphQLFetcher: import("graphiql/dist/components/GraphiQL").Fetcher = (
  graphQLParams,
) => {
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
  return (
    <>
      <Head>
        <link
          key="graphiql-style"
          rel="stylesheet"
          href="https://unpkg.com/graphiql@1.x/graphiql.min.css"
        />
      </Head>
      <div className={styles["graphiql-wrapper"]}>
        <GraphiQL fetcher={graphQLFetcher} />
      </div>
    </>
  );
}
