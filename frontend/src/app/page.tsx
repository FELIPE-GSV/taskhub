"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLogged = !!localStorage.getItem('token')
      if (isLogged) {
        router.push("/pages/dashboard")
      } else {
        router.push("/pages/login")
      }
    } else {
      router.push("/pages/login")
    }
  }, [router])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    </div>
  );
}
