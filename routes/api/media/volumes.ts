import { Handler } from "$fresh/server.ts";

import { extractSeededData } from "@apps/seed/utils/extractSeededData.ts";
import { Volume } from "@apps/seed/models/media.ts";
import { SeedDataChoices } from "@apps/seed/constants.ts";

export const handler: Handler = async (): Promise<Response> => {
  const data = await extractSeededData<Volume[]>(
    SeedDataChoices.EBOOKS,
  );

  return Response.json(data);
};
