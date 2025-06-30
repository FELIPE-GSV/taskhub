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
            {children}
          </UserProvider>
          <Toaster position="top-right" />
        </QueryClientProvider>
      </body>
    </html>
  );
}
