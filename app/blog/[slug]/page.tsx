"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";

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

  return (
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
      </article>
    </div>
  );
}
