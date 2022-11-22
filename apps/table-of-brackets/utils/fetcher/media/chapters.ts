import Surreal, { Result } from "surrealdb/mod.ts";

import { BasicChapterForBracketsList } from "@apps/table-of-brackets/models.ts";

const qBasicWebVolumeChapters = `
SELECT
  string::replace(id, 'chapter:', '') AS id,
  partOf.webNovel.title AS title,
  partOf.webNovel.order AS order,
  partOf.webNovel.ref AS ref,
  partOf.webNovel.url AS url
FROM
  chapter
WHERE
  meta.show = true
  AND meta.rewrite = false
  AND partOf.webNovel.ref IS NOT NULL
ORDER BY
  partOf.webNovel.order ASC
;
`;

/** Returns a Promise of a list of chapters from the Web. */
export const getBasicWebVolumeChapters = (): Promise<
  Result<BasicChapterForBracketsList[]>[]
> => {
  return Surreal.Instance.query<Result<BasicChapterForBracketsList[]>[]>(
    qBasicWebVolumeChapters,
  );
};

const qBasicAudioBookChapters = `
SELECT
  string::replace(id, 'chapter:', '') AS id,
  partOf.audioBook.title AS title,
  partOf.audioBook.order AS order,
  partOf.audioBook.ref AS ref,
  partOf.webNovel.url AS url
FROM
  chapter
WHERE
  meta.show = true
  AND meta.rewrite = false
  AND partOf.audioBook.ref IS NOT NULL
ORDER BY
  partOf.audioBook.order ASC
;
`;

/** Returns a Promise of a list of chapters from the Audio Books. */
export const getBasicAudioBookChapters = (): Promise<
  Result<BasicChapterForBracketsList[]>[]
> => {
  return Surreal.Instance.query<Result<BasicChapterForBracketsList[]>[]>(
    qBasicAudioBookChapters,
  );
};

const qBasicElectronicBookChapters = `
SELECT
  string::replace(id, 'chapter:', '') AS id,
  partOf.eBook.title AS title,
  partOf.eBook.order AS order,
  partOf.eBook.ref AS ref,
  partOf.webNovel.url AS url
FROM
  chapter
WHERE
  meta.show = true
  AND meta.rewrite = false
  AND partOf.eBook.ref IS NOT NULL
ORDER BY
  partOf.eBook.order ASC
;
`;

/** Returns a Promise of a list of chapters from the Electronic Books. */
export const getBasicElectronicBookChapters = (): Promise<
  Result<BasicChapterForBracketsList[]>[]
> => {
  return Surreal.Instance.query<Result<BasicChapterForBracketsList[]>[]>(
    qBasicElectronicBookChapters,
  );
};
