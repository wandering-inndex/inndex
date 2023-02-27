import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import type { ComponentChildren } from "preact";

import { AllMedia, DEFAULT_ALL_MEDIA } from "@apps/seed/models/media.ts";
import { formatWordCount } from "@apps/table-of-contents/utils.ts";
import { MediaTypes } from "@apps/table-of-contents/models.ts";

import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
} from "../constants/site.ts";
import DocumentHead from "../components/document/DocumentHead.tsx";
import SiteHeader from "../components/ui/SiteHeader.tsx";
import SiteFooter from "../components/ui/SiteFooter.tsx";
import TableOfContents from "../islands/TableOfContents.tsx";

import { handler as allMediaHandler } from "./api/media/index.ts";

export const handler: Handlers<AllMedia | null> = {
  async GET(req, ctx) {
    const res = await allMediaHandler(req, ctx);
    const data: AllMedia = await res.json();
    return ctx.render(data);
  },
};

interface StatsContainerProps {
  title: string;
  link: string;
  children: ComponentChildren;
  mediaType: MediaTypes;
}

function StatsContainer(
  { title, link, mediaType, children }: StatsContainerProps,
) {
  return (
    <>
      <div
        class={`text-center p-3 md:p-5 text-xl ${
          mediaType === MediaTypes.WEBNOVEL ? "bg-[#0a0a0a] text-[#eeeeee]" : ""
        } ${
          mediaType === MediaTypes.AUDIOBOOK ? "bg-[#f7991c] text-black" : ""
        } ${mediaType === MediaTypes.EBOOK ? "bg-[#3686b2] text-white" : ""}`}
      >
        <h3 class="uppercase font-semibold text-2xl">
          <a href={link} target="_blank">{title}</a>
        </h3>
        <div>
          {children}
        </div>
      </div>
    </>
  );
}

interface StatsEntryProps {
  value: number | string;
  units: string;
  notes?: string;
}

function StatsEntry({ value, units, notes }: StatsEntryProps) {
  const hasNotes = (notes ?? "") !== "";
  return (
    <>
      <div class="">
        <div>
          <span class="font-bold text-lg">
            {value}
          </span>{" "}
          <span>
            {units}
            {hasNotes && "*"}
          </span>
        </div>
        {hasNotes && <div class="text-sm italic">*{notes}</div>}
      </div>
    </>
  );
}

