"use client"

import { Suspense } from "react"
import VerifyPage from "@/components/Verify"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPage />
    </Suspense>
  )
}
