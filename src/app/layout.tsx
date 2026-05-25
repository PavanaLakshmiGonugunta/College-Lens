import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "CollegeLens | Discover Your Perfect College",
    template: "%s | CollegeLens",
  },
  description:
    "India's most intelligent college discovery platform. Search, compare, and find the right college with data-driven insights.",
  keywords: [
    "college search",
    "college comparison",
    "Indian colleges",
    "IIT",
    "NIT",
    "IIM",
    "engineering colleges",
    "MBA colleges",
    "college reviews",
    "placements",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <SessionProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
