"use client";

import { MessageCircle, Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  message?: string;
  time?: string;
  unread?: boolean;
}

interface ChatListProps {
  chats: ChatPreview[];
}

export default function ChatList({ chats }: ChatListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChats, setFilteredChats] = useState<ChatPreview[]>(chats);
  const [externalResults, setExternalResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredChats(chats);
        setExternalResults([]);
        return;
      }

      // Step 1: Search locally
      const local = chats.filter((chat) =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChats(local);

      // Step 2: If no results, search via API
      if (local.length === 0) {
        searchFromAPI();
      } else {
        setExternalResults([]); // hide old results
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm, chats]);

  const searchFromAPI = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://chatify-project-backend.vercel.app/api/v1/user/search?query=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setExternalResults(data.data || []);
    } catch (err) {
      console.error("Error searching user", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartChat = async (userId: string) => {
    try {
      const res = await fetch(`https://chatify-project-backend.vercel.app/api/v1/conversation/accessPrivateConversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data?.data?._id) {
        window.location.href = `/chat/${data.data._id}`;
      }
    } catch (err) {
      console.error("Error starting chat", err);
    }
  };

  return (
    <div className="h-full flex flex-col border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-2xl ml-2">
      <div className="p-4 flex items-center justify-between border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Chats</h2>
      
      </div>

      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search in your chats or start new..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* AI Chat */}
        <Link href="/Aichat">
          <div className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <img src="/icons/AI-icon.png" alt="AI-icon" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-0 right-0 w-3 h-3 bg-indigo-500 rounded-full"></div>
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-sm text-gray-800 dark:text-white">My Friend</h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Hello I am AI</p>
            </div>
          </div>
        </Link>

        {/* Chats from local filter */}
        {filteredChats.map((chat, index) => (
          <Link href={`/chat/${chat.id}`} key={index}>
            <div className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {chat.avatar ? (
                    <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                  ) : (
                    <MessageCircle className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                {chat.unread && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-indigo-500 rounded-full"></div>
                )}
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

        {/* External search fallback if no chat matched */}
        {filteredChats.length === 0 && externalResults.length > 0 && (
          <div className="p-4">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Other users found:
            </h4>
            <ul className="space-y-2">
              {externalResults.map((user) => (
                <li key={user._id} className="flex justify-between items-center border p-2 rounded">
                  <span>{user.name}</span>
                  <Button size="sm" onClick={() => handleStartChat(user._id)}>
                    Start Chat
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {loading && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 p-2">Searching...</p>
        )}
      </div>
    </div>
  );
}
