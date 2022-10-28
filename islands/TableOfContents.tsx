import { useCallback, useState } from "preact/hooks";

import { AudioBook, Chapter, ElectronicBook } from "@apps/seed/models/media.ts";
import {
  SortOrder,
  TableColumnKey,
  TableHeaderData,
} from "@apps/table-of-contents/models.ts";
import {
  convertToTableRowData,
  sortData,
} from "@apps/table-of-contents/utils.ts";
import TableRows from "@apps/table-of-contents/components/TableRows.tsx";

import TableOfContentHeaderSorter from "./TableOfContentHeaderSorter.tsx";

interface Props {
  chapters: Chapter[];
  eBooks: ElectronicBook[];
  audioBooks: AudioBook[];
}

export default function TableOfContents(
  { chapters, eBooks, audioBooks }: Props,
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

  const headers: TableHeaderData[] = [
    // START: Web Novel
    {
      columnKey: "webNovelOrder",
      sortKey: "webNovelOrder",
      label: "#",
      classNames: "px-2 bg-[#2b2b2b] text-[#eeeeee]",
      isDark: true,
    },
    {
      columnKey: "webNovelRef",
      sortKey: "webNovelOrder",
      label: "Volume",
      classNames: "px-2 bg-[#2b2b2b] text-[#eeeeee]",
      isDark: true,
    },
    {
      columnKey: "webNovelTitle",
      sortKey: "webNovelTitle",
      label: "Chapter",
      classNames: "px-2 bg-[#2b2b2b] text-[#eeeeee] text-left",
      isDark: true,
    },
    {
      columnKey: "webNovelPublished",
      sortKey: "webNovelPublished",
      label: "Published",
      classNames: "px-2 bg-[#2b2b2b] text-[#eeeeee] text-center",
      isDark: true,
    },
    {
      columnKey: "webNovelTotalWords",
      sortKey: "webNovelTotalWords",
      label: "Word Count",
      classNames: "px-2 bg-[#2b2b2b] text-[#eeeeee]",
      isDark: true,
    },
    // END: Web Novel
    // START: Audiobooks
    {
      columnKey: "audioBookOrder",
      sortKey: "audioBookOrder",
      label: "#",
      classNames: "px-2 bg-[#febd69]",
    },
    {
      columnKey: "audioBookRef",
      sortKey: "audioBookOrder",
      label: "Book",
      colSpan: 2,
      classNames: "px-2 bg-[#febd69]",
    },
    {
      columnKey: "audioBookTitle",
      sortKey: "audioBookTitle",
      label: "Chapter",
      classNames: "px-2 bg-[#febd69] text-left",
    },
    {
      columnKey: "audioBookTotalSeconds",
      sortKey: "audioBookTotalSeconds",
      label: "Length",
      classNames: "px-2 bg-[#febd69]",
    },
    // END: Audiobooks
    // START: E-books
    {
      columnKey: "eBookOrder",
      sortKey: "eBookOrder",
      label: "#",
      classNames: "px-2 bg-[#a7f2ff] text-black",
    },
    {
      columnKey: "eBookRef",
      sortKey: "eBookOrder",
      label: "Book",
      classNames: "px-2 bg-[#a7f2ff] text-black",
      colSpan: 2,
    },
    {
      columnKey: "eBookTitle",
      sortKey: "eBookTitle",
      label: "Chapter",
      classNames: "px-2 bg-[#a7f2ff] text-black text-left",
    },
    // END: E-books
  ];

  return (
    <>
      <div class="overflow-auto max-h-[60vh] sm:max-h-[80vh] rounded-md border">
        <table class="table min-w-max w-full relative">
          <thead class="font-medium sticky top-0">
            <tr>
              <th colSpan={5} class="py-2 bg-[#0a0a0a] text-[#eeeeee]">
                Web Novel
              </th>
              <th colSpan={5} class="py-2 bg-[#f7991c] text-black">
                Audiobook
              </th>
              <th colSpan={4} class="py-2 bg-[#3686b2] text-white">
                E-book
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
                    <TableOfContentHeaderSorter
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
