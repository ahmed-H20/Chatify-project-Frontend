"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Sidebar() {
  const pathname = usePathname()
  
  const routes = [
    {
      icon: "/icons/chat-icon.png",
      href: "/",
      active: pathname === "/" || pathname.includes("/chat"),
    },
    {
      icon: "/icons/status2-icon.png",
      href: "/history",
      active: pathname === "/history",
    },
    {
      icon: "/icons/AI-icon.png",
      label: "Chatbot",
      href: "/Aichat",
    },
    {
      icon: "/icons/settings.png",
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div className="flex flex-col items-center w-16 h-full dark:bg-black dark:border-gray-800">
      <div className="flex-1 flex flex-col items-center gap-6 py-8">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.href}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full mb-2",
              route.active
                ? "text-indigo-500 bg-indigo-100 dark:bg-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            <Image
              src={route.icon}
              alt={`icon-${index}`}
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 mb-8">
        <ThemeToggle />
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          <User size={20} className="text-gray-500 dark:text-gray-300" />
        </div>
      </div>
    </div>
  )
}
