import Surreal, { Result } from "surrealdb/mod.ts";

import {
  qAllChapters,
  qChapters,
} from "@apps/table-of-contents/queries/chapters.ts";
import { Chapter } from "@seed/types/media.ts";

/** The options for getting the chapters. */
export interface GetChaptersOptions {
  onlyRewrite: boolean;
}

/** Returns the chapters based on the given options. */
export const getChapters = async (
  options: GetChaptersOptions,
): Promise<Result<Chapter[]>[]> => {
  const res = await Surreal.Instance.query<Result<Chapter[]>[]>(
    qChapters,
    { onlyRewrite: options.onlyRewrite },
  );
  return res;
};

/** Returns all the chapters. */
export const getAllChapters = async (): Promise<Result<Chapter[]>[]> => {
  const res = await Surreal.Instance.query<Result<Chapter[]>[]>(
    qAllChapters,
  );
  return res;
};
