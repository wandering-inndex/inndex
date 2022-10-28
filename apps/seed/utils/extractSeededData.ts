import { parse as parseYaml } from "yaml";

import { SEED_DATA_DIR, SeedDataChoices } from "@apps/seed/constants.ts";

export const extractSeededData = async <T = unknown>(
  choice: SeedDataChoices,
): Promise<T> => {
  const rawData = await Deno.readTextFile(
    `${SEED_DATA_DIR}/${choice}`,
  );
  const data = parseYaml(rawData) as T;
  return data;
};
