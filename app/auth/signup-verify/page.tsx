"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function VerifyPage() {
  const [code, setCode] = useState(Array(6).fill(""))
  const [email, setEmail] = useState("")
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()

  // ✅ Get email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email")
    if (storedEmail) setEmail(storedEmail)
  }, [])

  // ✅ Handle input change
  const handleChange = (index: number, value: string) => {
    if (value.length > 1 || !/^\d?$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus()
    }
  }

 const handleConfirm = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6 || !/^\d{6}$/.test(verificationCode)) {
      alert("Please enter a valid 6-digit code");
      return;
    }

    try {
      const res = await fetch("https://chatify-project-backend.vercel.app/api/v1/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ verificationCode, email }),
      });

      if (!res.ok) throw new Error((await res.json()).message || "Verification failed");

      const result = await res.json();

      localStorage.setItem("token", result.token);
      localStorage.setItem("authUser", JSON.stringify(result.user));
      localStorage.setItem("userId", result.user._id);
      localStorage.setItem("email", result.email);

      router.push("/");
    } catch (error: any) {
      console.error("❌ Verification error:", error.message);
      alert(error.message || "Verification failed. Try again.");
    }
  };


  // ✅ Send again logic
  const handleResendCode = async () => {
    if (!email) {
      alert("No email found. Please sign up again.")
      return
    }

    try {
      setIsResending(true)
      const res = await fetch("https://chatify-project-backend.vercel.app/api/v1/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to resend code")

      alert("Code resent successfully! Check your email.")
    } catch (error: any) {
      alert(error.message || "Something went wrong.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Verify Your Email
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength={1}
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ))}
      </div>

      <Button
        onClick={handleConfirm}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md mb-4"
      >
        Confirm
      </Button>

      <div className="text-center text-sm text-gray-700 dark:text-gray-300">
        Didn’t receive a code?{" "}
        <button
          onClick={handleResendCode}
          disabled={isResending}
          className="text-indigo-600 hover:underline font-medium"
        >
          {isResending ? "Resending..." : "Send again"}
        </button>
      </div>
    </div>
  )
}
