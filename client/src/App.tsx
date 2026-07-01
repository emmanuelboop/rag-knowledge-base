import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage"
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import ChatPage from "@/pages/ChatPage";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<HomePage/>} />
        <Route path ="/register" element = {<RegisterPage/>} />
        <Route path ="/login" element = {<LoginPage/>} />
        <Route path ="/chat" element = {<ChatPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;