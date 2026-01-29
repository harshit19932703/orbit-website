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

// JSON-LD Schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://withorbit.io/#organization",
      name: "Orbit",
      url: "https://withorbit.io",
      logo: {
        "@type": "ImageObject",
        url: "https://withorbit.io/orbit-logo.svg",
      },
      description: "AI cost and performance analytics platform",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://withorbit.io/#website",
      url: "https://withorbit.io",
      name: "Orbit",
      publisher: {
        "@id": "https://withorbit.io/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://withorbit.io/#software",
      name: "Orbit",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web, Node.js, Python",
      description:
        "Track AI costs per feature with a one-line SDK. Monitor OpenAI, Anthropic, and Gemini usage in real-time.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free tier - 10,000 events/month",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Feature-level cost tracking",
        "Real-time analytics dashboard",
        "Error and latency monitoring",
        "Multi-provider support (OpenAI, Anthropic, Gemini)",
        "One-line SDK integration",
      ],
    },
  ],
};

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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Apollo.io Website Visitor Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"697b0b94ed79df00215f7761"})},document.head.appendChild(o)}initApollo();`,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-[#0a0a0a] text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
