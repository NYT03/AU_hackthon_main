import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Portfolio Management",
  description: "Portfolio management and recommendation system",
  generator: "v0.dev",
};

function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-4 px-4 md:px-6">{children}</main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>                                                                                                                                                                                                                                                                                                                                                                         
  );
}

export default RootLayout;
