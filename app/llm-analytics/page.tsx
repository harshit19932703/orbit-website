"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, BarChart3, Zap, Code, TrendingUp, AlertTriangle, Clock } from "lucide-react";

export default function LLMAnalyticsPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="section-sm">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
              <BarChart3 className="w-3 h-3 mr-2" />
              LLM Analytics
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-white">
              LLM Analytics for<br />
              <span className="text-[#888]">Production AI Applications</span>
            </h1>
            <p className="text-lg text-[#888] max-w-2xl mx-auto mb-8">
              Understand how your LLM features behave in production. Track costs, latency, errors, and usage patterns across OpenAI, Anthropic, and Gemini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.withorbit.io/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-6 bg-white text-black font-medium text-[14px] rounded-full hover:bg-white/90 transition-all"
              >
                Start free
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <Link
                href="/features"
                className="inline-flex items-center justify-center h-12 px-6 border border-white/10 text-white font-medium text-[14px] rounded-full hover:bg-white/5 transition-all"
              >
                See all features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is LLM Analytics */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
              What is LLM Analytics?
            </h2>
            <p className="text-[#888] text-center max-w-2xl mx-auto mb-12">
              LLM analytics gives you visibility into how your AI features perform in production. It&apos;s the answer to &quot;What&apos;s happening with our AI?&quot;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
                  title: "Cost Analytics",
                  description: "Track spend by feature, model, and customer",
                },
                {
                  icon: <Clock className="w-5 h-5 text-violet-400" />,
                  title: "Latency Tracking",
                  description: "Monitor response times and identify slow features",
                },
                {
                  icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
                  title: "Error Monitoring",
                  description: "Catch and analyze API errors before users complain",
                },
                {
                  icon: <BarChart3 className="w-5 h-5 text-cyan-400" />,
                  title: "Usage Patterns",
                  description: "Understand how features are being used",
                },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-white font-medium mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[#666]">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
              Key LLM Metrics to Track
            </h2>
            <p className="text-[#888] text-center max-w-2xl mx-auto mb-12">
              Orbit captures the metrics that matter for understanding and optimizing your LLM usage.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "$2,400", label: "Monthly cost" },
                { value: "1.2M", label: "Tokens used" },
                { value: "342ms", label: "P50 latency" },
                { value: "0.3%", label: "Error rate" },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
                  <div className="text-2xl font-semibold text-white mb-1">{stat.value}</div>
                  <div className="text-[13px] text-[#666]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Cost per feature",
                  items: ["Chat assistant: $1,200", "Doc analyzer: $800", "Code helper: $400"],
                },
                {
                  title: "Cost per model",
                  items: ["GPT-4o: $1,800", "Claude 3.5 Sonnet: $400", "GPT-4o-mini: $200"],
                },
                {
                  title: "Cost per customer",
                  items: ["Enterprise A: $500", "Enterprise B: $300", "Others: $1,600"],
                },
              ].map((group, i) => (
                <div key={i} className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <h3 className="text-white font-medium mb-4">{group.title}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item, j) => (
                      <li key={j} className="text-[13px] text-[#888]">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Multi-provider */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
              Multi-Provider LLM Analytics
            </h2>
            <p className="text-[#888] text-center max-w-2xl mx-auto mb-12">
              Most teams use multiple LLM providers. Orbit gives you a unified view across all of them.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  provider: "OpenAI",
                  models: ["GPT-4o", "GPT-4o-mini", "o1", "Embeddings"],
                  color: "emerald",
                },
                {
                  provider: "Anthropic",
                  models: ["Claude 3.5 Sonnet", "Claude 3.5 Haiku", "Claude 3 Opus"],
                  color: "orange",
                },
                {
                  provider: "Google",
                  models: ["Gemini 1.5 Pro", "Gemini 2.0 Flash", "Gemini 1.5 Flash"],
                  color: "blue",
                },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <h3 className={`text-white font-medium mb-4`}>{item.provider}</h3>
                  <ul className="space-y-2">
                    {item.models.map((model, j) => (
                      <li key={j} className="flex items-center text-[13px] text-[#888]">
                        <CheckCircle className="w-3 h-3 text-emerald-400 mr-2" />
                        {model}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Implementation */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
              Add LLM Analytics in Minutes
            </h2>
            <p className="text-[#888] text-center max-w-2xl mx-auto mb-12">
              Wrap your LLM client with Orbit&apos;s SDK and start seeing analytics immediately.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="rounded-xl border border-white/[0.06] bg-[#0d0d0d] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                  <Code className="w-4 h-4 text-[#666]" />
                  <span className="text-[13px] text-[#666]">Node.js / Python</span>
                </div>
                <pre className="p-4 text-[13px] text-[#a1a1aa] overflow-x-auto">
                  <code>{`import { Orbit } from '@with-orbit/sdk';

const orbit = new Orbit({ apiKey: 'your-orbit-key' });

// Wrap any LLM client
const openai = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'your-feature-name'
});

const anthropic = orbit.wrapAnthropic(new Anthropic(), {
  feature: 'your-feature-name'
});

const gemini = orbit.wrapGemini(new GoogleGenerativeAI(), {
  feature: 'your-feature-name'
});

// Use normally - analytics are captured automatically`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
              Get LLM Analytics for Your App
            </h2>
            <p className="text-[#888] mb-8">
              Free tier includes 10,000 events/month. No credit card required.
            </p>
            <a
              href="https://app.withorbit.io/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-6 bg-white text-black font-medium text-[14px] rounded-full hover:bg-white/90 transition-all"
            >
              Start free
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-white mb-8">Learn More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/blog/ai-observability-what-you-need-to-know"
              className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <span className="text-[11px] text-emerald-400 uppercase tracking-wider mb-2 block">Guide</span>
              <h3 className="text-white font-medium mb-2 group-hover:text-violet-300 transition-colors">
                AI Observability: What You Need to Know in 2025
              </h3>
              <p className="text-[13px] text-[#666]">Complete guide to AI observability</p>
            </Link>
            <Link
              href="/openai-cost-tracking"
              className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <span className="text-[11px] text-violet-400 uppercase tracking-wider mb-2 block">Solution</span>
              <h3 className="text-white font-medium mb-2 group-hover:text-violet-300 transition-colors">
                OpenAI Cost Tracking
              </h3>
              <p className="text-[13px] text-[#666]">Track OpenAI API costs by feature</p>
            </Link>
            <Link
              href="/anthropic-cost-monitoring"
              className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <span className="text-[11px] text-orange-400 uppercase tracking-wider mb-2 block">Solution</span>
              <h3 className="text-white font-medium mb-2 group-hover:text-violet-300 transition-colors">
                Anthropic Cost Monitoring
              </h3>
              <p className="text-[13px] text-[#666]">Monitor Claude API costs by feature</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
