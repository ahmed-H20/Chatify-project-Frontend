"use client"

import ChatList from "@/components/chat-list"
import ChatView from "@/components/chat-view"
import { useEffect, useState } from "react";

export default function ChatPage({ params }: { params: { id: string } }) {
  
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const [chats, setChats] = useState([])
    const [messagesId, setMessagesId] = useState([])
    const [messages, setMessages] = useState<Array<{
      id: string;
      content: string;
      sent: boolean;
      time: string;
      status?: string;
    }>>([])

    // Get all chats
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
    
    // Get conversation data
    const getConversationData = async (chatId: string) => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/conversation/privateConversation/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch conversation data");

        const data = await response.json();
        setMessagesId(data.data.messages);

        const messagesRes = await Promise.all(
          data.data.messages.map(async (messageObj: any) => {
            const res = await fetch(`http://localhost:5000/api/v1/message/getMessage/${messageObj._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const msgData = await res.json();

            return {
              id: msgData.data.id,
              content: msgData.data.content || "",
              sent: msgData.data.senderId?.id !== chatId,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              status: msgData.data.userSeen ? "read" : "sent",
            };
          })
        );
        setMessages(messagesRes);
      } catch (error) {
        console.error(error);
        return [];
      }
    };


  // Start Fetching when page loads
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
    fetchData();
    if (params.id) {
      getConversationData(params.id)
    }
    }, [])

  console.log("Chats fetched:", chats);
  console.log("messages", messages)

  const contact = {
    id: params.id,
    name: "Name",
    avatar: "/Chatify_Logo.svg?height=48&width=48",
    online: true,
  }

   

  return (
    <div className="flex h-full">
      <div className="w-96 h-full border-r border-gray-800">
        <ChatList chats={chats} />
      </div>
      <div className="flex-1 h-full">
        <ChatView chatId={params.id} contact={contact} messagesId={messagesId} />
      </div>
    </div>
  )
}
