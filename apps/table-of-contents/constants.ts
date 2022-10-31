import { TableHeaderData } from "./models.ts";

/** The headers of the table of contents. */
export const headers: TableHeaderData[] = [
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
