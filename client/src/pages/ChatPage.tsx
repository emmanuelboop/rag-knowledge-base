import DocumentsSidebar from "@/components/DocumentsSidebar";
import ChatLayout from "@/components/ChatLayout";
import { useState, useEffect } from "react";
import type { DocumentMeta } from "@/types/documents";
import { getDocuments } from "@/services/documentService";

function ChatPage() {
    const [documents, setDocuments] = useState<DocumentMeta[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<DocumentMeta | null>(null)

    useEffect(() => {
        const loadDocuments = async () => {
            const docs = await getDocuments()
            setDocuments(docs)
            if (docs.length > 0){
                setSelectedDocument(docs[0])
            }
            console.log("doc length",docs.length)
        }
        loadDocuments()
    }, [])

    return (
        <div className="flex h-screen">
            <DocumentsSidebar 
                documents={documents} 
                setDocuments={setDocuments}
                setSelectedDocument={setSelectedDocument}
            />
            <ChatLayout 
                selectedDocument = {selectedDocument}
            />
        </div>
    )
}

export default ChatPage;
