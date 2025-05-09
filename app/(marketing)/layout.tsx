import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`min-h-screen bg-white ${inter.className}`}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Navbar />
        <main>{children}</main>
      </ThemeProvider>
    </div>
  )
}
