"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("Please fill in all fields")
    }

    if (newPassword !== confirmPassword) {
      return alert("New passwords do not match")
    }

    try {
      setLoading(true)
      const token = localStorage.getItem("token") // لو بتستخدم توكن في localStorage
      const res = await fetch("https://chatify-project-backend.vercel.app/api/v1/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Failed to change password")

      alert("✅ Password changed successfully")
    } catch (err: any) {
      alert(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Change Your Password
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Password"}
        </Button>
      </form>
    </div>
  )
}
