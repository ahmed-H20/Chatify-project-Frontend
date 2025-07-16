import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ConditionalSidebar } from "@/components/conditional_sidebar"
import { useAuthStore } from "@/store/useAuthStore"
import LoginPage from "./auth/login/page"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Chatify",
  description: "Secure messaging app",
    generator: 'v0.dev'
}

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
console.log(token)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {/* {
              token ? ( */}
                <div className="flex h-screen bg-white dark:bg-black">
                  <ConditionalSidebar />
                  <main className="flex-1 overflow-auto">{children}</main>
                </div>
              {/* //   )
              //   :
              //   <div className="h-screen w-full flex justify-center align-center">
              //     <LoginPage/>
              //   </div> */}
                
            {/* // } */}
          </ThemeProvider>
        </body>
      </html>    
    </>
  )
}
