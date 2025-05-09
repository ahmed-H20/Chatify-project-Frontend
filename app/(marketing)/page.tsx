import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Chat with your friends</h1>
          <p className="text-lg text-gray-700">Start chatting with your friends and family with chatify</p>
          <Button
            asChild
            size="lg"
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-6 text-lg rounded-md"
          >
            <Link href="/login">Get Started</Link>
          </Button>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-md">
            <Image
              src="/images/woman-chat.png"
              alt="Person chatting on Chatify"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
