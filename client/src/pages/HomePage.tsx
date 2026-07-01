import {Button} from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">

            <h1 className = "text-5xl font-bold">Chat With Your Documents Using AI</h1>
            <p >Upload documents, organize knowledge, and get AI-powered answers with source citations in seconds.</p>

            <div>
                <Button onClick={() => {
                    navigate("/register")
                }}>
                    Get started
                </Button>
                <Button onClick={() => {
                    navigate("/login")
                }}>
                    login
                </Button>
            </div>
        </div>
    )
}

export default HomePage;