import Surreal, { Result } from "surrealdb/mod.ts";

import { BasicMediaForBracketsList } from "@apps/table-of-brackets/models.ts";

const qBasicElectronicBooks = `
SELECT
  string::replace(id, 'ebook:', '') AS id,
  title,
  index,
  range.start AS start,
  range.end AS end
FROM
  ebook
ORDER BY
  index ASC
;
`;

export const getBasicElectronicBookReleases = (): Promise<
  Result<BasicMediaForBracketsList[]>[]
> => {
  return Surreal.Instance.query<Result<BasicMediaForBracketsList[]>[]>(
    qBasicElectronicBooks,
  );
};
