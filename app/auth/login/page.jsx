// 'use client';

// import { useState } from "react";
// import { useAuthStore } from "../../../store/useAuthStore";
// import Link from "next/link";
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const { login, isLoggingIn } = useAuthStore();

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://localhost:5000/api/v1/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//       credentials: "include", // Include if you're using cookies (optional)
//     });

//     const data = await response.json();

//     if (response.ok) {
//       // Save token or user data to localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("authUser", JSON.stringify(data.user));

//       // Redirect to home page
//       window.location.href = "/";
//     } else {
//       // Handle login failure
//       console.error("Login failed:", data.message);
//       alert(data.message || "Login failed. Please try again.");
//     }
//   } catch (error) {
//     console.error("Network or server error:", error);
//     alert("Something went wrong. Please check your connection.");
//   }
// };


//   return (
//     <div className="max-h-screen grid lg:grid-cols-1">
//       {/* Left Side - Form */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
//               transition-colors"
//               >
//                 <img className="rounded-full" src="../../logo.jpg" alt="logo" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
//               <p className="text-base-content/60">Login to your account</p>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="email"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Password</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-base-content/40" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-base-content/40" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
//               {isLoggingIn ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Don&apos;t have an account?{" "}
//               <Link href="/signup" className="link link-primary">
//                 Create account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>      
//     </div>
//   );
// };
// export default LoginPage;
'use client';

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false); // ⬅️ حالة اللودينج

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true); // ⬅️ ابدأ اللودينج

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("authUser", JSON.stringify(data.user));
        window.location.href = "/";
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please check your connection.");
    } finally {
      setIsLoggingIn(false); // ⬅️ انهي اللودينج
    }
  };

  return (
    <div className="max-h-screen grid lg:grid-cols-1">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <img className="rounded-full" src="../../logo.jpg" alt="logo" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Login to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="ml-2">Loading...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="link link-primary">
                Create account
              </Link>
            </p>
            <p>
              <Link href="/auth/forgot-password" className="link link-secondary">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
