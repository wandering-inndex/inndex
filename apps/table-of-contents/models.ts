import { JSX } from "preact";

/**
 * The flattened chapter data to be used in the Table of Contents.
 *
 * Refer to the `Chapter` interface for the base interface.
 */
export interface TableRowData {
  id: string;
  isRewrite: boolean;
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

/** The values when the specific media type is selected in the "from" field. */
export enum FromMediaTypeValues {
  WEBNOVEL = "reading the web novel",
  EBOOK = "reading the e-book",
  AUDIOBOOK = "listening to the audiobook",
}

/** The default "from" media type value to use. */
export const DEFAULT_FROM_MEDIA_TYPE_VALUES: FromMediaTypeValues =
  FromMediaTypeValues.AUDIOBOOK;

/** The values when the specific media type is selected in the "to" field. */
export enum ToMediaTypeValues {
  WEBNOVEL = "on the web",
  EBOOK = "via the e-books",
  AUDIOBOOK = "via the audiobooks",
}

/** The default "to" media type value to use. */
export const DEFAULT_TO_MEDIA_TYPE_VALUES: ToMediaTypeValues =
  ToMediaTypeValues.WEBNOVEL;

/** A single choice for the dropdown. */
export interface Choice {
  key: string;
  text: string;
  classNames: string[];
  order?: number;
  handleClick: () => void;
}

/** All dropdown selections. */
export enum DropdownSelections {
  FROM = "from",
  TO = "to",
  REF = "ref",
  INDEX = "index",
  EMPTY = "",
}

/** A single message in the chat. */
export interface Message {
  alt: string;
  image: string;
  location: "left" | "right";
  message: JSX.Element;
}

/** Tallies the Word counts per Chapter Group. */
export interface ChaptersGroupWordCount {
  REGULAR: number[];
  LETTERED: number[];
  INTERLUDE: number[];
  SIDE_STORY: number[];
  MINI_STORY: number[];
  OTHER: number[];
}

/** Tallies the Type counts per Chapter Group. */
export interface ChaptersGroupTypeCount {
  REGULAR: number;
  LETTERED: number;
  INTERLUDE: number;
  SIDE_STORY: number;
  MINI_STORY: number;
  OTHER: number;
}
