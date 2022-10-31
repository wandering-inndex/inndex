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

export default function TableOfContentsHeaderSorter({
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
            ? "text-gray-400 group-hover:text-gray-100"
            : "text-gray-500 group-hover:text-gray-900"
        } ${selected && sortOrder === "desc" ? "rotate-180" : ""} ${
          selected && "visible"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
