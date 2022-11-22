import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import {
  BasicChapterForBracketsList,
  BasicMediaForBracketsList,
} from "@apps/table-of-brackets/models.ts";

import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
} from "../constants/site.ts";
import DocumentHead from "../components/document/DocumentHead.tsx";
import SiteHeader from "../components/ui/SiteHeader.tsx";
import SiteFooter from "../components/ui/SiteFooter.tsx";

import TableOfBrackets from "../islands/TableOfBrackets.tsx";

import {
  getBasicAudioBookChapters,
  getBasicElectronicBookChapters,
  getBasicWebVolumeChapters,
} from "@apps/table-of-brackets/utils/fetcher/media/chapters.ts";
import { getBasicAudioBookReleases } from "@apps/table-of-brackets/utils/fetcher/media/audioBooks.ts";
import { getBasicElectronicBookReleases } from "@apps/table-of-brackets/utils/fetcher/media/electronicBooks.ts";
import { getBasicWebVolumeReleases } from "@apps/table-of-brackets/utils/fetcher/media/webVolumes.ts";

interface Props {
  webVolumeReleases: BasicMediaForBracketsList[];
  webVolumeChapters: BasicChapterForBracketsList[];
  audioBookReleases: BasicMediaForBracketsList[];
  audioBookChapters: BasicChapterForBracketsList[];
  electronicBookReleases: BasicMediaForBracketsList[];
  electronicBookChapters: BasicChapterForBracketsList[];
}

const formatChapter = (
  chapter: BasicChapterForBracketsList,
): BasicChapterForBracketsList => {
  const id = chapter.id ?? "";
  const title = chapter.title ?? "";
  const url = (chapter.url || "").split("#:~:text")[0];
  const order = chapter.order ?? 0;
  const ref = chapter.ref ?? 0;

  return { id, title, url, order, ref };
};

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    const [
      resWebVolumeReleases,
      resWebVolumeChapters,
      resAudioBookReleases,
      resAudioBookChapters,
      resElectronicBookReleases,
      resElectronicBookChapters,
    ] = await Promise.all([
      getBasicWebVolumeReleases(),
      getBasicWebVolumeChapters(),
      getBasicAudioBookReleases(),
      getBasicAudioBookChapters(),
      getBasicElectronicBookReleases(),
      getBasicElectronicBookChapters(),
    ]);

    const webVolumeReleases = (resWebVolumeReleases[0].result ?? []).map(
      (item) => item,
    );
    const webVolumeChapters = (resWebVolumeChapters[0].result ?? []).map(
      (item) => formatChapter(item),
    );
    const audioBookReleases = (resAudioBookReleases[0].result ?? []).map(
      (item) => item,
    );
    const audioBookChapters = (resAudioBookChapters[0].result ?? []).map(
      (item) => formatChapter(item),
    );
    const electronicBookReleases = (resElectronicBookReleases[0].result ?? [])
      .map((item) => item);
    const electronicBookChapters = (resElectronicBookChapters[0].result ?? [])
      .map((item) => formatChapter(item));

    const props: Props = {
      webVolumeReleases,
      webVolumeChapters,
      audioBookReleases,
      audioBookChapters,
      electronicBookReleases,
      electronicBookChapters,
    };

    return ctx.render(props);
  },
};

export default function Page({ data }: PageProps<Props>) {
  const {
    webVolumeReleases,
    webVolumeChapters,
    audioBookReleases,
    audioBookChapters,
    electronicBookReleases,
    electronicBookChapters,
  } = data;

  return (
    <>
      <DocumentHead />

      <Head>
        <title>List of Bracket Contents | {DEFAULT_SITE_NAME}</title>

        <meta
          property="description"
          content={DEFAULT_SITE_DESCRIPTION}
        />
      </Head>

      <div class="p-4 mx-auto text-sm text-gray-900">
        <SiteHeader />

        <div>
          <TableOfBrackets
            {...{
              webVolumeReleases,
              webVolumeChapters,
              audioBookReleases,
              audioBookChapters,
              electronicBookReleases,
              electronicBookChapters,
            }}
          />
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
