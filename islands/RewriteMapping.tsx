import { asset, Head } from "$fresh/runtime.ts";

import { Ref, useEffect, useRef } from "preact/hooks";
// import LeaderLine from "npm:@codehardt/leader-line@1.0.9";

import { GraphEdge, GraphNode } from "@apps/rewrite-mapping/models.ts";

interface RewriteMappingProps {
  oldChapters: GraphNode[];
  newChapters: GraphNode[];
  edges: GraphEdge[];
}

const createLeaderLine = (edge: GraphEdge): string => {
  return `new LeaderLine(
  document.getElementById('${edge.from}'),
  document.getElementById('${edge.to}'),
  {
    dash: {
      animation: true
    },
    startPlugColor: '#9ca3af',
    endPlugColor: '#1ca100',
    size: 3,
    gradient: true
  }
);`;
};

export default function RewriteMapping({
  oldChapters,
  newChapters,
  edges,
}: RewriteMappingProps) {
  useEffect(() => {
    const script = document.createElement("script");
    const scriptText = document.createTextNode(
      // TODO: Rewrite this function to just JSON.parse `edges` instead.
      edges.map((edge) => createLeaderLine(edge)).join("\n"),
    );

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
              <div
                key={chapter.id}
                id={chapter.id}
                class="bg-gray-400 hover:bg-gray-500 py-1 px-2 flex gap-2 items-center"
              >
                <span class="text-xs">
                  {chapter.order < 10 ? 0 : null}
                  {chapter.order}
                </span>
                <a
                  href={chapter.url}
                  title={chapter.title}
                  class="font-bold w-full truncate"
                  target="_blank"
                >
                  {chapter.title}
                </a>
              </div>
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
              <div
                key={chapter.id}
                id={chapter.id}
                class={`py-1 px-2 flex gap-2 items-center ` +
                  ((chapter.brandNew ?? false) === true
                    ? "bg-[#ffda00] hover:bg-[#e3c200] text-black"
                    : "bg-[#1ca100] hover:bg-[#0d4c00] text-white")}
              >
                <span class="text-xs">
                  {chapter.order < 10 ? 0 : null}
                  {chapter.order}
                </span>
                <a
                  href={chapter.url}
                  title={chapter.title}
                  class="font-bold w-full truncate"
                  target="_blank"
                >
                  {chapter.title}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
