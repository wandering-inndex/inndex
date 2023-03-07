import { Head } from "$fresh/runtime.ts";

import { useEffect } from "preact/hooks";

import { GraphEdge, GraphNode } from "@apps/rewrite-mapping/models.ts";
import { formatWordCount } from "../apps/table-of-contents/utils.ts";

interface RewriteMappingProps {
  oldChapters: GraphNode[];
  newChapters: GraphNode[];
  edges: GraphEdge[];
}

export default function RewriteMapping({
  oldChapters,
  newChapters,
  edges,
}: RewriteMappingProps) {
  useEffect(() => {
    const script = document.createElement("script");
    const scriptText = document.createTextNode(`
function createLeaderLine (edge) {
  new LeaderLine(
    document.getElementById(edge.from),
    document.getElementById(edge.to),
    {
      dash: {
        animation: true
      },
      startPlugColor: '#9ca3af',
      endPlugColor: (edge.brandNew ?? false) === true ? '#ffda00' : '#1ca100',
      size: 3,
      gradient: true
    }
  );
}

var edges = ${JSON.stringify(edges)};
for (var i = 0; i < edges.length; i++) {
  createLeaderLine(edges[i]);
}
`);

    script.async = true;
    script.type = "text/javascript";
    script.appendChild(scriptText);

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/leader-line-new@1.1.9/leader-line.min.js">
        </script>
      </Head>

      <div class="grid grid-cols-2 gap-20">
        <div class="flex flex-col gap-0.5">
          {oldChapters.map((chapter) => {
            if ((chapter.blank ?? false) === true) {
              return (
                <>
                  <div
                    key={chapter.id}
                    id={chapter.id}
                    class="py-1 px-2 invisible"
                  >
                    &nbsp;
                  </div>
                </>
              );
            }

            return (
              <a
                key={chapter.id}
                id={chapter.id}
                href={chapter.url}
                title={`${formatWordCount(chapter.words)} words`}
                target="_blank"
                class="bg-gray-400 hover:bg-gray-500 py-1 px-2 flex gap-2 items-center"
              >
                <span class="text-xs">
                  {chapter.order < 10 ? 0 : null}
                  {chapter.order}
                </span>
                <span class="font-bold w-full truncate">
                  {chapter.title}
                </span>
              </a>
            );
          })}
        </div>

        <div class="flex flex-col gap-0.5">
          {newChapters.map((chapter) => {
            if ((chapter.blank ?? false) === true) {
              return (
                <>
                  <div
                    key={chapter.id}
                    id={chapter.id}
                    class="py-1 px-2 invisible"
                  >
                    &nbsp;
                  </div>
                </>
              );
            }

            return (
              <a
                key={chapter.id}
                id={chapter.id}
                href={chapter.url}
                title={`${formatWordCount(chapter.words)} words`}
                target="_blank"
                class={`py-1 px-2 flex gap-2 items-center ` +
                  ((chapter.brandNew ?? false) === true
                    ? "bg-[#ffda00] hover:bg-[#e3c200] text-black"
                    : "bg-[#1ca100] hover:bg-[#0d4c00] text-white")}
              >
                <span class="text-xs">
                  {chapter.order < 10 ? 0 : null}
                  {chapter.order}
                </span>
                <span class="font-bold w-full truncate">
                  {chapter.title}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
