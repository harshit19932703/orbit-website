"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DollarSign, BarChart3, Clock, AlertTriangle, Cpu, Shield, Code, Gauge } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function FeaturesPage() {
  return (
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
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-white">
              Features
            </h1>
            <p className="text-lg text-[#a1a1aa]">
              Everything you need to understand your AI features in production.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature 1: Feature-level visibility */}
      <section className="section border-t border-[#27272a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
                <BarChart3 className="w-3 h-3 mr-2" />
                Feature Analytics
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
                Feature-level visibility
              </h2>
              <p className="text-[#a1a1aa] text-lg mb-8">
                Understand exactly which product features use AI and how they behave. No more guessing which parts of your app are driving costs.
              </p>
              <ul className="space-y-4">
                {[
                  "Requests per feature",
                  "Cost per feature",
                  "Latency and error rate per feature",
                  "Feature-wise comparison",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-[#a1a1aa]">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="screenshot-container glow-sm">
                <div className="screenshot-inner">
                  <Image
                    src="/screenshots/features-cropped.png"
                    alt="Feature Analytics"
                    width={600}
                    height={375}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature 2: Cost & Usage Analytics */}
      <section className="section border-t border-[#27272a] bg-gradient-to-b from-[#0a0a0a] to-[#111113]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="screenshot-container glow-sm">
                <div className="screenshot-inner">
                  <Image
                    src="/screenshots/usage-cropped.png"
                    alt="Cost & Usage Analytics"
                    width={600}
                    height={375}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                <DollarSign className="w-3 h-3 mr-2" />
                Cost Analytics
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
                Cost & usage analytics
              </h2>
              <p className="text-[#a1a1aa] text-lg mb-8">
                Track AI spend using deterministic calculations based on model pricing. No billing reconciliation required.
              </p>
              <ul className="space-y-4">
                {[
                  "Token usage (input/output)",
                  "Estimated cost per request",
                  "Model-wise breakdown",
                  "Cost trends over time",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-[#a1a1aa]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature 3: Reliability & Errors */}
      <section className="section border-t border-[#27272a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-6">
                <AlertTriangle className="w-3 h-3 mr-2" />
                Error Tracking
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
                Reliability & errors
              </h2>
              <p className="text-[#a1a1aa] text-lg mb-8">
                Identify failures before users notice. Get detailed error logs and understand which models and features are failing.
              </p>
              <ul className="space-y-4">
                {[
                  "Error rates by feature and model",
                  "Invalid model and request failures",
                  "Recent error logs with details",
                  "Error trends over time",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-[#a1a1aa]">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="screenshot-container glow-sm">
                <div className="screenshot-inner">
                  <Image
                    src="/screenshots/errors-cropped.png"
                    alt="Error Tracking"
                    width={600}
                    height={375}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature 4: Model Performance */}
      <section className="section border-t border-[#27272a] bg-gradient-to-b from-[#111113] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="screenshot-container glow-sm">
                <div className="screenshot-inner">
                  <Image
                    src="/screenshots/models-cropped.png"
                    alt="Model Performance"
                    width={600}
                    height={375}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-6">
                <Cpu className="w-3 h-3 mr-2" />
                Model Analytics
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
                Model performance
              </h2>
              <p className="text-[#a1a1aa] text-lg mb-8">
                Compare performance across different AI models. See which models are cost-effective and which are causing issues.
              </p>
              <ul className="space-y-4">
                {[
                  "Cost by provider breakdown",
                  "Model-wise latency comparison",
                  "Token efficiency metrics",
                  "Error rate per model",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-[#a1a1aa]">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature 5: SDK-first approach */}
      <section className="section border-t border-[#27272a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
                <Code className="w-3 h-3 mr-2" />
                SDK Integration
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
                SDK-first approach
              </h2>
              <p className="text-[#a1a1aa] text-lg mb-8">
                Data comes directly from your application runtime. No scraping, no proxies, no guesswork.
              </p>
              <ul className="space-y-4">
                {[
                  "Node.js SDK",
                  "Python SDK",
                  "Lightweight and non-blocking",
                  "No API key sharing with third parties",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-[#a1a1aa]">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="screenshot-container glow-sm">
                <div className="screenshot-inner">
                  <Image
                    src="/screenshots/sdk-guide-cropped.png"
                    alt="SDK Integration"
                    width={600}
                    height={375}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More capabilities grid */}
      <section className="section border-t border-[#27272a]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
              More capabilities
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Gauge,
                title: "Real-time dashboard",
                description: "See metrics update as events flow in from your application.",
              },
              {
                icon: Clock,
                title: "Latency tracking",
                description: "Monitor P50, P95, and P99 latency across features and models.",
              },
              {
                icon: Shield,
                title: "Environment filtering",
                description: "Separate production, staging, and development data.",
              },
              {
                icon: BarChart3,
                title: "Date range filtering",
                description: "Analyze trends over custom time periods.",
              },
              {
                icon: DollarSign,
                title: "Cost projections",
                description: "Estimate monthly spend based on current usage patterns.",
              },
              {
                icon: AlertTriangle,
                title: "Error details",
                description: "See full error messages and stack traces for debugging.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card hover-lift"
              >
                <div className="w-10 h-10 rounded-lg bg-[#27272a] flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#a1a1aa]" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#71717a]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-[#27272a]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              Ready to see your AI features clearly?
            </h2>
            <p className="text-[#71717a] mb-8">
              Get started in minutes with our SDK.
            </p>
            <a
              href="https://orbit-analytics.vercel.app/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-3 inline-block"
            >
              Get started free
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
