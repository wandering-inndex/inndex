import { Handler } from "$fresh/server.ts";
import Surreal from "surrealdb/mod.ts";

import { WebVolume } from "@seed/types/media.ts";

export const handler: Handler = async (): Promise<Response> => {
  const data = await Surreal.Instance.select<WebVolume>("volume");
  return Response.json(data);
};
