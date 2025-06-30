"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { metadata } from "@/metadata/metadata";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from "@/lib/query_client";
import { Toaster } from "@/components/ui/sonner"
import { UserProvider, useUser } from "@/contexts/userContext";
import API from "@/api/api";
import { Initializer } from "./initializer";
import { SideBar } from "@/components/side_bar/sidebar";
import { TopBar } from "@/components/top_bar/top_bar";

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
          <Toaster position="top-right" />
        </QueryClientProvider>
      </body>
    </html>
  );
}
