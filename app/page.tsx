"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  HeroVisual,
  FeatureAnalyticsVisual,
  CostAnalyticsVisual,
  ErrorTrackingVisual,
  IntegrationVisual,
} from "@/components/ui/visuals";

export default function Home() {

  return (
    <div className="min-h-screen bg-[#000000] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col justify-center">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-violet-600/15 via-violet-600/5 to-transparent blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-3 animate-pulse" />
                <span className="text-[13px] text-[#888]">Now in public beta</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[clamp(32px,4.5vw,56px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-8"
              >
                Your AI is already
                <br />
                <span className="bg-gradient-to-r from-white via-[#888] to-[#444] bg-clip-text text-transparent">
                  spending money you can&apos;t explain.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[17px] md:text-[19px] text-[#666] leading-[1.65] mb-10 max-w-[480px]"
              >
                In production, AI doesn&apos;t fail loudly. It fails expensively — through silent loops, prompt changes, and features that look fine but quietly burn margin.
              </motion.p>

              <div className="flex items-center gap-4">
                <a
                  href="https://app.withorbit.io/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center h-12 px-6 bg-white text-black font-medium text-[14px] rounded-full hover:bg-white/90 transition-all"
                >
                  Start for free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <span className="text-[13px] text-[#555]">No credit card required</span>
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Moment Section - Two Column Layout */}
      <section className="relative py-24 lg:py-32 border-t border-white/[0.04] overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-red-600/8 via-orange-600/5 to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.15] tracking-[-0.03em] text-white">
              The moment every AI team hits
            </h2>
          </motion.div>

          {/* Two Column Grid */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Vertical separator line - only on desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />

            {/* Left - Slack Console */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:pr-6"
            >
              {/* Label */}
              <div className="mb-4">
                <span className="text-[11px] text-red-400/80 uppercase tracking-wider font-medium">The Problem</span>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0c] overflow-hidden">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[12px] text-[#555] ml-2 font-mono">#alerts</span>
              </div>

              {/* Messages */}
              <div className="p-4 pb-10 space-y-4">
                {/* Alert message */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-lg">!</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-red-400">OpenAI Alert</span>
                      <span className="text-[11px] text-[#444]">9:14 AM</span>
                    </div>
                    <p className="text-[14px] text-[#999]">
                      Usage spike detected: <span className="text-red-400 font-medium">$2,847</span> in the last 24h <span className="text-[#555]">(+312%)</span>
                    </p>
                  </div>
                </motion.div>

                {/* Finance message */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-[14px]">
                    💰
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-white">Sarah (Finance)</span>
                      <span className="text-[11px] text-[#444]">9:22 AM</span>
                    </div>
                    <p className="text-[14px] text-[#999]">
                      Why is our AI bill 3x higher this month? We need answers before the board meeting.
                    </p>
                  </div>
                </motion.div>

                {/* Engineering message */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-[14px]">
                    👨‍💻
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-white">Mike (Engineering)</span>
                      <span className="text-[11px] text-[#444]">9:31 AM</span>
                    </div>
                    <p className="text-[14px] text-[#999]">
                      Checked the logs. We made 847k API calls yesterday, mostly to gpt-4o. But the logs don&apos;t tie back to features — I&apos;d have to dig through code paths manually.
                    </p>
                  </div>
                </motion.div>

                {/* Product message */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="flex gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 text-[14px]">
                    📊
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-white">Priya (Product)</span>
                      <span className="text-[11px] text-[#444]">9:45 AM</span>
                    </div>
                    <p className="text-[14px] text-[#999]">
                      Was it the new summarization feature? The chat widget? A looping workflow? <span className="text-[#555] italic">I genuinely don&apos;t know.</span>
                    </p>
                  </div>
                </motion.div>

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  className="flex items-center gap-2 pt-2 border-t border-white/[0.04]"
                >
                  <div className="flex gap-1 px-3 py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#444] animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#444] animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#444] animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-[12px] text-[#444] italic">No one has the answer...</span>
                </motion.div>
              </div>
              </div>
            </motion.div>

            {/* Right - Agent Workflow Visualization (n8n style) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-center lg:pl-6"
            >
              {/* Agentic AI label */}
              <div className="mb-4">
                <span className="text-[11px] text-violet-400/80 uppercase tracking-wider font-medium">The Reality — Agentic AI Workflow</span>
              </div>

              {/* Task context badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  <span className="text-[12px] text-[#666]">Agent workflow running...</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] text-[#555]">Customer:</span>
                  <span className="text-[11px] text-white font-medium">Acme Corp</span>
                </div>
              </div>

              {/* Workflow nodes */}
              <div className="relative">
                {/* Trigger node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex items-center gap-4 mb-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] text-white font-medium">User Request</div>
                    <div className="text-[11px] text-[#555]">&quot;Analyze Q4 Report&quot;</div>
                  </div>
                </motion.div>

                {/* Connector line */}
                <div className="w-[2px] h-4 bg-gradient-to-b from-violet-500/30 to-emerald-500/30 ml-[23px] rounded-full" />

                {/* Feature 1: doc-parser */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="flex items-center gap-4 mb-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 relative">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <div className="text-[13px] text-white font-medium font-mono">doc-parser</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">gpt-4o</span>
                        <span className="text-[10px] text-[#555]">1 call</span>
                      </div>
                    </div>
                    <span className="text-[12px] text-emerald-400 font-mono font-medium">$0.12</span>
                  </div>
                </motion.div>

                {/* Connector line */}
                <div className="w-[2px] h-4 bg-gradient-to-b from-emerald-500/30 to-amber-500/30 ml-[23px] rounded-full" />

                {/* Feature 2: deep-analysis - with warning */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="flex items-center gap-4 mb-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0 relative">
                    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold">!</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[13px] text-white font-medium font-mono">deep-analysis</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded font-mono">claude-3.5</span>
                          <span className="text-[10px] text-[#555]">4 calls</span>
                        </div>
                      </div>
                      <span className="text-[12px] text-amber-400 font-mono font-medium">$1.35</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">3 retries</span>
                      <span className="text-[10px] text-red-400">$0.90 wasted</span>
                    </div>
                  </div>
                </motion.div>

                {/* Connector line */}
                <div className="w-[2px] h-4 bg-gradient-to-b from-amber-500/30 to-emerald-500/30 ml-[23px] rounded-full" />

                {/* Feature 3: summarizer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 relative">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <div className="text-[13px] text-white font-medium font-mono">summarizer</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">gpt-4o-mini</span>
                        <span className="text-[10px] text-[#555]">1 call</span>
                      </div>
                    </div>
                    <span className="text-[12px] text-emerald-400 font-mono font-medium">$0.08</span>
                  </div>
                </motion.div>
              </div>

              {/* Summary cards */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 1.1 }}
                className="grid grid-cols-2 gap-3"
              >
                {/* Task cost card */}
                <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                  <div className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Task Cost</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[18px] text-red-400 font-mono font-semibold">$1.55</span>
                    <span className="text-[11px] text-[#444] line-through">$0.65</span>
                  </div>
                  <div className="text-[10px] text-red-400/70 mt-1">138% over budget</div>
                </div>

                {/* Customer billing card */}
                <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                  <div className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Bill to Customer</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[18px] text-[#444] font-mono font-semibold">$???</span>
                  </div>
                  <div className="text-[10px] text-[#444] mt-1">No task attribution</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-[17px] md:text-[19px] text-white font-medium mb-2">
              Orbit ties every call to a task. Every task to a customer.
            </p>
            <p className="text-[15px] text-[#555]">
              So you always have the answer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Transition to Features */}
      <section className="relative py-16 lg:py-20">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[15px] text-[#555] mb-4">Here&apos;s how we solve it</p>
            <div className="flex justify-center">
              <svg className="w-6 h-6 text-[#444] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1 - Feature Level Analytics */}
      <section className="relative py-20 lg:py-28 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[13px] text-violet-400 font-medium uppercase tracking-wider mb-6">
                Feature-Level Analytics
              </div>
              <h2 className="text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-8">
                Stop losing money
                <br />
                <span className="text-[#555]">in the dark</span>
              </h2>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6 max-w-[420px]">
                Vendor dashboards show totals. Logs show requests. Neither tells you <span className="text-white font-medium">which feature</span> is burning margin or why.
              </p>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-10 max-w-[420px]">
                Orbit ties every LLM call to a <span className="text-white font-medium">product feature</span> — and soon, to entire workflows — so you can see what is expensive, slow, or failing in production.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Per-feature cost", desc: "Know exactly what each AI feature costs" },
                  { label: "Per-feature latency", desc: "Track response times for every feature" },
                  { label: "Per-feature errors", desc: "Success rates and error patterns broken down" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 mr-4 flex-shrink-0" />
                    <div>
                      <span className="text-[15px] text-white">{item.label}</span>
                      <span className="text-[15px] text-[#444]"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FeatureAnalyticsVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 - Cost Intelligence */}
      <section className="relative py-20 lg:py-28 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Visual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <CostAnalyticsVisual />
            </motion.div>

            {/* Right - Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="text-[13px] text-emerald-400 font-medium uppercase tracking-wider mb-6">
                Scaling Health
              </div>
              <h2 className="text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-8">
                Catch margin collapse
                <br />
                <span className="text-[#555]">before it happens</span>
              </h2>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6 max-w-[420px]">
                AI spend rarely grows linearly. One <span className="text-white font-medium">prompt tweak</span> or <span className="text-white font-medium">model swap</span> can turn a healthy feature into a loss overnight — and as systems become more workflow- and agent-driven, cost can explode in minutes.
              </p>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-10 max-w-[420px]">
                Orbit tracks <span className="text-white font-medium">traffic vs. spend</span> in real time and warns you the moment your unit economics break.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Usage vs. cost correlation", desc: "Is growth actually profitable?" },
                  { label: "Net efficiency", desc: "One number that tells you if AI is scaling safely" },
                  { label: "Cost trend analysis", desc: "See spend drift before finance does" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-4 flex-shrink-0" />
                    <div>
                      <span className="text-[15px] text-white">{item.label}</span>
                      <span className="text-[15px] text-[#444]"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3 - Error Tracking */}
      <section className="relative py-20 lg:py-28 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[13px] text-red-400 font-medium uppercase tracking-wider mb-6">
                Error visibility
              </div>
              <h2 className="text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-8">
                Debug failures
                <br />
                <span className="text-[#555]">before users notice</span>
              </h2>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6 max-w-[420px]">
                See error rates by feature and model. Understand which parts of your product
                are breaking and why — with detailed error logs and failure reasons.
              </p>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-10 max-w-[420px]">
                Track error trends over time. Catch regressions early.
                Know exactly which model and feature combination is causing issues.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Error rate by feature", desc: "See which features are failing" },
                  { label: "Error type breakdown", desc: "Invalid models, rate limits, timeouts" },
                  { label: "Recent error logs", desc: "Full context for debugging" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 mr-4 flex-shrink-0" />
                    <div>
                      <span className="text-[15px] text-white">{item.label}</span>
                      <span className="text-[15px] text-[#444]"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ErrorTrackingVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative py-20 lg:py-28 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-[13px] text-[#666] font-medium uppercase tracking-wider mb-6">
              Privacy &amp; Security
            </div>
            <h2 className="text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-6">
              Built for correctness
            </h2>
            <p className="text-[16px] text-[#666] max-w-[500px] mx-auto">
              Orbit shows you what&apos;s actually happening in your application — without proxies, scraping, or hidden assumptions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "SDK-based collection",
                desc: "Metrics are captured directly from your application runtime. No external monitoring or traffic interception.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                ),
              },
              {
                title: "No request interception",
                desc: "Orbit never sits between your app and your AI provider. Your requests go directly to OpenAI, Anthropic, etc.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
              },
              {
                title: "Deterministic metrics",
                desc: "Cost, latency, and error rates are calculated from real request data — not estimates or statistical sampling.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                  </svg>
                ),
              },
              {
                title: "No API key access",
                desc: "Your provider API keys stay in your application. Orbit only receives usage metadata, never credentials.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#888] group-hover:text-white group-hover:border-white/[0.12] transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-medium text-white mb-2">{item.title}</h3>
                    <p className="text-[14px] text-[#666] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Orbit Section */}
      <section className="relative py-20 lg:py-28 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-[13px] text-[#666] font-medium uppercase tracking-wider mb-6">
              Why Orbit
            </div>
            <h2 className="text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-6">
              Vendor dashboards show API usage.
              <br />
              <span className="text-[#555]">Orbit shows how your product uses AI.</span>
            </h2>
            <p className="text-[16px] text-[#666] max-w-[500px] mx-auto">
              Use Orbit alongside OpenAI and Anthropic dashboards for product-level visibility.
            </p>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] border-b border-white/[0.06] bg-white/[0.02]">
              <div className="px-6 py-4">
                <span className="text-[13px] text-[#555] font-medium">Capability</span>
              </div>
              <div className="px-4 py-4 text-center border-l border-white/[0.06]">
                <span className="text-[13px] text-[#555] font-medium">Providers</span>
              </div>
              <div className="px-4 py-4 text-center border-l border-white/[0.06] bg-violet-500/[0.05]">
                <span className="text-[13px] text-violet-400 font-medium">Orbit</span>
              </div>
            </div>

            {/* Table Rows */}
            {[
              { capability: "View AI usage by model", providers: true, orbit: true },
              { capability: "View total cost", providers: true, orbit: true },
              { capability: "Feature-level cost", providers: false, orbit: true },
              { capability: "Feature-level latency", providers: false, orbit: true },
              { capability: "Feature-level errors", providers: false, orbit: true },
              { capability: "Unit economics (traffic vs. spend)", providers: false, orbit: true },
              { capability: "Account-level Efficiency Score", providers: false, orbit: true },
              { capability: "SDK-based runtime data", providers: false, orbit: true },
            ].map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] ${
                  i !== 7 ? "border-b border-white/[0.04]" : ""
                }`}
              >
                <div className="px-6 py-4">
                  <span className="text-[14px] text-[#a1a1aa]">{row.capability}</span>
                </div>
                <div className="px-4 py-4 flex items-center justify-center border-l border-white/[0.04]">
                  {row.providers ? (
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-[#333] text-lg">—</span>
                  )}
                </div>
                <div className="px-4 py-4 flex items-center justify-center border-l border-white/[0.04] bg-violet-500/[0.03]">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Integration Section */}
      <section className="relative py-20 lg:py-28 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-[13px] text-[#666] font-medium uppercase tracking-wider mb-6">
              Integration
            </div>
            <h2 className="text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-6">
              Get started in minutes
            </h2>
            <p className="text-[16px] text-[#666] max-w-[400px] mx-auto mb-4">
              One npm package. Wrap your AI client. See your data instantly.
            </p>
            <p className="text-[13px]">
              <span className="text-white">Supported:</span>{" "}
              <span className="text-violet-400">OpenAI, Anthropic, Gemini</span>
              <span className="mx-3 text-[#333]">|</span>
              <span className="text-[#555]">Coming soon: Mistral, Groq, DeepSeek</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                num: "01",
                title: "Install the SDK",
                desc: "npm install @with-orbit/sdk",
              },
              {
                num: "02",
                title: "Wrap your client",
                desc: "One line to instrument OpenAI",
              },
              {
                num: "03",
                title: "See your data",
                desc: "Real-time metrics in your dashboard",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-[42px] font-medium text-[#1a1a1a] mb-3">{step.num}</div>
                <h3 className="text-[16px] font-medium text-white mb-2">{step.title}</h3>
                <p className="text-[14px] text-[#666]">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <IntegrationVisual />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 lg:py-28 border-t border-white/[0.04]">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-violet-600/10 via-violet-600/5 to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-[800px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[clamp(32px,4.5vw,56px)] font-medium leading-[1.05] tracking-[-0.03em] text-white mb-6">
              Don&apos;t wait for your first
              <br />
              <span className="bg-gradient-to-r from-white via-[#888] to-[#444] bg-clip-text text-transparent">
                AI bill shock.
              </span>
            </h2>
            <p className="text-[17px] text-[#666] mb-10 max-w-[450px] mx-auto">
              See what your AI is really costing you in production — feature by feature, workflow by workflow.
            </p>
            <a
              href="https://app.withorbit.io/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center h-14 px-8 bg-white text-black font-medium text-[15px] rounded-full hover:bg-white/90 transition-all"
            >
              Expose Hidden AI Spend
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
