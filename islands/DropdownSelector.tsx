import { Choice, DropdownSelections } from "@apps/table-of-contents/models.ts";

interface Props {
  key: DropdownSelections;
  text: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  choices: Choice[];
}

export default function DropdownSelector(
  { key, text, choices, open, onOpen, onClose }: Props,
) {
  const selectChoice = (handler: () => void): void => {
    handler();
    onClose();
  };

  return (
    <>
      <div key={key} class="inline-block">
        <button
          class="outline-none focus:outline-none border p-1 bg-white rounded-sm flex items-center"
          onClick={onOpen}
        >
          <span class="px-1 flex-1 text-left">
            {text}
          </span>
        </button>
        <ul
          class={`bg-white border rounded-sm transform scale-0 absolute transition duration-150 ease-in-out origin-top z-20 max-h-[50vh] overflow-y-auto ${
            open ? "scale-100" : null
          }`}
          role="menu"
          aria-orientation="vertical"
        >
          {choices.map((choice) => {
            return (
              <li
                key={choice.key}
                class="rounded-sm px-3 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => selectChoice(choice.onClick)}
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
