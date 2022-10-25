import { Handler } from "$fresh/server.ts";

import { extractSeededData } from "@utils/extractSeededData.ts";
import {
  AllMedia,
  AudioBook,
  Chapter,
  ElectronicBook,
} from "@models/seed/media.ts";
import { SeedDataChoices } from "@models/seed/constants.ts";

export const handler: Handler = async (): Promise<Response> => {
  const chapters = await extractSeededData<Chapter[]>(SeedDataChoices.CHAPTERS);
  const eBooks = await extractSeededData<ElectronicBook[]>(
    SeedDataChoices.EBOOKS,
  );
  const audioBooks = await extractSeededData<AudioBook[]>(
    SeedDataChoices.AUDIOBOOKS,
  );
  const data: AllMedia = { chapters, eBooks, audioBooks };

  return Response.json(data);
};
