import { Handler } from "$fresh/server.ts";

import { extractSeededData } from "../../../utils/extractSeededData.ts";
import {
  AllMedia,
  AudioBook,
  Chapter,
  ElectronicBook,
  Volume,
} from "../../../models/seed/media.ts";
import { SeedDataChoices } from "../../../constants/seed/media.ts";

export const handler: Handler = async (): Promise<Response> => {
  const chapters = await extractSeededData<Chapter[]>(SeedDataChoices.CHAPTERS);
  const webVolumes = await extractSeededData<Volume[]>(SeedDataChoices.VOLUMES);
  const eBooks = await extractSeededData<ElectronicBook[]>(
    SeedDataChoices.EBOOKS,
  );
  const audioBooks = await extractSeededData<AudioBook[]>(
    SeedDataChoices.AUDIOBOOKS,
  );

  const data: AllMedia = { chapters, webVolumes, eBooks, audioBooks };

  return Response.json(data);
};
