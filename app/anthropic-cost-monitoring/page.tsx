"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, DollarSign, BarChart3, Zap, Code } from "lucide-react";

export default function AnthropicCostMonitoringPage() {
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium mb-6">
              <DollarSign className="w-3 h-3 mr-2" />
              Anthropic Cost Monitoring
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-white">
              Monitor Anthropic Claude Costs<br />
              <span className="text-[#888]">Per Feature, In Real-Time</span>
            </h1>
            <p className="text-lg text-[#888] max-w-2xl mx-auto mb-8">
              Get visibility into your Claude API spending. Track costs by feature, monitor token usage, and optimize your Anthropic bill.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.withorbit.io/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-6 bg-white text-black font-medium text-[14px] rounded-full hover:bg-white/90 transition-all"
              >
                Start monitoring free
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center h-12 px-6 border border-white/10 text-white font-medium text-[14px] rounded-full hover:bg-white/5 transition-all"
              >
                View documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
              The Claude API Billing Challenge
            </h2>
            <p className="text-[#888] text-center max-w-2xl mx-auto mb-12">
              Anthropic&apos;s console shows aggregate usage, but doesn&apos;t tell you which parts of your app are driving costs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Sonnet vs Haiku?",
                  description: "Are you using Claude 3.5 Sonnet where Haiku would suffice?",
                },
                {
                  title: "Feature cost breakdown?",
                  description: "Which AI features in your app cost the most to run?",
                },
                {
                  title: "Cost per customer?",
                  description: "Which users are consuming the most Claude tokens?",
                },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <h3 className="text-white font-medium mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[#666]">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
              Feature-Level Claude Cost Tracking
            </h2>
            <p className="text-[#888] text-center max-w-2xl mx-auto mb-12">
              Orbit wraps your Anthropic client and automatically tracks costs for every API call, tagged to the feature that made it.
            </p>

            {/* Code Example */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="rounded-xl border border-white/[0.06] bg-[#0d0d0d] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                  <Code className="w-4 h-4 text-[#666]" />
                  <span className="text-[13px] text-[#666]">One-line integration</span>
                </div>
                <pre className="p-4 text-[13px] text-[#a1a1aa] overflow-x-auto">
                  <code>{`import { Orbit } from '@with-orbit/sdk';
import Anthropic from '@anthropic-ai/sdk';

const orbit = new Orbit({ apiKey: 'your-orbit-key' });

// Wrap your Anthropic client
const anthropic = orbit.wrapAnthropic(new Anthropic(), {
  feature: 'document-analyzer'  // Tag by feature
});

// Use Claude normally - costs are tracked automatically
const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: message }]
});`}</code>
                </pre>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <BarChart3 className="w-5 h-5 text-violet-400" />,
                  title: "Real-time dashboards",
                  description: "See Claude costs update in real-time as your app runs",
                },
                {
                  icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
                  title: "Automatic cost calculation",
                  description: "Costs calculated using current Anthropic pricing",
                },
                {
                  icon: <Zap className="w-5 h-5 text-amber-400" />,
                  title: "Model-level breakdown",
                  description: "See spend by Sonnet, Haiku, and Opus models",
                },
                {
                  icon: <CheckCircle className="w-5 h-5 text-cyan-400" />,
                  title: "Zero code changes",
                  description: "Just wrap your Anthropic client - existing code works as-is",
                },
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                  <p className="text-[13px] text-[#666]">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Models */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
              Anthropic Pricing We Track
            </h2>
            <p className="text-[#888] text-center max-w-2xl mx-auto mb-12">
              Orbit automatically calculates costs for all Claude models based on current pricing.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-4 px-4 text-[13px] text-[#888] font-medium">Model</th>
                    <th className="text-left py-4 px-4 text-[13px] text-[#888] font-medium">Input (per 1M)</th>
                    <th className="text-left py-4 px-4 text-[13px] text-[#888] font-medium">Output (per 1M)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { model: "Claude 3.5 Sonnet", input: "$3.00", output: "$15.00" },
                    { model: "Claude 3.5 Haiku", input: "$0.80", output: "$4.00" },
                    { model: "Claude 3 Opus", input: "$15.00", output: "$75.00" },
                    { model: "Claude 3 Sonnet", input: "$3.00", output: "$15.00" },
                    { model: "Claude 3 Haiku", input: "$0.25", output: "$1.25" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="py-4 px-4 text-[14px] text-white">{row.model}</td>
                      <td className="py-4 px-4 text-[14px] text-[#888]">{row.input}</td>
                      <td className="py-4 px-4 text-[14px] text-[#888]">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              Start Monitoring Claude Costs Today
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
              Get started free
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-white mb-8">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/blog/openai-vs-anthropic-vs-gemini-pricing-comparison-2025"
              className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <span className="text-[11px] text-amber-400 uppercase tracking-wider mb-2 block">Comparison</span>
              <h3 className="text-white font-medium mb-2 group-hover:text-violet-300 transition-colors">
                OpenAI vs Anthropic vs Gemini: Pricing Comparison 2025
              </h3>
              <p className="text-[13px] text-[#666]">Compare pricing across major LLM providers</p>
            </Link>
            <Link
              href="/blog/track-llm-costs-complete-guide-for-developers"
              className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <span className="text-[11px] text-emerald-400 uppercase tracking-wider mb-2 block">Guide</span>
              <h3 className="text-white font-medium mb-2 group-hover:text-violet-300 transition-colors">
                Track LLM Costs: A Complete Guide for Developers
              </h3>
              <p className="text-[13px] text-[#666]">The definitive guide to tracking LLM costs</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
