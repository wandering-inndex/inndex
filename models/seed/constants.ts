/** Location of the seed data. */
export const SEED_DATA_DIR = `./data/seed`;

/** Mapping for the seed data files. */
export enum SeedDataChoices {
  CHAPTERS = `media/twi-webnovel-chapters.yaml`,
  VOLUMES = `media/twi-webnovel-volumes.yaml`,
  AUDIOBOOKS = `media/twi-audible-audiobooks.yaml`,
  EBOOKS = `media/twi-kindle-ebooks.yaml`,
}
