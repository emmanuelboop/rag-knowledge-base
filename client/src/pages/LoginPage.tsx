import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginUser } from "@/services/authService"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl">Log into account</h1>
                <Input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                <Input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />

                <Button
                    onClick={() => {
                        const handleLogin = async () => {
                            if (!username.trim() || !password.trim()) {
                                alert("please fill in all fields")
                                return
                            }
                            
                            console.log("going to login user")
                            const data = await loginUser(username, password);
                            if (data.success) {
                                alert("user logged in successfully, data: " + data)
                                localStorage.setItem("token",data.token)
                                navigate("/chat")
                            } else {
                                alert("server error: "+data.message)
                            }
                        }
                        handleLogin()
                    }}
                >
                    Register
                </Button>

            </div>
        </div>
    )
}

export default LoginPage;