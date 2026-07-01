
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import type { DocumentMeta } from "@/types/documents";
import { getDocumentConversation, sendUserMessage } from "@/services/conversationService";
import { Input } from "@/components/ui/input"
import MessageBubble from "@/components/MessageBubble"
import type { Message } from "@/types/message"



type ChatLayoutProps = {
    selectedDocument: DocumentMeta | null,
}

function ChatLayout({ selectedDocument }: ChatLayoutProps) {
    const [conversation, setConversation] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState("")
    const [isSending, setIsSending] = useState(false)

    useEffect(() => {
        if (!selectedDocument) return;

        const loadConversation = async () => {
            const conversation = await getDocumentConversation(selectedDocument.id)
            setConversation(conversation)
        }

        loadConversation()
        console.log("conversation: ",conversation)

    }, [selectedDocument])

    if (!selectedDocument) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-zinc-800">
                        📄 No Document Selected
                    </h1>

                    <p className="mt-2 text-zinc-500">
                        Upload or select a document to start chatting.
                    </p>
                </div>
            </div>
        );
    }

    async function handleSendButton(){
        if (!inputValue.trim()) return; 

        if (isSending) return;
        setIsSending(true)

        console.log("text to send: ", inputValue)
        if (!selectedDocument) return;

        const insertedMessages = await sendUserMessage(inputValue, selectedDocument.id)
        console.log("inserted messages: ",insertedMessages)

        if (insertedMessages === "error") return;

        setConversation(prev => [...prev, insertedMessages.userMessage, insertedMessages.assistantMessage])
        
        setInputValue("")
        setIsSending(false)
    }

    return (
        <div className="flex flex-col h-screen flex-1">

            <div className="flex flex-col items-center">
                <h1>{selectedDocument.file_name}</h1>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6">
                {conversation.map((message, index) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                    />
                ))}
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-4">
                <div className="flex gap-3">
                    <Input
                        placeholder="Ask a question..."
                        className="flex-1"
                        value={inputValue}
                        onChange={(e)=>{
                            setInputValue(e.target.value)
                        }}
                        onKeyDown={(e)=>{
                            if (e.key === "Enter"){
                                handleSendButton()
                            }
                        }}
                    />

                    <Button
                        onClick = {handleSendButton}
                    >
                        Send
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default ChatLayout;
