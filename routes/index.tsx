import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import {
  AllMedia,
  AudioBook,
  DEFAULT_ALL_MEDIA,
  ElectronicBook,
} from "@models/seed/media.ts";

export const handler: Handlers<AllMedia | null> = {
  async GET(_, ctx) {
    const res = await fetch(`http://localhost:8000/api/media`);
    const data: AllMedia = await res.json();
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<AllMedia | null>) {
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
            class="object-scale-down h-10"
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
      <Head>
        <meta charSet="UTF-8" />

        <title>The Wandering Inndex</title>

        <meta
          property="description"
          content="A fan-made index for The Wandering Inn by pirateaba."
        />
        <meta
          property="keywords"
          content="the wandering inn, encyclopedia, timeline, graph"
        />
        <meta property="author" content="The Wandering Inndex contributors" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <div class="p-4 mx-auto">
        <nav class="w-full">
          <span class="font-medium">The Wandering Inndex</span>
        </nav>

        <table class="table table-auto whitespace-nowrap text-sm text-gray-900">
          <thead class="font-medium">
            <tr>
              <th colSpan={2}></th>
              <th colSpan={2}>Web Volume</th>
              <th colSpan={3}>E-book</th>
              <th colSpan={3}>Audiobook</th>
            </tr>
            <tr>
              <th scope="col">Published</th>
              <th scope="col">Title</th>
              <th scope="col">Included In</th>
              <th scope="col">Order</th>
              <th scope="col" colSpan={2}>Included In</th>
              <th scope="col">Order</th>
              <th scope="col" colSpan={2}>Included In</th>
              <th scope="col">Order</th>
            </tr>
          </thead>
          <tbody>
            {chapters.map((chapter) => {
              const eBookIndex = chapter.partOf.eBook;
              const eBook = eBookIndex && eBookMap.has(eBookIndex)
                ? eBookMap.get(eBookIndex)
                : null;

              const audioBookIndex = chapter.partOf.audioBook;
              const audioBook =
                audioBookIndex && audioBookMap.has(audioBookIndex)
                  ? audioBookMap.get(audioBookIndex)
                  : null;

              return (
                <tr class="border-b">
                  <td class="px-6 py-1">
                    {chapter.published}
                  </td>
                  <td class="px-6 py-1">
                    <a href={chapter.url}>{chapter.title}</a>
                  </td>
                  <td class="px-6 py-1">
                    Volume {chapter.partOf.webVolume}
                  </td>
                  <td class="px-6 py-1">
                    {chapter.order.webVolume}
                  </td>
                  <td class="pl-6 py-1">
                    {eBook ? getRowImage(eBook) : null}
                  </td>
                  <td class="pl-2 pr-6 py-1">
                    {eBook ? getRowTitle(eBook) : null}
                  </td>
                  <td class="px-6 py-1">
                    {chapter.order.eBook}
                  </td>
                  <td class="pl-6 py-1">
                    {audioBook ? getRowImage(audioBook) : null}
                  </td>
                  <td class="pl-2 pr-6 py-1">
                    {audioBook ? getRowTitle(audioBook) : null}
                  </td>
                  <td class="px-6 py-1">
                    {chapter.order.audioBook}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          <input
            type="range"
            list="volumeMarkers"
            value="614"
            min="0"
            max="614"
            class="w-full bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
          />
          <datalist id="volumeMarkers">
            <option value="0" />
            <option value="66" />
            <option value="123" />
            <option value="175" />
            <option value="238" />
            <option value="310" />
            <option value="387" />
            <option value="482" />
            <option value="587" />
          </datalist>
        </div>
      </div>
    </>
  );
}
