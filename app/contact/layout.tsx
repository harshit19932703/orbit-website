import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Orbit team. Questions about AI cost tracking, feature requests, or partnership opportunities - we'd love to hear from you.",
  openGraph: {
    title: "Contact Us | Orbit",
    description:
      "Get in touch with the Orbit team. Questions about AI cost tracking, feature requests, or partnership opportunities.",
    url: "https://withorbit.io/contact",
  },
  twitter: {
    title: "Contact Us | Orbit",
    description:
      "Get in touch with the Orbit team. Questions about AI cost tracking, feature requests, or partnership opportunities.",
  },
  alternates: {
    canonical: "https://withorbit.io/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
