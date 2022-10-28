import { JSX } from "preact";

/**
 * The flattened chapter data to be used in the Table of Contents.
 *
 * Refer to the `Chapter` interface for the base interface.
 */
export interface TableRowData {
  id: string;
  webNovelOrder: number | null;
  webNovelRef: number | null;
  webNovelTitle: string | null;
  webNovelPublished: string;
  webNovelUrl: string;
  webNovelTotalWords: number | null;
  eBookOrder: number | null;
  eBookRef: number | null;
  eBookTitle: string | null;
  audioBookOrder: number | null;
  audioBookRef: number | null;
  audioBookTitle: string | null;
  audioBookTotalSeconds: number | null;
  wikiUrl: string | null;
}

/** The possible keys to use. */
export type TableColumnKey = keyof TableRowData;

/** The possible sort order. */
export type SortOrder = "asc" | "desc";

/** The individual header data for the table. */
export interface TableHeaderData {
  columnKey: TableColumnKey;
  sortKey: TableColumnKey;
  label: string;
  classNames: string;
  colSpan?: number;
  isDark?: boolean;
}
