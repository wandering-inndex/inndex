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

    const startYear = 2016;
    const yearsOngoing = new Date().getFullYear() - startYear + 1;
    const allYears = [];
    const mapWordsPerYear: Map<number, number> = new Map();
    const mapChaptersPerYear: Map<number, number> = new Map();
    for (let year = startYear; year < startYear + yearsOngoing; year++) {
      allYears.push(year);
      mapWordsPerYear.set(year, 0);
      mapChaptersPerYear.set(year, 0);
    }

    chapters.filter((chapter) => chapter.meta.show).forEach((chapter) => {
      const publishedYearStr = chapter.partOf.webNovel?.published ?? "";
      if (publishedYearStr === "") return;

      const totalWords = chapter.partOf.webNovel?.totalWords ?? 0;
      const publishedYear = new Date(publishedYearStr).getFullYear() ?? 0;

      const currentWordCount = mapWordsPerYear.get(publishedYear) ?? 0;
      mapWordsPerYear.set(publishedYear, currentWordCount + totalWords);

      const currentChapterCount = mapChaptersPerYear.get(publishedYear) ?? 0;
      mapChaptersPerYear.set(publishedYear, currentChapterCount + 1);
    });

    return renderChart({
      type: "bar",
      width: 900,
      data: {
        labels: allYears.map((year) => {
          const chaptersPerYear = mapChaptersPerYear.get(year) ?? 0;
          const wordsPerYear = mapWordsPerYear.get(year) ?? 0;
          let averageWordsPerChapter = 0;
          if (chaptersPerYear > 0) {
            averageWordsPerChapter = wordsPerYear / chaptersPerYear;
          }
          averageWordsPerChapter = Math.round(averageWordsPerChapter);

          return [
            `${year}`,
            `${chaptersPerYear} chapters`,
            `${formatWordCount(wordsPerYear)} words`,
            `~${formatWordCount(averageWordsPerChapter)} WPC`,
          ];
        }),
        datasets: [
          {
            label: `Words`,
            data: allYears.map((year) => mapWordsPerYear.get(year) ?? 0),
            backgroundColor: ChartColors.Red,
          },
        ],
      },
      options: {
        devicePixelRatio: 1,
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      },
    });
  },
};
