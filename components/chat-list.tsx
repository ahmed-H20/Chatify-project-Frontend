"use client "

import { MessageCircle, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface ChatPreview {
  id: string
  name: string
  message: string
  time: string
  avatar: string
  unread?: boolean
}

interface ChatListProps {
  chats: ChatPreview[]
}



export default function ChatList({ chats }: ChatListProps) {
  return (
    <div className="h-full flex flex-col border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-2xl ml-2">
      <div className="p-4 flex items-center justify-between border-gray-200 dark:border-gray-800 ">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Chats</h2>
        <Button size="icon" variant="ghost" className="rounded-full text-gray-500 dark:text-gray-400">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      
       <div className="p-4 border-b ">
          <div className="relative ">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search"
              className="pl-9 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>     

      {/* Ai boot */}
      <div className="flex-1 overflow-auto">
        <Link href="#"> 
          <div className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <img
                  src="/icons/AI-icon.png"
                  alt="AI-icon"
                  className="w-full h-full object-cover"
                />                  
              </div>
              <div className="absolute top-0 right-0 w-3 h-3 bg-indigo-500 rounded-full"></div>
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-sm text-gray-800 dark:text-white">My Frind</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">6:00 AM</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Hello iam AI</p>
            </div>
          </div>
          <hr />
          <Tabs defaultValue="all" className="px-4 pt-4 bg-white dark:bg-black dark:text-white">
            <TabsList className="grid grid-cols-3 h-9 gap-3 rounded-2xl bg-white dark:bg-black dark:text-white p-0 shadow-none">
              <TabsTrigger
                value="all"
                className="text-xs text-black dark:text-white data-[state=active]:bg-[#341F97] data-[state=active]:text-white data-[state=active]:rounded-md"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="text-xs text-black dark:text-white data-[state=active]:bg-[#341F97] data-[state=active]:text-white data-[state=active]:rounded-md"
              >
                Unread
              </TabsTrigger>
              
              <TabsTrigger
                value="archived"
                className="text-xs text-black dark:text-white data-[state=active]:bg-[#341F97] data-[state=active]:text-white data-[state=active]:rounded-md"
              >
                Group
              </TabsTrigger>
            </TabsList>
          </Tabs>

        {/* Chats */}
        </Link>        
        {chats.map((chat , index) => (          
          <Link href={`/chat/${chat.id}`} key={index}>
            <div className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {chat.avatar ? (
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <MessageCircle className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                {chat.unread && <div className="absolute top-0 right-0 w-3 h-3 bg-indigo-500 rounded-full"></div>}
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm text-gray-800 dark:text-white">{chat.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{chat.message}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
