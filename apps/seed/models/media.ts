/**
 * The Wandering Inn is released as Chapters, and is categorized into
 * overarching volumes (for the web novel) and books (for Kindle and Audible
 * releases).
 *
 * @see {@link https://wanderinginn.com/table-of-contents/}
 */
export interface Chapter {
  id: string;
  url: string;
  /** Link to the wiki. */
  wikiUrl: string | null;
  /** Date string on when this chapter is published. */
  published: string;
  partOf: {
    webNovel: {
      ref: number | null;
      title: string | null;
      order: number | null;
      /** Total words based on https://wordcounter.net/. */
      totalWords: number | null;
    };
    eBook: {
      ref: number | null;
      title: string | null;
      order: number | null;
    };
    audioBook: {
      ref: number | null;
      title: string | null;
      order: number | null;
      /** Total seconds from the Audible chapters list. */
      totalSeconds: number | null;
    };
  };
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
  imageUrl: string;
  totalLength: {
    /** Total pages based on the store page. */
    pages: number;
  };
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
  imageUrl: string;
  totalLength: {
    /** Total hours based on the store page. */
    hours: number;
    /** Total minutes based on the store page. */
    minutes: number;
  };
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
