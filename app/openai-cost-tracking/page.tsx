"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, DollarSign, BarChart3, Zap, Code } from "lucide-react";

export default function OpenAICostTrackingPage() {
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
              <DollarSign className="w-3 h-3 mr-2" />
              OpenAI Cost Tracking
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-white">
              Track OpenAI API Costs<br />
              <span className="text-[#888]">Per Feature, In Real-Time</span>
            </h1>
            <p className="text-lg text-[#888] max-w-2xl mx-auto mb-8">
              Stop guessing what&apos;s driving your OpenAI bill. Orbit tracks costs at the feature level so you know exactly where your spend is going.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.withorbit.io/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-6 bg-white text-black font-medium text-[14px] rounded-full hover:bg-white/90 transition-all"
              >
                Start tracking free
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
              The OpenAI Billing Problem
            </h2>
            <p className="text-[#888] text-center max-w-2xl mx-auto mb-12">
              OpenAI&apos;s dashboard shows your total spend, but not what&apos;s causing it. When costs spike, you&apos;re left guessing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Which feature costs most?",
                  description: "Is it your chatbot, document analyzer, or code assistant driving the bill?",
                },
                {
                  title: "GPT-4o vs GPT-4o-mini?",
                  description: "Are you using expensive models where cheaper ones would work?",
                },
                {
                  title: "Cost per user?",
                  description: "Which customers are consuming the most tokens?",
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
              Feature-Level OpenAI Cost Tracking
            </h2>
            <p className="text-[#888] text-center max-w-2xl mx-auto mb-12">
              With Orbit, every OpenAI API call is tagged to the feature that made it. See exactly what each part of your app costs.
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
import OpenAI from 'openai';

const orbit = new Orbit({ apiKey: 'your-orbit-key' });

// Wrap your OpenAI client
const openai = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'customer-chat'  // Tag by feature
});

// Use OpenAI normally - costs are tracked automatically
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
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
                  description: "See OpenAI costs update in real-time as your app runs",
                },
                {
                  icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
                  title: "Automatic cost calculation",
                  description: "Costs calculated using current OpenAI pricing, always up to date",
                },
                {
                  icon: <Zap className="w-5 h-5 text-amber-400" />,
                  title: "Model-level breakdown",
                  description: "See spend by GPT-4o, GPT-4o-mini, embeddings, and more",
                },
                {
                  icon: <CheckCircle className="w-5 h-5 text-cyan-400" />,
                  title: "Zero code changes",
                  description: "Just wrap your OpenAI client - your existing code works as-is",
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
              OpenAI Pricing We Track
            </h2>
            <p className="text-[#888] text-center max-w-2xl mx-auto mb-12">
              Orbit automatically calculates costs for all OpenAI models based on current pricing.
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
                    { model: "GPT-4o", input: "$2.50", output: "$10.00" },
                    { model: "GPT-4o-mini", input: "$0.15", output: "$0.60" },
                    { model: "GPT-4 Turbo", input: "$10.00", output: "$30.00" },
                    { model: "o1", input: "$15.00", output: "$60.00" },
                    { model: "o1-mini", input: "$3.00", output: "$12.00" },
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
              Start Tracking OpenAI Costs Today
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
              href="/blog/how-to-track-openai-api-costs-by-feature"
              className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <span className="text-[11px] text-violet-400 uppercase tracking-wider mb-2 block">Tutorial</span>
              <h3 className="text-white font-medium mb-2 group-hover:text-violet-300 transition-colors">
                How to Track OpenAI API Costs by Feature
              </h3>
              <p className="text-[13px] text-[#666]">Step-by-step guide to implementing feature-level cost tracking</p>
            </Link>
            <Link
              href="/blog/llm-cost-optimization-5-ways-to-reduce-ai-spend"
              className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <span className="text-[11px] text-emerald-400 uppercase tracking-wider mb-2 block">Guide</span>
              <h3 className="text-white font-medium mb-2 group-hover:text-violet-300 transition-colors">
                LLM Cost Optimization: 5 Ways to Reduce AI Spend
              </h3>
              <p className="text-[13px] text-[#666]">Practical strategies to reduce your OpenAI costs</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
