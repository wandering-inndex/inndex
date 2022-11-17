import { Handler } from "$fresh/server.ts";
import Surreal, { Result } from "surrealdb/mod.ts";

import { qAllChapters } from "@apps/table-of-contents/queries/chapters.ts";
import { Chapter } from "@seed/types/media.ts";

export const handler: Handler = async (): Promise<Response> => {
  const res = await Surreal.Instance.query<Result<Chapter[]>[]>(
    qAllChapters,
  );
  const data = res[0].result ?? [];
  return Response.json(data);
};
