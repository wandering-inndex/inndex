interface Props {
  key: string;
  text: string;
  choices: {
    key: string;
    text: string;
    classNames: string[];
  }[];
}

export default function DropdownSelector({ key, text, choices }: Props) {
  return (
    <>
      <div key={key} class="group inline-block">
        <button class="outline-none focus:outline-none border p-1 bg-white rounded-sm flex items-center">
          <span class="px-1 flex-1 text-left">
            {text}
          </span>
        </button>
        <ul class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute
transition duration-150 ease-in-out origin-top z-20">
          {choices.map((choice) => {
            return (
              <li
                key={choice.key}
                class="rounded-sm px-3 py-1 hover:bg-gray-100 cursor-pointer"
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
