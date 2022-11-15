/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

import "std/dotenv/load.ts";

import Surreal from "surrealdb/mod.ts";
import { init as initSurreal } from "./utils/db/surrealdb.ts";
import { init as initNeo4j } from "./utils/db/neo4j.ts";

const errSurreal = await initSurreal({
  url: Deno.env.get("SURREALDB_URL") ?? "",
  namespace: Deno.env.get("SURREALDB_NAMESPACE") ?? "",
  database: Deno.env.get("SURREALDB_DATABASE") ?? "",
  username: Deno.env.get("SURREALDB_USERNAME") ?? "",
  password: Deno.env.get("SURREALDB_PASSWORD") ?? "",
});

if (errSurreal) {
  Surreal.Instance.close();
  console.error(errSurreal);
  Deno.exit(1);
}

const errNeo4j = await initNeo4j({
  url: Deno.env.get("NEO4J_URI") ?? "",
  username: Deno.env.get("NEO4J_USERNAME") ?? "",
  password: Deno.env.get("NEO4J_PASSWORD") ?? "",
});

if (errNeo4j) {
  console.error(errSurreal);
  Deno.exit(1);
}

await start(manifest, { plugins: [twindPlugin(twindConfig)] });
