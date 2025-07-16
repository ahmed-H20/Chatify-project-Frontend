
"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailFromUrl = searchParams.get("email")
    if (emailFromUrl) setEmail(emailFromUrl)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password || !confirmPassword) {
      return alert("Please fill all fields")
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match")
    }

    try {
      setLoading(true)
      const res = await fetch("http://localhost:5000/api/v1/auth/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }),
      })


      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Reset failed")

      alert("✅ Password reset successfully")
      router.push("/auth/login")
    } catch (err: any) {
      alert(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Reset Your Password
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-gray-300 dark:border-gray-600"
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border-gray-300 dark:border-gray-600"
        />
        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  )
}
