"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";

// Generate Article JSON-LD schema for SEO
function generateArticleSchema(slug: string, post: { title: string; description: string; date: string; readTime: string; category: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Orbit",
      url: "https://withorbit.io",
    },
    publisher: {
      "@type": "Organization",
      name: "Orbit",
      url: "https://withorbit.io",
      logo: {
        "@type": "ImageObject",
        url: "https://withorbit.io/orbit-logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://withorbit.io/blog/${slug}`,
    },
    articleSection: post.category,
    keywords: [
      "AI cost tracking",
      "LLM monitoring",
      "AI observability",
      "OpenAI costs",
      "Anthropic costs",
      "Gemini costs",
      post.category.toLowerCase(),
    ],
  };
}

// Generate Breadcrumb JSON-LD schema for SEO
function generateBreadcrumbSchema(slug: string, postTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://withorbit.io",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://withorbit.io/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: postTitle,
        item: `https://withorbit.io/blog/${slug}`,
      },
    ],
  };
}

// Get related posts based on category and excluding current post
function getRelatedPosts(currentSlug: string, currentCategory: string, allPosts: Record<string, { title: string; description: string; date: string; readTime: string; category: string }>, limit: number = 3) {
  const postEntries = Object.entries(allPosts)
    .filter(([slug]) => slug !== currentSlug)
    .map(([slug, post]) => ({ slug, ...post }));

  // Prioritize same category, then recent posts
  const sameCategory = postEntries.filter(p => p.category === currentCategory);
  const otherCategory = postEntries.filter(p => p.category !== currentCategory);

  // Sort by date (newest first)
  const sortByDate = (a: { date: string }, b: { date: string }) =>
    new Date(b.date).getTime() - new Date(a.date).getTime();

  sameCategory.sort(sortByDate);
  otherCategory.sort(sortByDate);

  return [...sameCategory, ...otherCategory].slice(0, limit);
}

// Blog post content
const posts: Record<
  string,
  {
    title: string;
    description: string;
    date: string;
    readTime: string;
    category: string;
    content: React.ReactNode;
  }
> = {
  "how-to-track-openai-api-costs-by-feature": {
    title: "How to Track OpenAI API Costs by Feature",
    description:
      "Learn how to track OpenAI API costs at the feature level, not just totals. Understand which parts of your app are driving spend.",
    date: "2025-01-14",
    readTime: "8 min read",
    category: "Tutorial",
    content: <Blog1Content />,
  },
  "llm-cost-optimization-5-ways-to-reduce-ai-spend": {
    title: "LLM Cost Optimization: 5 Ways to Reduce AI Spend",
    description:
      "Practical strategies to reduce your AI API costs without sacrificing quality. From prompt optimization to smart model selection.",
    date: "2025-01-14",
    readTime: "10 min read",
    category: "Guide",
    content: <Blog2Content />,
  },
  "openai-vs-anthropic-vs-gemini-pricing-comparison-2025": {
    title: "OpenAI vs Anthropic vs Gemini: Pricing Comparison 2025",
    description:
      "A detailed comparison of pricing across major LLM providers. Understand cost per token and when to use each model.",
    date: "2025-01-14",
    readTime: "9 min read",
    category: "Comparison",
    content: <Blog3Content />,
  },
  "how-to-track-ai-spending-in-production": {
    title: "How to Track AI Spending in Production: Complete Guide",
    description:
      "Learn how to track AI spending, monitor AI costs in real-time, and get visibility into your production AI expenses across all providers.",
    date: "2025-01-18",
    readTime: "9 min read",
    category: "Guide",
    content: <Blog4Content />,
  },
  "ai-cost-calculator-estimate-llm-api-costs": {
    title: "AI Cost Calculator: How to Estimate LLM API Costs",
    description:
      "Use our AI cost calculator guide to estimate OpenAI, Anthropic, and Gemini API costs. Learn to calculate token costs and predict your AI bill.",
    date: "2025-01-19",
    readTime: "8 min read",
    category: "Tool",
    content: <Blog5Content />,
  },
  "track-llm-costs-complete-guide-for-developers": {
    title: "Track LLM Costs: A Complete Guide for Developers",
    description:
      "The definitive guide to tracking LLM costs in your applications. Monitor token usage, track API spending, and optimize your AI budget.",
    date: "2025-01-20",
    readTime: "11 min read",
    category: "Guide",
    content: <Blog6Content />,
  },
  "monitor-ai-api-usage-and-billing": {
    title: "How to Monitor AI API Usage and Billing",
    description:
      "Set up AI API monitoring to track your usage and costs. Monitor spending across OpenAI, Anthropic, and Gemini with real-time dashboards.",
    date: "2025-01-20",
    readTime: "8 min read",
    category: "Tutorial",
    content: <Blog7Content />,
  },
  "ai-observability-what-you-need-to-know": {
    title: "AI Observability: What You Need to Know in 2025",
    description:
      "Everything about AI observability and LLM monitoring. Learn what metrics to track, how to debug AI systems, and best practices for production.",
    date: "2025-01-21",
    readTime: "10 min read",
    category: "Guide",
    content: <Blog8Content />,
  },
  "track-agentic-ai-workflows-task-customer-attribution": {
    title: "How to Track Agentic AI Workflows: Task & Customer Attribution",
    description:
      "Learn how to track multi-step AI agent workflows with task_id and customer_id. Group LLM calls, measure total costs per task, and attribute AI spend to customers.",
    date: "2025-01-21",
    readTime: "9 min read",
    category: "Tutorial",
    content: <Blog9Content />,
  },
  "openai-api-pricing-2025-complete-guide": {
    title: "OpenAI API Pricing 2025: Complete Guide to GPT-4o, o1, and o3 Costs",
    description:
      "The complete guide to OpenAI API pricing in 2025. Current prices for GPT-4o, GPT-4o-mini, o1, o3-mini, and all OpenAI models with cost examples.",
    date: "2025-01-27",
    readTime: "8 min read",
    category: "Guide",
    content: <Blog10Content />,
  },
  "ai-api-cost-control-guide": {
    title: "AI API Cost Control: How to Track and Reduce LLM Spend",
    description:
      "Learn how to control AI API costs with practical strategies. Monitor spending, set budgets, and reduce LLM costs without sacrificing quality.",
    date: "2025-01-27",
    readTime: "10 min read",
    category: "Guide",
    content: <Blog11Content />,
  },
  "openai-api-cost-tracking-tutorial": {
    title: "How to Track OpenAI API Costs in Your Application",
    description:
      "Step-by-step tutorial on tracking OpenAI API costs in production. Monitor GPT-4o usage, track spending by feature, and get real-time cost visibility.",
    date: "2025-01-27",
    readTime: "7 min read",
    category: "Tutorial",
    content: <Blog12Content />,
  },
};

