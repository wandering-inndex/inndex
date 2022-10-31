import {
  AudioBook,
  Chapter,
  ElectronicBook,
  WebVolume,
} from "@seed/types/media.ts";

/** List of all available media. Used in the table of contents page. */
export interface AllMedia {
  chapters: Chapter[];
  webVolumes: WebVolume[];
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
