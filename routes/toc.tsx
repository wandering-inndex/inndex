import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
} from "../constants/site.ts";
import DocumentHead from "../components/document/DocumentHead.tsx";
import SiteHeader from "../components/ui/SiteHeader.tsx";
import SiteFooter from "../components/ui/SiteFooter.tsx";
import { AllMedia, DEFAULT_ALL_MEDIA } from "@apps/seed/models/media.ts";

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
        <title>{DEFAULT_SITE_NAME} | Table of Contents</title>

        <meta
          property="description"
          content={DEFAULT_SITE_DESCRIPTION}
        />
      </Head>

      <div class="p-4 mx-auto text-sm text-gray-900">
        <SiteHeader />

        <div>
          <TableOfContents
            {...{ chapters, webVolumes, eBooks, audioBooks }}
          />
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
