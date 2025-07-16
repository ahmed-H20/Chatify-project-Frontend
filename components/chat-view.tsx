"use client"

import { useState, useEffect, useRef } from "react"
import { Send, CameraIcon, MoreVertical, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import Socket from "@/lib/socket"

const socket = Socket

interface Message {
  id: string
  content: string
  sent: "sent" | "received"
  time: string
  status?: "sent" | "delivered" | "read"
  isRead?: boolean
  translatedContent?: string
  translationLoading?: boolean
  translationType?: "text" | "audio"
}

interface ChatViewProps {
  chatId: string
  contact: {
    id: string
    name: string
    avatar?: string
    status: string
  }
}

export default function ChatView({ chatId, contact }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const currentUserId = useRef<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isLinkSafe, setIsLinkSafe] = useState<boolean | null>(null)
  const [linkCheckLoading, setLinkCheckLoading] = useState(false)
  const urlRegex = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/gi;

  useEffect(() => {
    currentUserId.current = localStorage.getItem("userId")
    socket.emit("register", currentUserId.current)
  }, [])

  useEffect(() => {
    if (!chatId) return

    socket.emit("joinRoom", {
      user1: currentUserId.current,
      user2: contact.id,
    })

    fetchMessages()

    socket.emit("readMessage", {
      senderId: currentUserId.current,
      receiverId: contact.id,
      userId: currentUserId.current,
    })

    socket.on("messageRead", ({ readerId, roomId }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.sent === "sent" ? { ...msg, isRead: true, status: "read" } : msg
        )
      )
    })
    
    return () => {
      socket.off("messageRead")
    }
  }, [chatId])

  useEffect(() => {
    const match = newMessage.match(urlRegex)
    if (match && match[0]) {
      setLinkCheckLoading(true)
      fetch("http://localhost:4000/api/link_classifier/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: match[0] }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLinkSafe(data.label == "Safe")
          setLinkCheckLoading(false)
        })      
        .catch((err) => {
          console.error("❌ Link check failed", err)
          setIsLinkSafe(false)
          setLinkCheckLoading(false)
        })
    } else {
      setIsLinkSafe(null) 
    }
}, [newMessage])


  useEffect(() => {
  socket.on("userTyping", ({ senderId }) => {
    if (senderId === contact.id) {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 3000) // اختفاء الكتابة بعد 3 ثواني
    }
  })

  return () => {
    socket.off("userTyping")
  }
}, [contact.id])


  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/conversation/privateConversation/${chatId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })

      const data = await res.json()

      const msgs = data.data.messages.map((msg: any) => ({
        id: msg._id,
        content: msg.message,
        sent: msg.senderId._id === currentUserId.current ? "sent" : "received",
        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: msg.isRead ? "read" : "delivered",
        isRead: msg.isRead,
      }))

      setMessages(msgs)
    } catch (err) {
      console.error("❌ Failed to fetch messages", err)
    }
  }

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      const senderId = msg?.senderId?._id || msg?.senderId

      if (!msg?.content) return
      if (senderId === currentUserId.current) return

      const newMsg: Message = {
        id: msg.id,
        content: msg.content,
        sent: "received",
        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "delivered",
        isRead: msg.isRead,
      }

      setMessages((prev) => [...prev, newMsg])
    })

    return () => {
      socket.off("receiveMessage")
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUserId.current) return

    try {
      const res = await fetch(`http://localhost:5000/api/v1/message/sendMessage/${contact.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          senderId: currentUserId.current,
          receiverId: contact.id,
          messageType: "text",
          message: newMessage,
          isRead: false,
        }),
      })

      const data = await res.json()

      const newMsg: Message = {
        id: data.data.id,
        content: newMessage,
        sent: "sent",
        time: new Date(data.data.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
      }

      setMessages((prev) => [...prev, newMsg])

      socket.emit("sendMessage", {
        senderId: currentUserId.current,
        receiverId: contact.id,
        message: newMessage,
      })

      setNewMessage("")
    } catch (error) {
      console.error("❌ Error sending message:", error)
    }
  }

  const handleTyping = () => {
    if (!currentUserId.current || !contact.id) return

    socket.emit("typing", {
      senderId: currentUserId.current,
      receiverId: contact.id,
    })
  }

  const handleTranslateMessage = async (
  index: number,
  lang: string,
  type: "text" | "audio"
) => {
  const msg = messages[index]
  if (!msg || !msg.content) return

  const updated = [...messages]
  updated[index] = {
    ...updated[index],
    translationLoading: true,
    translatedContent: undefined,
    translationType: type,
  }
  setMessages(updated)

  try {
    const endpoint = `http://localhost:4000/api/translator/${type === "audio" ? "?format=audio" : ""}`
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: msg.content, target_lang: lang }),
    })

    if (!res.ok) throw new Error("Translation failed")

    if (type === "audio") {
      const blob = await res.blob()
      const audioURL = URL.createObjectURL(blob)
      updated[index] = {
        ...updated[index],
        translatedContent: audioURL,
        translationLoading: false,
        translationType: "audio",
      }
    } else {
      const data = await res.json()
      const translated = data.translated_text || "No translation"
      updated[index] = {
        ...updated[index],
        translatedContent: translated,
        translationLoading: false,
        translationType: "text",
      }
    }

    setMessages([...updated])
  } catch (err) {
    console.error("❌ Translation error:", err)
    updated[index] = {
      ...updated[index],
      translatedContent: "⚠️ Failed to translate",
      translationLoading: false,
    }
    setMessages([...updated])
  }
}


  return (
    <div className="flex flex-col h-full bg-white dark:bg-black">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            {contact.avatar ? (
              <AvatarImage src={`${contact.avatar}?t=${Date.now()}`} alt={contact.name} />
            ) : (
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="ml-3">
            <h3 className="font-medium text-sm text-gray-800 dark:text-white">{contact.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isTyping ? (
                 " Typing.."
                ):
              contact.status === "online" ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />          
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sent === "sent" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] rounded-[1.5rem] p-3 ${
                msg.sent === "sent"
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              }`}
            >
              <div className="text-sm space-y-1">
                <p>{msg.content}</p>

                {msg.translationLoading ? (
                  <p className="italic text-xs text-gray-400">Translating...</p>
                ) : (
                  msg.translatedContent &&
                  (msg.translationType === "audio" ? (
                    <audio controls src={msg.translatedContent} className="w-full mt-1" />
                  ) : (
                    <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                      {msg.translatedContent}
                    </p>
                  ))
                )}

                {msg.sent === "received" && (
                  <div className="flex items-center gap-1 mt-1 flex-col lg:flex-row">
                    <select
                      className="text-xs p-1 border rounded bg-white dark:bg-gray-800"
                      onChange={(e) => handleTranslateMessage(index, e.target.value, "text")}
                      defaultValue=""
                    >
                      <option value="" disabled>Translate</option>
                      <option value="ar">🇸🇦 Arabic</option>
                      <option value="fr">🇫🇷 French</option>
                      <option value="de">🇩🇪 German</option>
                      <option value="es">🇪🇸 Spanish</option>
                    </select>

                    <select
                      className="text-xs p-1 border rounded bg-white dark:bg-gray-800"
                      onChange={(e) => handleTranslateMessage(index, e.target.value, "audio")}
                      defaultValue=""
                    >
                      <option value="" disabled>🔊</option>
                      <option value="ar">Arabic</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end mt-1 space-x-1">
                <span className="text-xs opacity-70">{msg.time}</span>
                {msg.sent === "sent" && (
                  <span className="text-xs">{msg.isRead === true ? "✓✓" : "✓"}</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500 dark:text-gray-400">
            <CameraIcon className="h-5 w-5" />
          </Button>
           <Input
            value={newMessage}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage()
            }}
            onChange={(e) => {
              setNewMessage(e.target.value)
              handleTyping()
            }}
            placeholder="Write a message"
            className={`flex-1 bg-gray-100 dark:bg-gray-800 border-2 transition-colors
              ${
                isLinkSafe === false
                  ? "border-red-500 focus:ring-red-500"
                  : isLinkSafe === true
                  ? "border-green-500 focus:ring-green-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
          />
       
          <Button
            onClick={handleSendMessage}
            disabled={
              !newMessage.trim() ||
              (isLinkSafe === false) || 
              linkCheckLoading
            }
            size="icon"
            className={`rounded-full text-white transition-all ${
              isLinkSafe === false
                ? "bg-red-500 cursor-not-allowed"
                : isLinkSafe === true
                ? "bg-green-600 hover:bg-green-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            <Send className="h-5 w-5" />
        </Button>
        </div>
      </div>
    </div>
  )
}
