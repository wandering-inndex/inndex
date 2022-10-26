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

  const formatSeconds = (seconds: number | null): string => {
    if (seconds === null) return "";

    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);

    const atoms: string[] = [];
    [h, m, s].forEach((atom) => {
      atoms.push(`${atom}`.padStart(2, "0"));
    });

    return atoms.join(":");
  };

  return (
    <>
      <DocumentHead />

      <div class="p-4 mx-auto text-sm text-gray-900">
        <nav class="w-full mb-3">
          <span class="font-medium">The Wandering Inndex</span>
        </nav>

        <div class="overflow-auto max-h-[90vh]">
          <table class="table min-w-max w-full relative">
            <thead class="font-medium sticky top-0">
              <tr class="min-h-[1.25rem]">
                <th colSpan={5} class="bg-gray-200">Web</th>
                <th colSpan={5} class="bg-purple-200">Audiobooks</th>
                <th colSpan={4} class="bg-blue-200">E-books</th>
              </tr>
              <tr>
                {/* START: Web */}
                <th scope="col" class="bg-gray-100">
                  Volume
                </th>
                <th scope="col" class="bg-gray-100 px-4">#</th>
                <th scope="col" class="bg-gray-100 text-left">
                  Chapter
                </th>
                <th scope="col" class="bg-gray-100">
                  Published
                </th>
                <th scope="col" class="bg-gray-100">
                  Word Count
                </th>
                {/* END: Web */}

                {/* START: Audiobooks */}
                <th
                  scope="col"
                  class="bg-purple-100 border-l"
                  colSpan={2}
                >
                  Book
                </th>
                <th scope="col" class="bg-purple-100 px-4">#</th>
                <th scope="col" class="bg-purple-100 text-left">
                  Chapter
                </th>
                <th scope="col" class="bg-purple-100">
                  Length
                </th>
                {/* END: Audiobooks */}

                {/* START: E-books */}
                <th
                  scope="col"
                  class="bg-blue-100 border-l"
                  colSpan={2}
                >
                  Book
                </th>
                <th scope="col" class="bg-blue-100 px-4">#</th>
                <th scope="col" class="bg-blue-100 text-left">
                  Chapter
                </th>
                {/* END: E-books */}
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
                    {/* START: Web */}
                    <td class="text-center">
                      {chapter.partOf.webVolume.ref}
                    </td>
                    <td class="text-center">
                      {chapter.partOf.webVolume.order}
                    </td>
                    <td>
                      {chapter.partOf.webVolume.title}
                    </td>
                    <td>
                      {chapter.published}
                    </td>
                    <td class="text-center">
                      {chapter.partOf.webVolume.totalWords}
                    </td>
                    {/* END: Web */}

                    {/* START: Audiobooks */}
                    <td class="text-center px-1 border-l">
                      {audioBook ? getRowImage(audioBook) : null}
                    </td>
                    <td class="py-1">
                      {audioBook ? getRowTitle(audioBook) : null}
                    </td>
                    <td class="text-center">
                      {chapter.partOf.audioBook.order}
                    </td>
                    <td>
                      {chapter.partOf.audioBook.title}
                    </td>
                    <td class="text-center">
                      {formatSeconds(chapter.partOf.audioBook.totalSeconds)}
                    </td>
                    {/* END: Audiobooks */}

                    {/* START: E-books */}
                    <td class="text-center px-1 border-l">
                      {eBook ? getRowImage(eBook) : null}
                    </td>
                    <td class="py-1">
                      {eBook ? getRowTitle(eBook) : null}
                    </td>
                    <td class="text-center">
                      {chapter.partOf.eBook.order}
                    </td>
                    <td>
                      {chapter.partOf.eBook.title}
                    </td>
                    {/* END: E-books */}
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
