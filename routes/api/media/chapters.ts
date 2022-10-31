import { Handler } from "$fresh/server.ts";
import Surreal from "surrealdb/mod.ts";

import { Chapter } from "@seed/types/media.ts";

export const handler: Handler = async (): Promise<Response> => {
  const data = await Surreal.Instance.select<Chapter>("chapter");
  return Response.json(data);
};
