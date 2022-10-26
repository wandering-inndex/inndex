import { Handler } from "$fresh/server.ts";

import { extractSeededData } from "@utils/extractSeededData.ts";
import { ElectronicBook } from "@models/seed/media.ts";
import { SeedDataChoices } from "@constants/seed/media.ts";

export const handler: Handler = async (): Promise<Response> => {
  const data = await extractSeededData<ElectronicBook[]>(
    SeedDataChoices.EBOOKS,
  );

  return Response.json(data);
};
