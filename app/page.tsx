"use client"

import ChatList from "@/components/chat-list"
import Logo from "@/components/logo"
import { useEffect, useState } from "react"

export default function Home() {
  // const chats = [
  //   {
  //     id: "1",
  //     name: "My friend",
  //     message: "Lorem ipsum dolor sit amet...",
  //     time: "5:15PM",
  //     avatar: "/Chatify_Logo.svgEvan, why you're better than. I will. The time was that key. ?height=48&width=48",
  //   },
  //   {
  //     id: "2",
  //     name: "Name",
  //     message: "Lorem ipsum dolor sit amet...",
  //     time: "4:20PM",
  //     avatar: "/Chatify_Logo.svg?height=48&width=48",
  //     unread: true,
  //   },
  //   {
  //     id: "3",
  //     name: "Name",
  //     message: "Lorem ipsum dolor sit amet...",
  //     time: "1:15PM",
  //     avatar: "/Chatify_Logo.svg?height=48&width=48",
  //   },
  //   {
  //     id: "4",
  //     name: "Name",
  //     message: "Lorem ipsum dolor sit amet...",
  //     time: "2:17AM",
  //     avatar: "/Chatify_Logo.svg?height=48&width=48",
  //   },
  //   {
  //     id: "5",
  //     name: "Name",
  //     message: "Lorem ipsum dolor sit amet...",
  //     time: "5:54PM",
  //     avatar: "/Chatify_Logo.svg?height=48&width=48",
  //   },
  //   {
  //     id: "6",
  //     name: "Name",
  //     message: "Lorem ipsum dolor sit amet...",
  //     time: "3:20PM",
  //     avatar: "/Chatify_Logo.svg?height=48&width=48",
  //   },
  // ]
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [chats, setChats] = useState([])

  const getChats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/conversation/allPrivateConversation", {
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

    fetchData()
  }, [])

  console.log("Fetched chats:", chats)

  return (
    <div className="flex h-full">
      <div className="w-full md:w-96 h-full">
        <ChatList chats={chats} />
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center">
        <Logo />
      </div>
    </div>
  )
}
