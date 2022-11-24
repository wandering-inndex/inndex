import { type Handlers } from "$fresh/server.ts";
import { renderChart } from "$fresh_charts/mod.ts";
import { ChartColors } from "$fresh_charts/utils.ts";

import Surreal, { Result } from "surrealdb/mod.ts";

import { qChapters } from "@apps/table-of-contents/queries/chapters.ts";

import {
  AudioBook,
  Chapter,
  ElectronicBook,
  WebVolume,
} from "@seed/types/media.ts";

import {
  ChaptersGroupTypeCount,
  ChaptersGroupWordCount,
  MediaTypes,
} from "@apps/table-of-contents/models.ts";
import { formatWordCount } from "../../../apps/table-of-contents/utils.ts";

interface CollectionWithTitle {
  title: string;
}

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const mediaType = url.searchParams.get("collectionType") ||
      MediaTypes.WEBNOVEL;

    let collections: CollectionWithTitle[] = [];
    if (mediaType === MediaTypes.WEBNOVEL) {
      const resCollection = await Surreal.Instance.select<WebVolume>("volume");
      collections = resCollection.map((item) => {
        return { title: item.title };
      });
    } else if (mediaType === MediaTypes.AUDIOBOOK) {
      const resCollection = await Surreal.Instance.select<AudioBook>(
        "audiobook",
      );
      collections = resCollection.map((item) => {
        return { title: item.title };
      });
    } else if (mediaType === MediaTypes.EBOOK) {
      const resCollection = await Surreal.Instance.select<ElectronicBook>(
        "ebook",
      );
      collections = resCollection.map((item) => {
        return { title: item.title };
      });
    }

    const resChapters = await Surreal.Instance.query<Result<Chapter[]>[]>(
      qChapters,
      { onlyRewrite: false },
    );
    const chapters: Chapter[] = resChapters[0].result ?? [];

    const collectionWordCount: ChaptersGroupWordCount = {
      REGULAR: Array(collections.length).fill(0),
      LETTERED: Array(collections.length).fill(0),
      INTERLUDE: Array(collections.length).fill(0),
      SIDE_STORY: Array(collections.length).fill(0),
      MINI_STORY: Array(collections.length).fill(0),
      OTHER: Array(collections.length).fill(0),
    };
    const collectionChapterTypeCount: ChaptersGroupTypeCount = {
      REGULAR: 0,
      LETTERED: 0,
      INTERLUDE: 0,
      SIDE_STORY: 0,
      MINI_STORY: 0,
      OTHER: 0,
    };

    chapters.filter((chapter) => chapter.meta.show).filter((chapter) => {
      if (mediaType === MediaTypes.WEBNOVEL) {
        const ref = chapter.partOf.webNovel?.ref ?? 0;
        return ref !== 0;
      } else if (mediaType === MediaTypes.AUDIOBOOK) {
        const ref = chapter.partOf.audioBook?.ref ?? 0;
        return ref !== 0;
      } else if (mediaType === MediaTypes.EBOOK) {
        const ref = chapter.partOf.eBook?.ref ?? 0;
        return ref !== 0;
      }

      return true;
    }).forEach((chapter) => {
      const chapterType = chapter.meta.chapterType;

      const currentChapterTypeCount = collectionChapterTypeCount[chapterType];
      collectionChapterTypeCount[chapterType] = currentChapterTypeCount + 1;

      if (mediaType === MediaTypes.WEBNOVEL) {
        const webNovelRef = chapter.partOf.webNovel?.ref ?? 0;
        if (webNovelRef !== 0) {
          const currentWordCount =
            collectionWordCount[chapterType][webNovelRef - 1] ?? 0;
          const thisChapterWordCount = chapter.partOf.webNovel?.totalWords ?? 0;
          collectionWordCount[chapterType][webNovelRef - 1] = currentWordCount +
            thisChapterWordCount;
        }
      } else if (mediaType === MediaTypes.AUDIOBOOK) {
        const audioBookRef = chapter.partOf.audioBook?.ref ?? 0;
        if (audioBookRef !== 0) {
          const currentWordCount =
            collectionWordCount[chapterType][audioBookRef - 1] ?? 0;
          // Using the Total Words from the Web Novel here.
          const thisChapterWordCount = chapter.partOf.webNovel?.totalWords ?? 0;
          collectionWordCount[chapterType][audioBookRef - 1] =
            currentWordCount +
            thisChapterWordCount;
        }
      } else if (mediaType === MediaTypes.EBOOK) {
        const electronicBookRef = chapter.partOf.eBook?.ref ?? 0;
        if (electronicBookRef !== 0) {
          const currentWordCount =
            collectionWordCount[chapterType][electronicBookRef - 1] ?? 0;
          // Using the Total Words from the Web Novel here.
          const thisChapterWordCount = chapter.partOf.webNovel?.totalWords ?? 0;
          collectionWordCount[chapterType][electronicBookRef - 1] =
            currentWordCount +
            thisChapterWordCount;
        }
      }
    });

    return renderChart({
      type: "bar",
      data: {
        labels: collections.map((col, index) => {
          const wordCount = collectionWordCount.REGULAR[index] +
            collectionWordCount.LETTERED[index] +
            collectionWordCount.INTERLUDE[index] +
            collectionWordCount.SIDE_STORY[index] +
            collectionWordCount.MINI_STORY[index] +
            collectionWordCount.OTHER[index];
          return [col.title, `${formatWordCount(wordCount)} words`];
        }),
        datasets: [
          {
            label: `Regular Chapters (${collectionChapterTypeCount.REGULAR})`,
            data: collectionWordCount.REGULAR,
            backgroundColor: ChartColors.Red,
            showLine: true,
          },
          {
            label: `Lettered Chapters (${collectionChapterTypeCount.LETTERED})`,
            data: collectionWordCount.LETTERED,
            backgroundColor: ChartColors.Orange,
          },
          {
            label: `Interludes (${collectionChapterTypeCount.INTERLUDE})`,
            data: collectionWordCount.INTERLUDE,
            backgroundColor: ChartColors.Yellow,
          },
          {
            label: `Side Stories (${collectionChapterTypeCount.SIDE_STORY})`,
            data: collectionWordCount.SIDE_STORY,
            backgroundColor: ChartColors.Green,
          },
          {
            label: `Mini Stories (${collectionChapterTypeCount.MINI_STORY})`,
            data: collectionWordCount.MINI_STORY,
            backgroundColor: ChartColors.Blue,
          },
          {
            label: `Others (${collectionChapterTypeCount.OTHER})`,
            data: collectionWordCount.OTHER,
            backgroundColor: ChartColors.Purple,
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
