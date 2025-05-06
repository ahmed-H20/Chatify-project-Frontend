import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password</h1>
        <p className="text-gray-600 dark:text-gray-300">Enter your email to receive a password reset code</p>
      </div>

      <form className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Your email address"
            className="w-full border-gray-300 dark:border-gray-600"
          />
        </div>
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md">
          Send Reset Code
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
