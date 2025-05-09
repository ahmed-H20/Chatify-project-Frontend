import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 bg-[url('/images/pattern-light.png')]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1 relative flex justify-center md:justify-start">
          <div className="relative w-full max-w-md">
            <Image
              src="/images/woman-phone.png"
              alt="Person using Chatify"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>

        <div className="space-y-6 order-1 md:order-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About us</h1>
          <p className="text-lg text-gray-700">
            Stay connected with your friends and family anytime, anywhere. Communicate easily and securely with those
            who matter to you, through text messages, voice, and video calls
          </p>
          <Button
            asChild
            size="lg"
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-6 text-lg rounded-md"
          >
            <Link href="/contact">Learn more</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
