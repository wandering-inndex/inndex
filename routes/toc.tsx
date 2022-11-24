import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import { AllMedia, DEFAULT_ALL_MEDIA } from "@apps/seed/models/media.ts";
import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
} from "../constants/site.ts";
import DocumentHead from "../components/document/DocumentHead.tsx";
import SiteHeader from "../components/ui/SiteHeader.tsx";
import SiteFooter from "../components/ui/SiteFooter.tsx";

import { handler as allMediaHandler } from "./api/media/index.ts";
import TableOfContents from "../islands/TableOfContents.tsx";

export const handler: Handlers<AllMedia | null> = {
  async GET(req, ctx) {
    const res = await allMediaHandler(req, ctx);
    const data: AllMedia = await res.json();
    return ctx.render(data);
  },
};

export default function Page({ data }: PageProps<AllMedia | null>) {
  if (data === null) {
    data = DEFAULT_ALL_MEDIA;
  }

  const { chapters, eBooks, audioBooks, webVolumes } = data;

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
          </div>

          <div class="mt-10">
            <h2
              id="statistics"
              class="uppercase text-center text-xl font-bold text-gray-800 mb-5"
            >
              Some statistics
            </h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center">
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
                <div class="text-xs text-center max-w-[80%] mx-auto mt-3">
                  <span class="font-semibold">NOTE #1:</span>{" "}
                  This uses the Chapter Types from the Web Novel Volumes, as
                  some chapters do not have the same type across releases (e.g.
                  {" "}
                  <a href="#twiwnch0023011" class="font-semibold">
                    Volume 1 Interlude – 1.00 R
                  </a>{" "}
                  or{" "}
                  <a href="#twiwnch0138011" class="font-semibold">
                    Volume 3 Chapter 3.13
                  </a>).
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
