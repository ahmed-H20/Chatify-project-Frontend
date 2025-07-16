"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function VerifyPage() {
  const [code, setCode] = useState(Array(6).fill(""))
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const searchParams = useSearchParams()
    const router = useRouter()

  useEffect(() => {
    const emailFromUrl = searchParams.get("email")
    if (emailFromUrl) setEmail(emailFromUrl)
  }, [searchParams])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleSubmit = async () => {
    const resetCode = code.join("")

    if (resetCode.length !== 6 || !email) {
      alert("Please enter the full 6-digit code and make sure your email is correct.")
      return
    }

    try {
      setLoading(true)
      const res = await fetch("http://localhost:5000/api/v1/auth/verifyResetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetCode }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Verification failed")

      alert("✅ Code verified successfully")

      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`)

    } catch (err: any) {
      alert(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Please check your email and enter the code
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Email: {email}</p>
      </div>

      <div className="flex justify-center space-x-3 mb-8">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ))}
      </div>

      <Button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md mb-6"
        disabled={loading || code.join("").length !== 6}
      >
        {loading ? "Verifying..." : "Confirm"}
      </Button>

      <div className="text-center">
        <p className="text-gray-700 dark:text-gray-300">
          Didn’t receive a message?{" "}
          <Link href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Send again
          </Link>
        </p>
      </div>
    </div>
  )
}
