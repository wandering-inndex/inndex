import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import { Chapter } from "@seed/types/media.ts";
import {
  BasicWebChapter,
  BracketContentWithChapters,
} from "@apps/table-of-brackets/models.ts";

import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
} from "../constants/site.ts";
import DocumentHead from "../components/document/DocumentHead.tsx";
import SiteHeader from "../components/ui/SiteHeader.tsx";
import SiteFooter from "../components/ui/SiteFooter.tsx";

import { handler as handlerChapters } from "./api/media/chapters.ts";
import { handler as handlerBracketContentWithChapters } from "./api/brackets/with-chapters.ts";
import TableOfBrackets from "../islands/TableOfBrackets.tsx";

interface Props {
  chapters: BasicWebChapter[];
  withChapters: BracketContentWithChapters[];
}

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    const resChapters = await handlerChapters(req, ctx);
    const listChapters: Chapter[] = await resChapters.json();
    const chapters: BasicWebChapter[] = listChapters.map((chapter) => {
      return {
        id: chapter.id.replace("chapter:", ""),
        title: chapter.partOf.webNovel.title ?? "",
        url: chapter.partOf.webNovel.url ?? "",
      };
    });

    const resWithChapters = await handlerBracketContentWithChapters(req, ctx);
    const withChapters: BracketContentWithChapters[] = await resWithChapters
      .json();

    const props: Props = { chapters, withChapters };

    return ctx.render(props);
  },
};

export default function Page({ data }: PageProps<Props>) {
  const { chapters, withChapters } = data;

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
          <TableOfBrackets {...{ chapters, withChapters }} />
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
