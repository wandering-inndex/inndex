import { useCallback, useState } from "preact/hooks";
import { JSX } from "preact";

import { AudioBook, Chapter, ElectronicBook } from "@apps/seed/models/media.ts";

import { SortKeys, SortOrder } from "@apps/table-of-contents/models.ts";
import {
  convertToTableRowData,
  sortData,
} from "@apps/table-of-contents/utils.ts";
import TableRows from "@apps/table-of-contents/components/TableRows.tsx";

function HeaderSorter({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
  label = "",
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  label: string;
  onClick: JSX.MouseEventHandler<HTMLSpanElement>;
}) {
  const selected = sortKey === columnKey;

  return (
    <div
      class="flex justify-between gap-2 group cursor-pointer"
      onClick={onClick}
    >
      {label}{" "}
      <div
        class={`transition invisible text-gray-500 group-hover:visible group-hover:text-gray-900 ${
          selected && sortOrder === "desc" ? "rotate-180" : ""
        } ${selected && "visible"}`}
      >
        ▲
      </div>
    </div>
  );
}

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

  const [sortKey, setSortKey] = useState<SortKeys>("webNovelOrder");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const data = chapters.map((chapter) => convertToTableRowData(chapter));

  const sortedData = useCallback(
    () => sortData({ data, sortKey, reverse: sortOrder === "desc" }),
    [data, sortKey, sortOrder],
  );

  const changeSort = (key: SortKeys) => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortKey(key);
  };

  const headers: {
    key: SortKeys;
    label: string;
    classNames: string;
    colSpan?: number;
  }[] = [
    // START: Web Novel
    {
      key: "webNovelOrder",
      label: "#",
      classNames: "px-2 bg-green-100",
    },
    {
      key: "webNovelRef",
      label: "Volume",
      classNames: "px-2 bg-green-100",
    },
    {
      key: "webNovelTitle",
      label: "Chapter",
      classNames: "px-2 bg-green-100 text-left",
    },
    {
      key: "webNovelPublished",
      label: "Published",
      classNames: "px-2 bg-green-100 text-center",
    },
    {
      key: "webNovelTotalWords",
      label: "Word Count",
      classNames: "px-2 bg-green-100",
    },
    // END: Web Novel
    // START: Audiobooks
    {
      key: "audioBookOrder",
      label: "#",
      classNames: "px-2 bg-purple-100 border-l",
    },
    {
      key: "audioBookRef",
      label: "Book",
      colSpan: 2,
      classNames: "px-2 bg-purple-100",
    },
    {
      key: "audioBookTitle",
      label: "Chapter",
      classNames: "px-2 bg-purple-100 text-left",
    },
    {
      key: "audioBookTotalSeconds",
      label: "Length",
      classNames: "px-2 bg-purple-100",
    },
    // END: Audiobooks
    // START: E-books
    {
      key: "eBookOrder",
      label: "#",
      classNames: "px-2 bg-blue-100 border-l",
    },
    {
      key: "eBookRef",
      label: "Book",
      classNames: "px-2 bg-blue-100",
      colSpan: 2,
    },
    {
      key: "eBookTitle",
      label: "Chapter",
      classNames: "px-2 bg-blue-100 text-left",
    },
    // END: E-books
  ];

  return (
    <>
      <div class="overflow-auto max-h-[60vh] sm:max-h-[80vh] rounded-md border">
        <table class="table min-w-max w-full relative">
          <thead class="font-medium sticky top-0">
            <tr>
              <th colSpan={5} class="py-2 bg-green-200">Web Novel</th>
              <th colSpan={5} class="py-2 bg-purple-200">Audiobook</th>
              <th colSpan={4} class="py-2 bg-blue-200">E-book</th>
            </tr>
            <tr>
              {headers.map((item) => {
                return (
                  <th
                    scope="col"
                    class={item.classNames}
                    colSpan={item.colSpan}
                  >
                    <HeaderSorter
                      label={item.label}
                      columnKey={item.key}
                      onClick={() => changeSort(item.key)}
                      {...{
                        sortOrder,
                        sortKey,
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
