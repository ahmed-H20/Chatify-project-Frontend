"use client"

import { usePathname } from "next/navigation"
import Sidebar from "@/components/sidebar"

export function ConditionalSidebar() {
  const pathname = usePathname()
  const isAuthRoute = pathname?.includes('/auth')

  if (isAuthRoute) {
    return null
  }

  return <Sidebar />
}