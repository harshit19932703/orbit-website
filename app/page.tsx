"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  HeroVisual,
  FeatureAnalyticsVisual,
  CostAnalyticsVisual,
  ErrorTrackingVisual,
  ModelAnalyticsVisual,
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

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-20">
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

              <h1 className="text-[clamp(40px,5.5vw,68px)] font-medium leading-[1.0] tracking-[-0.04em] text-white mb-8">
                Understand how AI
                <br />
                <span className="bg-gradient-to-r from-white via-[#888] to-[#444] bg-clip-text text-transparent">
                  actually behaves
                </span>
                <br />
                inside your product
              </h1>

              <p className="text-[17px] md:text-[19px] text-[#666] leading-[1.65] mb-10 max-w-[460px]">
                See cost, latency, and errors <span className="text-white font-medium">per product feature</span>, using real runtime data from your application.
              </p>

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
              className="relative lg:pl-8"
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1 - Feature Level Analytics */}
      <section className="relative py-20 lg:py-28 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[13px] text-violet-400 font-medium uppercase tracking-wider mb-6">
                Feature-level analytics
              </div>
              <h2 className="text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-8">
                Know exactly which AI features
                <br />
                <span className="text-[#555]">drive cost and risk</span>
              </h2>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6 max-w-[420px]">
                Vendor dashboards show usage by model or API key.
                Orbit shows usage by <span className="text-white font-medium">product feature</span> — so you can understand which parts of your product
                are expensive, slow, or failing in production.
              </p>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-10 max-w-[420px]">
                Every AI call is tagged with the feature that triggered it.
                This lets you see cost, latency, and errors in the <span className="text-white font-medium">product context where decisions are made</span>.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Cost per feature", desc: "Identify the features driving most of your AI spend" },
                  { label: "Request volume", desc: "Understand usage patterns and changes across features" },
                  { label: "Error attribution", desc: "Pinpoint which product features are failing" },
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
        <div className="max-w-[1400px] mx-auto px-6">
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
                Cost intelligence
              </div>
              <h2 className="text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-8">
                See which AI costs matter
                <br />
                <span className="text-[#555]">before they escalate</span>
              </h2>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6 max-w-[420px]">
                Understand AI spend as it happens using deterministic calculations from real runtime data — not delayed invoices or estimates.
              </p>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-10 max-w-[420px]">
                View cost trends over time, break down spend by environment, and pinpoint the specific requests and features driving usage.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Real-time cost visibility", desc: "Updated as requests occur" },
                  { label: "Environment breakdown", desc: "Clearly separate prod, staging, and dev spend" },
                  { label: "Token-level detail", desc: "See input and output tokens per request" },
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
        <div className="max-w-[1400px] mx-auto px-6">
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

      {/* Section 4 - Model Performance */}
      <section className="relative py-20 lg:py-28 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Visual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <ModelAnalyticsVisual />
            </motion.div>

            {/* Right - Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="text-[13px] text-amber-400 font-medium uppercase tracking-wider mb-6">
                Model analytics
              </div>
              <h2 className="text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-8">
                Compare models
                <br />
                <span className="text-[#555]">across your product</span>
              </h2>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6 max-w-[420px]">
                See which models power each feature. Compare cost, latency,
                and error rates to make better decisions about model selection.
              </p>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-10 max-w-[420px]">
                Track cost per provider, performance by model,
                and identify opportunities to optimize your model choices.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Cost by provider", desc: "OpenAI, Anthropic, and more" },
                  { label: "Latency comparison", desc: "Average response times by model" },
                  { label: "Error rates", desc: "Reliability metrics per model" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 mr-4 flex-shrink-0" />
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
        <div className="max-w-[1000px] mx-auto px-6">
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
              { capability: "Product-centric view", providers: false, orbit: true },
              { capability: "SDK-based runtime data", providers: false, orbit: true },
            ].map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] ${
                  i !== 6 ? "border-b border-white/[0.04]" : ""
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
        <div className="max-w-[1000px] mx-auto px-6">
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
            <p className="text-[16px] text-[#666] max-w-[400px] mx-auto">
              One npm package. Wrap your OpenAI client. See your data instantly.
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
              Understand AI behavior
              <br />
              <span className="bg-gradient-to-r from-white via-[#888] to-[#444] bg-clip-text text-transparent">
                at the feature level
              </span>
            </h2>
            <p className="text-[17px] text-[#666] mb-10 max-w-[450px] mx-auto">
              Feature-level cost, latency, and error visibility from real runtime data — so you know what to fix and optimize.
            </p>
            <a
              href="https://app.withorbit.io/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center h-14 px-8 bg-white text-black font-medium text-[15px] rounded-full hover:bg-white/90 transition-all"
            >
              Start for free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
