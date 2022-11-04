import { useCallback, useState } from "preact/hooks";

import {
  AudioBook,
  Chapter,
  ElectronicBook,
  WebVolume,
} from "@seed/types/media.ts";
import { SortOrder, TableColumnKey } from "@apps/table-of-contents/models.ts";
import { headers } from "@apps/table-of-contents/constants.ts";
import {
  convertToTableRowData,
  sortData,
} from "@apps/table-of-contents/utils.ts";
import TableRows from "@apps/table-of-contents/components/TableRows.tsx";

import ChatHelper from "./ChatHelper.tsx";
import TableHeaderSorter from "./TableHeaderSorter.tsx";

interface Props {
  chapters: Chapter[];
  webVolumes: WebVolume[];
  eBooks: ElectronicBook[];
  audioBooks: AudioBook[];
}

export default function TableOfContents(
  { chapters, eBooks, audioBooks, webVolumes }: Props,
) {
  const eBookMap = new Map<number, ElectronicBook>();
  const audioBookMap = new Map<number, AudioBook>();

  eBooks.forEach((item) => eBookMap.set(item.index, item));
  audioBooks.forEach((item) => audioBookMap.set(item.index, item));

  const [selectedColumn, setSelectedColumn] = useState<TableColumnKey>(
    "webNovelOrder",
  );
  const [sortKey, setSortKey] = useState<TableColumnKey>("webNovelOrder");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const data = chapters.map((chapter) => convertToTableRowData(chapter));

  const sortedData = useCallback(
    () => sortData({ data, sortKey, reverse: sortOrder === "desc" }),
    [data, sortKey, sortOrder],
  );

  const handleClickSorter = (
    columnKey: TableColumnKey,
    sortKey: TableColumnKey,
  ) => {
    setSelectedColumn(columnKey);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortKey(sortKey);
  };

  return (
    <>
      <div class="mb-3">
        <ChatHelper {...{ chapters, webVolumes, eBooks, audioBooks }} />
      </div>
      <div class="overflow-auto max-h-[60vh] sm:max-h-[70vh] rounded-md border">
        <table class="table min-w-max w-full relative">
          <thead class="font-medium sticky top-0">
            <tr>
              <th colSpan={5} class="py-2 bg-[#0a0a0a] text-[#eeeeee]">
                <a
                  href="https://wanderinginn.com/table-of-contents/"
                  target="_blank"
                  title="Check out all the chapters from the official website"
                >
                  Web Novel
                </a>
              </th>
              <th colSpan={5} class="py-2 bg-[#f7991c] text-black">
                <a
                  href="https://www.audible.com/series/The-Wandering-Inn-Audiobooks/B07X3TZ2YQ"
                  target="_blank"
                  title="Check out all the Audiobooks from the store"
                >
                  Audiobook
                </a>
              </th>
              <th colSpan={4} class="py-2 bg-[#3686b2] text-white">
                <a
                  href="https://www.amazon.com/dp/B099JFQ9YR"
                  target="_blank"
                  title="Check out all the E-books from the store"
                >
                  E-book
                </a>
              </th>
            </tr>
            <tr>
              {headers.map((item) => {
                return (
                  <th
                    scope="col"
                    class={item.classNames}
                    colSpan={item.colSpan}
                  >
                    <TableHeaderSorter
                      label={item.label}
                      columnKey={item.columnKey}
                      onClick={() =>
                        handleClickSorter(item.columnKey, item.sortKey)}
                      isDark={item.isDark ?? false}
                      {...{
                        sortOrder,
                        sortKey,
                        selectedColumn,
                      }}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <TableRows
              rows={sortedData()}
              audioBookMap={audioBookMap}
              eBookMap={eBookMap}
            />
          </tbody>
        </table>
      </div>
    </>
  );
}