export default function Page({ data }: PageProps<AllMedia | null>) {
  if (data === null) {
    data = DEFAULT_ALL_MEDIA;
  }

  const { chapters, eBooks, audioBooks, webVolumes } = data;

  const webNovelChapters = chapters.filter((chapter) => {
    return (chapter.partOf.webNovel?.ref ?? 0) > 0;
  });
  const webNovelTotalWords = webNovelChapters.map(
    (chapter) => chapter.partOf.webNovel?.totalWords ?? 0,
  ).reduce((a, b) => a + b, 0);
  const audioBookTotalHours =
    audioBooks.map((audioBook) => audioBook.totalLength ?? 0.00)
      .reduce((a, b) => a + b, 0.00) / 60.00;
  const eBookTotalPages = eBooks.map((eBook) => eBook.totalLength ?? 0)
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <DocumentHead />

      <Head>
        <title>Table of Contents | {DEFAULT_SITE_NAME}</title>

        <meta
          property="description"
          content={DEFAULT_SITE_DESCRIPTION}
        />
      </Head>

      <div class="min-h-screen justify-between flex flex-col">
        <div class="p-4 text-sm text-gray-900 mb-auto min-w-[98vw]">
          <SiteHeader />

          <div class="max-w-[2000px] mx-auto">
            <TableOfContents
              {...{ chapters, webVolumes, eBooks, audioBooks }}
            />
            <div class="text-xs mt-3">
              <div>
                <span class="font-semibold">NOTE #1:</span>{" "}
                The total words are calculated using{" "}
                <a
                  href="https://wordcounter.net/"
                  class="font-semibold"
                  target="_blank"
                >
                  WordCounter
                </a>
                {". "}
                The chapter title, announcements, author's notes, list of fan
                works, and other sections are not included in the final count.
                The total words might change as the author edits the chapters.
                Since this list is manually updated, the latest data might not
                be reflected.
              </div>
              <div>
                <span class="font-semibold">NOTE #2:</span>{" "}
                To check the list of diffs over time, you can head over to{" "}
                <a
                  href="https://wanderinginn.neocities.org"
                  class="font-semibold"
                  target="_blank"
                >
                  wanderinginn.neocities.org
                </a>. They also have an automatically updated{"  "}
                <a
                  href="https://wanderinginn.neocities.org/statistics.html"
                  class="font-semibold"
                  target="_blank"
                >
                  statistics page
                </a>{" "}
                that contains the total words per chapter without the author's
                notes being removed.
              </div>
            </div>
          </div>

          <div class="max-w-[2000px] mx-auto mt-10">
            <h2
              id="stats"
              class="uppercase text-center text-xl font-bold text-gray-800 mb-5"
            >
              Some statistics
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-3 justify-center mb-5">
              <StatsContainer
                title="Web Novel"
                link="https://wanderinginn.com/table-of-contents/"
                mediaType={MediaTypes.WEBNOVEL}
              >
                <StatsEntry value={webVolumes.length} units="volumes" />
                <StatsEntry
                  value={webNovelChapters.length}
                  units="chapters"
                />
                <StatsEntry
                  value={formatWordCount(
                    webNovelTotalWords,
                  )}
                  units="words"
                />
              </StatsContainer>

              <StatsContainer
                title="Audiobook"
                link="https://www.audible.com/series/The-Wandering-Inn-Audiobooks/B07X3TZ2YQ"
                mediaType={MediaTypes.AUDIOBOOK}
              >
                <StatsEntry value={audioBooks.length} units="releases" />
                <StatsEntry
                  value={audioBookTotalHours}
                  units="hours"
                  notes="based on Audible product pages"
                />
              </StatsContainer>

              <StatsContainer
                title="E-book"
                link="https://www.amazon.com/dp/B099JFQ9YR"
                mediaType={MediaTypes.EBOOK}
              >
                <StatsEntry value={eBooks.length} units="releases" />
                <StatsEntry
                  value={formatWordCount(
                    eBookTotalPages,
                  )}
                  units="pages"
                  notes="based on Amazon product pages"
                />
              </StatsContainer>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 justify-center">
              <div>
                <div class="font-semibold text-center">
                  Total Words from the Web Novel Volumes
                </div>
                <img
                  src="/charts/media/word-count?collectionType=WEBNOVEL"
                  class="mx-auto max-h-[60vh]"
                  alt="Total Words from the Web Novel Volumes"
                />
              </div>
              <div>
                <div class="font-semibold text-center">
                  Total Words from the Audiobook/E-book Releases
                </div>
                <img
                  src="/charts/media/word-count?collectionType=AUDIOBOOK"
                  class="mx-auto max-h-[60vh]"
                  alt="Total Words from the Audiobook/E-book Releases"
                />
                <div class="text-xs max-w-[80%] mx-auto mt-3">
                  <div>
                    <span class="font-semibold">NOTE #1:</span>{" "}
                    This uses the word counts from their Web Novel counterparts.
                  </div>
                  <div>
                    <span class="font-semibold">NOTE #2:</span>{" "}
                    This uses the Chapter Types from the Web Novel Volumes, as
                    some chapters do not have the same type across releases
                    (e.g.{" "}
                    <a href="#twiwnch0023011" class="font-semibold">
                      Volume 1 Interlude – 1.00 R
                    </a>{" "}
                    or{" "}
                    <a href="#twiwnch0138011" class="font-semibold">
                      Volume 3 Chapter 3.13
                    </a>).
                  </div>
                </div>
              </div>
              <div>
                <div class="font-semibold text-center">
                  Total Words from the Web Novel Volumes compared to the
                  Audiobook/E-book Releases
                </div>
                <img
                  src="/charts/media/words-covered"
                  class="mx-auto max-h-[60vh]"
                  alt="Total Words from the Web Novel Volumes compared to the Audiobook/E-book Releases"
                />
              </div>
              <div>
                <div class="font-semibold text-center">
                  Total Words per Web Novel Publication Year
                </div>
                <img
                  src="/charts/media/words-per-year"
                  class="mx-auto max-h-[60vh]"
                  alt="Total Words per Year"
                />
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
