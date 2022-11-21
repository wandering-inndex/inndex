/** Query to get chapters. */
export const qChapters = `
SELECT
  *,
  string::replace(id, 'chapter:', '') AS id
FROM
  chapter
WHERE
  meta.show = true
  AND meta.rewrite = $onlyRewrite
ORDER BY
  id ASC
;
`;

/** Query to get all chapters. */
export const qAllChapters = `
SELECT
  *,
  string::replace(id, 'chapter:', '') AS id
FROM
  chapter
WHERE
  meta.show = true
ORDER BY
  id ASC
;
`;
