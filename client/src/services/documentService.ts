const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")

export async function getDocuments(){

    const response = await fetch(`${API_URL}/api/documents`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const result = await response.json()
    console.log("result: ",result)
    return result.data

}

export async function renameDocument(documentName: string, document_id: number){
    const response = await fetch(`${API_URL}/api/documents/${document_id}/rename`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            documentName
        })
    })

    const result = await response.json()
    if (result.success){
        alert("alert rename successfull")
    }else{
        alert("rename not successfull")
    }

}

export async function deleteDocument(document_id: number){
    const response = await fetch(`${API_URL}/api/documents/${document_id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const result = await response.json()
    if (result.success){
        alert("document deleted successfully")
    }else{
        alert("error deleting document")
    }
}