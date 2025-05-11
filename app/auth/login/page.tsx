'use client';
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
  email: string;
  password: string;
}

export default function LoginPage() {

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit = (data: Inputs) => {
    console.log(data)
  }


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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Log in</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">to your account</p>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input {...register("email", { required: true })} type="email" placeholder="Email" className="w-full border-gray-300 dark:border-gray-600" />
              </div>
              <div>
                <Input {...register("password", { required: true })} type="password" placeholder="Password" className="w-full border-gray-300 dark:border-gray-600" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" defaultChecked />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                  Forget Password?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md">
                Login
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="w-16 h-16">
                  <Image src="/qr-code.png" alt="QR Code" width={64} height={64} className="object-contain" />
                </div>
                <Button
                  variant="outline"
                  className="flex-1 ml-4 border border-gray-300 dark:border-gray-600 flex items-center justify-center py-2"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                    />
                  </svg>
                  Login with google
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Don.t have an account?{" "}
                <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
