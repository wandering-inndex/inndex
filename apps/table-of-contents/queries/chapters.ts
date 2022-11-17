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
