"use client"

import type React from "react"
import { ChevronRight, Lock, User, MessageCircle, Bell, HelpCircle, UserPlus, LogOut } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useAuthStore } from "@/store/useAuthStore"
import { log } from "console"

interface SettingItem {
  icon: React.ElementType
  label: string
  href?: string
  description?: string
  onClick?: () => void | Promise<void>;
}

export default function SettingsList() {
  const { logout } = useAuthStore();

  const settings: SettingItem[] = [
    {
      icon: User,
      label: "Profile Name",
      description: "About",
      href: "/settings/profile",
    },
    {
      icon: Lock,
      label: "Privacy",
      href: "/settings/privacy",
    },
    {
      icon: MessageCircle,
      label: "Chats",
      href: "/settings/chats",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/settings/notifications",
    },    
    {
      icon: UserPlus,
      label: "Invite a friend",
      href: "/settings/invite",
    },
    {
  icon: LogOut,
  label: "Log out",
  // When the user clicks this option, run the logout function
     onClick: async () => {
    try {
      await logout(); // Call the logout function from useAuth
      window.location.href = "/auth/login"; // Redirect after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
    }
  }

  ]

  
  return (
    <div className="h-full flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Setting</h2>
        <ThemeToggle />
      </div>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <input
            placeholder="Search in setting"
            className="w-full p-2 pl-8 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-800 dark:text-white"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute left-2 top-3 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <Card className="p-4 my-4 flex items-center space-x-4 cursor-pointer mx-4">
             <Avatar>
               <AvatarImage src="/icons/user.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
               <p className="font-medium">Profile Name</p>
             <p className="text-sm text-gray-500">About</p>
          </div>
         </Card>
      
<div className="flex-1 overflow-auto">
  {settings.map((setting, index) =>
    setting.href ? (
      <Link href={setting.href} key={index}>
        <div className="flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <setting.icon className="h-4 w-4 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-sm text-gray-800 dark:text-white">{setting.label}</h3>
              {setting.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{setting.description}</p>
              )}
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
      </Link>
    ) : (
      <button
        key={index}
        onClick={setting.onClick}
        className="w-full text-left flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer bg-transparent border-none"
        type="button"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <setting.icon className="h-4 w-4 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-sm text-gray-800 dark:text-white">{setting.label}</h3>
            {setting.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400">{setting.description}</p>
            )}
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </button>
    )
  )}
</div>

    </div>
  )


}
// "use client";

// import React from "react";
// import Link from "next/link";
// import { ChevronRight, Lock, User, MessageSquare, Bell, HelpCircle, Heart, LogOut } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card } from "@/components/ui/card";
// import { ThemeToggle } from "@/components/theme-toggle";

// interface SettingItem {
//   icon: React.ElementType;
//   label: string;
//   href?: string;
//   description?: string;
//   onClick?: () => void | Promise<void>;
// }

// const Profile = () => {
//   const settings: SettingItem[] = [
//     {
//       icon: User,
//       label: "Profile Name",
//       description: "About",
//       href: "/settings/profile",
//     },
//     {
//       icon: Lock,
//       label: "Privacy",
//       href: "/settings/privacy",
//     },
//     {
//       icon: MessageSquare,
//       label: "Chats",
//       href: "/settings/chats",
//     },
//     {
//       icon: Bell,
//       label: "Notifications",
//       href: "/settings/notifications",
//     },
//     {
//       icon: HelpCircle,
//       label: "Help",
//       href: "/settings/help",
//     },
//     {
//       icon: Heart,
//       label: "Invite a friend",
//       href: "/settings/invite",
//     },
//     {
//       icon: LogOut,
//       label: "Log out",
//       onClick: async () => {
//         try {
//           await fetch("http://localhost:5001/api/auth/logout", {
//             method: "POST",
//             credentials: "include",
//           });
//           localStorage.removeItem("email");
//           window.location.href = "/auth/login";
//         } catch (error) {
//           console.error("Logout failed:", error);
//           alert("Logout failed. Please try again.");
//         }
//       },
//     },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-[#1e1e1e]">
//       <div className="w-80 bg-white dark:bg-[#2c2c2c] p-4 flex flex-col justify-between rounded-r-2xl shadow-lg">
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Setting</h2>
//             <ThemeToggle />
//           </div>
//           <div className="relative mb-4">
//             <input
//               placeholder="Search in setting"
//               className="w-full p-2 pl-8 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-800 dark:text-white"
//             />
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 absolute left-2 top-3 text-gray-500 dark:text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
          
//           <Card className="p-4 mb-4 flex items-center space-x-4 cursor-pointer">
//             <Avatar>
//               <AvatarImage src="/avatar.jpg" />
//               <AvatarFallback>JD</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-medium">Profile Name</p>
//               <p className="text-sm text-gray-500">About</p>
//             </div>
//           </Card>

//           <div className="flex-1 overflow-auto space-y-1">
//             {settings.map((setting, index) =>
//               setting.href ? (
//                 <Link href={setting.href} key={index}>
//                   <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                     <div className="flex items-center">
//                       <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//                         <setting.icon className="h-4 w-4 text-gray-500 dark:text-gray-300" />
//                       </div>
//                       <div className="ml-3">
//                         <h3 className="font-medium text-sm text-gray-800 dark:text-white">{setting.label}</h3>
//                         {setting.description && (
//                           <p className="text-xs text-gray-500 dark:text-gray-400">{setting.description}</p>
//                         )}
//                       </div>
//                     </div>
//                     <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                   </div>
//                 </Link>
//               ) : (
//                 <button
//                   key={index}
//                   onClick={setting.onClick}
//                   className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer bg-transparent border-none"
//                 >
//                   <div className="flex items-center">
//                     <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//                       <setting.icon className="h-4 w-4 text-gray-500 dark:text-gray-300" />
//                     </div>
//                     <div className="ml-3">
//                       <h3 className="font-medium text-sm text-gray-800 dark:text-white">{setting.label}</h3>
//                       {setting.description && (
//                         <p className="text-xs text-gray-500 dark:text-gray-400">{setting.description}</p>
//                       )}
//                     </div>
//                   </div>
//                   <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                 </button>
//               )
//             )}
//           </div>
//         </div>
//       </div>      
//     </div>
//   );
// };
