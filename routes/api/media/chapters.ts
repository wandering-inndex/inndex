import { Handler } from "$fresh/server.ts";

import { parse as parseYaml } from "yaml";

import { Chapter } from "../../../models/seed/media.ts";

const rawData = await Deno.readTextFile(
  `./data/seed/media/twi-webnovel-chapters.yaml`,
);
const data = parseYaml(rawData) as Chapter[];

export const handler: Handler = (): Response => {
  return Response.json(data);
};
