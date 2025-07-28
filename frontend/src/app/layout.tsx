"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { metadata } from "@/metadata/metadata";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"
import { UserProvider, useUser } from "@/contexts/userContext";
import API from "@/api/api";
import { Initializer } from "./initializer";
import { SideBar } from "@/components/side_bar/side_bar";
import { TopBar } from "@/components/top_bar/top_bar";
import { queryClient } from "@/lib/queryClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/pages/login');
      return;
    }

    const isTokenExpired = () => {
      const now = new Date().getTime();
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');
      const expiresIn = 1800 * 1000;
      if (!tokenTimestamp) return true;
      return now - Number(tokenTimestamp) > expiresIn;
    };

    if (isTokenExpired()) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenTimestamp');
      setUser(null)
      router.push("/pages/login");
    } else {
    }
  }, [router, setUser]);


  return (
    <html lang="en">
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Initializer />
            <main className="flex justify-center items-center">
              <SideBar />
              <div className="w-full h-screen flex flex-col justify-start">
                <TopBar />
                {children}
              </div>
            </main>
          </UserProvider>
          <Toaster position="top-right" duration={2000}/>
        </QueryClientProvider>
      </body>
    </html>
  );
}
