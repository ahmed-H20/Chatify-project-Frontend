import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignUpPage() {
  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-blue-50 dark:bg-gray-700 p-8 flex items-center justify-center">
          <div className="max-w-sm">
            <Image
              src="/login-panner.png"
              alt="Authentication"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign up</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">to creat account</p>

            <form className="space-y-4">
              <div>
                <Input type="text" placeholder="User name" className="w-full border-gray-300 dark:border-gray-600" />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Your phone"
                  className="w-full border-gray-300 dark:border-gray-600 border-purple-500 ring-2 ring-purple-500"
                />
              </div>
              <div>
                <Input type="email" placeholder="Your email" className="w-full border-gray-300 dark:border-gray-600" />
              </div>
              <div>
                <Input type="password" placeholder="Password" className="w-full border-gray-300 dark:border-gray-600" />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="confirm Password"
                  className="w-full border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" defaultChecked />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md">
                Sign up
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
