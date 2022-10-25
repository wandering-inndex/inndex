/**
 * The Wandering Inn is released as Chapters, and is categorized into
 * overarching volumes (for the web novel) and books (for Kindle and Audible
 * releases).
 *
 * @see {@link https://wanderinginn.com/table-of-contents/}
 */
export interface Chapter {
  id: string;
  title: string;
  url: string;
  published: string;
  partOf: {
    webVolume: number | null;
    eBook: number | null;
    audioBook: number | null;
  };
  order: {
    webVolume: number | null;
    eBook: number | null;
    audioBook: number | null;
  };
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
  audioBooks: AudioBook[];
  eBooks: ElectronicBook[];
}

/** The default AllMedia with zeroed values. */
export const DEFAULT_ALL_MEDIA: AllMedia = {
  chapters: [],
  audioBooks: [],
  eBooks: [],
};
