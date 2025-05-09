import Image from "next/image"
// import { ThemeToggle } from "@/components/theme-toggle"

export default function Logo() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <Image
          src="/Chatify_Logo.svg?height=96&width=96"
          alt="Chatify Logo"
          width={96}
          height={96}
          className="object-contain"
        />
      </div>
      {/* <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-400 tracking-wider mt-2">CHATIFY</h1> */}
      <p className="text-sm text-gray-600 dark:text-gray-500 text-center mt-4 max-w-md">
        Your privacy and security are our top priority, with strong encryption for all your chats.
      </p>
      <div className="flex items-center mt-4 text-sm text-gray-600 dark:text-gray-500">
        <p>Your personal messages are end-to-end encrypted</p>
        <span className="ml-2">🔒</span>
      </div>
      {/* <div className="mt-6">
        <ThemeToggle />
      </div> */}
    </div>
  )
}
