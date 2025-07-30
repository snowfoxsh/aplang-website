import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import React from "react";
import {Toaster} from "@/components/ui/sonner";
// import Script from "next/script";

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

import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({
    subsets: ['latin'],         // or 'latin-ext', etc. as needed
    weight: ['400', '500', '700'], // whichever weights you want
    variable: '--font-fira-code' // a custom CSS variable (optional but recommended)
})



export const metadata: Metadata = {
    title: "ApLang",
    description: "ApLang is a platform for learning and teaching AP Computer Science Principles.",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable} antialiased`}>
        
{/*       <!-- Google tag (gtag.js) --> */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-B8F0SRVZC7"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-B8F0SRVZC7');
      </script>

      <Toaster position={"bottom-left"} duration={3500} richColors={true}/>
      <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem={true} disableTransitionOnChange={true}>
          {children}
      </ThemeProvider>
      </body>
      </html>
  );
}
