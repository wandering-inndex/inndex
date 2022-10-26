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
  wikiUrl: string;
  published: string;
  partOf: {
    webVolume: {
      ref: number | null;
      title: string | null;
      order: number | null;
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
  published: string;
  url: string;
  imageUrl: string;
  totalLength: {
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
  published: string;
  url: string;
  imageUrl: string;
  totalLength: {
    hours: number;
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
