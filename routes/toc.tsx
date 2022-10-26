import { Handlers, PageProps } from "$fresh/server.ts";

import { handler as allMediaHandler } from "./api/media/index.ts";

import DocumentHead from "@components/document/DocumentHead.tsx";
import {
  AllMedia,
  AudioBook,
  DEFAULT_ALL_MEDIA,
  ElectronicBook,
} from "@models/seed/media.ts";

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

  const { chapters, eBooks, audioBooks } = data;
  const eBookMap = new Map<number, ElectronicBook>();
  const audioBookMap = new Map<number, AudioBook>();

  eBooks.forEach((item) => eBookMap.set(item.index, item));
  audioBooks.forEach((item) => audioBookMap.set(item.index, item));

  const getRowImage = (
    config: { url: string; imageUrl: string; title: string },
  ) => {
    return (
      <>
        <a
          href={config.url}
          title={config.title}
        >
          <img
            class="h-10"
            src={config.imageUrl}
            alt={config.title}
          />
        </a>
      </>
    );
  };

  const getRowTitle = (
    config: { url: string; title: string },
  ) => {
    return (
      <>
        <a
          href={config.url}
          title={config.title}
        >
          {config.title}
        </a>
      </>
    );
  };

  return (
    <>
      <DocumentHead />

      <div class="p-4 mx-auto text-sm text-gray-900">
        <nav class="w-full mb-3">
          <span class="font-medium">The Wandering Inndex</span>
        </nav>

        <div class="overflow-scroll max-h-[90vh]">
          <table class="table min-w-max w-full">
            <thead class="font-medium border-b mb-3">
              <tr>
                <th colSpan={1}></th>
                <th colSpan={3} class="bg-gray-100">Web</th>
                <th colSpan={4} class="bg-gray-100">E-book</th>
                <th colSpan={4} class="bg-gray-100">Audiobook</th>
              </tr>
              <tr>
                <th scope="col" class="px-1">Published</th>
                <th scope="col" class="border-l px-1">Volume</th>
                <th scope="col" class="px-1 text-left">Title</th>
                <th scope="col" class="px-1">#</th>
                <th scope="col" class="border-l" colSpan={2}>Book</th>
                <th scope="col" class="px-1 text-left">Title</th>
                <th scope="col" class="px-1">#</th>
                <th scope="col" class="border-l" colSpan={2}>Book</th>
                <th scope="col" class="px-1 text-left">Title</th>
                <th scope="col" class="px-1">#</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter) => {
                const eBookIndex = chapter.partOf.eBook.ref;
                const eBook = eBookIndex && eBookMap.has(eBookIndex)
                  ? eBookMap.get(eBookIndex)
                  : null;

                const audioBookIndex = chapter.partOf.audioBook.ref;
                const audioBook =
                  audioBookIndex && audioBookMap.has(audioBookIndex)
                    ? audioBookMap.get(audioBookIndex)
                    : null;

                return (
                  <tr class="border-b">
                    <td>
                      {chapter.published}
                    </td>
                    <td class="border-l text-center">
                      {chapter.partOf.webVolume.ref}
                    </td>
                    <td>
                      {chapter.partOf.webVolume.title}
                    </td>
                    <td class="text-center">
                      {chapter.partOf.webVolume.order}
                    </td>
                    <td class="text-center px-1 border-l">
                      {eBook ? getRowImage(eBook) : null}
                    </td>
                    <td class="py-1">
                      {eBook ? getRowTitle(eBook) : null}
                    </td>
                    <td>
                      {chapter.partOf.eBook.title}
                    </td>
                    <td class="text-center">
                      {chapter.partOf.eBook.order}
                    </td>
                    <td class="text-center px-1 border-l">
                      {audioBook ? getRowImage(audioBook) : null}
                    </td>
                    <td class="py-1">
                      {audioBook ? getRowTitle(audioBook) : null}
                    </td>
                    <td>
                      {chapter.partOf.audioBook.title}
                    </td>
                    <td class="text-center">
                      {chapter.partOf.audioBook.order}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
