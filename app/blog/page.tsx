"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "track-agentic-ai-workflows-task-customer-attribution",
    title: "How to Track Agentic AI Workflows: Task & Customer Attribution",
    description:
      "Learn how to track multi-step AI agent workflows with task_id and customer_id. Group LLM calls, measure total costs per task, and attribute AI spend to customers.",
    date: "2025-01-21",
    readTime: "9 min read",
    category: "Tutorial",
  },
  {
    slug: "ai-observability-what-you-need-to-know",
    title: "AI Observability: What You Need to Know in 2025",
    description:
      "Everything about AI observability and LLM monitoring. Learn what metrics to track, how to debug AI systems, and best practices for production.",
    date: "2025-01-21",
    readTime: "10 min read",
    category: "Guide",
  },
  {
    slug: "monitor-ai-api-usage-and-billing",
    title: "How to Monitor AI API Usage and Billing",
    description:
      "Set up AI API monitoring to track your usage and costs. Monitor spending across OpenAI, Anthropic, and Gemini with real-time dashboards.",
    date: "2025-01-20",
    readTime: "8 min read",
    category: "Tutorial",
  },
  {
    slug: "track-llm-costs-complete-guide-for-developers",
    title: "Track LLM Costs: A Complete Guide for Developers",
    description:
      "The definitive guide to tracking LLM costs in your applications. Monitor token usage, track API spending, and optimize your AI budget.",
    date: "2025-01-20",
    readTime: "11 min read",
    category: "Guide",
  },
  {
    slug: "ai-cost-calculator-estimate-llm-api-costs",
    title: "AI Cost Calculator: How to Estimate LLM API Costs",
    description:
      "Use our AI cost calculator guide to estimate OpenAI, Anthropic, and Gemini API costs. Learn to calculate token costs and predict your AI bill.",
    date: "2025-01-19",
    readTime: "8 min read",
    category: "Tool",
  },
  {
    slug: "how-to-track-ai-spending-in-production",
    title: "How to Track AI Spending in Production: Complete Guide",
    description:
      "Learn how to track AI spending, monitor AI costs in real-time, and get visibility into your production AI expenses across all providers.",
    date: "2025-01-18",
    readTime: "9 min read",
    category: "Guide",
  },
  {
    slug: "how-to-track-openai-api-costs-by-feature",
    title: "How to Track OpenAI API Costs by Feature",
    description:
      "Learn how to track OpenAI API costs at the feature level, not just totals. Understand which parts of your app are driving spend.",
    date: "2025-01-14",
    readTime: "8 min read",
    category: "Tutorial",
  },
  {
    slug: "llm-cost-optimization-5-ways-to-reduce-ai-spend",
    title: "LLM Cost Optimization: 5 Ways to Reduce AI Spend",
    description:
      "Practical strategies to reduce your AI API costs without sacrificing quality. From prompt optimization to smart model selection.",
    date: "2025-01-14",
    readTime: "10 min read",
    category: "Guide",
  },
  {
    slug: "openai-vs-anthropic-vs-gemini-pricing-comparison-2025",
    title: "OpenAI vs Anthropic vs Gemini: Pricing Comparison 2025",
    description:
      "A detailed comparison of pricing across major LLM providers. Understand cost per token and when to use each model.",
    date: "2025-01-14",
    readTime: "9 min read",
    category: "Comparison",
  },
];

const categories = ["All", "Guide", "Tutorial", "Comparison", "Tool"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="section-sm">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4 text-white">
              Blog
            </h1>
            <p className="text-[17px] text-[#666]">
              Guides, tutorials, and insights on AI cost management, LLM tracking, and observability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-[13px] font-medium rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                    : "bg-white/[0.03] text-[#888] border border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[11px] font-medium uppercase tracking-wider px-2 py-1 rounded ${
                      post.category === "Guide"
                        ? "text-emerald-400 bg-emerald-500/10"
                        : post.category === "Tutorial"
                        ? "text-violet-400 bg-violet-500/10"
                        : post.category === "Comparison"
                        ? "text-amber-400 bg-amber-500/10"
                        : "text-cyan-400 bg-cyan-500/10"
                    }`}>
                      {post.category}
                    </span>
                    <div className="flex items-center gap-4 text-[12px] text-[#555]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[15px] text-[#888] mb-4">{post.description}</p>
                  <span className="inline-flex items-center text-[13px] text-violet-400 font-medium group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Posts count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-[13px] text-[#555] mt-8"
          >
            Showing {filteredPosts.length} of {posts.length} posts
          </motion.p>
        </div>
      </section>

      {/* CTA */}
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
            <h2 className="text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-6">
              Ready to track your AI costs?
            </h2>
            <p className="text-[17px] text-[#666] mb-10 max-w-[450px] mx-auto">
              Start free with 10,000 events/month. No credit card required.
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
