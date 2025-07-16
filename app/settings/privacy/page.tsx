"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function PrivacySettings() {
  const [photoVisibility, setPhotoVisibility] = useState("everyone")
  const [canAddMe, setCanAddMe] = useState("everyone")
  const [canMessageMe, setCanMessageMe] = useState("everyone")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:5000/api/v1/settings/privacy", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("Failed to fetch settings")

        const data = await res.json()
        const settings = data.data

        setPhotoVisibility(settings.photoVisibility || "everyone")
        setCanAddMe(settings.canAddMe || "everyone")
        setCanMessageMe(settings.canMessageMe || "everyone")
      } catch (err) {
        console.error("Error fetching settings:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/api/v1/settings/privacy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          photoVisibility,
          canAddMe,
          canMessageMe,
        }),
      })
      if (!res.ok) throw new Error("Failed to save settings")
      alert("Privacy settings updated ✅")
    } catch (err) {
      console.error(err)
      alert("Failed to update settings")
    }
  }

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading settings...</div>
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg bg-white dark:bg-black space-y-6">
      <h2 className="text-xl font-semibold">Privacy Settings</h2>

      <div>
        <Label>Who can see my profile photo?</Label>
        <Select value={photoVisibility} onValueChange={setPhotoVisibility}>
          <SelectTrigger>
            <SelectValue placeholder="Select visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="everyone">Everyone</SelectItem>
            <SelectItem value="contacts">Contacts only</SelectItem>
            <SelectItem value="no_one">No one</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Who can add me?</Label>
        <Select value={canAddMe} onValueChange={setCanAddMe}>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="everyone">Everyone</SelectItem>
            <SelectItem value="friends_only">Friends only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Who can message me?</Label>
        <Select value={canMessageMe} onValueChange={setCanMessageMe}>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="everyone">Everyone</SelectItem>
            <SelectItem value="contacts">Contacts only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full" onClick={handleSave}>Save Settings</Button>
    </div>
  )
}
