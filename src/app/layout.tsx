// rootlayout and defines shared ui elements across pages
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigations } from "@/components/navigations";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ultrasound App",
  description: "Generated by create next app",
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
        {/* <Header /> */}
        {/* <header className="bg-slate-900 text-white p-4 text-center">
          Introduction to Next js
        </header> */}
        <Navigations />
        {children}
        {/* <footer className="bg-slate-900 text-white p-4 text-center fixed bottom-0">
          Made by : Ankur Baijal
        </footer> */}
      </body>
      
    </html>
  );
}
 