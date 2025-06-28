// "use client";

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useState } from "react";


// const handleSubmit = (e) => {
//   e.preventDefault();
//   const email = e.target.email.value;

//   // Here you would typically send the email to your backend for processing
//   console.log("Email submitted for password reset:", email);
//   alert("Password reset code sent to " + email);
// }

// export default function ForgotPasswordPage() {
//    const [formData, setFormData] = useState({
//       email: ""
//     });


//   return (
//     <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password</h1>
//         <p className="text-gray-600 dark:text-gray-300">Enter your email to receive a password reset code</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <Input
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             type="email"
//             placeholder="Your email address"
//             className="w-full border-gray-300 dark:border-gray-600"
//           />
//         </div>
//         <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md">
//           Send Reset Code
//         </Button>
//       </form>

//       <div className="mt-6 text-center">
//         <p className="text-gray-600 dark:text-gray-300">
//           Remember your password?{" "}
//           <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({ email: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/forgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Something went wrong");
      }

      console.log("Reset email sent to:", formData.email);
      router.push("/verify"); // redirect to verify page
    } catch (error) {
      alert("error.message");
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password</h1>
        <p className="text-gray-600 dark:text-gray-300">Enter your email to receive a password reset code</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            type="email"
            placeholder="Your email address"
            required
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
  );
}
