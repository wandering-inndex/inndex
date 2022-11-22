import Surreal, { Result } from "surrealdb/mod.ts";

import { BasicMediaForBracketsList } from "@apps/table-of-brackets/models.ts";

const qBasicWebVolumes = `
SELECT
  string::replace(id, 'volume:', '') AS id,
  title,
  index,
  range.start AS start,
  range.end AS end
FROM
  volume
ORDER BY
  index ASC
;
`;

export const getBasicWebVolumeReleases = (): Promise<
  Result<BasicMediaForBracketsList[]>[]
> => {
  return Surreal.Instance.query<Result<BasicMediaForBracketsList[]>[]>(
    qBasicWebVolumes,
  );
};
