// "use client"

// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import { MessageCircle, Settings, Phone, RotateCcw, User } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { ThemeToggle } from "@/components/theme-toggle"

// export default function Sidebar() {
//   const pathname = usePathname()

//   // const routes = [
//   //   {
//   //     icon: MessageCircle,
//   //     href: "/",
//   //     active: pathname === "/" || pathname.includes("/chat"),
//   //   },
//   //   {
//   //     icon: RotateCcw,
//   //     href: "/history",
//   //     active: pathname === "/history",
//   //   },
//   //   {
//   //     icon: Phone,
//   //     href: "/calls",
//   //     active: pathname === "/calls",
//   //   },
//   //   {
//   //     icon: Settings,
//   //     href: "/settings",
//   //     active: pathname === "/settings",
//   //   },
//   // ]
//   const routes = [
//   {
//     icon: "/icons/message.svg",
//     href: "/",
//     active: pathname === "/" || pathname.includes("/chat"),
//   },
//   {
//     icon: "/icons/history.svg",
//     href: "/history",
//     active: pathname === "/history",
//   },
//   {
//     icon: "/icons/call.svg",
//     href: "/calls",
//     active: pathname === "/calls",
//   },
//   {
//     icon: "/icons/settings.svg",
//     href: "/settings",
//     active: pathname === "/settings",
//   },
// ]


//   return (
//     <div className="flex flex-col items-center w-16 h-full dark:bg-black dark:border-gray-800">
//       {/* <div className="flex items-center justify-center h-16 w-16">
//         <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xs">
//           <img src="/Chatify_Logo.svg" alt="" />
//         </div>
//       </div> */}
//       <div className="flex-1 flex flex-col items-center gap-6 py-8">
//         {routes.map((route, index) => (
//           <Link
//             key={index}
//             href={route.href}
//             className={cn(
//               "flex items-center justify-center w-10 h-10 rounded-full",
//               route.active
//                 ? "text-indigo-500"
//                 : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
//             )}
//           >
//             <route.icon size={24} />
//           </Link>
//         ))}
//       </div>
//       <div className="flex flex-col items-center gap-4 mb-8">
//         <ThemeToggle />
//         <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
//           <User size={20} className="text-gray-500 dark:text-gray-300" />
//         </div>
//       </div>
//     </div>
//   )
// }

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
      icon: "/icons/calls.png",
      href: "/calls",
      active: pathname === "/calls",
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
