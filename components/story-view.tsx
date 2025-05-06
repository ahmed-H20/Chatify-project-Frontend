"use client"

import { useState } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, MessageCircle, Pause, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

interface StoryViewProps {
  story: {
    id: string
    user: {
      id: string
      name: string
      avatar?: string
    }
    content: string
    timestamp: string
  }
  onPrevious?: () => void
  onNext?: () => void
}

export default function StoryView({ story, onPrevious, onNext }: StoryViewProps) {
  const [isPaused, setIsPaused] = useState(false)
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-black flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleClose} className="mr-2 text-gray-500 dark:text-gray-400">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            {story.user.avatar ? (
              <AvatarImage src={story.user.avatar || "/Chatify_Logo.svg"} alt={story.user.name} />
            ) : (
              <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <span className="ml-2 text-sm font-medium text-gray-800 dark:text-white">{story.user.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
            <Pause className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
            <Play className="h-5 w-5 opacity-50" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-500 dark:text-gray-400">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        <Button variant="ghost" className="absolute left-0 h-full w-1/4 opacity-0 z-10" onClick={onPrevious}>
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <div className="text-center p-8 max-w-lg">
          <p className="text-3xl font-arabic text-gray-800 dark:text-white">{story.content}</p>
        </div>

        <Button variant="ghost" className="absolute right-0 h-full w-1/4 opacity-0 z-10" onClick={onNext}>
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

      <div className="p-4 flex items-center space-x-2 border-t border-gray-200 dark:border-gray-800">
        <Button variant="ghost" size="icon" className="rounded-full text-gray-500 dark:text-gray-400">
          <Heart className="h-5 w-5" />
        </Button>
        <div className="flex-1 relative">
          <MessageCircle className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Reply"
            className="pl-9 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>
        <Button size="icon" className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
