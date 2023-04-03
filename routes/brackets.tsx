import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import {
  BasicChapterForBracketsList,
  BasicMediaForBracketsList,
} from "@apps/table-of-brackets/models.ts";

import { DEFAULT_SITE_NAME, DEFAULT_SITE_URL } from "../constants/site.ts";
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
  chapter: BasicChapterForBracketsList
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
      (item) => item
    );
    const webVolumeChapters = (resWebVolumeChapters[0].result ?? []).map(
      (item) => formatChapter(item)
    );
    const audioBookReleases = (resAudioBookReleases[0].result ?? []).map(
      (item) => item
    );
    const audioBookChapters = (resAudioBookChapters[0].result ?? []).map(
      (item) => formatChapter(item)
    );
    const electronicBookReleases = (
      resElectronicBookReleases[0].result ?? []
    ).map((item) => item);
    const electronicBookChapters = (
      resElectronicBookChapters[0].result ?? []
    ).map((item) => formatChapter(item));

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

  const pageTitle = `List of Bracket Contents | ${DEFAULT_SITE_NAME}`;
  const pageDescription =
    "A list of all [Bracket Words] and the chapters where they are mentioned.";
  const siteUrl = `${DEFAULT_SITE_URL}brackets`;

  return (
    <>
      <DocumentHead />

      <Head>
        <title>{pageTitle}</title>
        <meta property="description" content={pageDescription} />

        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={siteUrl} />
      </Head>

      <div class="min-h-screen justify-between flex flex-col">
        <div class="p-4 text-sm text-gray-900 mb-auto min-w-[98vw]">
          <SiteHeader />

          <div class="mb-3 max-w-[2000px] mx-auto">
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

            <div class="text-xs mt-3">
              <div>
                <span class="font-semibold">NOTE #1:</span> This list does not
                include unclosed values like{" "}
                <code class="bg-gray-100 p-1">[Fire—</code>
                {". "}
                However, as long as it has a closing bracket like{" "}
                <code class="bg-gray-100 p-1">[Ski—]</code>, it should be listed
                here.
              </div>
              <div>
                <span class="font-semibold">NOTE #2:</span> This list does not
                show how many times a{" "}
                <code class="bg-gray-100 p-1">[Bracket Content]</code> appears
                per chapter, just that it is mentioned at least once in that
                specific chapter.
              </div>
              <div>
                <span class="font-semibold">NOTE #3:</span> This list does not
                include the
                <code class="bg-gray-100 p-1">[Bracket Contents]</code>
                {"  "}
                from The Last Tide or The Singer of Terandria series.
              </div>
            </div>
          </div>
        </div>

        <div>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
