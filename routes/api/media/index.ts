import { Handler } from "$fresh/server.ts";
import Surreal from "surrealdb/mod.ts";

import {
  AudioBook,
  Chapter,
  ElectronicBook,
  WebVolume,
} from "@seed/types/media.ts";
import { AllMedia } from "@apps/seed/models/media.ts";

export const handler: Handler = async (): Promise<Response> => {
  const [chapters, webVolumes, eBooks, audioBooks] = await Promise.all([
    Surreal.Instance.select<Chapter>("chapter"),
    Surreal.Instance.select<WebVolume>("volume"),
    Surreal.Instance.select<ElectronicBook>("ebook"),
    Surreal.Instance.select<AudioBook>("audiobook"),
  ]);
  const data: AllMedia = { chapters, webVolumes, eBooks, audioBooks };
  return Response.json(data);
};
