import ChatMessageList from "@apps/table-of-contents/components/ChatMessageList.tsx";
import { Message } from "@apps/table-of-contents/models.ts";

interface Props {
  messages: Message[];
  handleClose: () => void;
}

export default function ChatContainer({ messages, handleClose }: Props) {
  if (messages.length === 0) return null;

  return (
    <>
      <div class="text-center text-xs bg-green-600 text-white py-2">
        <div class="inline mr-2">
          Connected to <span class="font-bold">Wistram Network</span>.
        </div>
        <button
          class="font-bold bg-red-800 py-1 px-2 rounded-sm hover:bg-red-700"
          title="Disconnect"
          onClick={handleClose}
        >
          Disconnect
        </button>
      </div>
      <div class="bg-gray-100">
        <ChatMessageList messages={messages} />
      </div>
    </>
  );
}
