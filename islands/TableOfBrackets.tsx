import {
  BasicWebChapter,
  BracketContentWithChapters,
} from "@apps/table-of-brackets/models.ts";

interface Props {
  chapters: BasicWebChapter[];
  withChapters: BracketContentWithChapters[];
}

export default function TableOfBrackets(
  { chapters, withChapters }: Props,
) {
  const mapChapters = new Map<string, BasicWebChapter>();
  for (const chapter of chapters) {
    mapChapters.set(chapter.id, chapter);
  }

  return (
    <>
      <div
        class="overflow-auto max-h-[60vh] sm:max-h-[70vh] rounded-md border"
        style="scroll-behavior: smooth;"
      >
        <table class="table relative">
          <thead class="font-medium sticky top-0">
            <tr>
              <th scope="col" class="px-2 bg-[#2b2b2b] text-[#eeeeee]">
                #
              </th>
              <th scope="col" class="px-2 bg-[#2b2b2b] text-[#eeeeee]">
                Bracket Contents
              </th>
              <th scope="col" class="px-2 bg-[#2b2b2b] text-[#eeeeee]">
                Mentioned in Chapters
              </th>
            </tr>
          </thead>
          <tbody>
            {withChapters.map((row, indexItem) => {
              return (
                <tr class="border-t h-10 hover:bg-gray-100">
                  <td class="p-2">
                    {indexItem + 1}
                  </td>
                  <td class="p-2" style="user-select: all; cursor: pointer;">
                    {row.content}
                  </td>
                  <td class="p-2">
                    {row.chapterIds.map((chapterId, index) => {
                      const chapter = mapChapters.get(chapterId) ??
                        { id: "", title: "", url: "" };

                      return (
                        <span class="inline mr-1">
                          <a
                            href={chapter.url
                              ? chapter.url + "#:~:text=" + row.content
                              : ""}
                            title={chapter.title}
                            target="_blank"
                            class="font-semibold hover:underline hover:text-blue-600"
                          >
                            [{index + 1}]
                          </a>
                        </span>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
