import { StateUpdater, useCallback, useState } from "preact/hooks";

import {
  BasicChapterForBracketsList,
  BasicMediaForBracketsList,
  BracketContentWithChapters,
  Choice,
  DEFAULT_MEDIA_TYPE,
  DEFAULT_MEDIA_TYPE_VALUES,
  MediaTypes,
  MediaTypeValues,
} from "@apps/table-of-brackets/models.ts";
import { DropdownSelections } from "@apps/table-of-brackets/models.ts";

interface DropdownSelectorProps {
  key: DropdownSelections;
  text: string;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  choices: Choice[];
}

function DropdownSelector(
  { key, text, choices, open, handleOpen, handleClose }: DropdownSelectorProps,
) {
  const selectChoice = (handler: () => void): void => {
    handler();
    handleClose();
  };

  return (
    <>
      <div key={key} class="inline-block">
        <button
          class="outline-none focus:outline-none border p-1 bg-white rounded-sm flex items-center"
          onClick={() => open ? handleClose() : handleOpen()}
        >
          <span class="px-1 flex-1 text-left">
            {text}
          </span>
        </button>
        <ul
          class={`bg-white border rounded-sm transform absolute transition duration-150 ease-in-out origin-top z-20 max-h-[300px] overflow-y-auto ${
            open ? "scale-100" : "scale-0"
          }`}
          role="menu"
          aria-orientation="vertical"
        >
          {choices.map((choice) => {
            return (
              <li
                key={choice.key}
                class="rounded-sm px-3 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => selectChoice(choice.handleClick)}
              >
                {choice.text}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

const createChapterChoice = (
  chapter: BasicChapterForBracketsList,
  setCollectionIndex: StateUpdater<number>,
): Choice => {
  const choice: Choice = {
    key: `${chapter.id}`,
    classNames: [],
    order: chapter.order,
    text: chapter.title,
    handleClick: () => {
      setCollectionIndex(chapter.order);
    },
  };
  return choice;
};

interface TableOfBracketsChatHelperProps {
  webVolumeReleases: BasicMediaForBracketsList[];
  webVolumeChapters: BasicChapterForBracketsList[];
  audioBookReleases: BasicMediaForBracketsList[];
  audioBookChapters: BasicChapterForBracketsList[];
  electronicBookReleases: BasicMediaForBracketsList[];
  electronicBookChapters: BasicChapterForBracketsList[];
  handleSubmitData: (
    collectionType: MediaTypes,
    chapterIndex: number,
  ) => void;
}

function TableOfBracketsChatHelper(
  {
    webVolumeReleases,
    webVolumeChapters,
    audioBookReleases,
    audioBookChapters,
    electronicBookReleases,
    electronicBookChapters,
    handleSubmitData,
  }: TableOfBracketsChatHelperProps,
) {
  const [collectionRef, setCollectionRef] = useState<number>(
    webVolumeReleases.length,
  );
  const [collectionIndex, setCollectionIndex] = useState<number>(0);

  // START: Create Chapter Choices
  const mapWebVolumeChapterChoice = new Map<number, Choice[]>();
  const mapAudioBookChapterChoice = new Map<number, Choice[]>();
  const mapElectronicBookChapterChoice = new Map<number, Choice[]>();
  // The default choice for a completed media type.
  const completedChoice: Choice = {
    key: "0",
    order: 0,
    text: "(everything)",
    classNames: [],
    handleClick: () => {
      setCollectionIndex(0);
    },
  };
  // END: Create Chapter Choices

  // START: Create Media Choices
  // Set Web Volume Choices.
  const webVolumeChoices: Choice[] = [];
  webVolumeReleases.forEach((collection) => {
    const chapterChoices = webVolumeChapters.filter((chapter) =>
      chapter.ref === collection.index
    ).map((chapter) => createChapterChoice(chapter, setCollectionIndex));
    mapWebVolumeChapterChoice.set(collection.index, [
      completedChoice,
      ...chapterChoices,
    ]);
    webVolumeChoices.push({
      key: collection.id,
      text: collection.title,
      classNames: [],
      handleClick: () => {
        setCollectionRef(collection.index);
        setCollectionIndex(0);
      },
    });
  });
  // Set Audio Book Choices.
  const audioBookChoices: Choice[] = [];
  audioBookReleases.forEach((collection) => {
    const chapterChoices = audioBookChapters.filter((chapter) =>
      chapter.ref === collection.index
    ).map((chapter) => createChapterChoice(chapter, setCollectionIndex));
    mapAudioBookChapterChoice.set(collection.index, [
      completedChoice,
      ...chapterChoices,
    ]);
    audioBookChoices.push({
      key: collection.id,
      text: collection.title,
      classNames: [],
      handleClick: () => {
        setCollectionRef(collection.index);
        setCollectionIndex(0);
      },
    });
  });
  // Set Electronic Book Choices.
  const electronicBookChoices: Choice[] = [];
  electronicBookReleases.forEach((collection) => {
    const chapterChoices = electronicBookChapters.filter((chapter) =>
      chapter.ref === collection.index
    ).map((chapter) => createChapterChoice(chapter, setCollectionIndex));
    mapElectronicBookChapterChoice.set(collection.index, [
      completedChoice,
      ...chapterChoices,
    ]);
    electronicBookChoices.push({
      key: collection.id,
      text: collection.title,
      classNames: [],
      handleClick: () => {
        setCollectionRef(collection.index);
        setCollectionIndex(0);
      },
    });
  });
  // END: Create Media Choices

  const [mediaType, setMediaType] = useState<
    MediaTypes
  >(DEFAULT_MEDIA_TYPE);
  const [mediaTypeValue, setMediaTypeValue] = useState<
    MediaTypeValues
  >(DEFAULT_MEDIA_TYPE_VALUES);

  const collectionRefChoices = useCallback((): Choice[] => {
    if (mediaType === MediaTypes.WEBNOVEL) return webVolumeChoices;
    if (mediaType === MediaTypes.AUDIOBOOK) return audioBookChoices;
    if (mediaType === MediaTypes.EBOOK) return electronicBookChoices;
    return [];
  }, [mediaType]);
  const collectionRefValue = useCallback((): string => {
    if (mediaType === MediaTypes.WEBNOVEL) {
      if (collectionRef === 0) {
        return webVolumeReleases[webVolumeReleases.length - 1].title;
      }
      return webVolumeReleases.find((item) => item.index === collectionRef)
        ?.title ??
        "";
    }
    if (mediaType === MediaTypes.AUDIOBOOK) {
      if (collectionRef === 0) {
        return audioBookReleases[audioBookReleases.length - 1].title;
      }
      return audioBookReleases.find((item) => item.index === collectionRef)
        ?.title ??
        "";
    }
    if (mediaType === MediaTypes.EBOOK) {
      if (collectionRef === 0) {
        return electronicBookReleases[electronicBookReleases.length - 1].title;
      }
      return electronicBookReleases.find((item) => item.index === collectionRef)
        ?.title ?? "";
    }
    return "";
  }, [mediaType, collectionRef]);

  const collectionIndexChoices = useCallback((): Choice[] => {
    if (mediaType === MediaTypes.WEBNOVEL) {
      return mapWebVolumeChapterChoice.get(collectionRef) ?? [];
    }
    if (mediaType === MediaTypes.AUDIOBOOK) {
      return mapAudioBookChapterChoice.get(collectionRef) ?? [];
    }
    if (mediaType === MediaTypes.EBOOK) {
      return mapElectronicBookChapterChoice.get(collectionRef) ?? [];
    }
    return [];
  }, [mediaType, collectionRef]);
  const collectionIndexValue = useCallback((): string => {
    if (mediaType === MediaTypes.WEBNOVEL) {
      const choices = mapWebVolumeChapterChoice.get(collectionRef) ?? [];
      return choices.find((item) => item.order === collectionIndex)?.text ??
        "";
    }
    if (mediaType === MediaTypes.AUDIOBOOK) {
      const choices = mapAudioBookChapterChoice.get(collectionRef) ?? [];
      return choices.find((item) => item.order === collectionIndex)?.text ??
        "";
    }
    if (mediaType === MediaTypes.EBOOK) {
      const choices = mapElectronicBookChapterChoice.get(collectionRef) ?? [];
      return choices.find((item) => item.order === collectionIndex)?.text ?? "";
    }
    return "";
  }, [mediaType, collectionRef, collectionIndex]);

  const possibleMediaTypeChoices: Choice[] = [
    {
      key: MediaTypes.WEBNOVEL,
      text: MediaTypeValues.WEBNOVEL,
      classNames: [],
      handleClick: () => {
        setMediaType(MediaTypes.WEBNOVEL);
        setMediaTypeValue(MediaTypeValues.WEBNOVEL);
        setCollectionRef(1);
        setCollectionIndex(0);
      },
    },
    {
      key: MediaTypes.EBOOK,
      text: MediaTypeValues.EBOOK,
      classNames: [],
      handleClick: () => {
        setMediaType(MediaTypes.EBOOK);
        setMediaTypeValue(MediaTypeValues.EBOOK);
        setCollectionRef(1);
        setCollectionIndex(0);
      },
    },
    {
      key: MediaTypes.AUDIOBOOK,
      text: MediaTypeValues.AUDIOBOOK,
      classNames: [],
      handleClick: () => {
        setMediaType(MediaTypes.AUDIOBOOK);
        setMediaTypeValue(MediaTypeValues.AUDIOBOOK);
        setCollectionRef(1);
        setCollectionIndex(0);
      },
    },
  ];

  const [openMenuKey, setOpenMenuKey] = useState<DropdownSelections>(
    DropdownSelections.EMPTY,
  );

  const chooseMediaType = (
    <DropdownSelector
      key={DropdownSelections.MEDIA}
      text={mediaTypeValue}
      choices={possibleMediaTypeChoices}
      handleOpen={() => setOpenMenuKey(DropdownSelections.MEDIA)}
      handleClose={() => setOpenMenuKey(DropdownSelections.EMPTY)}
      open={openMenuKey === DropdownSelections.MEDIA}
    />
  );
  const chooseCollectionNumber = (
    <DropdownSelector
      key={DropdownSelections.REF}
      text={collectionRefValue()}
      choices={collectionRefChoices()}
      handleOpen={() => setOpenMenuKey(DropdownSelections.REF)}
      handleClose={() => setOpenMenuKey(DropdownSelections.EMPTY)}
      open={openMenuKey === DropdownSelections.REF}
    />
  );
  const chooseChapterNumber = (
    <DropdownSelector
      key={DropdownSelections.INDEX}
      text={collectionIndexValue()}
      choices={collectionIndexChoices()}
      handleOpen={() => setOpenMenuKey(DropdownSelections.INDEX)}
      handleClose={() => setOpenMenuKey(DropdownSelections.EMPTY)}
      open={openMenuKey === DropdownSelections.INDEX}
    />
  );

  const handleSubmit = (): void => {
    if (collectionIndex !== 0) {
      handleSubmitData(mediaType, collectionIndex);
      return;
    }

    if (mediaType === MediaTypes.WEBNOVEL) {
      const allChoices = mapWebVolumeChapterChoice.get(collectionRef) ?? [];
      const lastChoiceIndex = allChoices[allChoices.length - 1].order ?? 0;
      handleSubmitData(mediaType, lastChoiceIndex);
    } else if (mediaType === MediaTypes.AUDIOBOOK) {
      const allChoices = mapAudioBookChapterChoice.get(collectionRef) ?? [];
      const lastChoiceIndex = allChoices[allChoices.length - 1].order ?? 0;
      handleSubmitData(mediaType, lastChoiceIndex);
    } else if (mediaType === MediaTypes.EBOOK) {
      const allChoices = mapElectronicBookChapterChoice.get(collectionRef) ??
        [];
      const lastChoiceIndex = allChoices[allChoices.length - 1].order ?? 0;
      handleSubmitData(mediaType, lastChoiceIndex);
    }
  };

  return (
    <>
      <div class="flex flex-col border-1 mb-3">
        <div class="p-2 md:p-3 bg-gray-600 flex flex-col md:flex-row gap-2 md:gap-4">
          <div class="bg-white rounded-xl flex justify-between align-middle gap-2 flex-grow w-full">
            <div class="p-3 overflow-hidden">
              Show me a list of all{" "}
              <code class="bg-gray-100 p-1">
                [Bracket Contents]
              </code>{" "}
              up to {chooseMediaType} {chooseCollectionNumber}{" "}
              {chooseChapterNumber}.
            </div>
          </div>
          <div class="flex my-auto">
            <button
              type="button"
              class="inline-flex flex-grow items-center justify-center rounded-xl md:rounded-full px-4 py-4 transition duration-500 ease-in-out text-white bg-gray-500 hover:bg-gray-400 focus:outline-none"
              onClick={handleSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 md:w-6 md:h-6"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

interface TableOfBracketsBetaProps {
  webVolumeReleases: BasicMediaForBracketsList[];
  webVolumeChapters: BasicChapterForBracketsList[];
  audioBookReleases: BasicMediaForBracketsList[];
  audioBookChapters: BasicChapterForBracketsList[];
  electronicBookReleases: BasicMediaForBracketsList[];
  electronicBookChapters: BasicChapterForBracketsList[];
}

export default function TableOfBracketsBeta(
  {
    webVolumeReleases,
    webVolumeChapters,
    audioBookReleases,
    audioBookChapters,
    electronicBookReleases,
    electronicBookChapters,
  }: TableOfBracketsBetaProps,
) {
  const [bracketContents, setBracketContents] = useState<
    BracketContentWithChapters[]
  >([]);

  const mapChapters = new Map<string, BasicChapterForBracketsList>();
  for (const chapter of webVolumeChapters) {
    mapChapters.set(chapter.id, chapter);
  }

  const handleSubmitData = async (
    collectionType: MediaTypes,
    chapterIndex: number,
  ) => {
    const resp = await fetch(
      `/api/brackets/from-chapters?collectionType=${collectionType}&chapterIndex=${chapterIndex}`,
    );
    const data: BracketContentWithChapters[] = await resp.json();
    setBracketContents(data);
  };

  return (
    <>
      <TableOfBracketsChatHelper
        {...{
          webVolumeReleases,
          webVolumeChapters,
          audioBookReleases,
          audioBookChapters,
          electronicBookReleases,
          electronicBookChapters,
          handleSubmitData,
        }}
      />

      <div
        class="overflow-auto max-h-[60vh] sm:max-h-[70vh] rounded-md border"
        style="scroll-behavior: smooth;"
      >
        <table class="table relative w-full">
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
            {bracketContents.length === 0 && (
              <tr>
                <td class="text-center p-3" colSpan={3}>
                  No data.
                </td>
              </tr>
            )}

            {bracketContents.length !== 0 &&
              bracketContents.map((row, indexItem) => {
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
