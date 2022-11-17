/** Query to get all chapters. */
export const qAllChapters = `
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
