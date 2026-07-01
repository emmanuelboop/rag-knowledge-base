import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import React from "react";
import type { DocumentMeta } from "@/types/documents";
import type { Dispatch, SetStateAction } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"
import { deleteDocument, renameDocument } from "@/services/documentService";
import { useNavigate } from "react-router-dom";

const VITE_API_URL = import.meta.env.VITE_API_URL

type DSidebarProps = {
    documents: DocumentMeta[],
    setDocuments: Dispatch<SetStateAction<DocumentMeta[]>>,
    setSelectedDocument: Dispatch<SetStateAction<DocumentMeta | null>>
}

function DocumentsSidebar({ documents, setDocuments, setSelectedDocument }: DSidebarProps) {
    const token = localStorage.getItem("token")

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [editingId, setEditingId] = useState<number | null>(null)
    const [documentName, setDocumentName] = useState("")
    const navigate = useNavigate()

    function openFileManager() {
        fileInputRef.current?.click();
    }

    async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${VITE_API_URL}/api/documents/upload`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })

        const result = await response.json()

        if (result.success) {
            alert("file uploaded successfully")
            console.log("uploaded document meta: ", result.data)
        }

        setDocuments((prev) => [...prev, result.data]);


    }

    async function handleRename(documentMeta: DocumentMeta) {
        setEditingId(documentMeta.id)
        setDocumentName(documentMeta.file_name)
    }


    return (
        <div className="w-72 h-screen bg-zinc-950 border-r border-zinc-800 p-4 flex flex-col">
            <h2 className="text-lg font-semibold text-white mb-4">
                Documents
            </h2>

            <input
                className="hidden"
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
            />

            <Button
                className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={openFileManager}
            >
                Upload Document
            </Button>

            <div className="flex flex-col gap-2 overflow-y-auto mb-4">
                {documents.map((item, index) => (
                    <div className="flex items-center gap-1"
                        key={item.id}
                    >
                        {editingId === item.id ? (
                            <Input
                                className="text-white"
                                type="text"
                                placeholder={item.file_name}
                                value={documentName}
                                onChange={(e) => {
                                    setDocumentName(e.target.value)
                                }}
                                onKeyDown={(e)=>{
                                    if (e.key === "Enter"){
                                        setDocuments(prev => prev.map((obj, _) => (
                                            item.id === obj.id ? {...obj, file_name: documentName} : obj
                                        )))
                                        renameDocument(documentName, item.id)
                                        setEditingId(null)
                                    }
                                }}
                            />
                        ) : (
                            <Button
                                variant="ghost"
                                className="flex-1 justify-start bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 truncate"
                                onClick={() => {
                                    setSelectedDocument(item)
                                }}
                            >
                                {item.file_name}
                            </Button>
                        )
                        }
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="h-8 w-8 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white">
                                    ⋮
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onClick={() => {
                                        handleRename(item)
                                    }}
                                >
                                    Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setDocuments(prev => prev.filter((obj, _) => (item.id !== obj.id)))
                                        deleteDocument(item.id)
                                    }}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>


                    </div>
                ))}
            </div>

            <Button
                className="mb-4"
                onClick = {()=>{
                    localStorage.removeItem("token")
                    navigate("/login")
                }}
            >
                Log out
            </Button>
        </div>
    );
}

export default DocumentsSidebar;

