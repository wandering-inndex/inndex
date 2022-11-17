import { Chapter } from "@seed/types/media.ts";

import { TableColumnKey, TableRowData } from "./models.ts";

/** Flattens the `Chapter` values to conform to `TableRowData`. */
export const convertToTableRowData = (chapter: Chapter): TableRowData => {
  return {
    id: chapter.id,
    isRewrite: chapter.meta.rewrite,
    webNovelOrder: chapter.partOf.webNovel?.order ||
      chapter.partOf.webNovelRewrite?.order || null,
    webNovelRef: chapter.partOf.webNovel?.ref ||
      chapter.partOf.webNovelRewrite?.ref || null,
    webNovelTitle: chapter.partOf.webNovel?.title ||
      chapter.partOf.webNovelRewrite?.title || null,
    webNovelPublished: chapter.partOf.webNovel?.published ||
      chapter.partOf.webNovelRewrite?.published || "",
    webNovelUrl: chapter.partOf.webNovel?.url ||
      chapter.partOf.webNovelRewrite?.url || "",
    webNovelTotalWords: chapter.partOf.webNovel?.totalWords ||
      chapter.partOf.webNovelRewrite?.totalWords || null,
    eBookOrder: chapter.partOf.eBook?.order || null,
    eBookRef: chapter.partOf.eBook?.ref || null,
    eBookTitle: chapter.partOf.eBook?.title || null,
    audioBookOrder: chapter.partOf.audioBook?.order || null,
    audioBookRef: chapter.partOf.audioBook?.ref || null,
    audioBookTitle: chapter.partOf.audioBook?.title || null,
    audioBookTotalSeconds: chapter.partOf.audioBook?.totalSeconds || null,
    wikiUrl: chapter.partOf.wiki?.url || null,
  };
};

/** Sorts the data. */
export const sortData = ({
  data,
  sortKey,
  reverse,
}: {
  data: TableRowData[];
  sortKey: TableColumnKey;
  reverse: boolean;
}): TableRowData[] => {
  if (!sortKey) return data;

  const sortedData = data.sort((a, b) => {
    const val1 = a[sortKey];
    const val2 = b[sortKey];

    if (val1 === val2) return 0;

    if (val1 === null) return 1;
    if (val2 === null) return -1;

    if (reverse) return val1 > val2 ? -1 : 1;
    return val1 > val2 ? 1 : -1;
  });

  return sortedData;
};

/** Formats the word count to a cleaner format. */
export const formatWordCount = (words = 0): string => {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(words);
};

/** Formats the seconds to a cleaner format. */
export const formatSeconds = (seconds: number | null): string => {
  if (seconds === null) return "";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 3600 % 60);

  const atoms: string[] = [];
  [h, m, s].forEach((atom) => {
    atoms.push(`${atom}`.padStart(2, "0"));
  });

  return atoms.join(":");
};

/** Formats the date to a cleaner format. */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "";

  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  });
  return formatter.format(new Date(dateString));
};
