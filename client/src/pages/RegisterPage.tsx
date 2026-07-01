import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { registerUser } from "@/services/authService"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const navigate = useNavigate()

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl">Create an account</h1>
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
                    placeholder="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
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
                <Input
                    type="text"
                    placeholder="confirm password"
                    value={confirmpassword}
                    onChange={(e) => {
                        setConfirmpassword(e.target.value)
                    }}
                />

                <Button
                    onClick={() => {
                        const handleRegister = async () => {
                            if (!email.trim() || !username.trim() || !password.trim()) {
                                alert("please fill in all fields")
                                return
                            }
                            if (password != confirmpassword) {
                                alert("passwords must match")
                                return
                            }
                            console.log("going to register user")
                            const data = await registerUser(username, email, password);
                            if (data.success) {
                                alert("user created successfully, data: " + data.data)
                                navigate("/login")
                            } else {
                                alert(data.data)
                            }
                        }
                        handleRegister()
                    }}
                >
                    Register
                </Button>

            </div>
        </div>
    )
}

export default RegisterPage;