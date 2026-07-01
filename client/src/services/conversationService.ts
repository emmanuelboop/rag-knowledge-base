const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")

export async function getDocumentConversation(id: number){
    const response = await fetch(`${API_URL}/api/documents/${id}/conversation`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const result = await response.json()
    console.log("conversation: ",result.data)

    if (result.success){
        return result.data
    }
    return []
}

export async function sendUserMessage(userInput: string, id: number){

    const response = await fetch(`${API_URL}/api/documents/${id}/conversation`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({
            role: "user",
            content: userInput,
        })
    })

    const result = await response.json()
    if (result.success){
        console.log("server success, result data: ", result)
        return result
    }

    alert("server error, result: "+result.message)
    return "error"
}