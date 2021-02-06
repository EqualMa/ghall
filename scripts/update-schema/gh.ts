import { promises as fsp } from "fs";
import got from "got";

const PATH_GH_SCHEMA = "schema.docs.graphql";

async function getLatestGhSchema(
  url = "https://docs.github.com/public/schema.docs.graphql",
) {
  const text = await got(url).text();
  await fsp.writeFile(PATH_GH_SCHEMA, text);
  return text;
}

async function getSavedGhSchema() {
  return fsp.readFile(PATH_GH_SCHEMA, "utf-8");
}

export async function getGhSchema(download = false): Promise<string> {
  return download ? getLatestGhSchema() : getSavedGhSchema();
}
