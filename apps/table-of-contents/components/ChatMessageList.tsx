import { Message } from "../models.ts";
import ChatMessage from "./ChatMessage.tsx";

interface Props {
  messages: Message[];
}

export default function ChatMessageList(
  { messages }: Props,
) {
  return (
    <>
      <div class="flex flex-col space-y-4 p-3 overflow-y-auto max-h-[200px]">
        {messages.map((message, index) => (
          <ChatMessage key={`message-${index}`} {...message} />
        ))}
      </div>
    </>
  );
}
