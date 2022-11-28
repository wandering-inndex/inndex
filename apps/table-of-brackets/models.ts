/** Represents a singular chapter with the bare minimum information. */
export interface BasicChapterForBracketsList {
  id: string;
  title: string;
  url: string;
  ref: number;
  order: number;
}

/** A basic Media type used for the List of Brackets. */
export interface BasicMediaForBracketsList {
  id: string;
  title: string;
  index: number;
  start: number;
  end: number;
}

/**
 * Represents a single [Bracket Content] with a list of chapter ids where it is
 * mentioned.
 */
export interface BracketContentWithChapters {
  content: string;
  chapterIds: string[];
}

/**
 * Represents a single chapter with a list of all [Bracket Content] items
 * mentioned.
 */
export interface BracketContentsPerChapter {
  chapterId: string;
  bracketContents: string[];
}

/** The different media values to choose from. */
export enum MediaTypes {
  WEBNOVEL = "WEBNOVEL",
  WEBNOVEL_REWRITE = "WEBNOVEL_REWRITE",
  EBOOK = "EBOOK",
  AUDIOBOOK = "AUDIOBOOK",
}

/** The default media type to use. */
export const DEFAULT_MEDIA_TYPE: MediaTypes = MediaTypes.WEBNOVEL;

/** The values when the specific media type is selected in the field. */
export enum MediaTypeValues {
  WEBNOVEL = "Web Novel",
  WEBNOVEL_REWRITE = "Web Novel (Rewrite)",
  EBOOK = "E-book",
  AUDIOBOOK = "Audiobook",
}

/** The default media type value to use. */
export const DEFAULT_MEDIA_TYPE_VALUES: MediaTypeValues =
  MediaTypeValues.WEBNOVEL;

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
  MEDIA = "media",
  FROM_REF = "from_ref",
  FROM_INDEX = "from_index",
  TO_REF = "to_ref",
  TO_INDEX = "to_index",
  EMPTY = "",
}
