"use client"

import { useState } from "react"
import { Send, Mic, Paperclip, Smile, MoreVertical, Phone, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"

interface Message {
  id: string
  content: string
  sent: boolean
  time: string
  status?: "sent" | "delivered" | "read"
}

interface ChatViewProps {
  chatId: string
  contact: {
    id: string
    name: string
    avatar?: string
    online?: boolean
  }
  messages: Message[]
}

export default function ChatView({ chatId, contact, messages: initialMessages }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            {contact.avatar ? (
              <AvatarImage src={contact.avatar || "/Chatify_Logo.svg"} alt={contact.name} />
            ) : (
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="ml-3">
            <h3 className="font-medium text-sm text-gray-800 dark:text-white">{contact.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{contact.online ? "Online" : "Offline"}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sent ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sent ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className="flex items-center justify-end mt-1 space-x-1">
                <span className="text-xs opacity-70">{message.time}</span>
                {message.sent && message.status === "read" && <span className="text-xs">✓✓</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500 dark:text-gray-400">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500 dark:text-gray-400">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message"
            className="flex-1 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500 dark:text-gray-400">
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
