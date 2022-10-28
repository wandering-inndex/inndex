/**
 * The Wandering Inn is released as Chapters, and is categorized into
 * overarching volumes (for the web novel) and books (for Kindle and Audible
 * releases).
 *
 * @see {@link https://wanderinginn.com/table-of-contents/}
 */
export interface Chapter {
  /**
   * Unique ID for the chapter. Padded up to four zeroes to the left, and two
   * zeroes to the right to make it easier to move later when we get revised
   * chapters.
   */
  id: string;
  partOf: {
    webNovel: {
      order: number | null;
      ref: number | null;
      title: string | null;
      /** Date string of when this chapter is published. */
      published: string;
      url: string;
      /**
       * Total words based on https://wordcounter.net/. Without the title,
       * author's notes, artworks, etc.
       */
      totalWords: number | null;
    };
    eBook: {
      order: number | null;
      ref: number | null;
      title: string | null;
    };
    audioBook: {
      order: number | null;
      ref: number | null;
      title: string | null;
      /** Total seconds from the Audible chapters list. */
      totalSeconds: number | null;
    };
    wiki: {
      url: string | null;
    };
  };
}

/** A collection of image URLs for the media type. */
export interface ImageUrls {
  original: string;
  medium: string;
  small: string;
  thumbnail: string;
}

/**
 * Collection of chapters from the web novel.
 *
 * @see {@link https://thewanderinginn.fandom.com/wiki/Category:Volumes}
 */
export interface Volume {
  index: number;
  title: string;
  url: string;
}

/**
 * Digital books published in Amazon Kindle.
 *
 * @see {@link https://www.amazon.com/dp/B099JFQ9YR}
 */
export interface ElectronicBook {
  index: number;
  title: string;
  /** Cleaned title to make the tables more uniformed. */
  cleanedTitle: string;
  /** Date string on when this e-book is published. */
  published: string;
  url: string;
  imageUrls: ImageUrls;
  /** Total pages based on the store page. */
  totalLength: number | null;
}

/**
 * Audiobooks published in Audible. Narrated by Andrea Parsneau.
 *
 * @see {@link https://www.audible.com/series/The-Wandering-Inn-Audiobooks/B07X3TZ2YQ}
 */
export interface AudioBook {
  index: number;
  title: string;
  /** The title in the store page. */
  storeTitle: string;
  /** Date string on when this audiobook is published. */
  published: string;
  url: string;
  imageUrls: ImageUrls;
  /** Total minutes based on the store page. */
  totalLength: number | null;
}

/** List of all available media. Used in the table of contents page. */
export interface AllMedia {
  chapters: Chapter[];
  webVolumes: Volume[];
  audioBooks: AudioBook[];
  eBooks: ElectronicBook[];
}

/** The default AllMedia with zeroed values. */
export const DEFAULT_ALL_MEDIA: AllMedia = {
  chapters: [],
  webVolumes: [],
  audioBooks: [],
  eBooks: [],
};
