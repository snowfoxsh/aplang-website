import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import React from "react";
import {Toaster} from "@/components/ui/sonner";
import Script from "next/script";

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
  title: "ApLang",
  description: "The ApLang Website",
  icons: {
    icon: "/favicon.svg",  // Specify the favicon path here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* Umami Analytics Script */}
      <Script
          strategy="afterInteractive"
          src="https://cloud.umami.is/script.js"
          data-website-id="fb7a7cc7-adf5-4283-89cd-b875fe6dddf1"
          defer
      />
      <Toaster position={"bottom-left"} duration={5000}/>
      <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem={true} disableTransitionOnChange={true}>
          {children}
      </ThemeProvider>
      </body>
      </html>
  );
}
