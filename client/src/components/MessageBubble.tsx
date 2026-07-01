import type { Message } from "@/types/message";

type MessageBubbleProps = {
    message: Message;
};

function MessageBubble({ message }: MessageBubbleProps) {
    const isAssistant = message.role === "assistant";

    return (
        <div className={`flex ${isAssistant ? "justify-start" : "justify-end"} mb-3`}>
            <div
                className={`max-w-[75%] rounded-xl px-4 py-2 break-words ${
                    isAssistant
                        ? "bg-zinc-200 text-black"
                        : "bg-blue-600 text-white"
                }`}
            >
                {message.message}
            </div>
        </div>
    );
}

export default MessageBubble;