"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowUpRight } from "lucide-react";

const posts = [
  {
    slug: "how-to-track-openai-api-costs-by-feature",
    title: "How to Track OpenAI API Costs by Feature",
    description:
      "Learn how to track OpenAI API costs at the feature level, not just totals. Understand which parts of your app are driving spend.",
    date: "2025-01-14",
    readTime: "5 min read",
    category: "Tutorial",
  },
  {
    slug: "llm-cost-optimization-5-ways-to-reduce-ai-spend",
    title: "LLM Cost Optimization: 5 Ways to Reduce AI Spend",
    description:
      "Practical strategies to reduce your AI API costs without sacrificing quality. From prompt optimization to smart model selection.",
    date: "2025-01-14",
    readTime: "7 min read",
    category: "Guide",
  },
  {
    slug: "openai-vs-anthropic-vs-gemini-pricing-comparison-2025",
    title: "OpenAI vs Anthropic vs Gemini: Pricing Comparison 2025",
    description:
      "A detailed comparison of pricing across major LLM providers. Understand cost per token and when to use each model.",
    date: "2025-01-14",
    readTime: "6 min read",
    category: "Comparison",
  },
];

export default function BlogPage() {
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
              Guides, tutorials, and insights on AI cost management and observability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-medium text-violet-400 uppercase tracking-wider bg-violet-500/10 px-2 py-1 rounded">
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
