"use client"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AIChatView() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const startChat = async () => {
      const res = await fetch("http://localhost:4000/api/start_chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Ahmed",
          email: "ahmed@example.com",
          language: "en",
          age_range: "22-25",
        }),
      })
      const data = await res.json()
      setSessionId(data.session_id)
    }

    startChat()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return

    const userMessage = { sender: "you", text: input }
    setMessages((prev) => [...prev, userMessage])

    setInput("")

    const res = await fetch(`http://localhost:4000/api/chat/${sessionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    })
    const data = await res.json()

    const botMessage = { sender: "ai", text: data.response }
    setMessages((prev) => [...prev, botMessage])
  }

  return (
    <div className="flex flex-col h-[90vh] max-w-2xl mx-auto p-4 border rounded-xl shadow-sm dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <Card
            key={i}
            className={`p-2 max-w-[80%] ${
              msg.sender === "you" ? "ml-auto bg-blue-100 dark:bg-blue-900 text-right" : "mr-auto bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {msg.text}
          </Card>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2 pt-4">
                 
        <Input
          placeholder="اكتب رسالة للذكاء الاصطناعي..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
