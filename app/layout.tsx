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
  metadataBase: new URL("https://withorbit.io"),
  title: {
    default: "Orbit - AI Cost & Performance Analytics",
    template: "%s | Orbit",
  },
  description: "See how your AI features behave in production. Track cost, latency, errors, and usage at a feature level using real runtime data.",
  keywords: ["AI analytics", "LLM cost tracking", "AI observability", "feature analytics", "AI monitoring", "OpenAI cost tracking", "Anthropic analytics", "AI spend management"],
  authors: [{ name: "Orbit" }],
  creator: "Orbit",
  publisher: "Orbit",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Orbit - AI Cost & Performance Analytics",
    description: "Feature-level AI observability using real runtime data.",
    type: "website",
    url: "https://withorbit.io",
    siteName: "Orbit",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit - AI Cost & Performance Analytics",
    description: "Feature-level AI observability using real runtime data.",
  },
  alternates: {
    canonical: "https://withorbit.io",
  },
  category: "technology",
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
