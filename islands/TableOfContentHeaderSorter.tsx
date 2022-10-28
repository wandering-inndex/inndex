import { JSX } from "preact";

import { SortOrder, TableColumnKey } from "@apps/table-of-contents/models.ts";

interface Props {
  columnKey: TableColumnKey;
  sortKey: TableColumnKey;
  sortOrder: SortOrder;
  selectedColumn: TableColumnKey;
  label: string;
  isDark: boolean;
  onClick: JSX.MouseEventHandler<HTMLSpanElement>;
}

export default function TableOfContentHeaderSorter({
  sortOrder,
  columnKey,
  selectedColumn,
  onClick,
  isDark,
  label = "",
}: Props) {
  const selected = selectedColumn === columnKey;

  return (
    <div
      class="flex justify-between gap-2 group cursor-pointer"
      onClick={onClick}
    >
      {label}{" "}
      <div
        class={`transition invisible group-hover:visible ${
          isDark
            ? "text-gray-50 group-hover:text-gray-100"
            : "text-gray-500 group-hover:text-gray-900"
        } ${selected && sortOrder === "desc" ? "rotate-180" : ""} ${
          selected && "visible"
        }`}
      >
        ▲
      </div>
    </div>
  );
}
