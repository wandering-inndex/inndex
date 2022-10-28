import { TableRowData } from "@apps/table-of-contents/models.ts";
import {
  formatDate,
  formatSeconds,
  formatWordCount,
} from "@apps/table-of-contents/utils.ts";
import {
  AudioBook,
  ElectronicBook,
  ImageUrls,
} from "@apps/seed/models/media.ts";

const getRowImage = (
  { url, imageUrls, title }: {
    url: string;
    imageUrls: ImageUrls;
    title: string;
  },
) => {
  return (
    <>
      <a
        href={url}
        title={title}
      >
        <img
          class="h-10"
          src={imageUrls.thumbnail}
          alt={title}
        />
      </a>
    </>
  );
};

const getBookTitle = (
  { index, url, title }: {
    index: number;
    url: string;
    title: string;
  },
) => {
  const formattedTitle = `Book ${index}: ${title}`;
  return (
    <>
      <a
        href={url}
        title={formattedTitle}
      >
        {formattedTitle}
      </a>
    </>
  );
};

interface Props {
  rows: TableRowData[];
  audioBookMap: Map<number, AudioBook>;
  eBookMap: Map<number, ElectronicBook>;
}

export default function TableRows({ rows, audioBookMap, eBookMap }: Props) {
  return (
    <>
      {rows.map((row) => {
        const eBookIndex = row.eBookRef;
        const eBook = eBookIndex && eBookMap.has(eBookIndex)
          ? eBookMap.get(eBookIndex)
          : null;

        const audioBookIndex = row.audioBookRef;
        const audioBook = audioBookIndex && audioBookMap.has(audioBookIndex)
          ? audioBookMap.get(audioBookIndex)
          : null;

        return (
          <>
            <tr key={row.id} class="border-t h-10 hover:bg-gray-100">
              {/* START: Web */}
              <td class="px-2 text-center">
                {row.webNovelOrder}
              </td>
              <td class="px-2 text-center">
                {row.webNovelRef}
              </td>
              <td class="px-2">
                <a
                  href={row.webNovelUrl}
                  title={row.webNovelTitle || ""}
                  class="font-semibold text-[#1583af] hover:underline"
                >
                  {row.webNovelTitle}
                </a>
              </td>
              <td class="px-2 text-center">
                {formatDate(row.webNovelPublished)}
              </td>
              <td class="px-2 text-center">
                {formatWordCount(row.webNovelTotalWords ?? 0)}
              </td>
              {/* END: Web */}

              {/* START: Audiobooks */}
              <td class="px-2 text-center border-l">
                {row.audioBookOrder}
              </td>
              <td class="pl-2 text-center">
                {audioBook ? getRowImage(audioBook) : null}
              </td>
              <td class="px-2 py-1">
                {audioBook ? getBookTitle(audioBook) : null}
              </td>
              <td class="px-2">
                {row.audioBookTitle}
              </td>
              <td class="px-2 text-center">
                {formatSeconds(row.audioBookTotalSeconds)}
              </td>
              {/* END: Audiobooks */}

              {/* START: E-books */}
              <td class="px-2 text-center border-l">
                {row.eBookOrder}
              </td>
              <td class="pl-2 text-center">
                {eBook ? getRowImage(eBook) : null}
              </td>
              <td class="px-2 py-1">
                {eBook ? getBookTitle(eBook) : null}
              </td>
              <td class="px-2">
                {row.eBookTitle}
              </td>
              {/* END: E-books */}
            </tr>
          </>
        );
      })}
    </>
  );
}
