"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Mic, StopCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import AudioRecorder from "@/components/AudioRecorder"

interface Message {
  sender: "you" | "ai"
  type: "text" | "audio"
  content: string
}

export default function AIChatView() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [outputMode, setOutputMode] = useState<"text" | "audio">("text")
  const [recording, setRecording] = useState(false)
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // ✅ Start session
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

  // ✅ Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  // ✅ Send message (text)
  const sendMessage = async () => {
    if (!sessionId || !input.trim() || loading) return

    const message = input
    setInput("")
    setMessages((prev) => [...prev, { sender: "you", type: "text", content: message }])
    setLoading(true)

    try {
      const endpoint = `http://localhost:4000/api/chat/${sessionId}${outputMode === "audio" ? "?format=audio" : ""}`
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      if (outputMode === "audio") {
        const blob = await res.blob()
        const audioURL = URL.createObjectURL(blob)
        setMessages((prev) => [...prev, { sender: "ai", type: "audio", content: audioURL }])
      } else {
        const data = await res.json()
        setMessages((prev) => [...prev, { sender: "ai", type: "text", content: data.response || "No reply" }])
      }
    } catch (err) {
      console.error("❌ Error sending message:", err)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Send audio
  const handleAudioRecorded = async (blob: Blob) => {
    if (!sessionId) return

    const audioURL = URL.createObjectURL(blob)
    setMessages((prev) => [...prev, { sender: "you", type: "audio", content: audioURL }])
    setLoading(true)

    try {
      const endpoint = `http://localhost:4000/api/chat/${sessionId}${outputMode === "audio" ? "?format=audio" : ""}`
      const formData = new FormData()
      formData.append("audio", blob, "recording.wav")

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      })

      if (outputMode === "audio") {
        const replyBlob = await res.blob()
        const replyURL = URL.createObjectURL(replyBlob)
        setMessages((prev) => [...prev, { sender: "ai", type: "audio", content: replyURL }])
      } else {
        const data = await res.json()
        setMessages((prev) => [...prev, { sender: "ai", type: "text", content: data.response || "No reply" }])
      }
    } catch (err) {
      console.error("❌ Error sending audio:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[90vh] max-w-2xl mx-auto p-4 border rounded-xl shadow-sm dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center pb-2">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">🤖 AI Chat</h2>
        <select
          value={outputMode}
          onChange={(e) => setOutputMode(e.target.value as "text" | "audio")}
          className="border rounded p-1 text-sm dark:bg-gray-800 dark:text-white"
        >
          <option value="text">Text Output</option>
          <option value="audio">Audio Output</option>
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <Card
            key={i}
            className={`p-2 max-w-[80%] text-sm ${
              msg.sender === "you"
                ? "ml-auto bg-blue-100 dark:bg-blue-900 text-right"
                : "mr-auto bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {msg.type === "text" ? (
              msg.content
            ) : (
              <audio controls src={msg.content} className="w-full" />
            )}
          </Card>
        ))}
        {loading && (
          <Card className="p-2 max-w-[80%] mr-auto bg-gray-100 dark:bg-gray-800 text-sm italic text-gray-500">
            Thinking...
          </Card>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input & controls */}
      <div className="flex gap-2 pt-4">
        <Input
          placeholder="اكتب رسالة..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1"
        />
        {/* <Button
          onClick={() => setRecording((prev) => !prev)}
          variant="outline"
          className="rounded-full"
        >
          {recording ? <StopCircle className="w-5 h-5 text-red-600" /> : <Mic className="w-5 h-5" />}
        </Button> */}
        <Button onClick={sendMessage} disabled={!input.trim() || loading}>
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Recorder Component */}
      {recording && (
        <AudioRecorder stopRecording={!recording} onAudioRecorded={handleAudioRecorded} />
      )}
    </div>
  )
}
