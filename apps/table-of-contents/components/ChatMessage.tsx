import { Message } from "../models.ts";

export default function ChatMessage(
  { image, alt, location, message }: Message,
) {
  return (
    <>
      <div>
        <div
          class={`flex items-end ${location === "left" ? "" : "justify-end"}`}
        >
          <div
            class={`flex flex-col space-y-2 text-xs mx-2 ${
              location === "left" ? "order-2 items-start" : "order-1 items-end"
            }`}
          >
            <div>
              <span
                class={`px-4 py-2 rounded-lg inline-block text-sm ${
                  location === "left"
                    ? "bg-gray-300 text-gray-600"
                    : "bg-blue-600 text-white"
                }`}
              >
                {message}
              </span>
            </div>
          </div>
          <img
            src={image}
            alt={alt}
            class="w-6 h-6 rounded-full order-1"
          />
        </div>
      </div>
    </>
  );
}
