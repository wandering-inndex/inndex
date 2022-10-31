import { TableRowData } from "@apps/table-of-contents/models.ts";
import {
  formatDate,
  formatSeconds,
  formatWordCount,
} from "@apps/table-of-contents/utils.ts";
import { AudioBook, ElectronicBook, ImageUrls } from "@seed/types/media.ts";
import { timeAgo } from "../../../utils/dateUtils.ts";

const getRowImage = (
  { storeTitle, storeUrl, imageUrls, title }: {
    storeTitle: string;
    storeUrl: string;
    imageUrls: ImageUrls;
    title: string;
  },
) => {
  return (
    <>
      <a
        href={storeUrl}
        title={storeTitle}
        target="_blank"
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
  { storeTitle, index, storeUrl, title }: {
    storeTitle: string;
    index: number;
    storeUrl: string;
    title: string;
  },
) => {
  const formattedTitle = `Book ${index}: ${title}`;
  return (
    <>
      <a
        href={storeUrl}
        title={storeTitle}
        target="_blank"
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
                  target="_blank"
                  class="font-semibold text-[#1583af] hover:underline"
                >
                  {row.webNovelTitle}
                </a>
              </td>
              <td
                class="px-2 text-center"
                title={timeAgo(row.webNovelPublished)}
              >
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
