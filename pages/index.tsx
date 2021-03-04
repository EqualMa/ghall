import Head from "next/head";
import * as React from "react";
import router from "next/router";

export default function Home() {
  React.useEffect(() => {
    router.replace("/graphiql");
  }, []);
  return (
    <>
      <Head>
        <title>GHall</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
}
