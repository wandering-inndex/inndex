/** Represents a singular chapter with the bare minimum information. */
export interface BasicWebChapter {
  id: string;
  title: string;
  url: string;
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
