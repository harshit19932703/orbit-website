import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Orbit - AI Cost & Performance Analytics",
  description: "See how your AI features behave in production. Track cost, latency, errors, and usage at a feature level using real runtime data.",
  keywords: ["AI analytics", "LLM cost tracking", "AI observability", "feature analytics", "AI monitoring"],
  authors: [{ name: "Orbit" }],
  openGraph: {
    title: "Orbit - AI Cost & Performance Analytics",
    description: "Feature-level AI observability using real runtime data.",
    type: "website",
    url: "https://withorbit.io",
    siteName: "Orbit",
  },
  twitter: {
    card: "summary",
    title: "Orbit - AI Cost & Performance Analytics",
    description: "Feature-level AI observability using real runtime data.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-[#0a0a0a] text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
