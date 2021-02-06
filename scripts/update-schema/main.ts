import { promises as fsp } from "fs";
import { extractSchema } from "./extract";
import { getGhSchema } from "./gh";
import * as gq from "graphql";

const argv: { download: boolean } = require("yargs/yargs")(
  process.argv.slice(2),
).boolean(["download"]).argv;

async function main() {
  const schemaSource = await getGhSchema(argv.download);

  const schemaAst = gq.parse(schemaSource);

  const ghallSchemaAst = extractSchema(schemaAst);

  const ghallSchemaSource = gq.print(ghallSchemaAst);

  await fsp.writeFile("schema.ghack.graphql", ghallSchemaSource);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
