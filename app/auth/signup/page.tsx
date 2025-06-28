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
  

// const onSubmit: SubmitHandler<Inputs> = async (data) => {
//   console.log("Form submitted:", data);
//   try {
//     //  const signupData = {
//     //   email: data.email,
//     //   fullName: data.name, 
//     //   password: data.password,
//     // };
//     const signed = await signup(data);
//     if(!signed) {
//       alert("Signup failed. Please try again.");
//       return;
//     }
//     router.push("/auth/signup-verify");
//   } catch (error) {
//     console.error("Signup failed:", error);
//     alert("Signup failed. Please try again.");
//   }
// };

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Sign up</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">to create account</p>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input {...register("name", { required: true })} type="text" placeholder="User name" className="w-full border-gray-300 dark:border-gray-600" />
                </div>
                <div>
                  <Input
                    {...register("phone", { required: true })}
                    type="tel"
                    placeholder="Your phone"
                    className="w-full border-gray-300 dark:border-gray-600 border-purple-500 ring-2 ring-purple-500"
                  />
                </div>
                <div>
                  <Input {...register("email", { required: true })} type="email" placeholder="Your email" className="w-full border-gray-300 dark:border-gray-600" />
                </div>
                <div>
                  <Input {...register("password", { required: true })} type="password" placeholder="Password" className="w-full border-gray-300 dark:border-gray-600" />
                </div>
                <div>
                  <Input
                    {...register("confirmPassword", { required: true })}
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
    </>
  );
}
