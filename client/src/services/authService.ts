
const API_URL = import.meta.env.VITE_API_URL

export async function registerUser(username: string, email: string, password: string){
    const response = await fetch(`${API_URL}/api/auth/signup`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email, 
            password
        })
    })
    const data = await response.json()
    return data
    
}

export async function loginUser(username: string, password: string){
    const response = await fetch(`${API_URL}/api/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    const data = await response.json()
    return data
}
