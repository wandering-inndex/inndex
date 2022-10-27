/**
 * The flattened chapter data to be used in the Table of Contents.
 *
 * Refer to the `Chapter` interface for the base interface.
 */
export interface TableRowData {
  id: string;
  url: string;
  wikiUrl: string | null;
  published: string;
  webNovelRef: number | null;
  webNovelTitle: string | null;
  webNovelOrder: number | null;
  webNovelTotalWords: number | null;
  eBookRef: number | null;
  eBookTitle: string | null;
  eBookOrder: number | null;
  audioBookRef: number | null;
  audioBookTitle: string | null;
  audioBookOrder: number | null;
  audioBookTotalSeconds: number | null;
}

/** The possible keys to use. */
export type SortKeys = keyof TableRowData;

/** The possible sort order. */
export type SortOrder = "asc" | "desc";
