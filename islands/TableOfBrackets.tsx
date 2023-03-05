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
    start: number,
    end: number,
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
  const [fromCollectionRef, setFromCollectionRef] = useState<number>(1);
  const [fromCollectionIndex, setFromCollectionIndex] = useState<number>(0);
  const [toCollectionRef, setToCollectionRef] = useState<number>(
    webVolumeReleases.length,
  );
  const [toCollectionIndex, setToCollectionIndex] = useState<number>(0);

  // START: Create Chapter Choices
  const mapFromWebVolumeChapterChoice = new Map<number, Choice[]>();
  const mapFromAudioBookChapterChoice = new Map<number, Choice[]>();
  const mapFromElectronicBookChapterChoice = new Map<number, Choice[]>();
  const mapToWebVolumeChapterChoice = new Map<number, Choice[]>();
  const mapToAudioBookChapterChoice = new Map<number, Choice[]>();
  const mapToElectronicBookChapterChoice = new Map<number, Choice[]>();
  // The default choice for an empty media type.
  const emptyFromChoice: Choice = {
    key: "0",
    order: 0,
    text: "(start)",
    classNames: [],
    handleClick: () => {
      setFromCollectionIndex(0);
    },
  };
  // The default choice for a completed media type.
  const completedToChoice: Choice = {
    key: "0",
    order: 0,
    text: "(everything)",
    classNames: [],
    handleClick: () => {
      setToCollectionIndex(0);
    },
  };
  // END: Create Chapter Choices

  // START: Create Media Choices
  // Set Web Volume Choices.
  const fromWebVolumeChoices: Choice[] = [];
  const toWebVolumeChoices: Choice[] = [];
  webVolumeReleases.forEach((collection) => {
    const colData = webVolumeChapters.filter((chapter) =>
      chapter.ref === collection.index
    );

    const fromChapterChoices = colData.map((chapter) =>
      createChapterChoice(chapter, setFromCollectionIndex)
    );
    mapFromWebVolumeChapterChoice.set(collection.index, [
      ...fromChapterChoices,
    ]);
    fromWebVolumeChoices.push({
      key: collection.id,
      text: collection.title,
      classNames: [],
      handleClick: () => {
        setFromCollectionRef(collection.index);
        setFromCollectionIndex(0);
        setToCollectionRef(collection.index);
        setToCollectionIndex(0);
      },
    });

    const toChapterChoices = colData.map((chapter) =>
      createChapterChoice(chapter, setToCollectionIndex)
    );
    mapToWebVolumeChapterChoice.set(collection.index, [
      completedToChoice,
      ...toChapterChoices,
    ]);
    toWebVolumeChoices.push({
      key: collection.id,
      text: collection.title,
      classNames: [],
      handleClick: () => {
        setToCollectionRef(collection.index);
        setToCollectionIndex(0);
      },
    });
  });
  // Set Audio Book Choices.
  const fromAudioBookChoices: Choice[] = [];
  const toAudioBookChoices: Choice[] = [];
  audioBookReleases.forEach((collection) => {
    const colData = audioBookChapters.filter((chapter) =>
      chapter.ref === collection.index
    );

    const fromChapterChoices = colData.map((chapter) =>
      createChapterChoice(chapter, setFromCollectionIndex)
    );
    const defaultValues: Choice[] = [];
    if (fromChapterChoices.length === 0) {
      defaultValues.push(emptyFromChoice);
    }
    mapFromAudioBookChapterChoice.set(collection.index, [
      ...defaultValues,
      ...fromChapterChoices,
    ]);
    fromAudioBookChoices.push({
      key: collection.id,
      text: `#${collection.index}: ${collection.title}`,
      classNames: [],
      handleClick: () => {
        setFromCollectionRef(collection.index);
        setFromCollectionIndex(0);
      },
    });

    const toChapterChoices = colData.map((chapter) =>
      createChapterChoice(chapter, setToCollectionIndex)
    );
    mapToAudioBookChapterChoice.set(collection.index, [
      completedToChoice,
      ...toChapterChoices,
    ]);
    toAudioBookChoices.push({
      key: collection.id,
      text: `#${collection.index}: ${collection.title}`,
      classNames: [],
      handleClick: () => {
        setToCollectionRef(collection.index);
        setToCollectionIndex(0);
      },
    });
  });
  // Set Electronic Book Choices.
  const fromElectronicBookChoices: Choice[] = [];
  const toElectronicBookChoices: Choice[] = [];
  electronicBookReleases.forEach((collection) => {
    const colData = electronicBookChapters.filter((chapter) =>
      chapter.ref === collection.index
    );

    const fromChapterChoices = colData.filter((chapter) =>
      chapter.ref === collection.index
    ).map((chapter) => createChapterChoice(chapter, setFromCollectionIndex));
    const defaultValues: Choice[] = [];
    if (fromChapterChoices.length === 0) {
      defaultValues.push(emptyFromChoice);
    }
    mapFromElectronicBookChapterChoice.set(collection.index, [
      ...defaultValues,
      ...fromChapterChoices,
    ]);
    fromElectronicBookChoices.push({
      key: collection.id,
      text: `#${collection.index}: ${collection.title}`,
      classNames: [],
      handleClick: () => {
        setFromCollectionRef(collection.index);
        setFromCollectionIndex(0);
      },
    });

    const toChapterChoices = colData.filter((chapter) =>
      chapter.ref === collection.index
    ).map((chapter) => createChapterChoice(chapter, setToCollectionIndex));
    mapToElectronicBookChapterChoice.set(collection.index, [
      completedToChoice,
      ...toChapterChoices,
    ]);
    toElectronicBookChoices.push({
      key: collection.id,
      text: `#${collection.index}: ${collection.title}`,
      classNames: [],
      handleClick: () => {
        setToCollectionRef(collection.index);
        setToCollectionIndex(0);
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

  const fromCollectionRefChoices = useCallback((): Choice[] => {
    if (mediaType === MediaTypes.WEBNOVEL) return fromWebVolumeChoices;
    if (mediaType === MediaTypes.AUDIOBOOK) return fromAudioBookChoices;
    if (mediaType === MediaTypes.EBOOK) return fromElectronicBookChoices;
    return [];
  }, [mediaType]);
  const toCollectionRefChoices = useCallback((): Choice[] => {
    if (mediaType === MediaTypes.WEBNOVEL) return toWebVolumeChoices;
    if (mediaType === MediaTypes.AUDIOBOOK) return toAudioBookChoices;
    if (mediaType === MediaTypes.EBOOK) return toElectronicBookChoices;
    return [];
  }, [mediaType]);

  const fromCollectionRefValue = useCallback((): string => {
    if (mediaType === MediaTypes.WEBNOVEL) {
      if (fromCollectionRef === 0) {
        return webVolumeReleases[webVolumeReleases.length - 1].title;
      }
      return webVolumeReleases.find((item) => item.index === fromCollectionRef)
        ?.title ??
        "";
    }
    if (mediaType === MediaTypes.AUDIOBOOK) {
      if (fromCollectionRef === 0) {
        return audioBookReleases[audioBookReleases.length - 1].title;
      }
      const title = audioBookReleases.find((item) =>
        item.index === fromCollectionRef
      )
        ?.title ??
        "";
      return `#${fromCollectionRef}: ${title}`;
    }
    if (mediaType === MediaTypes.EBOOK) {
      if (fromCollectionRef === 0) {
        return electronicBookReleases[electronicBookReleases.length - 1].title;
      }
      const title = electronicBookReleases.find((item) =>
        item.index === fromCollectionRef
      )
        ?.title ?? "";
      return `#${fromCollectionRef}: ${title}`;
    }
    return "";
  }, [mediaType, fromCollectionRef]);
  const toCollectionRefValue = useCallback((): string => {
    if (mediaType === MediaTypes.WEBNOVEL) {
      if (toCollectionRef === 0) {
        return webVolumeReleases[webVolumeReleases.length - 1].title;
      }
      return webVolumeReleases.find((item) => item.index === toCollectionRef)
        ?.title ??
        "";
    }
    if (mediaType === MediaTypes.AUDIOBOOK) {
      if (toCollectionRef === 0) {
        return audioBookReleases[audioBookReleases.length - 1].title;
      }
      const title = audioBookReleases.find((item) =>
        item.index === toCollectionRef
      )
        ?.title ??
        "";
      return `#${toCollectionRef}: ${title}`;
    }
    if (mediaType === MediaTypes.EBOOK) {
      if (toCollectionRef === 0) {
        return electronicBookReleases[electronicBookReleases.length - 1].title;
      }
      const title = electronicBookReleases.find((item) =>
        item.index === toCollectionRef
      )
        ?.title ?? "";
      return `#${toCollectionRef}: ${title}`;
    }
    return "";
  }, [mediaType, toCollectionRef]);

  const fromCollectionIndexChoices = useCallback((): Choice[] => {
    if (mediaType === MediaTypes.WEBNOVEL) {
      return mapFromWebVolumeChapterChoice.get(fromCollectionRef) ?? [];
    }
    if (mediaType === MediaTypes.AUDIOBOOK) {
      return mapFromAudioBookChapterChoice.get(fromCollectionRef) ?? [];
    }
    if (mediaType === MediaTypes.EBOOK) {
      return mapFromElectronicBookChapterChoice.get(fromCollectionRef) ?? [];
    }
    return [];
  }, [mediaType, fromCollectionRef]);
  const toCollectionIndexChoices = useCallback((): Choice[] => {
    if (mediaType === MediaTypes.WEBNOVEL) {
      return mapToWebVolumeChapterChoice.get(toCollectionRef) ?? [];
    }
    if (mediaType === MediaTypes.AUDIOBOOK) {
      return mapToAudioBookChapterChoice.get(toCollectionRef) ?? [];
    }
    if (mediaType === MediaTypes.EBOOK) {
      return mapToElectronicBookChapterChoice.get(toCollectionRef) ?? [];
    }
    return [];
  }, [mediaType, toCollectionRef]);

  const fromCollectionIndexValue = useCallback((): string => {
    if (mediaType === MediaTypes.WEBNOVEL) {
      const choices = mapFromWebVolumeChapterChoice.get(fromCollectionRef) ??
        [];
      if (fromCollectionIndex === 0) return choices[0]?.text ?? "";
      return choices.find((item) => item.order === fromCollectionIndex)?.text ??
        "";
    }
    if (mediaType === MediaTypes.AUDIOBOOK) {
      const choices = mapFromAudioBookChapterChoice.get(fromCollectionRef) ??
        [];
      if (fromCollectionIndex === 0) return choices[0]?.text ?? "";
      return choices.find((item) => item.order === fromCollectionIndex)?.text ??
        "";
    }
    if (mediaType === MediaTypes.EBOOK) {
      const choices =
        mapFromElectronicBookChapterChoice.get(fromCollectionRef) ??
          [];
      if (fromCollectionIndex === 0) return choices[0]?.text ?? "";
      return choices.find((item) => item.order === fromCollectionIndex)?.text ??
        "";
    }
    return "";
  }, [mediaType, fromCollectionRef, fromCollectionIndex]);
  const toCollectionIndexValue = useCallback((): string => {
    if (mediaType === MediaTypes.WEBNOVEL) {
      const choices = mapToWebVolumeChapterChoice.get(toCollectionRef) ?? [];
      return choices.find((item) => item.order === toCollectionIndex)?.text ??
        "";
    }
    if (mediaType === MediaTypes.AUDIOBOOK) {
      const choices = mapToAudioBookChapterChoice.get(toCollectionRef) ?? [];
      return choices.find((item) => item.order === toCollectionIndex)?.text ??
        "";
    }
    if (mediaType === MediaTypes.EBOOK) {
      const choices = mapToElectronicBookChapterChoice.get(toCollectionRef) ??
        [];
      return choices.find((item) => item.order === toCollectionIndex)?.text ??
        "";
    }
    return "";
  }, [mediaType, toCollectionRef, toCollectionIndex]);

  const possibleMediaTypeChoices: Choice[] = [
    {
      key: MediaTypes.WEBNOVEL,
      text: MediaTypeValues.WEBNOVEL,
      classNames: [],
      handleClick: () => {
        setMediaType(MediaTypes.WEBNOVEL);
        setMediaTypeValue(MediaTypeValues.WEBNOVEL);
        setFromCollectionRef(1);
        setFromCollectionIndex(0);
        setToCollectionRef(1);
        setToCollectionIndex(0);
      },
    },
    {
      key: MediaTypes.EBOOK,
      text: MediaTypeValues.EBOOK,
      classNames: [],
      handleClick: () => {
        setMediaType(MediaTypes.EBOOK);
        setMediaTypeValue(MediaTypeValues.EBOOK);
        setFromCollectionRef(1);
        setFromCollectionIndex(0);
        setToCollectionRef(1);
        setToCollectionIndex(0);
      },
    },
    {
      key: MediaTypes.AUDIOBOOK,
      text: MediaTypeValues.AUDIOBOOK,
      classNames: [],
      handleClick: () => {
        setMediaType(MediaTypes.AUDIOBOOK);
        setMediaTypeValue(MediaTypeValues.AUDIOBOOK);
        setFromCollectionRef(1);
        setFromCollectionIndex(0);
        setToCollectionRef(1);
        setToCollectionIndex(0);
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
  const chooseFromCollectionNumber = (
    <DropdownSelector
      key={DropdownSelections.FROM_REF}
      text={fromCollectionRefValue()}
      choices={fromCollectionRefChoices()}
      handleOpen={() => setOpenMenuKey(DropdownSelections.FROM_REF)}
      handleClose={() => setOpenMenuKey(DropdownSelections.EMPTY)}
      open={openMenuKey === DropdownSelections.FROM_REF}
    />
  );
  const chooseFromChapterNumber = (
    <DropdownSelector
      key={DropdownSelections.FROM_INDEX}
      text={fromCollectionIndexValue()}
      choices={fromCollectionIndexChoices()}
      handleOpen={() => setOpenMenuKey(DropdownSelections.FROM_INDEX)}
      handleClose={() => setOpenMenuKey(DropdownSelections.EMPTY)}
      open={openMenuKey === DropdownSelections.FROM_INDEX}
    />
  );
  const chooseToCollectionNumber = (
    <DropdownSelector
      key={DropdownSelections.TO_REF}
      text={toCollectionRefValue()}
      choices={toCollectionRefChoices()}
      handleOpen={() => setOpenMenuKey(DropdownSelections.TO_REF)}
      handleClose={() => setOpenMenuKey(DropdownSelections.EMPTY)}
      open={openMenuKey === DropdownSelections.TO_REF}
    />
  );
  const chooseToChapterNumber = (
    <DropdownSelector
      key={DropdownSelections.TO_INDEX}
      text={toCollectionIndexValue()}
      choices={toCollectionIndexChoices()}
      handleOpen={() => setOpenMenuKey(DropdownSelections.TO_INDEX)}
      handleClose={() => setOpenMenuKey(DropdownSelections.EMPTY)}
      open={openMenuKey === DropdownSelections.TO_INDEX}
    />
  );

  const getStartIndex = (): number => {
    let start = fromCollectionIndex;
    if (fromCollectionIndex === 0) {
      if (mediaType === MediaTypes.WEBNOVEL) {
        const allChoices =
          mapFromWebVolumeChapterChoice.get(fromCollectionRef) ?? [];
        start = allChoices.length > 1 ? (allChoices[0].order ?? 0) : 0;
      } else if (mediaType === MediaTypes.AUDIOBOOK) {
        const allChoices =
          mapFromAudioBookChapterChoice.get(fromCollectionRef) ?? [];
        start = allChoices.length > 1 ? (allChoices[0].order ?? 0) : 0;
      } else if (mediaType === MediaTypes.EBOOK) {
        const allChoices =
          mapFromElectronicBookChapterChoice.get(fromCollectionRef) ??
            [];
        start = allChoices.length > 1 ? (allChoices[0].order ?? 0) : 0;
      }
    }
    return start;
  };

  const getEndIndex = (): number => {
    let end = toCollectionIndex;
    if (toCollectionIndex === 0) {
      if (mediaType === MediaTypes.WEBNOVEL) {
        const allChoices = mapToWebVolumeChapterChoice.get(toCollectionRef) ??
          [];
        end = allChoices.length > 1
          ? (allChoices[allChoices.length - 1].order ?? 0)
          : 0;
      } else if (mediaType === MediaTypes.AUDIOBOOK) {
        const allChoices = mapToAudioBookChapterChoice.get(toCollectionRef) ??
          [];
        end = allChoices.length > 1
          ? (allChoices[allChoices.length - 1].order ?? 0)
          : 0;
      } else if (mediaType === MediaTypes.EBOOK) {
        const allChoices =
          mapToElectronicBookChapterChoice.get(toCollectionRef) ??
            [];
        end = allChoices.length > 1
          ? (allChoices[allChoices.length - 1].order ?? 0)
          : 0;
      }
    }
    return end;
  };

  const handleSubmit = (): void => {
    if (fromCollectionIndex !== 0 && toCollectionIndex !== 0) {
      handleSubmitData(mediaType, fromCollectionIndex, toCollectionIndex);
      return;
    }

    const start = getStartIndex();
    const end = getEndIndex();
    handleSubmitData(mediaType, start, end);
  };

  const validCollectionRef = fromCollectionRef <= toCollectionRef;
  const validCollectionIndex = getStartIndex() <= getEndIndex();
  const validForm = validCollectionRef && validCollectionIndex;

  return (
    <>
      <div class="flex flex-col border-1 mb-3">
        <div class="p-2 gap-2 flex-col md:(p-3 gap-3 flex-row) bg-gray-600 flex">
          <div class="bg-white rounded-xl flex justify-between align-middle gap-2 flex-grow w-full">
            <div class="p-3 overflow-hidden">
              Show me a list of all{" "}
              <code class="bg-gray-100 p-1">
                [Bracket Contents]
              </code>{" "}
              mentioned in the {chooseMediaType}, from{" "}
              {chooseFromCollectionNumber} {chooseFromChapterNumber} up to{" "}
              {chooseToCollectionNumber} {chooseToChapterNumber}.
            </div>
          </div>
          <div class="flex my-auto">
            <button
              type="button"
              class={`inline-flex flex-grow items-center justify-center rounded-xl md:rounded-full px-4 py-4 transition duration-500 ease-in-out text-white focus:outline-none ${
                validForm
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={!validForm}
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

interface TableOfBracketsProps {
  webVolumeReleases: BasicMediaForBracketsList[];
  webVolumeChapters: BasicChapterForBracketsList[];
  audioBookReleases: BasicMediaForBracketsList[];
  audioBookChapters: BasicChapterForBracketsList[];
  electronicBookReleases: BasicMediaForBracketsList[];
  electronicBookChapters: BasicChapterForBracketsList[];
}

export default function TableOfBrackets(
  {
    webVolumeReleases,
    webVolumeChapters,
    audioBookReleases,
    audioBookChapters,
    electronicBookReleases,
    electronicBookChapters,
  }: TableOfBracketsProps,
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
    start: number,
    end: number,
  ) => {
    const resp = await fetch(
      `/api/brackets/from-chapters?collectionType=${collectionType}&start=${start}&end=${end}`,
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
        class="overflow-auto max-h-[55vh] sm:max-h-[65vh] rounded-md border"
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
