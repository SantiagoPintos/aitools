import type { Metadata } from "next";
import { AppProvider } from "@/context/ImageContext";
import { ViewTransitions } from "next-view-transitions";

import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI tools",
  description: "Private AI tools for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <ViewTransitions>
              <div className="min-h-[85vh]">
                {children}
              </div>
          </ViewTransitions>
        </AppProvider>
      </body>
    </html>
  );
}
