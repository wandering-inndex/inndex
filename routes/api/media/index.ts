import { Handler } from "$fresh/server.ts";
import Surreal, { Result } from "surrealdb/mod.ts";

import {
  AudioBook,
  Chapter,
  ElectronicBook,
  WebVolume,
} from "@seed/types/media.ts";
import { AllMedia } from "@apps/seed/models/media.ts";
import { qAllChapters } from "@apps/table-of-contents/queries/chapters.ts";

export const handler: Handler = async (): Promise<Response> => {
  const [resChapters, webVolumes, eBooks, audioBooks] = await Promise.all([
    Surreal.Instance.query<Result<Chapter[]>[]>(qAllChapters).then(),
    Surreal.Instance.select<WebVolume>("volume"),
    Surreal.Instance.select<ElectronicBook>("ebook"),
    Surreal.Instance.select<AudioBook>("audiobook"),
  ]);

  const chapters = resChapters[0].result ?? [];
  const data: AllMedia = { chapters, webVolumes, eBooks, audioBooks };
  return Response.json(data);
};
