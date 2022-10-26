import { Handler } from "$fresh/server.ts";

import { extractSeededData } from "@utils/extractSeededData.ts";
import { Chapter } from "@models/seed/media.ts";
import { SeedDataChoices } from "@constants/seed/media.ts";

export const handler: Handler = async (): Promise<Response> => {
  const data = await extractSeededData<Chapter[]>(
    SeedDataChoices.CHAPTERS,
  );

  return Response.json(data);
};
