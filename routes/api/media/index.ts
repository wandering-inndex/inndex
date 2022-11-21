import { Handler } from "$fresh/server.ts";
import Surreal, { Result } from "surrealdb/mod.ts";

import {
  AudioBook,
  Chapter,
  ElectronicBook,
  WebVolume,
} from "@seed/types/media.ts";
import { AllMedia } from "@apps/seed/models/media.ts";
import { qChapters } from "@apps/table-of-contents/queries/chapters.ts";

export const handler: Handler = async (request): Promise<Response> => {
  const url = new URL(request.url);
  const onlyRewrite = (url.searchParams.get("onlyRewrite") || "") === "true";

  const [resChapters, webVolumes, eBooks, audioBooks] = await Promise.all([
    Surreal.Instance.query<Result<Chapter[]>[]>(qChapters, { onlyRewrite }),
    Surreal.Instance.select<WebVolume>("volume"),
    Surreal.Instance.select<ElectronicBook>("ebook"),
    Surreal.Instance.select<AudioBook>("audiobook"),
  ]);

  const chapters = resChapters[0].result ?? [];
  const data: AllMedia = { chapters, webVolumes, eBooks, audioBooks };
  return Response.json(data);
};
