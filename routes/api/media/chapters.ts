import { Handler } from "$fresh/server.ts";
import Surreal, { Result } from "surrealdb/mod.ts";

import { qChapters } from "@apps/table-of-contents/queries/chapters.ts";
import { Chapter } from "@seed/types/media.ts";

export const handler: Handler = async (request): Promise<Response> => {
  const url = new URL(request.url);
  const onlyRewrite = (url.searchParams.get("onlyRewrite") || "") === "true";

  const res = await Surreal.Instance.query<Result<Chapter[]>[]>(
    qChapters,
    { onlyRewrite },
  );
  const data = res[0].result ?? [];
  return Response.json(data);
};
