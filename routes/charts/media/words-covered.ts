import { type Handlers } from "$fresh/server.ts";
import { renderChart } from "$fresh_charts/mod.ts";
import { ChartColors } from "$fresh_charts/utils.ts";

import Surreal, { Result } from "surrealdb/mod.ts";

import { qChapters } from "@apps/table-of-contents/queries/chapters.ts";

import { Chapter } from "@seed/types/media.ts";

import { formatWordCount } from "../../../apps/table-of-contents/utils.ts";

export const handler: Handlers = {
  async GET() {
    const resChapters = await Surreal.Instance.query<Result<Chapter[]>[]>(
      qChapters,
      { onlyRewrite: false },
    );
    const chapters: Chapter[] = resChapters[0].result ?? [];

    let wordsFromWebNovelVolumes = 0;
    let wordsCovered = 0;
    chapters.filter((chapter) => chapter.meta.show).forEach((chapter) => {
      wordsFromWebNovelVolumes += chapter.partOf.webNovel?.totalWords ?? 0;

      const audioBookRef = chapter.partOf.audioBook?.ref ?? 0;
      if (audioBookRef !== 0) {
        wordsCovered += chapter.partOf.webNovel?.totalWords ?? 0;
      }
    });
    const wordsLeft = wordsFromWebNovelVolumes - wordsCovered;
    const percentageCovered = wordsCovered / wordsFromWebNovelVolumes;

    return renderChart({
      type: "horizontalBar",
      data: {
        labels: [
          [
            "Total words from",
            "the published",
            "Web Novel Volumes",
          ],
          [
            "Total words covered",
            "by the Audiobook/",
            "E-book releases",
            `(${(percentageCovered * 100).toFixed(2)}% covered)`,
          ],
        ],
        datasets: [
          {
            label: `Total words (${
              formatWordCount(wordsFromWebNovelVolumes)
            } words)`,
            data: [
              wordsFromWebNovelVolumes,
              0,
            ],
            backgroundColor: ChartColors.Red,
          },
          {
            label: `Words covered (${formatWordCount(wordsCovered)} words)`,
            data: [
              0,
              wordsCovered,
            ],
            backgroundColor: ChartColors.Yellow,
          },
          {
            label: `Words left to cover (${formatWordCount(wordsLeft)} words)`,
            data: [
              0,
              wordsLeft,
            ],
            backgroundColor: ChartColors.Grey,
          },
        ],
      },
      options: {
        devicePixelRatio: 1,
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }],
        },
      },
    });
  },
};
