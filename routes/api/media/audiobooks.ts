import { Handler } from "$fresh/server.ts";

import { extractSeededData } from "@utils/extractSeededData.ts";
import { AudioBook } from "@models/seed/media.ts";
import { SeedDataChoices } from "@models/seed/constants.ts";

export const handler: Handler = async (): Promise<Response> => {
  const data = await extractSeededData<AudioBook[]>(
    SeedDataChoices.AUDIOBOOKS,
  );

  return Response.json(data);
};
