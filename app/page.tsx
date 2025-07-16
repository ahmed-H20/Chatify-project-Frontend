"use client"

import ChatList from "@/components/chat-list"
import Logo from "@/components/logo"
import { useEffect, useState } from "react"
import LoginPage from "./auth/login/page";

export default function Home() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [chats, setChats] = useState([])

  const getChats = async () => {
    try {
      const response = await fetch("https://chatify-project-backend.vercel.app/api/v1/conversation/allPrivateConversation", {
        headers: { Authorization: `Bearer ${token}` },
      }); 
      if (!response.ok) throw new Error("Failed to fetch chats")
      return response.json()

       
    } catch (error) {
      console.error(error)
      return []
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getChats()
      const transformed = data.data.map((item: any) => ({
        id: item.chatId,
        name: item.user.name,
        avatar: item.user.image,
        message: item.lastMessage?.message || '',
        time: new Date(item.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: !item.lastMessage?.isRead
      }));

      setChats(transformed);
    }

    if(! token){
      window.location.href = "/auth/login";
    }

    fetchData()
  }, [])

  return (
    <>  
      <div className="flex h-full">
        <div className="w-full md:w-96 h-full">
          <ChatList chats={chats} />
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center">
          <Logo />
        </div>
      </div>    
    </>
  )
}
