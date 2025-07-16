"use client"

import { useEffect, useState } from "react"
import Socket from "@/lib/socket" // تأكد إن ده هو ملف الـ Socket عندك

const socket = Socket

export default function TestSocket() {
  const [msg, setMsg] = useState("")
  const [received, setReceived] = useState<string[]>([])

  const userId = "test-1"
  const otherUserId = "test-2"

  useEffect(() => {
    // تسجيل الدخول وربط الغرفة
    socket.emit("register", userId)
    socket.emit("joinRoom", { user1: userId, user2: otherUserId })

    // استقبال الرسائل
    socket.on("receiveMessage", (data) => {
      console.log("📩 Received:", data)
      setReceived((prev) => [...prev, data.content])
    })

    return () => {
      socket.off("receiveMessage")
    }
  }, [])

  const handleSend = () => {
    if (!msg.trim()) return

    console.log("📤 Sending:", {
        senderId: userId,
        receiverId: otherUserId,
        message: msg,
    })

    socket.emit("sendMessage", {
      senderId: userId,
      receiverId: otherUserId,
      message: msg,
    })



    setMsg("")
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold text-center">🔌 Test Socket Chat</h2>

      <input
        type="text"
        placeholder="اكتب رسالة"
        className="border p-2 w-full rounded dark:bg-gray-800 dark:text-white"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        إرسال
      </button>

      <div className="mt-4">
        <h3 className="font-semibold">📥 الرسائل المستلمة:</h3>
        <ul className="space-y-1 text-sm">
          {received.map((r, i) => (
            <li key={i} className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
