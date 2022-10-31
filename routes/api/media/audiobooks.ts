import { Handler } from "$fresh/server.ts";
import Surreal from "surrealdb/mod.ts";

import { AudioBook } from "@seed/types/media.ts";

export const handler: Handler = async (): Promise<Response> => {
  const data = await Surreal.Instance.select<AudioBook>("audiobook");
  return Response.json(data);
};
