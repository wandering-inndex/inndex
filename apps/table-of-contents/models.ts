/**
 * The flattened chapter data to be used in the Table of Contents.
 *
 * Refer to the `Chapter` interface for the base interface.
 */
export interface TableRowData {
  id: string;
  webNovelRef: number | null;
  webNovelOrder: number | null;
  webNovelTitle: string | null;
  webNovelPublished: string;
  webNovelUrl: string;
  webNovelTotalWords: number | null;
  eBookRef: number | null;
  eBookOrder: number | null;
  eBookTitle: string | null;
  audioBookRef: number | null;
  audioBookOrder: number | null;
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

/** The different media values to choose from. */
export enum MediaTypes {
  WEBNOVEL = "WEBNOVEL",
  EBOOK = "EBOOK",
  AUDIOBOOK = "AUDIOBOOK",
}

/** The default "from" media type to use. */
export const DEFAULT_FROM_MEDIA_TYPE: MediaTypes = MediaTypes.AUDIOBOOK;

/** The default "to" media type to use. */
export const DEFAULT_TO_MEDIA_TYPE: MediaTypes = MediaTypes.WEBNOVEL;
