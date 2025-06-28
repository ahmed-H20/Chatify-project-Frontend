"use client"
import React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


export default function VerifyPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [email, setEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    const storedEmail = localStorage.getItem("email")    
    if (storedEmail) {
      setEmail(storedEmail)
    }      
    }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  //  const handleConfirm = async() => {
  //   try {      
  //     const res = await fetch("https://chat-app-pi-livid-13.vercel.app/api/v1/auth/verify-email", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       verificationCode: code,
  //      }),
  //   })
  //   if (!res.ok) {
  //     const error = await res.json()
  //     throw new Error(error.message || "Verification failed")
  //   }

  //   const result = await res.json()

  //   if (result.token) {
  //     localStorage.setItem("token", result.token)
  //   }

    
    
  //   console.log("Verification successful:", result)
  //   return result
  // } catch (error: any) {
  //   console.error("Verification error:", error.message)
  //   throw error
  // }
  // }


  const handleConfirm = async () => {
  // Join the code array into a single string
  const verificationCode = code.join("");

  // Check if the code is exactly 6 digits
  if (verificationCode.length !== 6 || !/^\d{6}$/.test(verificationCode)) {
    alert("Please enter a valid 6-digit verification code");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/v1/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        verificationCode,
        email, // Include the email in the request 
      }), 
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Verification failed");
    }

    const result = await res.json();

    if (result.token) {
      localStorage.setItem("token", result.token);
    }

    console.log("Verification successful:", result);
    router.push("/dashboard"); // Or wherever you want to redirect after success
  } catch (error: any) {
    console.error("Verification error:", error.message);
    alert(error.message || "Verification failed. Please try again.");
  }
};


  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Please check your email and enter the code to verify your account
        </h1>
      </div>

      <div className="flex justify-center space-x-6 mb-8">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-16 h-16 text-center text-2xl font-bold border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ))}
      </div>

      <Button onClick={handleConfirm} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md mb-6">
        Confirm
      </Button>

      <div className="text-center">
        <p className="text-gray-700 dark:text-gray-300">
          Didn.t recieve a message?{" "}
          <Link href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Send again
          </Link>
        </p>
      </div>
    </div>
  )
}