// Reusable components for blog content
function Callout({ type, title, children }: { type: "tip" | "warning" | "info"; title: string; children: React.ReactNode }) {
  const styles = {
    tip: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-300",
    info: "bg-violet-500/10 border-violet-500/20 text-violet-300",
  };
  const icons = {
    tip: <Lightbulb className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <CheckCircle className="w-5 h-5" />,
  };
  return (
    <div className={`p-5 rounded-xl border ${styles[type]} my-6`}>
      <div className="flex items-center gap-2 font-semibold mb-2">
        {icons[type]}
        {title}
      </div>
      <div className="text-[#a1a1aa] text-[15px]">{children}</div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center">
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-[13px] text-[#666]">{label}</div>
    </div>
  );
}

function Blog1Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        You&apos;re building AI features. Your OpenAI bill just hit $3,000 this month. Your boss asks: &quot;Which feature is using all this?&quot;
      </p>

      <p>
        You open the OpenAI dashboard. Total tokens: 45 million. Total cost: $3,000. But which feature? The chatbot? The document analyzer? The code assistant? <strong>You have no idea.</strong>
      </p>

      <p>
        This is the reality for most teams shipping AI in production. And it&apos;s a problem that gets worse as you scale.
      </p>

      <h2>The $10,000 Mystery</h2>

      <p>
        I talked to a startup founder last month. They had three AI-powered features in their SaaS product:
      </p>

      <ul>
        <li>A customer support chatbot</li>
        <li>An email draft generator</li>
        <li>A meeting notes summarizer</li>
      </ul>

      <p>
        Their AI costs grew from $500/month to $10,000/month in six months. When they finally dug into the data (after building custom logging), they discovered something surprising: the meeting notes feature—used by only 5% of their users—was consuming 70% of their AI budget.
      </p>

      <Callout type="warning" title="The Hidden Cost Trap">
        Features with low usage can still have high costs. A feature used by 100 users making 10 requests each (1,000 total) can cost more than a feature used by 10,000 users making 1 request each—if the prompts are longer or use more expensive models.
      </Callout>

      <h2>Why Vendor Dashboards Fall Short</h2>

      <p>
        OpenAI, Anthropic, and Google all provide usage dashboards. They show you:
      </p>

      <ul>
        <li>Total API calls</li>
        <li>Total tokens consumed</li>
        <li>Total cost</li>
        <li>Usage by model</li>
      </ul>

      <p>
        What they <strong>don&apos;t</strong> show you:
      </p>

      <ul>
        <li>Cost per feature in your product</li>
        <li>Which features are efficient vs. wasteful</li>
        <li>Cost trends by feature over time</li>
        <li>Error rates by feature</li>
      </ul>

      <p>
        It&apos;s like a restaurant knowing their total food costs but having no idea which dishes are profitable.
      </p>

      <h2>The Manual Approach (And Why It Hurts)</h2>

      <p>
        Many teams try to solve this by adding logging:
      </p>

      <pre><code>{`// Every API call gets wrapped with logging
async function callOpenAI(prompt, feature) {
  const start = Date.now();
  const response = await openai.chat.completions.create({...});
  const latency = Date.now() - start;

  // Log to your database
  await db.insert({
    feature,
    tokens: response.usage.total_tokens,
    cost: calculateCost(response.usage),
    latency,
    timestamp: new Date()
  });

  return response;
}`}</code></pre>

      <p>
        This works, but it creates new problems:
      </p>

      <ul>
        <li><strong>Maintenance burden:</strong> You&apos;re now building and maintaining analytics infrastructure</li>
        <li><strong>Inconsistent implementation:</strong> Different developers implement logging differently</li>
        <li><strong>Dashboard gap:</strong> You have data, but no easy way to visualize it</li>
        <li><strong>Cost calculation complexity:</strong> Pricing changes, models change, math gets complicated</li>
      </ul>

      <h2>A Better Approach: SDK-Based Tracking</h2>

      <p>
        The cleanest solution is to use an SDK that wraps your AI client and handles tracking automatically. Here&apos;s what it looks like:
      </p>

      <pre><code>{`import { Orbit } from '@with-orbit/sdk';
import OpenAI from 'openai';

// Initialize once
const orbit = new Orbit({ apiKey: process.env.ORBIT_API_KEY });

// Wrap your client with a feature tag
const chatClient = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'customer-support-chat',
  environment: 'production'
});

// Use it exactly like the normal OpenAI client
const response = await chatClient.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: userMessage }]
});`}</code></pre>

      <p>
        Every API call is automatically tagged, tracked, and visible in a dashboard. No custom logging code. No database management. No dashboard building.
      </p>

      <h2>What Good Feature-Level Tracking Looks Like</h2>

      <p>
        With proper tracking in place, you can answer questions like:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <StatCard value="$1,400" label="Chat feature monthly cost" />
        <StatCard value="$400" label="Summary feature monthly cost" />
        <StatCard value="$200" label="Code review monthly cost" />
      </div>

      <p>
        But cost is just the beginning. You also get:
      </p>

      <ul>
        <li><strong>Error rates by feature:</strong> Is one feature failing more than others?</li>
        <li><strong>Latency by feature:</strong> Which features are slow?</li>
        <li><strong>Cost per request:</strong> How efficient is each feature?</li>
        <li><strong>Trends over time:</strong> Are costs going up or down?</li>
      </ul>

      <Callout type="tip" title="Pro Tip: Track Environments Separately">
        Tag your development, staging, and production calls separately. This prevents test data from polluting your production metrics and helps you catch issues before they reach users.
      </Callout>

      <h2>Real Decisions You Can Make</h2>

      <p>
        Once you have feature-level data, you can make informed decisions:
      </p>

      <ul>
        <li><strong>Optimize the expensive features first:</strong> Focus your prompt engineering where it matters most</li>
        <li><strong>Switch models strategically:</strong> Maybe your summarizer works fine with GPT-4o-mini instead of GPT-4o</li>
        <li><strong>Set feature-level budgets:</strong> Alert when a feature exceeds its expected cost</li>
        <li><strong>Prove ROI to stakeholders:</strong> Show exactly what each feature costs vs. the value it delivers</li>
      </ul>

      <h2>Getting Started</h2>

      <p>
        If you&apos;re ready to see where your AI spend is actually going:
      </p>

      <ol>
        <li><strong>Audit your current features:</strong> List every place your app calls an AI API</li>
        <li><strong>Decide on feature names:</strong> Use clear, consistent names like &quot;chat-assistant&quot;, &quot;doc-summarizer&quot;</li>
        <li><strong>Implement tracking:</strong> Either build your own or use a tool like Orbit</li>
        <li><strong>Review weekly:</strong> Make cost reviews part of your regular engineering process</li>
      </ol>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">How Orbit Helps</h3>
        <p className="text-[#a1a1aa] mb-4">
          Orbit is a lightweight SDK that wraps your AI clients and gives you instant visibility into per-feature costs, latency, and errors. No proxies, no request interception—just clean tracking that works.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> One-line SDK integration</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Real-time cost tracking per feature</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Free tier: 10,000 events/month</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Works with OpenAI, Anthropic, and Gemini</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Try Orbit free <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

function Blog2Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        Your AI feature worked perfectly in development. It cost $50/month during testing. Now it&apos;s in production, and the bill is $5,000. What happened?
      </p>

      <p>
        This is one of the most common stories in AI development. A feature that seemed cheap becomes expensive at scale. The good news: there are proven strategies to reduce costs without sacrificing quality.
      </p>

      <p>
        Here are five approaches that actually work, ranked from easiest to most complex.
      </p>

      <h2>1. Know Where Your Money Goes</h2>

      <p>
        Before optimizing anything, you need to know what&apos;s costing you money. This sounds obvious, but most teams skip this step. They try to optimize everything equally instead of focusing on what matters.
      </p>

      <Callout type="info" title="The 80/20 Rule of AI Costs">
        In most applications, 80% of costs come from 20% of features (or less). Find those features first.
      </Callout>

      <p>
        Action steps:
      </p>

      <ul>
        <li>Tag every AI call with the feature it belongs to</li>
        <li>Track cost per feature, not just total cost</li>
        <li>Review the data weekly</li>
        <li>Focus optimization efforts on the top 2-3 cost drivers</li>
      </ul>

      <p>
        Without this visibility, you&apos;re optimizing blind. You might spend a week reducing costs on a feature that only accounts for 5% of your bill.
      </p>

      <h2>2. Choose the Right Model for Each Task</h2>

      <p>
        Not every task needs GPT-4o. Many tasks work just as well with smaller, cheaper models. Here&apos;s a quick guide:
      </p>

      <table>
        <thead>
          <tr>
            <th>Task Type</th>
            <th>Recommended Model</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Complex reasoning</td>
            <td>GPT-4o, Claude 3.5 Sonnet</td>
            <td>Needs advanced capabilities</td>
          </tr>
          <tr>
            <td>Code generation</td>
            <td>GPT-4o, Claude 3.5 Sonnet</td>
            <td>Quality matters more than cost</td>
          </tr>
          <tr>
            <td>Simple Q&A</td>
            <td>GPT-4o-mini, Gemini Flash</td>
            <td>Smaller models handle this well</td>
          </tr>
          <tr>
            <td>Classification</td>
            <td>GPT-4o-mini, Gemini Flash</td>
            <td>Structured output, predictable task</td>
          </tr>
          <tr>
            <td>Summarization</td>
            <td>GPT-4o-mini, Claude Haiku</td>
            <td>Extraction is simpler than generation</td>
          </tr>
          <tr>
            <td>Translation</td>
            <td>GPT-4o-mini</td>
            <td>Well-defined task, smaller model works</td>
          </tr>
        </tbody>
      </table>

      <p>
        The cost difference is significant:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        <StatCard value="$2.50" label="GPT-4o per 1M input tokens" />
        <StatCard value="$0.15" label="GPT-4o-mini per 1M input tokens" />
      </div>

      <p>
        That&apos;s a <strong>16x cost reduction</strong> for tasks where the smaller model works just as well.
      </p>

      <Callout type="tip" title="A/B Test Your Models">
        Before switching models in production, run both side-by-side on real traffic. Compare output quality and cost. Only switch when you&apos;re confident the quality is acceptable.
      </Callout>

      <h2>3. Write Shorter, Better Prompts</h2>

      <p>
        Tokens cost money. Every unnecessary word in your prompt is wasted spend. But this doesn&apos;t mean you should sacrifice clarity—it means you should be intentional.
      </p>

      <p>
        <strong>Before (verbose):</strong>
      </p>

      <pre><code>{`You are a helpful assistant that summarizes documents.
Please read the following document carefully and provide
a comprehensive summary that captures all the main points.
The summary should be clear, concise, and well-organized.
Make sure to include the key takeaways and any important
details that the reader should know about.

Document to summarize:
{document}`}</code></pre>

      <p>
        <strong>After (concise):</strong>
      </p>

      <pre><code>{`Summarize the key points from this document in 3-5 bullets:

{document}`}</code></pre>

      <p>
        The second prompt is clearer AND cheaper. Common prompt bloat patterns:
      </p>

      <ul>
        <li><strong>Redundant instructions:</strong> &quot;Please&quot; and &quot;make sure to&quot; add tokens without value</li>
        <li><strong>Over-explanation:</strong> If the model understands, don&apos;t explain further</li>
        <li><strong>Unused context:</strong> Don&apos;t include information the model doesn&apos;t need</li>
        <li><strong>Verbose system prompts:</strong> These are sent with every request</li>
      </ul>

      <h2>4. Cache Repeated Requests</h2>

      <p>
        If users ask similar questions, you&apos;re paying for the same computation repeatedly. Caching can dramatically reduce costs for certain use cases.
      </p>

      <p>
        <strong>Good candidates for caching:</strong>
      </p>

      <ul>
        <li>FAQ-style questions</li>
        <li>Static content generation (product descriptions, etc.)</li>
        <li>Classification tasks with limited input variation</li>
        <li>Anything where slight input changes don&apos;t require new responses</li>
      </ul>

      <p>
        <strong>Bad candidates for caching:</strong>
      </p>

      <ul>
        <li>Conversations (context changes constantly)</li>
        <li>User-specific content</li>
        <li>Time-sensitive information</li>
        <li>Tasks requiring real-time data</li>
      </ul>

      <pre><code>{`// Simple semantic caching example
const cache = new Map();

async function getCachedCompletion(prompt) {
  // Create a cache key from the prompt
  const key = hashPrompt(prompt);

  // Check cache first
  if (cache.has(key)) {
    return cache.get(key);
  }

  // Call API if not cached
  const response = await openai.chat.completions.create({...});

  // Store in cache (with TTL in production)
  cache.set(key, response);

  return response;
}`}</code></pre>

      <Callout type="warning" title="Cache Carefully">
        Caching works best for deterministic tasks. For creative or conversational use cases, caching can make your app feel repetitive and robotic.
      </Callout>

      <h2>5. Set Guardrails and Alerts</h2>

      <p>
        Even with all the optimizations above, costs can spike unexpectedly. Maybe a feature goes viral. Maybe there&apos;s a bug causing infinite loops. You need guardrails.
      </p>

      <p>
        <strong>Essential guardrails:</strong>
      </p>

      <ul>
        <li><strong>Daily spend limits:</strong> Alert when daily spend exceeds a threshold</li>
        <li><strong>Per-user rate limits:</strong> Prevent any single user from running up costs</li>
        <li><strong>Request size limits:</strong> Cap maximum input length</li>
        <li><strong>Error monitoring:</strong> Failed requests still cost tokens (for the input)</li>
      </ul>

      <p>
        Set alerts at multiple thresholds: 50%, 75%, and 90% of your budget. The earlier you catch a problem, the less it costs.
      </p>

      <h2>Quick Wins vs. Long-Term Gains</h2>

      <table>
        <thead>
          <tr>
            <th>Strategy</th>
            <th>Effort</th>
            <th>Impact</th>
            <th>Time to See Results</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Track costs per feature</td>
            <td>Low</td>
            <td>Enables everything else</td>
            <td>Immediate</td>
          </tr>
          <tr>
            <td>Switch to smaller models</td>
            <td>Low</td>
            <td>10-20x savings possible</td>
            <td>Days</td>
          </tr>
          <tr>
            <td>Optimize prompts</td>
            <td>Medium</td>
            <td>20-50% reduction</td>
            <td>Weeks</td>
          </tr>
          <tr>
            <td>Add caching</td>
            <td>Medium</td>
            <td>Varies by use case</td>
            <td>Weeks</td>
          </tr>
          <tr>
            <td>Set up guardrails</td>
            <td>Low</td>
            <td>Prevents disasters</td>
            <td>Immediate</td>
          </tr>
        </tbody>
      </table>

      <p>
        Start with tracking and guardrails—they&apos;re low effort and high impact. Then move to model selection and prompt optimization for your highest-cost features.
      </p>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">How Orbit Helps</h3>
        <p className="text-[#a1a1aa] mb-4">
          Orbit gives you the visibility you need to optimize AI costs. See exactly which features cost what, track efficiency over time, and catch issues before they become expensive.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Per-feature cost breakdown</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Cost trends and anomaly detection</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Error tracking to catch wasted spend</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Free tier: 10,000 events/month</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Start optimizing with Orbit <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

function Blog3Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        OpenAI, Anthropic, or Google Gemini? If you&apos;re building AI features, you&apos;ve probably asked this question. While capabilities matter, pricing is often the deciding factor—especially at scale.
      </p>

      <p>
        Here&apos;s a comprehensive breakdown of pricing across all three providers as of January 2025, plus guidance on when to use each.
      </p>

      <h2>The Quick Comparison</h2>

      <p>
        Let&apos;s start with the flagship and budget models from each provider:
      </p>

      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Model</th>
            <th>Input (per 1M)</th>
            <th>Output (per 1M)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OpenAI</td>
            <td>GPT-4o</td>
            <td>$2.50</td>
            <td>$10.00</td>
          </tr>
          <tr>
            <td>OpenAI</td>
            <td>GPT-4o-mini</td>
            <td>$0.15</td>
            <td>$0.60</td>
          </tr>
          <tr>
            <td>Anthropic</td>
            <td>Claude 3.5 Sonnet</td>
            <td>$3.00</td>
            <td>$15.00</td>
          </tr>
          <tr>
            <td>Anthropic</td>
            <td>Claude 3.5 Haiku</td>
            <td>$0.80</td>
            <td>$4.00</td>
          </tr>
          <tr>
            <td>Google</td>
            <td>Gemini 1.5 Pro</td>
            <td>$1.25</td>
            <td>$5.00</td>
          </tr>
          <tr>
            <td>Google</td>
            <td>Gemini 2.0 Flash</td>
            <td>$0.10</td>
            <td>$0.40</td>
          </tr>
        </tbody>
      </table>

      <Callout type="info" title="Key Takeaway">
        Google&apos;s Gemini 2.0 Flash is currently the cheapest option for high-volume, simpler tasks. For complex reasoning, GPT-4o and Claude 3.5 Sonnet are comparable but Anthropic is slightly more expensive.
      </Callout>

      <h2>OpenAI: The Industry Standard</h2>

      <p>
        OpenAI has the most mature ecosystem, the best developer documentation, and the widest adoption. If you&apos;re not sure which provider to start with, OpenAI is usually the safe choice.
      </p>

      <h3>GPT-4o (Flagship)</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <StatCard value="$2.50" label="Per 1M input tokens" />
        <StatCard value="$10.00" label="Per 1M output tokens" />
      </div>

      <p>
        <strong>Best for:</strong> Complex reasoning, code generation, multimodal tasks (images + text), tasks requiring high accuracy.
      </p>

      <p>
        <strong>Context window:</strong> 128K tokens
      </p>

      <h3>GPT-4o-mini (Budget)</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <StatCard value="$0.15" label="Per 1M input tokens" />
        <StatCard value="$0.60" label="Per 1M output tokens" />
      </div>

      <p>
        <strong>Best for:</strong> Simple tasks, classification, extraction, basic Q&A, high-volume applications where cost matters more than peak quality.
      </p>

      <p>
        <strong>Context window:</strong> 128K tokens
      </p>

      <Callout type="tip" title="When to Choose OpenAI">
        Choose OpenAI when you need the best tooling ecosystem (function calling, assistants API, embeddings), extensive documentation, or when your team is already familiar with their API.
      </Callout>

      <h2>Anthropic: The Safety-Focused Alternative</h2>

      <p>
        Anthropic&apos;s Claude models are known for longer outputs, better instruction-following, and strong performance on analysis and writing tasks. They&apos;re also the leader in AI safety research.
      </p>

      <h3>Claude 3.5 Sonnet (Flagship)</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <StatCard value="$3.00" label="Per 1M input tokens" />
        <StatCard value="$15.00" label="Per 1M output tokens" />
      </div>

      <p>
        <strong>Best for:</strong> Long-form content generation, complex analysis, coding assistance, tasks requiring nuanced understanding.
      </p>

      <p>
        <strong>Context window:</strong> 200K tokens (largest among flagship models)
      </p>

      <h3>Claude 3.5 Haiku (Budget)</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <StatCard value="$0.80" label="Per 1M input tokens" />
        <StatCard value="$4.00" label="Per 1M output tokens" />
      </div>

      <p>
        <strong>Best for:</strong> Fast responses, moderate complexity tasks, applications where Claude&apos;s style is preferred but cost matters.
      </p>

      <p>
        <strong>Context window:</strong> 200K tokens
      </p>

      <Callout type="tip" title="When to Choose Anthropic">
        Choose Claude when you need the longest context window, when working on tasks requiring careful reasoning, or when your use case benefits from Claude&apos;s particular style (often preferred for customer-facing writing).
      </Callout>

      <h2>Google Gemini: The Cost Leader</h2>

      <p>
        Google&apos;s Gemini models offer competitive pricing, especially for their Flash tier. If cost is your primary concern, Gemini is worth serious consideration.
      </p>

      <h3>Gemini 1.5 Pro (Flagship)</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <StatCard value="$1.25" label="Per 1M input tokens" />
        <StatCard value="$5.00" label="Per 1M output tokens" />
      </div>

      <p>
        <strong>Best for:</strong> Tasks requiring very long context (up to 2M tokens), multimodal applications especially with video, when you&apos;re already in the Google Cloud ecosystem.
      </p>

      <p>
        <strong>Context window:</strong> Up to 2M tokens (by far the largest available)
      </p>

      <h3>Gemini 2.0 Flash (Budget)</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <StatCard value="$0.10" label="Per 1M input tokens" />
        <StatCard value="$0.40" label="Per 1M output tokens" />
      </div>

      <p>
        <strong>Best for:</strong> High-volume applications, cost-sensitive use cases, tasks where speed matters, when quality requirements are moderate.
      </p>

      <p>
        <strong>Context window:</strong> 1M tokens
      </p>

      <Callout type="tip" title="When to Choose Google">
        Choose Gemini when cost is the primary driver, when you need extremely long context windows, when working with video content, or when you&apos;re already on Google Cloud.
      </Callout>

      <h2>Real Cost Comparison: 1 Million Requests</h2>

      <p>
        Let&apos;s compare actual costs for a typical workload: 1 million requests with an average of 500 input tokens and 200 output tokens each.
      </p>

      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Cost per 1M Requests</th>
            <th>vs. Cheapest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gemini 2.0 Flash</td>
            <td>$130</td>
            <td>Baseline</td>
          </tr>
          <tr>
            <td>GPT-4o-mini</td>
            <td>$195</td>
            <td>1.5x</td>
          </tr>
          <tr>
            <td>Claude 3.5 Haiku</td>
            <td>$1,200</td>
            <td>9x</td>
          </tr>
          <tr>
            <td>Gemini 1.5 Pro</td>
            <td>$1,625</td>
            <td>12x</td>
          </tr>
          <tr>
            <td>GPT-4o</td>
            <td>$3,250</td>
            <td>25x</td>
          </tr>
          <tr>
            <td>Claude 3.5 Sonnet</td>
            <td>$4,500</td>
            <td>35x</td>
          </tr>
        </tbody>
      </table>

      <p>
        The difference between the cheapest and most expensive option is <strong>35x</strong>. That&apos;s the difference between a $130/month feature and a $4,500/month feature.
      </p>

      <h2>Decision Framework</h2>

      <p>
        Here&apos;s a simple framework for choosing:
      </p>

      <h3>Choose OpenAI GPT-4o when:</h3>
      <ul>
        <li>You need the most reliable, well-documented API</li>
        <li>Your use case requires function calling or assistants</li>
        <li>Quality is more important than cost</li>
        <li>Your team is already familiar with OpenAI</li>
      </ul>

      <h3>Choose Claude 3.5 Sonnet when:</h3>
      <ul>
        <li>You need very long context windows (200K+ tokens)</li>
        <li>Your use case is writing-heavy (emails, content, documentation)</li>
        <li>You value Claude&apos;s particular communication style</li>
        <li>You&apos;re working on complex analysis tasks</li>
      </ul>

      <h3>Choose Gemini 2.0 Flash when:</h3>
      <ul>
        <li>Cost is your primary constraint</li>
        <li>You have high-volume, simpler tasks</li>
        <li>Speed matters more than peak quality</li>
        <li>You&apos;re already on Google Cloud</li>
      </ul>

      <h2>Multi-Provider Strategy</h2>

      <p>
        Many teams use multiple providers strategically:
      </p>

      <ul>
        <li><strong>Flagship models</strong> for customer-facing, high-stakes features</li>
        <li><strong>Budget models</strong> for internal tools and high-volume tasks</li>
        <li><strong>Different providers</strong> for different features based on strengths</li>
      </ul>

      <p>
        The challenge? Tracking costs across multiple providers. Each has different dashboards, different pricing structures, and different billing cycles.
      </p>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">How Orbit Helps</h3>
        <p className="text-[#a1a1aa] mb-4">
          Using multiple AI providers? Orbit gives you a unified view of costs across OpenAI, Anthropic, and Gemini—all in one dashboard. See which provider is most cost-effective for each feature.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Unified cost tracking across all providers</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Per-feature breakdown regardless of provider</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Compare efficiency across models</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Free tier: 10,000 events/month</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Track all providers with Orbit <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

function Blog4Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        You&apos;re shipping AI features to production. Users love them. But here&apos;s the question keeping you up at night: how much is this actually costing us?
      </p>

      <p>
        Tracking AI spending in production is different from tracking it in development. In production, you&apos;re dealing with real users, unpredictable traffic patterns, and costs that can spiral without warning. This guide covers everything you need to know about tracking AI spending effectively.
      </p>

      <h2>Why Production AI Spend Tracking is Different</h2>

      <p>
        In development, your AI costs are predictable. You control the inputs, the frequency, and the models. Production is chaos:
      </p>

      <ul>
        <li><strong>Unpredictable usage:</strong> Users don&apos;t behave like your test scripts</li>
        <li><strong>Traffic spikes:</strong> A viral moment can 10x your costs overnight</li>
        <li><strong>Edge cases:</strong> Users find creative ways to use (and abuse) your features</li>
        <li><strong>Multiple features:</strong> Different parts of your app have different cost profiles</li>
      </ul>

      <Callout type="warning" title="The Production Surprise">
        Teams consistently underestimate production AI costs by 3-5x. What cost $500/month in testing often costs $2,000-$3,000 in production.
      </Callout>

      <h2>What You Need to Track</h2>

      <p>
        Effective AI spend tracking in production requires monitoring multiple dimensions:
      </p>

      <h3>1. Cost by Feature</h3>

      <p>
        Not all features are created equal. Your chatbot might cost $0.02 per conversation while your document analyzer costs $0.50 per document. Track them separately.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <StatCard value="$0.02" label="Avg cost per chat" />
        <StatCard value="$0.50" label="Avg cost per doc analysis" />
        <StatCard value="$0.08" label="Avg cost per summary" />
      </div>

      <h3>2. Cost by User Segment</h3>

      <p>
        Power users often consume 10-20x more AI resources than average users. If you&apos;re on a freemium model, this matters enormously for unit economics.
      </p>

      <h3>3. Cost by Time Period</h3>

      <p>
        Track daily, weekly, and monthly trends. Look for patterns:
      </p>

      <ul>
        <li>Are costs growing faster than revenue?</li>
        <li>Are there specific days or times with unusual spikes?</li>
        <li>Is a particular feature&apos;s cost growing disproportionately?</li>
      </ul>

      <h3>4. Cost by Model</h3>

      <p>
        If you use multiple models, track each separately. You might discover that 80% of your GPT-4o usage could be handled by GPT-4o-mini.
      </p>

      <h2>Setting Up Production Tracking</h2>

      <p>
        There are three approaches to tracking AI spend in production:
      </p>

      <h3>Option 1: Manual Logging (Not Recommended)</h3>

      <pre><code>{`// This works but creates maintenance burden
async function trackAICall(feature, model, tokens, cost) {
  await db.insert('ai_usage', {
    feature,
    model,
    tokens,
    cost,
    timestamp: new Date(),
    environment: 'production'
  });
}`}</code></pre>

      <p>
        Problems with manual logging: inconsistent implementation, cost calculation errors, no built-in dashboards, maintenance overhead.
      </p>

      <h3>Option 2: Provider Dashboards (Limited)</h3>

      <p>
        OpenAI, Anthropic, and Google all offer usage dashboards. They&apos;re useful for total spend but lack feature-level granularity and real-time alerting.
      </p>

      <h3>Option 3: SDK-Based Tracking (Recommended)</h3>

      <pre><code>{`import { Orbit } from '@with-orbit/sdk';

const orbit = new Orbit({
  apiKey: process.env.ORBIT_API_KEY
});

// Each feature gets its own wrapped client
const chatClient = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'customer-chat',
  environment: 'production'
});

const analyzerClient = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'doc-analyzer',
  environment: 'production'
});`}</code></pre>

      <p>
        SDK-based tracking gives you automatic cost calculation, feature-level breakdowns, real-time dashboards, and zero maintenance overhead.
      </p>

      <h2>Essential Alerts for Production</h2>

      <p>
        Don&apos;t wait until the end of the month to discover a problem. Set up these alerts:
      </p>

      <ul>
        <li><strong>Daily spend threshold:</strong> Alert if daily spend exceeds 150% of average</li>
        <li><strong>Hourly anomalies:</strong> Alert on sudden spikes (potential abuse or bugs)</li>
        <li><strong>Feature-specific alerts:</strong> Set budgets per feature</li>
        <li><strong>Error rate alerts:</strong> High errors often mean wasted spend</li>
      </ul>

      <Callout type="tip" title="The 2x Rule">
        Set your first alert at 2x your expected daily spend. This catches real problems while avoiding false alarms from normal traffic variation.
      </Callout>

      <h2>Common Production Pitfalls</h2>

      <h3>1. The Retry Storm</h3>

      <p>
        A bug causes requests to fail, triggering automatic retries. Each retry costs money. One team saw a $500 spike in 2 hours from this exact issue.
      </p>

      <h3>2. The Long Context Trap</h3>

      <p>
        Conversation history grows over time. A chatbot that starts cheap gets expensive as context length increases. Consider implementing context windowing.
      </p>

      <h3>3. The Power User Problem</h3>

      <p>
        A single user making 1,000 requests/day can cost more than 100 normal users combined. Implement per-user rate limits.
      </p>

      <h2>Getting Started Today</h2>

      <ol>
        <li><strong>Audit your current state:</strong> List every AI feature and estimate current costs</li>
        <li><strong>Implement tracking:</strong> Add feature-level tracking to all AI calls</li>
        <li><strong>Set up alerts:</strong> Start with daily spend alerts, then refine</li>
        <li><strong>Review weekly:</strong> Make AI spend a regular part of your metrics review</li>
      </ol>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">Track AI Spending with Orbit</h3>
        <p className="text-[#a1a1aa] mb-4">
          Orbit gives you complete visibility into your production AI spend. Track costs by feature and catch issues before they become expensive.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Real-time spend tracking per feature</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Automatic cost calculation</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Production-ready dashboards</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Free tier: 10,000 events/month</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Start tracking for free <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

function Blog5Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        Before you ship that AI feature, you need to know what it&apos;s going to cost. This guide shows you exactly how to calculate LLM API costs for OpenAI, Anthropic, and Google Gemini.
      </p>

      <p>
        Understanding AI costs upfront helps you make better decisions about model selection, prompt design, and pricing your own products. Let&apos;s break down exactly how to estimate your AI bill.
      </p>

      <h2>The AI Cost Formula</h2>

      <p>
        Every LLM API charges based on tokens. The formula is simple:
      </p>

      <pre><code>{`Cost = (Input Tokens × Input Price) + (Output Tokens × Output Price)

Example with GPT-4o:
- Input: 1,000 tokens × $2.50/1M = $0.0025
- Output: 500 tokens × $10.00/1M = $0.005
- Total: $0.0075 per request`}</code></pre>

      <Callout type="info" title="What is a Token?">
        A token is roughly 4 characters or 0.75 words in English. The prompt &quot;Hello, how are you?&quot; is about 6 tokens. A 500-word blog post is roughly 375 tokens.
      </Callout>

      <h2>Current Pricing Reference (2025)</h2>

      <p>
        Here are the current prices for popular models:
      </p>

      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Input (per 1M tokens)</th>
            <th>Output (per 1M tokens)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-4o</td>
            <td>$2.50</td>
            <td>$10.00</td>
          </tr>
          <tr>
            <td>GPT-4o-mini</td>
            <td>$0.15</td>
            <td>$0.60</td>
          </tr>
          <tr>
            <td>Claude 3.5 Sonnet</td>
            <td>$3.00</td>
            <td>$15.00</td>
          </tr>
          <tr>
            <td>Claude 3.5 Haiku</td>
            <td>$0.80</td>
            <td>$4.00</td>
          </tr>
          <tr>
            <td>Gemini 1.5 Pro</td>
            <td>$1.25</td>
            <td>$5.00</td>
          </tr>
          <tr>
            <td>Gemini 2.0 Flash</td>
            <td>$0.10</td>
            <td>$0.40</td>
          </tr>
        </tbody>
      </table>

      <h2>Cost Calculator: Common Scenarios</h2>

      <h3>Scenario 1: Customer Support Chatbot</h3>

      <p>
        Average conversation: 10 messages, 100 tokens per user message, 200 tokens per AI response.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        <StatCard value="$0.075" label="Per chat with GPT-4o" />
        <StatCard value="$0.005" label="Per chat with GPT-4o-mini" />
      </div>

      <p>
        At 10,000 conversations/month:
      </p>

      <ul>
        <li><strong>GPT-4o:</strong> $750/month</li>
        <li><strong>GPT-4o-mini:</strong> $50/month</li>
      </ul>

      <h3>Scenario 2: Document Summarizer</h3>

      <p>
        Average document: 5,000 tokens input, 500 tokens output.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        <StatCard value="$0.0175" label="Per doc with GPT-4o" />
        <StatCard value="$0.001" label="Per doc with GPT-4o-mini" />
      </div>

      <p>
        At 5,000 documents/month:
      </p>

      <ul>
        <li><strong>GPT-4o:</strong> $87.50/month</li>
        <li><strong>GPT-4o-mini:</strong> $5/month</li>
      </ul>

      <h3>Scenario 3: Code Assistant</h3>

      <p>
        Average request: 2,000 tokens context + prompt, 500 tokens generated code.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        <StatCard value="$0.01" label="Per request with GPT-4o" />
        <StatCard value="$0.012" label="Per request with Claude 3.5 Sonnet" />
      </div>

      <Callout type="tip" title="Hidden Cost: System Prompts">
        Your system prompt is sent with every request. A 500-token system prompt adds $0.00125 to every GPT-4o call. At 100,000 requests/month, that&apos;s $125 just for the system prompt.
      </Callout>

      <h2>Estimating Monthly Costs</h2>

      <p>
        Use this framework to estimate your monthly AI bill:
      </p>

      <pre><code>{`Monthly Cost = Daily Requests × Avg Cost Per Request × 30

Step 1: Estimate daily requests per feature
Step 2: Calculate average tokens per request (input + output)
Step 3: Apply pricing formula
Step 4: Multiply by 30 for monthly estimate
Step 5: Add 20% buffer for variance`}</code></pre>

      <h3>Quick Estimation Table</h3>

      <table>
        <thead>
          <tr>
            <th>Daily Requests</th>
            <th>GPT-4o (avg request)</th>
            <th>GPT-4o-mini (avg request)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100</td>
            <td>$15-30/month</td>
            <td>$1-2/month</td>
          </tr>
          <tr>
            <td>1,000</td>
            <td>$150-300/month</td>
            <td>$10-20/month</td>
          </tr>
          <tr>
            <td>10,000</td>
            <td>$1,500-3,000/month</td>
            <td>$100-200/month</td>
          </tr>
          <tr>
            <td>100,000</td>
            <td>$15,000-30,000/month</td>
            <td>$1,000-2,000/month</td>
          </tr>
        </tbody>
      </table>

      <h2>Cost Reduction Strategies</h2>

      <h3>1. Model Tiering</h3>

      <p>
        Use expensive models only when necessary. Route simple tasks to cheaper models:
      </p>

      <pre><code>{`// Route based on task complexity
function selectModel(task) {
  if (task.requiresReasoning) return 'gpt-4o';
  if (task.isSimpleQA) return 'gpt-4o-mini';
  if (task.isClassification) return 'gpt-4o-mini';
  return 'gpt-4o-mini'; // Default to cheaper
}`}</code></pre>

      <h3>2. Prompt Optimization</h3>

      <p>
        Every token counts. Reduce prompt length without sacrificing quality:
      </p>

      <ul>
        <li>Remove redundant instructions</li>
        <li>Use concise system prompts</li>
        <li>Limit context to what&apos;s necessary</li>
      </ul>

      <h3>3. Response Length Limits</h3>

      <p>
        Set <code>max_tokens</code> to prevent unnecessarily long responses. If you need a yes/no answer, don&apos;t let the model write paragraphs.
      </p>

      <h2>From Estimate to Actual: Tracking Real Costs</h2>

      <p>
        Estimates are just the starting point. In production, actual costs often differ:
      </p>

      <ul>
        <li>Users send longer prompts than expected</li>
        <li>Some features get more usage than projected</li>
        <li>Edge cases and retries add overhead</li>
      </ul>

      <p>
        That&apos;s why tracking actual costs is essential once you&apos;re in production.
      </p>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">Beyond Estimates: Track Real AI Costs</h3>
        <p className="text-[#a1a1aa] mb-4">
          Orbit automatically calculates and tracks your actual AI costs in real-time. See exactly what each feature costs, compare estimates to reality, and optimize based on real data.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Automatic cost calculation for all providers</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Per-feature cost breakdown</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Compare estimated vs actual costs</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Free tier: 10,000 events/month</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Start tracking real costs <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

function Blog6Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        If you&apos;re building with LLMs, you need to track LLM costs. Not just total spend—but costs broken down by feature, by user, by model. This is the complete guide to getting that visibility.
      </p>

      <p>
        Whether you&apos;re using OpenAI, Anthropic, Google Gemini, or multiple providers, this guide covers the strategies, tools, and best practices for tracking LLM costs effectively.
      </p>

      <h2>Why Track LLM Costs?</h2>

      <p>
        Before diving into the how, let&apos;s establish the why. LLM cost tracking enables:
      </p>

      <ul>
        <li><strong>Budget management:</strong> Know what you&apos;re spending before the bill arrives</li>
        <li><strong>Optimization decisions:</strong> Focus engineering effort where it matters most</li>
        <li><strong>Pricing your product:</strong> Understand unit economics to price AI features correctly</li>
        <li><strong>Anomaly detection:</strong> Catch bugs, abuse, or unexpected usage patterns</li>
        <li><strong>Stakeholder reporting:</strong> Answer &quot;why is AI costing so much?&quot; with data</li>
      </ul>

      <Callout type="info" title="The Cost Visibility Gap">
        Most LLM provider dashboards show total spend. They don&apos;t show which features, users, or use cases are driving that spend. Closing this gap is essential for cost management.
      </Callout>

      <h2>The Three Levels of LLM Cost Tracking</h2>

      <h3>Level 1: Total Spend (Basic)</h3>

      <p>
        This is what you get from provider dashboards. You know your total monthly spend across all usage.
      </p>

      <p><strong>Pros:</strong> Zero setup, always available</p>
      <p><strong>Cons:</strong> No actionable insights</p>

      <h3>Level 2: Model-Level Tracking (Better)</h3>

      <p>
        Track costs by model type. You can see how much GPT-4o vs GPT-4o-mini costs.
      </p>

      <p><strong>Pros:</strong> Helps with model selection decisions</p>
      <p><strong>Cons:</strong> Still doesn&apos;t tell you which features are expensive</p>

      <h3>Level 3: Feature-Level Tracking (Best)</h3>

      <p>
        Track costs by feature, user segment, and use case. This is where real optimization becomes possible.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <StatCard value="$1,400" label="Chat feature" />
        <StatCard value="$600" label="Summarizer" />
        <StatCard value="$200" label="Code review" />
      </div>

      <h2>How to Implement LLM Cost Tracking</h2>

      <h3>Step 1: Define Your Features</h3>

      <p>
        List every place your application calls an LLM. Give each a clear, consistent name:
      </p>

      <pre><code>{`// Good feature names
'customer-support-chat'
'document-summarizer'
'email-draft-generator'
'code-review-assistant'

// Bad feature names (too vague)
'ai-feature'
'llm-call'
'gpt-request'`}</code></pre>

      <h3>Step 2: Choose Your Tracking Approach</h3>

      <p>
        You have three options:
      </p>

      <h4>Option A: Build Custom Logging</h4>

      <pre><code>{`// Wrap every LLM call
async function trackedCompletion(feature, params) {
  const start = Date.now();
  const response = await openai.chat.completions.create(params);

  await trackUsage({
    feature,
    model: params.model,
    inputTokens: response.usage.prompt_tokens,
    outputTokens: response.usage.completion_tokens,
    cost: calculateCost(response.usage, params.model),
    latency: Date.now() - start
  });

  return response;
}`}</code></pre>

      <p><strong>Pros:</strong> Full control</p>
      <p><strong>Cons:</strong> Maintenance burden, need to build dashboards, handle pricing updates</p>

      <h4>Option B: Use Provider SDKs with Tagging</h4>

      <p>
        Some providers support request metadata. Limited, but better than nothing.
      </p>

      <h4>Option C: Use a Dedicated Tracking SDK</h4>

      <pre><code>{`import { Orbit } from '@with-orbit/sdk';

const orbit = new Orbit({ apiKey: process.env.ORBIT_API_KEY });

// Wrap once per feature
const chatClient = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'customer-support-chat'
});

// Use normally - tracking is automatic
const response = await chatClient.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: userMessage }]
});`}</code></pre>

      <p><strong>Pros:</strong> Minimal code, automatic cost calculation, built-in dashboards</p>
      <p><strong>Cons:</strong> External dependency</p>

      <h3>Step 3: Set Up Dashboards</h3>

      <p>
        Your dashboard should answer these questions at a glance:
      </p>

      <ul>
        <li>What&apos;s my total spend today/this week/this month?</li>
        <li>Which features cost the most?</li>
        <li>Are costs trending up or down?</li>
        <li>Are there any anomalies?</li>
      </ul>

      <h3>Step 4: Configure Alerts</h3>

      <p>
        Don&apos;t wait for the monthly bill. Set up proactive alerts:
      </p>

      <ul>
        <li><strong>Budget threshold:</strong> Alert at 50%, 75%, 90% of budget</li>
        <li><strong>Daily anomaly:</strong> Alert if daily spend exceeds 2x average</li>
        <li><strong>Feature-specific:</strong> Alert if any feature exceeds its budget</li>
      </ul>

      <Callout type="tip" title="Start with Simple Alerts">
        Begin with a daily spend alert at 2x your expected daily cost. Refine from there based on your traffic patterns.
      </Callout>

      <h2>Advanced Tracking: Customer Attribution</h2>

      <p>
        For SaaS products, you often need to track costs per customer:
      </p>

      <pre><code>{`// Track customer-level costs
const client = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'ai-assistant',
  customer_id: customer.id  // Attribute to specific customer
});`}</code></pre>

      <p>
        This enables:
      </p>

      <ul>
        <li>Usage-based billing</li>
        <li>Identifying high-cost customers</li>
        <li>Per-customer rate limiting</li>
        <li>Understanding customer unit economics</li>
      </ul>

      <h2>Common Pitfalls in LLM Cost Tracking</h2>

      <h3>1. Inconsistent Feature Tagging</h3>

      <p>
        If different developers use different names for the same feature, your data becomes useless. Establish naming conventions early.
      </p>

      <h3>2. Forgetting Development/Staging</h3>

      <p>
        Test environments can pollute production metrics. Always tag the environment:
      </p>

      <pre><code>{`const client = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'chat',
  environment: process.env.NODE_ENV // 'production' | 'staging' | 'development'
});`}</code></pre>

      <h3>3. Not Accounting for Retries</h3>

      <p>
        Failed requests still cost tokens (for the input). If you have retry logic, those retries should be tracked too.
      </p>

      <h2>Checklist: LLM Cost Tracking Setup</h2>

      <ul>
        <li>☐ List all LLM-powered features</li>
        <li>☐ Establish feature naming conventions</li>
        <li>☐ Implement tracking for all LLM calls</li>
        <li>☐ Set up dashboards for cost visibility</li>
        <li>☐ Set budget thresholds to monitor</li>
        <li>☐ Review costs weekly</li>
        <li>☐ Document tracking approach for team</li>
      </ul>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">Track LLM Costs with Orbit</h3>
        <p className="text-[#a1a1aa] mb-4">
          Orbit is the easiest way to track LLM costs. One SDK, automatic cost calculation, and beautiful dashboards—all included.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Feature-level cost tracking</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Support for OpenAI, Anthropic, Gemini</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Customer attribution for SaaS</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Free tier: 10,000 events/month</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Start tracking LLM costs <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

function Blog7Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        Your AI features are live. Users are happy. But is your infrastructure telling you what you need to know? This guide covers how to set up comprehensive AI API monitoring and track your billing effectively.
      </p>

      <p>
        Effective monitoring isn&apos;t just about cost—it&apos;s about understanding the health of your AI features. Let&apos;s build a monitoring system that keeps you informed without overwhelming you.
      </p>

      <h2>What to Monitor in AI APIs</h2>

      <p>
        AI API monitoring has unique requirements compared to traditional API monitoring:
      </p>

      <h3>1. Cost Metrics</h3>

      <ul>
        <li><strong>Total spend:</strong> Hourly, daily, weekly, monthly</li>
        <li><strong>Cost per request:</strong> Average and distribution</li>
        <li><strong>Cost by feature:</strong> Which features drive spend</li>
        <li><strong>Cost trends:</strong> Is spend growing faster than usage?</li>
      </ul>

      <h3>2. Usage Metrics</h3>

      <ul>
        <li><strong>Request volume:</strong> Total API calls over time</li>
        <li><strong>Token usage:</strong> Input and output tokens</li>
        <li><strong>Model distribution:</strong> Which models are being used</li>
        <li><strong>Feature usage:</strong> Requests per feature</li>
      </ul>

      <h3>3. Performance Metrics</h3>

      <ul>
        <li><strong>Latency:</strong> Time to first token, total response time</li>
        <li><strong>Error rates:</strong> Failed requests by type</li>
        <li><strong>Rate limit hits:</strong> Are you being throttled?</li>
      </ul>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-8">
        <StatCard value="$127" label="Today&apos;s spend" />
        <StatCard value="4,521" label="Requests today" />
        <StatCard value="342ms" label="Avg latency" />
        <StatCard value="0.3%" label="Error rate" />
      </div>

      <h2>Setting Up AI API Monitoring</h2>

      <h3>Step 1: Instrument Your Code</h3>

      <p>
        Every AI API call should be tracked. Here&apos;s the data to capture:
      </p>

      <pre><code>{`// Essential tracking data
{
  timestamp: Date.now(),
  feature: 'chat-assistant',
  model: 'gpt-4o',
  inputTokens: 150,
  outputTokens: 280,
  latencyMs: 1240,
  status: 'success', // or 'error'
  cost: 0.0065,
  environment: 'production'
}`}</code></pre>

      <h3>Step 2: Build Your Dashboard</h3>

      <p>
        A good AI monitoring dashboard answers these questions:
      </p>

      <ul>
        <li>What&apos;s happening right now?</li>
        <li>Is anything broken?</li>
        <li>How does today compare to yesterday?</li>
        <li>Which features need attention?</li>
      </ul>

      <Callout type="tip" title="Dashboard Design">
        Put the most critical metrics at the top: current spend rate, error rate, and anomaly indicators. Details can go below.
      </Callout>

      <h3>Step 3: Define Key Thresholds</h3>

      <p>
        Establish baseline metrics and thresholds to watch for. These help you quickly identify when something needs attention:
      </p>

      <h4>Key Thresholds to Monitor</h4>

      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Baseline</th>
            <th>Watch When</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Daily spend</td>
            <td>Calculate your 7-day average</td>
            <td>&gt; 150% of average</td>
          </tr>
          <tr>
            <td>Hourly spend</td>
            <td>Normal hourly rate</td>
            <td>&gt; 300% spike</td>
          </tr>
          <tr>
            <td>Error rate</td>
            <td>Typically &lt; 1%</td>
            <td>&gt; 5%</td>
          </tr>
          <tr>
            <td>Latency (P95)</td>
            <td>Your average response time</td>
            <td>&gt; 2x baseline</td>
          </tr>
        </tbody>
      </table>

      <h2>Budget Planning and Monitoring</h2>

      <p>
        Setting budgets helps you stay in control of AI costs. Here&apos;s how to think about budget thresholds:
      </p>

      <h3>Monthly Budget Milestones</h3>

      <ul>
        <li><strong>50% of budget:</strong> Check if you&apos;re on track or over pace</li>
        <li><strong>75% of budget:</strong> Review spending patterns, consider optimizations</li>
        <li><strong>90% of budget:</strong> Evaluate if current spend is expected</li>
      </ul>

      <h3>Identifying Cost Anomalies</h3>

      <p>
        Look for these patterns when reviewing your dashboard:
      </p>

      <ul>
        <li>Daily spend that&apos;s 2x or more above your typical average</li>
        <li>A single feature consuming disproportionate resources</li>
        <li>Unexpected spikes during off-peak hours</li>
        <li>Gradual cost creep without corresponding usage growth</li>
      </ul>

      <h3>Feature-Level Budgets</h3>

      <p>
        Track costs per feature to understand what&apos;s driving your bill:
      </p>

      <ul>
        <li>Chat feature: Typically your highest-volume use case</li>
        <li>Document analyzer: High token counts per request</li>
        <li>Code assistant: Variable based on context window size</li>
      </ul>

      <h2>Monitoring Across Multiple Providers</h2>

      <p>
        If you use OpenAI, Anthropic, and Gemini, you need unified monitoring:
      </p>

      <ul>
        <li><strong>Aggregate view:</strong> Total spend across all providers</li>
        <li><strong>Provider comparison:</strong> Cost efficiency by provider</li>
        <li><strong>Feature routing:</strong> Which providers power which features</li>
      </ul>

      <Callout type="info" title="Multi-Provider Challenge">
        Each provider has different dashboards, different pricing models, and different billing cycles. Unified monitoring is essential for multi-provider strategies.
      </Callout>

      <h2>Incident Response for AI API Issues</h2>

      <p>
        When you spot issues in your monitoring dashboard, have a playbook ready:
      </p>

      <h3>Cost Spike Playbook</h3>

      <ol>
        <li>Identify the affected feature(s)</li>
        <li>Check for traffic anomalies or abuse</li>
        <li>Review recent deployments</li>
        <li>Consider temporary rate limits if needed</li>
        <li>Investigate and resolve root cause</li>
      </ol>

      <h3>Error Rate Spike Playbook</h3>

      <ol>
        <li>Check provider status pages</li>
        <li>Review error types and messages</li>
        <li>Check for rate limiting</li>
        <li>Test with reduced load if needed</li>
        <li>Implement fallbacks if issue persists</li>
      </ol>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">Monitor AI APIs with Orbit</h3>
        <p className="text-[#a1a1aa] mb-4">
          Orbit provides complete AI API monitoring out of the box. Track costs, usage, and performance across all your AI providers in one dashboard.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Real-time cost and usage dashboards</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Feature-level cost attribution</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Multi-provider unified view</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Free tier: 10,000 events/month</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Start monitoring for free <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

function Blog8Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        AI observability is becoming essential for teams running LLMs in production. But what exactly is it? And how is it different from traditional monitoring? This guide covers everything you need to know.
      </p>

      <p>
        As AI systems become more complex—with agents, chains, and multi-step reasoning—observability becomes critical for debugging, optimization, and cost management.
      </p>

      <h2>What is AI Observability?</h2>

      <p>
        AI observability is the practice of understanding what your AI systems are doing, why they&apos;re behaving a certain way, and how to improve them. It goes beyond simple monitoring:
      </p>

      <table>
        <thead>
          <tr>
            <th>Traditional Monitoring</th>
            <th>AI Observability</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Is it up or down?</td>
            <td>What is the AI doing and why?</td>
          </tr>
          <tr>
            <td>Response times</td>
            <td>Token-level latency analysis</td>
          </tr>
          <tr>
            <td>Error counts</td>
            <td>Error context and patterns</td>
          </tr>
          <tr>
            <td>Request volume</td>
            <td>Feature-level cost attribution</td>
          </tr>
        </tbody>
      </table>

      <h2>The Three Pillars of AI Observability</h2>

      <h3>1. Metrics</h3>

      <p>
        Quantitative measurements of your AI system&apos;s behavior:
      </p>

      <ul>
        <li><strong>Cost metrics:</strong> Spend by feature, model, customer</li>
        <li><strong>Performance metrics:</strong> Latency, throughput, error rates</li>
        <li><strong>Usage metrics:</strong> Token consumption, request patterns</li>
        <li><strong>Quality metrics:</strong> Success rates, user feedback scores</li>
      </ul>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-8">
        <StatCard value="$2,400" label="Monthly spend" />
        <StatCard value="342ms" label="P50 latency" />
        <StatCard value="99.2%" label="Success rate" />
        <StatCard value="4.2" label="Avg user rating" />
      </div>

      <h3>2. Traces</h3>

      <p>
        End-to-end visibility into multi-step AI workflows:
      </p>

      <pre><code>{`// Trace structure for an AI agent
Trace: customer-support-resolution
├── Step 1: Classify intent (gpt-4o-mini, 50 tokens)
├── Step 2: Retrieve context (embeddings, 200 tokens)
├── Step 3: Generate response (gpt-4o, 500 tokens)
├── Step 4: Check safety (gpt-4o-mini, 100 tokens)
└── Total: 850 tokens, $0.012, 1.2s`}</code></pre>

      <p>
        Traces help you understand:
      </p>

      <ul>
        <li>Where time is being spent in multi-step workflows</li>
        <li>Which steps are most expensive</li>
        <li>Where errors occur in the chain</li>
      </ul>

      <h3>3. Logs</h3>

      <p>
        Detailed records for debugging and analysis:
      </p>

      <ul>
        <li>Request/response metadata (not content for privacy)</li>
        <li>Error messages and stack traces</li>
        <li>Model behavior patterns</li>
        <li>User interaction flows</li>
      </ul>

      <Callout type="warning" title="Privacy Note">
        Good AI observability tracks metadata about requests without storing actual prompts or responses. This protects user privacy while still providing visibility.
      </Callout>

      <h2>Why AI Observability Matters in 2025</h2>

      <h3>AI Agents Are More Complex</h3>

      <p>
        Modern AI applications aren&apos;t single API calls. They&apos;re multi-step workflows with branching logic, tool use, and iteration. Without observability, debugging is nearly impossible.
      </p>

      <h3>Costs Can Spiral Quickly</h3>

      <p>
        A single agentic workflow might make 10-20 LLM calls. Without tracking, you can&apos;t optimize costs or even understand what&apos;s driving your bill.
      </p>

      <h3>Quality Issues Are Subtle</h3>

      <p>
        AI systems fail in subtle ways—they don&apos;t always crash. They might give confident wrong answers, drift in behavior, or perform inconsistently. Observability helps catch these issues.
      </p>

      <h2>Implementing AI Observability</h2>

      <h3>Level 1: Basic Metrics (Start Here)</h3>

      <p>
        Track the essentials for every LLM call:
      </p>

      <pre><code>{`// Minimum viable observability
{
  feature: 'customer-chat',
  model: 'gpt-4o',
  tokens: { input: 150, output: 280 },
  latencyMs: 1240,
  cost: 0.0065,
  status: 'success'
}`}</code></pre>

      <h3>Level 2: Feature Attribution</h3>

      <p>
        Tag every request with its feature and context:
      </p>

      <pre><code>{`const client = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'document-summarizer',
  environment: 'production',
  task_id: taskId,      // Group related calls
  customer_id: userId   // Attribute to customer
});`}</code></pre>

      <h3>Level 3: Workflow Tracing</h3>

      <p>
        For agentic workflows, trace the entire execution:
      </p>

      <ul>
        <li>Unique trace ID for each workflow</li>
        <li>Parent-child relationships between steps</li>
        <li>Timing for each step</li>
        <li>Aggregate metrics for the workflow</li>
      </ul>

      <h2>AI Observability Best Practices</h2>

      <h3>1. Start with Cost Visibility</h3>

      <p>
        Cost tracking is the highest-ROI observability investment. It immediately tells you where to focus optimization efforts.
      </p>

      <h3>2. Track at the Feature Level</h3>

      <p>
        Total costs are meaningless without feature attribution. Know which features cost what.
      </p>

      <h3>3. Monitor Error Patterns</h3>

      <p>
        Not just error rates—error patterns. Are certain prompts failing consistently? Are specific models more reliable?
      </p>

      <h3>4. Set Up Alerts Early</h3>

      <p>
        Don&apos;t wait for problems. Proactive alerts catch issues before they become expensive.
      </p>

      <h3>5. Review Regularly</h3>

      <p>
        Make AI observability part of your regular engineering process. Weekly cost reviews, monthly optimization efforts.
      </p>

      <Callout type="tip" title="The 80/20 Rule">
        80% of AI observability value comes from basic cost and error tracking. Start there before building complex tracing infrastructure.
      </Callout>

      <h2>AI Observability Tools Landscape</h2>

      <p>
        The AI observability space is evolving. Options include:
      </p>

      <ul>
        <li><strong>Provider dashboards:</strong> Basic, total-spend level visibility</li>
        <li><strong>APM tools (Datadog, etc.):</strong> Good for infrastructure, limited AI-specific features</li>
        <li><strong>Purpose-built AI observability:</strong> Feature-level tracking, cost attribution, AI-specific metrics</li>
        <li><strong>Build your own:</strong> Maximum control, significant maintenance burden</li>
      </ul>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">AI Observability with Orbit</h3>
        <p className="text-[#a1a1aa] mb-4">
          Orbit provides purpose-built AI observability. Track costs, monitor performance, and understand your AI systems—without the complexity of building your own solution.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Feature-level cost attribution</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Task and customer tracking for agents</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Multi-provider unified view</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Free tier: 10,000 events/month</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Get AI observability for free <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

function Blog9Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        AI agents are changing how we build applications. A single user request might trigger 10, 20, or even 50 LLM calls. Without proper tracking, you have no idea what these workflows cost or which customers are driving your AI bill.
      </p>

      <p>
        This guide shows you how to track agentic AI workflows using <code>task_id</code> and <code>customer_id</code>—two simple parameters that transform your AI observability from chaos to clarity.
      </p>

      <h2>The Agentic AI Tracking Problem</h2>

      <p>
        Traditional API tracking works request-by-request. But AI agents don&apos;t work that way:
      </p>

      <ul>
        <li><strong>Multiple LLM calls per task:</strong> An agent might call GPT-4 to plan, GPT-4o-mini to execute subtasks, and Claude to verify</li>
        <li><strong>Variable workflows:</strong> Different inputs lead to different numbers of LLM calls</li>
        <li><strong>Nested operations:</strong> Agents call other agents, creating deep call hierarchies</li>
        <li><strong>Customer attribution:</strong> You need to know which customer triggered which costs</li>
      </ul>

      <Callout type="warning" title="The Hidden Cost Problem">
        A single &quot;summarize this document&quot; task might cost $0.001 or $0.50 depending on document size and agent complexity. Without task-level tracking, you&apos;re flying blind.
      </Callout>

      <h2>The Solution: task_id and customer_id</h2>

      <p>
        Two parameters solve the agentic tracking problem:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <h4 className="text-white font-semibold mb-2">task_id</h4>
          <p className="text-[14px] text-[#888]">
            Groups all LLM calls that belong to the same workflow. See total cost, token usage, and call sequence for each task.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <h4 className="text-white font-semibold mb-2">customer_id</h4>
          <p className="text-[14px] text-[#888]">
            Attributes AI costs to specific customers. Essential for usage-based billing and understanding customer unit economics.
          </p>
        </div>
      </div>

      <h2>Implementation: Tracking Agentic Workflows</h2>

      <h3>Step 1: Generate a Task ID</h3>

      <p>
        Create a unique ID for each user request or workflow:
      </p>

      <pre><code>{`import { v4 as uuidv4 } from 'uuid';

// Generate a task ID for each workflow
function startAgentTask(customerId: string) {
  return {
    taskId: uuidv4(),
    customerId,
    startTime: Date.now()
  };
}`}</code></pre>

      <h3>Step 2: Pass IDs to Your LLM Client</h3>

      <p>
        When wrapping your LLM client, include both identifiers:
      </p>

      <pre><code>{`import { Orbit } from '@with-orbit/sdk';
import OpenAI from 'openai';

const orbit = new Orbit({ apiKey: process.env.ORBIT_API_KEY });

async function runAgentWorkflow(userMessage: string, customerId: string) {
  const task = startAgentTask(customerId);

  // Create a wrapped client with task context
  const openai = orbit.wrapOpenAI(new OpenAI(), {
    feature: 'ai-agent',
    task_id: task.taskId,
    customer_id: task.customerId
  });

  // All LLM calls now tracked together
  const plan = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: \`Plan: \${userMessage}\` }]
  });

  const result = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: \`Execute: \${plan.choices[0].message.content}\` }]
  });

  return result;
}`}</code></pre>

      <h3>Step 3: Track Across Multiple Providers</h3>

      <p>
        Real agents often use multiple LLM providers. The same pattern works across all of them:
      </p>

      <pre><code>{`async function multiProviderAgent(userRequest: string, customerId: string) {
  const task = startAgentTask(customerId);

  // OpenAI for planning
  const openai = orbit.wrapOpenAI(new OpenAI(), {
    feature: 'agent-planner',
    task_id: task.taskId,
    customer_id: task.customerId
  });

  // Anthropic for execution
  const anthropic = orbit.wrapAnthropic(new Anthropic(), {
    feature: 'agent-executor',
    task_id: task.taskId,
    customer_id: task.customerId
  });

  // Gemini for verification
  const gemini = orbit.wrapGemini(new GoogleGenerativeAI(key), {
    feature: 'agent-verifier',
    task_id: task.taskId,
    customer_id: task.customerId
  });

  // All calls grouped by task_id, attributed to customer
  const plan = await openai.chat.completions.create({ ... });
  const result = await anthropic.messages.create({ ... });
  const verified = await gemini.generateContent({ ... });

  return verified;
}`}</code></pre>

      <Callout type="tip" title="Consistent IDs">
        Use the same task_id and customer_id across all LLM clients in a workflow. This groups everything together in your dashboard.
      </Callout>

      <h2>What You Can Track</h2>

      <p>
        With task_id and customer_id in place, you get visibility into:
      </p>

      <h3>Per-Task Metrics</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
        <StatCard value="$0.024" label="Total cost" />
        <StatCard value="3,420" label="Tokens used" />
        <StatCard value="5" label="LLM calls" />
        <StatCard value="2.3s" label="Total latency" />
      </div>

      <ul>
        <li><strong>Total cost per task:</strong> Sum of all LLM calls in the workflow</li>
        <li><strong>Token breakdown:</strong> Input vs output tokens, by model</li>
        <li><strong>Call sequence:</strong> Which LLM calls happened in what order</li>
        <li><strong>Error tracking:</strong> Did any step in the workflow fail?</li>
      </ul>

      <h3>Per-Customer Metrics</h3>

      <ul>
        <li><strong>Total AI spend per customer:</strong> Enable usage-based billing</li>
        <li><strong>Average cost per request:</strong> Understand unit economics</li>
        <li><strong>Usage patterns:</strong> Which customers use AI features most</li>
        <li><strong>High-cost customers:</strong> Identify accounts that need attention</li>
      </ul>

      <h2>Common Agentic Patterns</h2>

      <h3>Pattern 1: ReAct Agent</h3>

      <p>
        The classic Reason + Act pattern with iterative tool use:
      </p>

      <pre><code>{`async function reactAgent(query: string, customerId: string) {
  const task = startAgentTask(customerId);

  const openai = orbit.wrapOpenAI(new OpenAI(), {
    feature: 'react-agent',
    task_id: task.taskId,
    customer_id: task.customerId
  });

  let context = query;
  const maxIterations = 10;

  for (let i = 0; i < maxIterations; i++) {
    const thought = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: \`Reason about: \${context}\` }]
    });

    if (thought.choices[0].message.content.includes('FINAL ANSWER')) {
      break;
    }

    // Each iteration tracked as part of same task
    const action = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: \`Act on: \${thought.choices[0].message.content}\` }]
    });

    context = action.choices[0].message.content;
  }
}`}</code></pre>

      <h3>Pattern 2: Multi-Agent System</h3>

      <p>
        Multiple specialized agents working together:
      </p>

      <pre><code>{`async function multiAgentSystem(task: string, customerId: string) {
  const taskContext = startAgentTask(customerId);

  // Researcher agent
  const researcher = orbit.wrapOpenAI(new OpenAI(), {
    feature: 'researcher-agent',
    task_id: taskContext.taskId,
    customer_id: taskContext.customerId
  });

  // Writer agent
  const writer = orbit.wrapAnthropic(new Anthropic(), {
    feature: 'writer-agent',
    task_id: taskContext.taskId,
    customer_id: taskContext.customerId
  });

  // Critic agent
  const critic = orbit.wrapOpenAI(new OpenAI(), {
    feature: 'critic-agent',
    task_id: taskContext.taskId,
    customer_id: taskContext.customerId
  });

  const research = await researcher.chat.completions.create({ ... });
  const draft = await writer.messages.create({ ... });
  const feedback = await critic.chat.completions.create({ ... });
  const final = await writer.messages.create({ ... });

  // All 4 calls grouped under one task_id
}`}</code></pre>

      <h3>Pattern 3: Document Processing Pipeline</h3>

      <pre><code>{`async function processDocument(doc: Document, customerId: string) {
  const task = startAgentTask(customerId);

  const openai = orbit.wrapOpenAI(new OpenAI(), {
    feature: 'doc-processor',
    task_id: task.taskId,
    customer_id: task.customerId
  });

  // Chunk the document
  const chunks = splitIntoChunks(doc, 4000);

  // Process each chunk (all tracked under same task)
  const summaries = await Promise.all(
    chunks.map(chunk =>
      openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: \`Summarize: \${chunk}\` }]
      })
    )
  );

  // Final synthesis
  const final = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{
      role: 'user',
      content: \`Synthesize these summaries: \${summaries.map(s => s.choices[0].message.content).join('\\n')}\`
    }]
  });

  // Dashboard shows: 1 task, N+1 LLM calls, total cost
}`}</code></pre>

      <h2>Usage-Based Billing with customer_id</h2>

      <p>
        customer_id enables accurate usage-based billing for AI features:
      </p>

      <pre><code>{`// In your API endpoint
app.post('/api/ai-task', async (req, res) => {
  const { userId, request } = req.body;

  // Get customer ID from your billing system
  const customerId = await getCustomerId(userId);

  // Run the AI task with customer attribution
  const result = await runAgentWorkflow(request, customerId);

  // Orbit tracks costs per customer automatically
  // Query via API or dashboard for billing

  res.json(result);
});`}</code></pre>

      <Callout type="info" title="Billing Integration">
        Use the customer_id field to match AI costs with your billing system. At month-end, query per-customer costs and add them to invoices.
      </Callout>

      <h2>Best Practices</h2>

      <h3>1. Use Meaningful Task IDs</h3>

      <p>
        UUIDs work, but including context can help debugging:
      </p>

      <pre><code>{`const taskId = \`\${feature}-\${Date.now()}-\${uuidv4().slice(0,8)}\`;
// Example: "doc-summarizer-1705849200000-a1b2c3d4"`}</code></pre>

      <h3>2. Set Task IDs Early</h3>

      <p>
        Create the task_id at the start of the request, before any LLM calls. This ensures all calls in the workflow are captured.
      </p>

      <h3>3. Propagate Through Async Boundaries</h3>

      <p>
        When using async patterns, ensure task context flows through:
      </p>

      <pre><code>{`// Pass context explicitly to child functions
async function childOperation(openai, taskContext) {
  // Use the same wrapped client or recreate with same IDs
}`}</code></pre>

      <h3>4. Handle Errors Gracefully</h3>

      <p>
        Even failed tasks should be tracked—they still cost tokens:
      </p>

      <pre><code>{`try {
  await runAgentWorkflow(request, customerId);
} catch (error) {
  // Error is logged, but costs are still tracked
  console.error('Task failed:', error);
}`}</code></pre>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">Track Agentic Workflows with Orbit</h3>
        <p className="text-[#a1a1aa] mb-4">
          Orbit makes agentic workflow tracking simple. Add task_id and customer_id to your LLM calls and get full visibility into multi-step AI workflows.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Group LLM calls by task_id</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Attribute costs per customer_id</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> See call sequences and total costs</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Works with OpenAI, Anthropic, Gemini</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Start tracking agents for free <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

function Blog10Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        OpenAI&apos;s pricing changes frequently, and keeping up with the latest costs for GPT-4o, o1, o3, and other models can be challenging. Here&apos;s everything you need to know about OpenAI API pricing in 2025.
      </p>

      <p>
        This guide covers current pricing for all OpenAI models, helps you estimate costs for your use case, and shows you how to track spending in production.
      </p>

      <h2>OpenAI API Pricing Overview (January 2025)</h2>

      <p>
        OpenAI charges per token—small units of text (roughly 4 characters or 0.75 words). Prices differ for input tokens (what you send) and output tokens (what the model generates).
      </p>

      <h3>GPT-4o Models</h3>

      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Input (per 1M tokens)</th>
            <th>Output (per 1M tokens)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-4o</td>
            <td>$2.50</td>
            <td>$10.00</td>
          </tr>
          <tr>
            <td>GPT-4o-mini</td>
            <td>$0.15</td>
            <td>$0.60</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>GPT-4o</strong> is OpenAI&apos;s flagship model—fast, capable, and multimodal (handles text, images, and audio). It&apos;s the best choice for most production use cases.
      </p>

      <p>
        <strong>GPT-4o-mini</strong> is the budget option. It&apos;s 16x cheaper than GPT-4o for input and handles simpler tasks effectively. Use it for classification, extraction, and basic Q&A.
      </p>

      <Callout type="tip" title="Cost Saving Tip">
        GPT-4o-mini handles 80% of typical tasks at a fraction of the cost. Start with mini and only upgrade to GPT-4o when quality requires it.
      </Callout>

      <h3>Reasoning Models (o1, o3)</h3>

      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Input (per 1M tokens)</th>
            <th>Output (per 1M tokens)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>o1</td>
            <td>$15.00</td>
            <td>$60.00</td>
          </tr>
          <tr>
            <td>o1-mini</td>
            <td>$3.00</td>
            <td>$12.00</td>
          </tr>
          <tr>
            <td>o3-mini</td>
            <td>$1.10</td>
            <td>$4.40</td>
          </tr>
        </tbody>
      </table>

      <p>
        The o-series models are designed for complex reasoning tasks—math, coding, and multi-step problem solving. They&apos;re significantly more expensive because they &quot;think&quot; before responding.
      </p>

      <Callout type="warning" title="Watch Out for Hidden Costs">
        Reasoning models generate internal &quot;thinking&quot; tokens that you pay for but don&apos;t see in the output. A simple query can use 10x more tokens than expected.
      </Callout>

      <h3>Legacy Models</h3>

      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Input (per 1M tokens)</th>
            <th>Output (per 1M tokens)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-4 Turbo</td>
            <td>$10.00</td>
            <td>$30.00</td>
          </tr>
          <tr>
            <td>GPT-4</td>
            <td>$30.00</td>
            <td>$60.00</td>
          </tr>
          <tr>
            <td>GPT-3.5 Turbo</td>
            <td>$0.50</td>
            <td>$1.50</td>
          </tr>
        </tbody>
      </table>

      <p>
        These models are still available but mostly superseded. GPT-4o is cheaper and better than GPT-4 Turbo. GPT-4o-mini is cheaper and often better than GPT-3.5 Turbo.
      </p>

      <h2>Real Cost Examples</h2>

      <p>
        Let&apos;s calculate costs for common use cases:
      </p>

      <h3>Customer Support Chatbot</h3>
      <p>
        Average conversation: 500 input tokens, 300 output tokens<br />
        Daily volume: 1,000 conversations
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <StatCard value="$5.50/day" label="Using GPT-4o" />
        <StatCard value="$0.33/day" label="Using GPT-4o-mini" />
      </div>

      <p>
        Monthly cost with GPT-4o: <strong>$165</strong><br />
        Monthly cost with GPT-4o-mini: <strong>$10</strong>
      </p>

      <h3>Document Summarization</h3>
      <p>
        Average document: 4,000 input tokens, 500 output tokens<br />
        Daily volume: 500 documents
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <StatCard value="$7.50/day" label="Using GPT-4o" />
        <StatCard value="$0.45/day" label="Using GPT-4o-mini" />
      </div>

      <h3>Code Generation</h3>
      <p>
        Average request: 800 input tokens, 1,200 output tokens<br />
        Daily volume: 200 requests
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <StatCard value="$2.80/day" label="Using GPT-4o" />
        <StatCard value="$0.17/day" label="Using GPT-4o-mini" />
      </div>

      <h2>How to Reduce OpenAI API Costs</h2>

      <ol>
        <li><strong>Use GPT-4o-mini for simple tasks</strong> — Classification, extraction, and basic Q&A work well with the smaller model</li>
        <li><strong>Optimize prompts</strong> — Shorter prompts = fewer tokens = lower costs</li>
        <li><strong>Cache responses</strong> — Don&apos;t pay twice for the same query</li>
        <li><strong>Set spending limits</strong> — OpenAI&apos;s dashboard lets you set monthly caps</li>
        <li><strong>Track costs by feature</strong> — Know which parts of your app cost the most</li>
      </ol>

      <h2>Tracking OpenAI Costs in Production</h2>

      <p>
        OpenAI&apos;s dashboard shows total usage, but not which features drive costs. To optimize effectively, you need per-feature tracking.
      </p>

      <pre><code>{`import { Orbit } from '@with-orbit/sdk';
import OpenAI from 'openai';

const orbit = new Orbit({ apiKey: process.env.ORBIT_API_KEY });

// Track costs by feature
const chatClient = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'customer-chat'
});

const summaryClient = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'doc-summary'
});`}</code></pre>

      <p>
        Now you can see exactly how much each feature costs and optimize where it matters.
      </p>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">Track OpenAI Costs with Orbit</h3>
        <p className="text-[#a1a1aa] mb-4">
          Orbit gives you real-time visibility into OpenAI API costs. See spending by feature, model, and environment—all with a one-line SDK integration.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Real-time cost tracking</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Per-feature cost breakdown</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Free tier: 10,000 events/month</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Start tracking OpenAI costs <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

function Blog11Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        AI API costs can spiral quickly. What starts as a $100/month experiment becomes a $10,000 problem at scale. Controlling AI costs isn&apos;t about spending less—it&apos;s about spending smart.
      </p>

      <p>
        This guide covers practical strategies for AI API cost control: how to track spending, set effective budgets, and reduce costs without sacrificing quality.
      </p>

      <h2>Why AI Costs Get Out of Control</h2>

      <p>
        AI pricing is different from most SaaS costs. You pay per token, and usage scales with your users. A feature that costs $1/day in development can cost $1,000/day in production.
      </p>

      <p>
        Common reasons AI costs spike:
      </p>

      <ul>
        <li><strong>No visibility</strong> — You don&apos;t know which features cost what</li>
        <li><strong>Wrong models</strong> — Using GPT-4o for tasks that GPT-4o-mini handles fine</li>
        <li><strong>Bloated prompts</strong> — System prompts with unnecessary instructions</li>
        <li><strong>No guardrails</strong> — A bug or spike can burn through budgets</li>
        <li><strong>Duplicate requests</strong> — Paying multiple times for the same computation</li>
      </ul>

      <Callout type="info" title="The 80/20 Rule">
        In most applications, 80% of AI costs come from 20% of features. Find those features first.
      </Callout>

      <h2>Step 1: Get Visibility</h2>

      <p>
        You can&apos;t control what you can&apos;t see. The first step is tracking costs at the feature level, not just totals.
      </p>

      <p>
        Provider dashboards (OpenAI, Anthropic, Google) show aggregate usage. They don&apos;t tell you:
      </p>

      <ul>
        <li>Which feature in your app costs the most</li>
        <li>Cost per user or customer</li>
        <li>Whether costs are trending up or down</li>
        <li>Which errors are wasting money</li>
      </ul>

      <p>
        Set up tracking that tags every API call with context:
      </p>

      <pre><code>{`// Tag each API call with feature and context
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [...],
});

// Track with context
await trackUsage({
  feature: 'customer-chat',
  model: response.model,
  tokens: response.usage.total_tokens,
  cost: calculateCost(response.usage),
  user_id: userId,
});`}</code></pre>

      <p>
        Or use an SDK that handles this automatically:
      </p>

      <pre><code>{`import { Orbit } from '@with-orbit/sdk';

const client = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'customer-chat',
  environment: 'production'
});

// All calls automatically tracked with context`}</code></pre>

      <h2>Step 2: Set Budgets and Alerts</h2>

      <p>
        Once you have visibility, set spending limits. This prevents surprises and catches issues early.
      </p>

      <h3>Daily Spending Alerts</h3>
      <p>
        Set alerts at 50%, 75%, and 90% of your daily budget. If Tuesday hits 75% by noon, something might be wrong.
      </p>

      <h3>Per-Feature Budgets</h3>
      <p>
        Allocate budgets to individual features. If your chatbot should cost $500/month and it&apos;s trending toward $2,000, you&apos;ll know immediately.
      </p>

      <h3>Rate Limits</h3>
      <p>
        Set per-user or per-customer rate limits. This prevents any single user from running up costs:
      </p>

      <pre><code>{`// Simple rate limiting
const userRequests = await getRequestCount(userId, '1h');

if (userRequests > MAX_REQUESTS_PER_HOUR) {
  throw new Error('Rate limit exceeded');
}`}</code></pre>

      <Callout type="warning" title="Set Limits Before You Need Them">
        The best time to set spending limits is before you have a problem. A runaway loop or viral feature can burn through thousands in hours.
      </Callout>

      <h2>Step 3: Optimize High-Cost Features</h2>

      <p>
        With visibility and alerts in place, focus optimization on features that matter. Prioritize by cost impact.
      </p>

      <h3>Model Selection</h3>
      <p>
        Not every task needs the most expensive model. Here&apos;s a simple decision framework:
      </p>

      <table>
        <thead>
          <tr>
            <th>Task Type</th>
            <th>Recommended Model</th>
            <th>Cost Reduction</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Complex reasoning</td>
            <td>GPT-4o / Claude Sonnet</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Code generation</td>
            <td>GPT-4o / Claude Sonnet</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Simple Q&A</td>
            <td>GPT-4o-mini / Gemini Flash</td>
            <td>10-20x</td>
          </tr>
          <tr>
            <td>Classification</td>
            <td>GPT-4o-mini / Gemini Flash</td>
            <td>10-20x</td>
          </tr>
          <tr>
            <td>Summarization</td>
            <td>GPT-4o-mini / Claude Haiku</td>
            <td>5-10x</td>
          </tr>
        </tbody>
      </table>

      <h3>Prompt Optimization</h3>
      <p>
        Every token costs money. Audit your prompts for bloat:
      </p>

      <ul>
        <li>Remove unnecessary politeness (&quot;Please kindly...&quot;)</li>
        <li>Cut redundant instructions</li>
        <li>Use examples only when needed</li>
        <li>Keep system prompts lean—they&apos;re sent with every request</li>
      </ul>

      <h3>Caching</h3>
      <p>
        If users ask similar questions, cache the responses. This works well for:
      </p>

      <ul>
        <li>FAQ-style queries</li>
        <li>Static content generation</li>
        <li>Classification with limited categories</li>
      </ul>

      <h2>Step 4: Monitor Continuously</h2>

      <p>
        Cost control isn&apos;t a one-time project. Make it part of your regular process:
      </p>

      <ul>
        <li><strong>Weekly reviews</strong> — Check cost trends and feature breakdown</li>
        <li><strong>Monthly audits</strong> — Review model choices and prompt efficiency</li>
        <li><strong>Alerts</strong> — Respond to anomalies immediately</li>
      </ul>

      <h2>Cost Control Checklist</h2>

      <ul>
        <li>✓ Track costs per feature (not just total)</li>
        <li>✓ Set daily spending alerts</li>
        <li>✓ Implement per-user rate limits</li>
        <li>✓ Use smaller models for simple tasks</li>
        <li>✓ Audit and optimize top-cost features</li>
        <li>✓ Cache repeated queries where appropriate</li>
        <li>✓ Review costs weekly</li>
      </ul>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">Control AI Costs with Orbit</h3>
        <p className="text-[#a1a1aa] mb-4">
          Orbit gives you the visibility you need to control AI API costs. Track spending by feature, set alerts, and optimize with confidence.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Per-feature cost breakdown</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Real-time cost tracking</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Error tracking to catch wasted spend</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Free tier: 10,000 events/month</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Start controlling AI costs <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

function Blog12Content() {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <p className="lead">
        You&apos;re using the OpenAI API in production. Your monthly bill is growing. But which features are driving costs? This tutorial shows you how to track OpenAI API costs at the feature level.
      </p>

      <h2>What You&apos;ll Build</h2>

      <p>
        By the end of this tutorial, you&apos;ll have:
      </p>

      <ul>
        <li>Per-feature cost tracking for all OpenAI API calls</li>
        <li>Real-time visibility into token usage and spending</li>
        <li>Environment separation (development vs. production)</li>
      </ul>

      <h2>Prerequisites</h2>

      <ul>
        <li>An existing app using the OpenAI API</li>
        <li>Node.js/TypeScript (Python version coming soon)</li>
        <li>5 minutes</li>
      </ul>

      <h2>Step 1: Install the Orbit SDK</h2>

      <pre><code>{`npm install @with-orbit/sdk`}</code></pre>

      <p>Or with yarn:</p>

      <pre><code>{`yarn add @with-orbit/sdk`}</code></pre>

      <h2>Step 2: Get Your API Key</h2>

      <ol>
        <li>Sign up at <a href="https://app.withorbit.io/signup" target="_blank" rel="noopener noreferrer">app.withorbit.io/signup</a></li>
        <li>Go to Settings → API Keys</li>
        <li>Create a new key (starts with <code>orb_live_</code>)</li>
        <li>Add it to your environment variables</li>
      </ol>

      <pre><code>{`# .env
ORBIT_API_KEY=orb_live_your_key_here`}</code></pre>

      <h2>Step 3: Wrap Your OpenAI Client</h2>

      <p>
        Replace your OpenAI client initialization with the Orbit wrapper:
      </p>

      <p><strong>Before:</strong></p>

      <pre><code>{`import OpenAI from 'openai';

const openai = new OpenAI();

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }]
});`}</code></pre>

      <p><strong>After:</strong></p>

      <pre><code>{`import OpenAI from 'openai';
import { Orbit } from '@with-orbit/sdk';

const orbit = new Orbit({ apiKey: process.env.ORBIT_API_KEY });

const openai = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'chat-assistant',
  environment: 'production'
});

// Use exactly like before - tracking is automatic
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }]
});`}</code></pre>

      <Callout type="tip" title="No Code Changes Needed">
        The wrapped client has the exact same API as the original OpenAI client. All your existing code works unchanged.
      </Callout>

      <h2>Step 4: Tag Features</h2>

      <p>
        Create different wrapped clients for each feature in your app:
      </p>

      <pre><code>{`// Chat feature
const chatClient = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'customer-chat',
  environment: process.env.NODE_ENV
});

// Document summarization
const summaryClient = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'doc-summary',
  environment: process.env.NODE_ENV
});

// Code generation
const codeClient = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'code-assistant',
  environment: process.env.NODE_ENV
});`}</code></pre>

      <p>
        Now every API call is automatically tagged with its feature and environment.
      </p>

      <h2>Step 5: Add User Context (Optional)</h2>

      <p>
        Track costs per user or customer for billing attribution:
      </p>

      <pre><code>{`const client = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'chat-assistant',
  environment: 'production',
  user_id: currentUser.id,
  customer_id: currentUser.organizationId
});`}</code></pre>

      <h2>Step 6: View Your Dashboard</h2>

      <p>
        Once you&apos;ve deployed, go to <a href="https://app.withorbit.io" target="_blank" rel="noopener noreferrer">app.withorbit.io</a> to see:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <StatCard value="$1,234" label="Total spend" />
        <StatCard value="45M" label="Total tokens" />
        <StatCard value="12,345" label="API calls" />
      </div>

      <p>
        Filter by feature to see exactly where your costs are going:
      </p>

      <ul>
        <li><strong>customer-chat:</strong> $800/month (65%)</li>
        <li><strong>doc-summary:</strong> $300/month (24%)</li>
        <li><strong>code-assistant:</strong> $134/month (11%)</li>
      </ul>

      <h2>What Gets Tracked</h2>

      <p>
        For every OpenAI API call, Orbit automatically captures:
      </p>

      <ul>
        <li><strong>Model</strong> — gpt-4o, gpt-4o-mini, etc.</li>
        <li><strong>Tokens</strong> — Input, output, and total</li>
        <li><strong>Cost</strong> — Calculated from current OpenAI pricing</li>
        <li><strong>Latency</strong> — Response time in milliseconds</li>
        <li><strong>Status</strong> — Success or error</li>
        <li><strong>Feature</strong> — Your custom tag</li>
        <li><strong>Environment</strong> — Production, staging, development</li>
      </ul>

      <Callout type="info" title="Privacy First">
        Orbit only tracks metadata. We never see your prompts, responses, or API keys. Your data stays private.
      </Callout>

      <h2>Next Steps</h2>

      <p>
        Now that you&apos;re tracking OpenAI costs:
      </p>

      <ol>
        <li><strong>Review weekly</strong> — Check which features cost the most</li>
        <li><strong>Optimize</strong> — Try GPT-4o-mini for high-cost, simple tasks</li>
        <li><strong>Set alerts</strong> — Get notified when costs spike</li>
        <li><strong>Track errors</strong> — Failed requests still cost tokens</li>
      </ol>

      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-8 my-10">
        <h3 className="text-xl font-semibold text-white mb-3">Start Tracking OpenAI Costs</h3>
        <p className="text-[#a1a1aa] mb-4">
          Get visibility into your OpenAI API spending in 5 minutes. Free tier includes 10,000 events/month.
        </p>
        <ul className="text-[#a1a1aa] space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> One-line SDK integration</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Per-feature cost tracking</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Real-time dashboards</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> No code changes to existing calls</li>
        </ul>
        <a
          href="https://app.withorbit.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all text-[14px]"
        >
          Get started free <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white mb-4">Post not found</h1>
          <Link href="/blog" className="text-violet-400 hover:text-violet-300">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const articleSchema = generateArticleSchema(slug, post);
  const breadcrumbSchema = generateBreadcrumbSchema(slug, post.title);

  return (
    <>
      {/* Article JSON-LD Schema */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Breadcrumb JSON-LD Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen pt-24">
        <article className="max-w-3xl mx-auto px-6 pb-24">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-[13px] text-[#666] hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to blog
            </Link>
          </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-medium text-violet-400 uppercase tracking-wider bg-violet-500/10 px-2 py-1 rounded">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-[12px] text-[#555]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
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
          <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-[#888]">{post.description}</p>
        </motion.header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {post.content}
          </motion.div>

          {/* Related Posts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 pt-12 border-t border-white/[0.06]"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Related Articles</h2>
            <div className="grid gap-4">
              {getRelatedPosts(slug, post.category, posts).map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-medium text-violet-400 uppercase tracking-wider bg-violet-500/10 px-2 py-0.5 rounded">
                        {relatedPost.category}
                      </span>
                      <span className="text-[11px] text-[#555]">{relatedPost.readTime}</span>
                    </div>
                    <h3 className="text-[15px] font-medium text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-[13px] text-[#666] mt-1 line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#444] group-hover:text-violet-400 transition-colors flex-shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </motion.div>
        </article>
      </div>
    </>
  );
}
