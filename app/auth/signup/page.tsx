'use client';

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function SignUpPage() {
  const { authUser, isCheckingAuth, checkAuth,  signup} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  type Inputs = {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
  

const onSubmit: SubmitHandler<Inputs> = async (data) => {
  console.log("Form submitted:", data);

  try {
    // Set loading state if needed (optional)
    // Example: setIsSigningUp(true);

    // Send POST request using Fetch API
    const response = await fetch("http://localhost:5000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // If you use cookies (for sessions), include credentials:
        credentials: "include",
      },
      body: JSON.stringify(data),
    });

    // Check if response is ok (status code 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }

    // Get response data
    const resData = await response.json();
    
    // Example: set auth user if needed (simulate set({ authUser: resData }))
    console.log("User signed up:", resData);

    localStorage.setItem("email", data.email);


    // Show success message
    alert("Account created successfully");

    // Optional: connect to socket if needed
    // get().connectSocket();

    // Navigate to verification page
    router.push("/auth/signup-verify");

  } catch (error) {
    // Show error message
    alert("Signup failed. Please try again.");
    console.error("Signup error:", error);
  } finally {
    // Reset loading state if needed
    // Example: setIsSigningUp(false);
  }
};

 
  return (
    <>
  <div className="w-full h-screen flex overflow-hidden">
    {/* Left Side - Fixed Image */}
    <div className="w-1/2 h-full hidden md:block">
      <Image
        src="/login-panner.png"
        alt="Authentication"
        width={800}
        height={800}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right Side - Form */}
    <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8 overflow-y-auto">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Sign up</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">Create your account</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("name", { required: true })} type="text" placeholder="User name" />
          <Input {...register("phone", { required: true })} type="tel" placeholder="Phone number" />
          <Input {...register("email", { required: true })} type="email" placeholder="Email" />
          <Input {...register("password", { required: true })} type="password" placeholder="Password" />
          <Input {...register("confirmPassword", { required: true })} type="password" placeholder="Confirm Password" />

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" defaultChecked />
            <label htmlFor="remember" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Sign up
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  </div>
</>
  );
}
