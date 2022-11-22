import Surreal, { Result } from "surrealdb/mod.ts";

import { BasicMediaForBracketsList } from "@apps/table-of-brackets/models.ts";

const qBasicAudioBooks = `
SELECT
  string::replace(id, 'audiobook:', '') AS id,
  title,
  index,
  range.start AS start,
  range.end AS end
FROM
  audiobook
ORDER BY
  index ASC
;
`;

export const getBasicAudioBookReleases = (): Promise<
  Result<BasicMediaForBracketsList[]>[]
> => {
  return Surreal.Instance.query<Result<BasicMediaForBracketsList[]>[]>(
    qBasicAudioBooks,
  );
};
