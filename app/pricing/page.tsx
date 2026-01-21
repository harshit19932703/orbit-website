"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

// FAQ data for both display and schema
const faqs = [
  {
    q: "What counts as an event?",
    a: "An event is a single AI API call tracked by the SDK. Each time your application makes a request to an AI model through the Orbit SDK, it counts as one event.",
  },
  {
    q: "What happens if I exceed the free tier limits?",
    a: "We'll notify you when you're approaching your limits. Events beyond the limit won't be tracked until the next billing cycle or until you upgrade.",
  },
  {
    q: "Can I use Orbit in production on the free plan?",
    a: "Yes, the free plan is designed for production use. It includes all core features needed to monitor your AI usage in real applications.",
  },
  {
    q: "How accurate are the cost estimates?",
    a: "Costs are calculated using standard model pricing at the time of the request. They're estimates based on token usage and may differ slightly from your actual provider bills.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use SDK-based data collection, meaning we never see your API keys or the actual content of your AI requests. We only track metadata like tokens, latency, and errors.",
  },
  {
    q: "How do I integrate Orbit with my application?",
    a: "Integration takes one line of code. Install the SDK, wrap your AI client (OpenAI, Anthropic, or Gemini), and costs are tracked automatically. No code changes to your existing AI calls.",
  },
];

// Generate FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function PricingPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="section-sm">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4 text-white">
              Pricing
            </h1>
            <p className="text-[17px] text-[#666]">
              Start free. Scale as you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-sm">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-0">
            {/* Free Plan - Main tall card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/[0.1] bg-white/[0.02] p-8 relative z-10 w-full md:w-[380px] flex-shrink-0"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Free</h3>
                <p className="text-[#666] text-[15px]">
                  Everything you need to understand your AI features in production.
                </p>
              </div>

              <a
                href="https://app.withorbit.io/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-12 flex items-center justify-center bg-white text-black font-medium text-[14px] rounded-full hover:bg-white/90 transition-all mb-8"
              >
                Get started
              </a>

              <div>
                <p className="text-[13px] font-medium text-[#888] uppercase tracking-wider mb-5">Includes</p>
                <ul className="space-y-4">
                  {[
                    "1 project",
                    "2 SDK API keys",
                    "Up to 5 feature names",
                    "Up to 10,000 events per month",
                    "30 days of data retention",
                    "All core dashboards",
                    "Usage & cost analytics",
                    "Error tracking",
                    "Model performance",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-[15px] text-[#a1a1aa]">
                      <Check className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/[0.04] to-blue-500/[0.04] p-8 mt-6 md:mt-0 w-full md:w-[380px] flex-shrink-0 relative overflow-hidden"
            >
              {/* Subtle gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.08] to-transparent opacity-50 pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-white">Pro</h3>
                  <span className="text-[10px] font-medium text-purple-300 uppercase tracking-wider bg-purple-500/20 border border-purple-500/30 px-3 py-1.5 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <p className="text-[#888] text-[15px] mb-8">
                  Higher limits, team features, and priority support.
                </p>

                <button
                  disabled
                  className="block w-full h-12 flex items-center justify-center bg-white/10 text-white/40 font-medium text-[14px] rounded-full cursor-not-allowed mb-8 border border-white/10"
                >
                  Coming soon
                </button>

                <div>
                  <p className="text-[13px] font-medium text-[#666] uppercase tracking-wider mb-5">Includes</p>
                  <ul className="space-y-4">
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-white/[0.06] mr-3 flex-shrink-0" />
                        <div
                          className="h-3 rounded-full bg-white/[0.06]"
                          style={{ width: `${60 + (index % 3) * 20}%` }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
              Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <h3 className="text-[16px] font-medium text-white mb-3">{item.q}</h3>
                <p className="text-[15px] text-[#666] leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[clamp(32px,4.5vw,56px)] font-medium leading-[1.05] tracking-[-0.03em] text-white mb-6">
              Start tracking your
              <br />
              <span className="bg-gradient-to-r from-white via-[#888] to-[#444] bg-clip-text text-transparent">
                AI features today
              </span>
            </h2>
            <p className="text-[17px] text-[#666] mb-10 max-w-[450px] mx-auto">
              No credit card required. Get started in minutes.
            </p>
            <a
              href="https://app.withorbit.io/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center h-14 px-8 bg-white text-black font-medium text-[15px] rounded-full hover:bg-white/90 transition-all"
            >
              Get started free
            </a>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
