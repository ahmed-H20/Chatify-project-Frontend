import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ConditionalSidebar } from "@/components/conditional_sidebar"
import { useAuthStore } from "@/store/useAuthStore"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Chatify",
  description: "Secure messaging app",
    generator: 'v0.dev'
}



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
                <div className="flex h-screen bg-white dark:bg-black">
                  <ConditionalSidebar />
                  <main className="flex-1 overflow-auto">{children}</main>
                </div>
              </ThemeProvider>
            </body>
          </html>  
          
        
    </>
  )
}
