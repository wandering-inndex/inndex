import { Chapter } from "../../models/seed/media.ts";

import { SortKeys, TableRowData } from "./models.ts";

/** Flattens the `Chapter` values to conform to `TableRowData`. */
export const convertToTableRowData = (chapter: Chapter): TableRowData => {
  return {
    id: chapter.id,
    url: chapter.url,
    wikiUrl: chapter.wikiUrl,
    published: chapter.published,
    webNovelRef: chapter.partOf.webNovel.ref,
    webNovelTitle: chapter.partOf.webNovel.title,
    webNovelOrder: chapter.partOf.webNovel.order,
    webNovelTotalWords: chapter.partOf.webNovel.totalWords,
    eBookRef: chapter.partOf.eBook.ref,
    eBookTitle: chapter.partOf.eBook.title,
    eBookOrder: chapter.partOf.eBook.order,
    audioBookRef: chapter.partOf.audioBook.ref,
    audioBookTitle: chapter.partOf.audioBook.title,
    audioBookOrder: chapter.partOf.audioBook.order,
    audioBookTotalSeconds: chapter.partOf.audioBook.totalSeconds,
  };
};

/** Sorts the data. */
export const sortData = ({
  data,
  sortKey,
  reverse,
}: {
  data: TableRowData[];
  sortKey: SortKeys;
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
