import { useCallback, useState } from "preact/hooks";

import {
  AudioBook,
  Chapter,
  ElectronicBook,
  WebVolume,
} from "@seed/types/media.ts";
import {
  Choice,
  DEFAULT_FROM_MEDIA_TYPE,
  DEFAULT_FROM_MEDIA_TYPE_VALUES,
  DEFAULT_TO_MEDIA_TYPE,
  DEFAULT_TO_MEDIA_TYPE_VALUES,
  DropdownSelections,
  FromMediaTypeValues,
  MediaTypes,
  ToMediaTypeValues,
} from "@apps/table-of-contents/models.ts";

import DropdownSelector from "./DropdownSelector.tsx";

const sortChapterChoice = (a: Choice, b: Choice): number => {
  const val1 = a.order ?? 0;
  const val2 = b.order ?? 0;

  if (val1 === val2) return 0;
  if (val1 === null) return 1;
  if (val2 === null) return -1;
  return val1 > val2 ? 1 : -1;
};

interface Props {
  chapters: Chapter[];
  webVolumes: WebVolume[];
  audioBooks: AudioBook[];
  eBooks: ElectronicBook[];
}

export default function TableOptions(
  { chapters, webVolumes, audioBooks, eBooks }: Props,
) {
  const webVolumeChoices: Choice[] = [];
  const audioBookChoices: Choice[] = [];
  const electronicBookChoices: Choice[] = [];

  const completedChoice: Choice = {
    key: "0",
    order: 0,
    text: "(everything)",
    classNames: [],
    onClick: () => {
      setCollectionIndex(0);
    },
  };

  const mapWebVolumeChapterChoice = new Map<number, Choice[]>();
  const mapAudioBookChapterChoice = new Map<number, Choice[]>();
  const mapElectronicBookChapterChoice = new Map<number, Choice[]>();
  const mapChaptersById = new Map<string, Chapter>();

  webVolumes.forEach((item) => {
    mapWebVolumeChapterChoice.set(item.index, [completedChoice]);
    webVolumeChoices.push({
      key: item.id,
      text: item.title,
      classNames: [],
      onClick: () => {
        setCollectionRef(item.index);
        setCollectionIndex(0);
      },
    });
  });
  audioBooks.forEach((item) => {
    mapAudioBookChapterChoice.set(item.index, [completedChoice]);
    audioBookChoices.push({
      key: item.id,
      text: item.title,
      classNames: [],
      onClick: () => {
        setCollectionRef(item.index);
        setCollectionIndex(0);
      },
    });
  });
  eBooks.forEach((item) => {
    mapElectronicBookChapterChoice.set(item.index, [completedChoice]);
    electronicBookChoices.push({
      key: item.id,
      text: item.title,
      classNames: [],
      onClick: () => {
        setCollectionRef(item.index);
        setCollectionIndex(0);
      },
    });
  });
  chapters.forEach((chapter) => {
    mapChaptersById.set(chapter.id, chapter);

    const wnRef = chapter.partOf.webNovel.ref;
    if (wnRef) {
      const items = mapWebVolumeChapterChoice.get(wnRef) ?? [];
      const choice: Choice = {
        key: `${chapter.id}`,
        classNames: [],
        order: chapter.partOf.webNovel.order ?? 0,
        text: chapter.partOf.webNovel.title ?? "",
        onClick: () => {
          setCollectionIndex(chapter.partOf.webNovel.order ?? 0);
        },
      };
      mapWebVolumeChapterChoice.set(wnRef, [...items, choice]);
    }

    const abRef = chapter.partOf.audioBook.ref;
    if (abRef) {
      const items = mapAudioBookChapterChoice.get(abRef) ?? [];
      const choice: Choice = {
        key: `${chapter.id}`,
        classNames: [],
        order: chapter.partOf.audioBook.order ?? 0,
        text: chapter.partOf.audioBook.title ?? "",
        onClick: () => {
          setCollectionIndex(chapter.partOf.audioBook.order ?? 0);
        },
      };
      mapAudioBookChapterChoice.set(abRef, [...items, choice]);
    }

    const ebRef = chapter.partOf.audioBook.ref;
    if (ebRef) {
      const items = mapElectronicBookChapterChoice.get(ebRef) ?? [];
      const choice: Choice = {
        key: `${chapter.id}`,
        classNames: [],
        order: chapter.partOf.eBook.order ?? 0,
        text: chapter.partOf.eBook.title ?? "",
        onClick: () => {
          setCollectionIndex(chapter.partOf.eBook.order ?? 0);
        },
      };
      mapElectronicBookChapterChoice.set(ebRef, [...items, choice]);
    }
  });

  // Sort possible choices.
  webVolumes.forEach((item) => {
    const items = mapWebVolumeChapterChoice.get(item.index) ?? [];
    mapWebVolumeChapterChoice.set(item.index, items.sort(sortChapterChoice));
  });
  audioBooks.forEach((item) => {
    const items = mapAudioBookChapterChoice.get(item.index) ?? [];
    mapAudioBookChapterChoice.set(item.index, items.sort(sortChapterChoice));
  });
  eBooks.forEach((item) => {
    const items = mapElectronicBookChapterChoice.get(item.index) ?? [];
    mapElectronicBookChapterChoice.set(
      item.index,
      items.sort(sortChapterChoice),
    );
  });

  const [fromMediaType, setFromMediaType] = useState<
    MediaTypes
  >(DEFAULT_FROM_MEDIA_TYPE);
  const [toMediaType, setToMediaType] = useState<
    MediaTypes
  >(DEFAULT_TO_MEDIA_TYPE);

  const [fromMediaTypeValue, setFromMediaTypeValue] = useState<
    FromMediaTypeValues
  >(DEFAULT_FROM_MEDIA_TYPE_VALUES);
  const [toMediaTypeValue, setToMediaTypeValue] = useState<ToMediaTypeValues>(
    DEFAULT_TO_MEDIA_TYPE_VALUES,
  );
  const [collectionRef, setCollectionRef] = useState<number>(
    audioBooks.length - 1,
  );
  const collectionRefChoices = useCallback((): Choice[] => {
    if (fromMediaType === MediaTypes.WEBNOVEL) return webVolumeChoices;
    if (fromMediaType === MediaTypes.AUDIOBOOK) return audioBookChoices;
    if (fromMediaType === MediaTypes.EBOOK) return electronicBookChoices;
    return [];
  }, [fromMediaType]);
  const collectionRefValue = useCallback((): string => {
    if (fromMediaType === MediaTypes.WEBNOVEL) {
      if (collectionRef === 0) return webVolumes[webVolumes.length - 1].title;
      return webVolumes.find((item) => item.index === collectionRef)?.title ??
        "";
    }
    if (fromMediaType === MediaTypes.AUDIOBOOK) {
      if (collectionRef === 0) return audioBooks[audioBooks.length - 1].title;
      return audioBooks.find((item) => item.index === collectionRef)?.title ??
        "";
    }
    if (fromMediaType === MediaTypes.EBOOK) {
      if (collectionRef === 0) return eBooks[eBooks.length - 1].title;
      return eBooks.find((item) => item.index === collectionRef)?.title ?? "";
    }
    return "";
  }, [fromMediaType, collectionRef]);

  const [collectionIndex, setCollectionIndex] = useState<number>(0);
  const collectionIndexChoices = useCallback((): Choice[] => {
    if (fromMediaType === MediaTypes.WEBNOVEL) {
      return mapWebVolumeChapterChoice.get(collectionRef) ?? [];
    }
    if (fromMediaType === MediaTypes.AUDIOBOOK) {
      return mapAudioBookChapterChoice.get(collectionRef) ?? [];
    }
    if (fromMediaType === MediaTypes.EBOOK) {
      return mapElectronicBookChapterChoice.get(collectionRef) ?? [];
    }
    return [];
  }, [fromMediaType, collectionRef]);
  const collectionIndexValue = useCallback((): string => {
    if (fromMediaType === MediaTypes.WEBNOVEL) {
      const choices = mapWebVolumeChapterChoice.get(collectionRef) ?? [];
      return choices.find((item) => item.order === collectionIndex)?.text ??
        "";
    }
    if (fromMediaType === MediaTypes.AUDIOBOOK) {
      const choices = mapAudioBookChapterChoice.get(collectionRef) ?? [];
      return choices.find((item) => item.order === collectionIndex)?.text ??
        "";
    }
    if (fromMediaType === MediaTypes.EBOOK) {
      const choices = mapElectronicBookChapterChoice.get(collectionRef) ?? [];
      return choices.find((item) => item.order === collectionIndex)?.text ?? "";
    }
    return "";
  }, [fromMediaType, collectionRef, collectionIndex]);

  const possibleFromMediaTypeChoices: Choice[] = [
    {
      key: MediaTypes.WEBNOVEL,
      text: FromMediaTypeValues.WEBNOVEL,
      classNames: [],
      onClick: () => {
        setFromMediaType(MediaTypes.WEBNOVEL);
        setFromMediaTypeValue(FromMediaTypeValues.WEBNOVEL);
        setCollectionRef(1);
        setCollectionIndex(0);
      },
    },
    {
      key: MediaTypes.EBOOK,
      text: FromMediaTypeValues.EBOOK,
      classNames: [],
      onClick: () => {
        setFromMediaType(MediaTypes.EBOOK);
        setFromMediaTypeValue(FromMediaTypeValues.EBOOK);
        setCollectionRef(1);
        setCollectionIndex(0);
      },
    },
    {
      key: MediaTypes.AUDIOBOOK,
      text: FromMediaTypeValues.AUDIOBOOK,
      classNames: [],
      onClick: () => {
        setFromMediaType(MediaTypes.AUDIOBOOK);
        setFromMediaTypeValue(FromMediaTypeValues.AUDIOBOOK);
        setCollectionRef(1);
        setCollectionIndex(0);
      },
    },
  ];
  const possibleToMediaTypeChoices: Choice[] = [
    {
      key: MediaTypes.WEBNOVEL,
      text: ToMediaTypeValues.WEBNOVEL,
      classNames: [],
      onClick: () => {
        setToMediaType(MediaTypes.WEBNOVEL);
        setToMediaTypeValue(ToMediaTypeValues.WEBNOVEL);
      },
    },
    {
      key: MediaTypes.EBOOK,
      text: ToMediaTypeValues.EBOOK,
      classNames: [],
      onClick: () => {
        setToMediaType(MediaTypes.EBOOK);
        setToMediaTypeValue(ToMediaTypeValues.EBOOK);
      },
    },
    {
      key: MediaTypes.AUDIOBOOK,
      text: ToMediaTypeValues.AUDIOBOOK,
      classNames: [],
      onClick: () => {
        setToMediaType(MediaTypes.AUDIOBOOK);
        setToMediaTypeValue(ToMediaTypeValues.AUDIOBOOK);
      },
    },
  ];
  const filteredToMediaTypeChoices: Choice[] = possibleToMediaTypeChoices
    .filter((choice) => choice.key !== fromMediaType);

  const [openMenuKey, setOpenMenuKey] = useState<DropdownSelections>(
    DropdownSelections.EMPTY,
  );

  const chooseFromMediaType = (
    <DropdownSelector
      key={DropdownSelections.FROM}
      text={fromMediaTypeValue}
      choices={possibleFromMediaTypeChoices}
      onOpen={() => setOpenMenuKey(DropdownSelections.FROM)}
      onClose={() => setOpenMenuKey(DropdownSelections.EMPTY)}
      open={openMenuKey === DropdownSelections.FROM}
    />
  );
  const chooseCollectionNumber = (
    <DropdownSelector
      key={DropdownSelections.REF}
      text={collectionRefValue()}
      choices={collectionRefChoices()}
      onOpen={() => setOpenMenuKey(DropdownSelections.REF)}
      onClose={() => setOpenMenuKey(DropdownSelections.EMPTY)}
      open={openMenuKey === DropdownSelections.REF}
    />
  );
  const chooseChapterNumber = (
    <DropdownSelector
      key={DropdownSelections.INDEX}
      text={collectionIndexValue()}
      choices={collectionIndexChoices()}
      onOpen={() => setOpenMenuKey(DropdownSelections.INDEX)}
      onClose={() => setOpenMenuKey(DropdownSelections.EMPTY)}
      open={openMenuKey === DropdownSelections.INDEX}
    />
  );
  const chooseToMediaType = (
    <DropdownSelector
      key={DropdownSelections.TO}
      text={toMediaTypeValue}
      choices={filteredToMediaTypeChoices}
      onOpen={() => setOpenMenuKey(DropdownSelections.TO)}
      onClose={() => setOpenMenuKey(DropdownSelections.EMPTY)}
      open={openMenuKey === DropdownSelections.TO}
    />
  );

  return (
    <>
      <div class="p-2 md:p-3 bg-gray-600 rounded-xl flex flex-col md:flex-row gap-2 md:gap-4">
        <div class="bg-white rounded-xl flex justify-between align-middle gap-2 flex-grow w-full">
          <div class="p-3 overflow-hidden">
            Help! I just finished {chooseFromMediaType} {chooseCollectionNumber}
            {" "}
            {chooseChapterNumber}, and I want to continue {chooseToMediaType}.
          </div>
        </div>
        <div class="flex my-auto">
          <button
            type="button"
            class="inline-flex flex-grow items-center justify-center rounded-xl md:rounded-full px-4 py-4 transition duration-500 ease-in-out text-white bg-gray-500 hover:bg-gray-400 focus:outline-none"
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
      <div>
      </div>
    </>
  );
}
