"use client";

import { useState, useMemo } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, TrendingDown, Users, DollarSign, Zap, ArrowUpDown } from "lucide-react";

// ─── Model pricing data (per 1M tokens, from official sources) ───
interface ModelEntry {
  id: string;
  name: string;
  provider: string;
  input: number;   // $ per 1M input tokens
  output: number;  // $ per 1M output tokens
}

const MODELS: ModelEntry[] = [
  // OpenAI — GPT-5 Series
  { id: "gpt-5.2", name: "GPT-5.2", provider: "OpenAI", input: 1.75, output: 14.00 },
  { id: "gpt-5.2-pro", name: "GPT-5.2 Pro", provider: "OpenAI", input: 21.00, output: 168.00 },
  { id: "gpt-5.1", name: "GPT-5.1", provider: "OpenAI", input: 1.25, output: 10.00 },
  { id: "gpt-5", name: "GPT-5", provider: "OpenAI", input: 1.25, output: 10.00 },
  { id: "gpt-5-mini", name: "GPT-5 Mini", provider: "OpenAI", input: 0.25, output: 2.00 },
  { id: "gpt-5-nano", name: "GPT-5 Nano", provider: "OpenAI", input: 0.05, output: 0.40 },
  // OpenAI — GPT-4.1 Series
  { id: "gpt-4.1", name: "GPT-4.1", provider: "OpenAI", input: 2.00, output: 8.00 },
  { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", provider: "OpenAI", input: 0.40, output: 1.60 },
  { id: "gpt-4.1-nano", name: "GPT-4.1 Nano", provider: "OpenAI", input: 0.10, output: 0.40 },
  // OpenAI — GPT-4o Series
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", input: 2.50, output: 10.00 },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", input: 0.15, output: 0.60 },
  // OpenAI — Reasoning
  { id: "o3", name: "o3", provider: "OpenAI", input: 2.00, output: 8.00 },
  { id: "o3-pro", name: "o3 Pro", provider: "OpenAI", input: 20.00, output: 80.00 },
  { id: "o3-mini", name: "o3 Mini", provider: "OpenAI", input: 1.10, output: 4.40 },
  { id: "o4-mini", name: "o4 Mini", provider: "OpenAI", input: 1.10, output: 4.40 },
  // Anthropic
  { id: "claude-opus-4-5", name: "Claude Opus 4.5", provider: "Anthropic", input: 5.00, output: 25.00 },
  { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5", provider: "Anthropic", input: 3.00, output: 15.00 },
  { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", provider: "Anthropic", input: 1.00, output: 5.00 },
  { id: "claude-opus-4-1", name: "Claude Opus 4.1", provider: "Anthropic", input: 15.00, output: 75.00 },
  { id: "claude-sonnet-4", name: "Claude Sonnet 4", provider: "Anthropic", input: 3.00, output: 15.00 },
  { id: "claude-3-5-haiku", name: "Claude 3.5 Haiku", provider: "Anthropic", input: 1.00, output: 5.00 },
  { id: "claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic", input: 0.25, output: 1.25 },
  // Google — Gemini 3
  { id: "gemini-3-pro", name: "Gemini 3 Pro", provider: "Google", input: 2.00, output: 12.00 },
  { id: "gemini-3-flash", name: "Gemini 3 Flash", provider: "Google", input: 0.50, output: 3.00 },
  // Google — Gemini 2.5
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Google", input: 1.25, output: 10.00 },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google", input: 0.30, output: 2.50 },
  { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite", provider: "Google", input: 0.10, output: 0.40 },
  // Google — Gemini 2.0
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "Google", input: 0.10, output: 0.40 },
  { id: "gemini-2.0-flash-lite", name: "Gemini 2.0 Flash Lite", provider: "Google", input: 0.075, output: 0.30 },
  // DeepSeek
  { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek", input: 0.27, output: 1.10 },
  { id: "deepseek-chat", name: "DeepSeek Chat", provider: "DeepSeek", input: 0.28, output: 0.42 },
  // Mistral
  { id: "mistral-large", name: "Mistral Large 3", provider: "Mistral", input: 0.50, output: 1.50 },
  { id: "mistral-small", name: "Mistral Small 3.2", provider: "Mistral", input: 0.10, output: 0.30 },
  // Meta (via providers)
  { id: "llama-3.3-70b", name: "Llama 3.3 70B", provider: "Meta", input: 0.88, output: 0.88 },
  { id: "llama-3.2-3b", name: "Llama 3.2 3B", provider: "Meta", input: 0.06, output: 0.06 },
  // xAI
  { id: "grok-4", name: "Grok 4", provider: "xAI", input: 3.00, output: 15.00 },
  { id: "grok-4.1-fast", name: "Grok 4.1 Fast", provider: "xAI", input: 0.20, output: 0.50 },
  { id: "grok-2", name: "Grok 2", provider: "xAI", input: 2.00, output: 10.00 },
  { id: "grok-2-mini", name: "Grok 2 Mini", provider: "xAI", input: 0.20, output: 1.00 },
];

// Use case presets
const PRESETS = [
  { label: "Chatbot", inputTokens: 800, outputTokens: 400, requestsPerUser: 50 },
  { label: "RAG / Search", inputTokens: 2000, outputTokens: 500, requestsPerUser: 30 },
  { label: "Code Assistant", inputTokens: 1500, outputTokens: 1000, requestsPerUser: 80 },
  { label: "Content Generation", inputTokens: 500, outputTokens: 2000, requestsPerUser: 20 },
  { label: "Data Extraction", inputTokens: 3000, outputTokens: 300, requestsPerUser: 100 },
  { label: "Custom", inputTokens: 1000, outputTokens: 500, requestsPerUser: 50 },
];

// FAQ data
const faqs = [
  {
    q: "How accurate are these calculations?",
    a: "Prices are from official provider pricing pages as of January 2026. Actual costs may vary with volume discounts, batch API pricing, or cached tokens. This gives you a reliable baseline estimate.",
  },
  {
    q: "What are input vs output tokens?",
    a: "Input tokens are what you send to the model (prompts, context, system messages). Output tokens are what the model generates back. As a rough guide, 1 token is about 0.75 words in English.",
  },
  {
    q: "Why does cost per user matter?",
    a: "If you charge $20/month per user but your AI costs $8/month per user, your AI gross margin is only 60%. Understanding cost per user helps you price correctly and stay profitable as you scale.",
  },
  {
    q: "How do I track real costs in production?",
    a: "This calculator gives estimates. For real-time, per-feature cost tracking from actual API calls, integrate Orbit's SDK. It takes one line of code and tracks every request automatically.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}k`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(3)}`;
  if (value >= 0.001) return `$${value.toFixed(4)}`;
  return `$${value.toFixed(6)}`;
}

// Helper: store input fields as strings so users can clear them,
// but parse to number (defaulting to 0) for calculations.
function useNumberInput(initial: number) {
  const [raw, setRaw] = useState(String(initial));
  const value = raw === "" ? 0 : Number(raw);
  const set = (v: string) => setRaw(v);
  const setNum = (v: number) => setRaw(String(v));
  return { raw, value, set, setNum };
}

export default function CalculatorPage() {
  const [selectedModel, setSelectedModel] = useState("gpt-5");
  const [presetIndex, setPresetIndex] = useState(0);
  const inputTokensField = useNumberInput(800);
  const outputTokensField = useNumberInput(400);
  const requestsPerUserField = useNumberInput(50);
  const totalUsersField = useNumberInput(1000);
  const revenuePerUserField = useNumberInput(20);
  const [sortBy, setSortBy] = useState<"cost" | "name">("cost");

  // Derived numeric values for calculations
  const inputTokens = inputTokensField.value;
  const outputTokens = outputTokensField.value;
  const requestsPerUser = requestsPerUserField.value;
  const totalUsers = totalUsersField.value;
  const revenuePerUser = revenuePerUserField.value;

  const model = MODELS.find((m) => m.id === selectedModel)!;

  function applyPreset(index: number) {
    setPresetIndex(index);
    const preset = PRESETS[index];
    if (preset.label !== "Custom") {
      inputTokensField.setNum(preset.inputTokens);
      outputTokensField.setNum(preset.outputTokens);
      requestsPerUserField.setNum(preset.requestsPerUser);
    }
  }

  // ─── Core calculations ───
  const calculations = useMemo(() => {
    const costPerRequest =
      (inputTokens / 1_000_000) * model.input +
      (outputTokens / 1_000_000) * model.output;
    const costPerUserMonth = costPerRequest * requestsPerUser;
    const totalMonthlyCost = costPerUserMonth * totalUsers;
    const totalMonthlyRevenue = revenuePerUser * totalUsers;
    const aiMarginPercent =
      totalMonthlyRevenue > 0
        ? ((totalMonthlyRevenue - totalMonthlyCost) / totalMonthlyRevenue) * 100
        : 0;
    const costAsPercentOfRevenue =
      revenuePerUser > 0 ? (costPerUserMonth / revenuePerUser) * 100 : 0;

    return {
      costPerRequest,
      costPerUserMonth,
      totalMonthlyCost,
      totalMonthlyRevenue,
      aiMarginPercent,
      costAsPercentOfRevenue,
    };
  }, [model, inputTokens, outputTokens, requestsPerUser, totalUsers, revenuePerUser]);

  // ─── Model comparison (all models with same token params) ───
  const modelComparison = useMemo(() => {
    const compared = MODELS.map((m) => {
      const cpr =
        (inputTokens / 1_000_000) * m.input +
        (outputTokens / 1_000_000) * m.output;
      const cpu = cpr * requestsPerUser;
      return { ...m, costPerRequest: cpr, costPerUserMonth: cpu };
    });
    if (sortBy === "cost") {
      compared.sort((a, b) => a.costPerRequest - b.costPerRequest);
    } else {
      compared.sort((a, b) => a.name.localeCompare(b.name));
    }
    return compared;
  }, [inputTokens, outputTokens, requestsPerUser, sortBy]);

  // ─── Cheaper alternatives ───
  const cheaperAlternatives = useMemo(() => {
    return modelComparison
      .filter(
        (m) =>
          m.id !== selectedModel &&
          m.costPerRequest < calculations.costPerRequest
      )
      .slice(0, 5);
  }, [modelComparison, selectedModel, calculations.costPerRequest]);

  const marginColor =
    calculations.aiMarginPercent >= 70
      ? "text-emerald-400"
      : calculations.aiMarginPercent >= 50
      ? "text-amber-400"
      : "text-red-400";

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
                <Calculator className="w-3 h-3 mr-2" />
                AI Cost Calculator
              </div>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-white">
                Calculate Your AI Cost
                <br />
                <span className="text-[#888]">Per User, Per Month</span>
              </h1>
              <p className="text-lg text-[#888] max-w-2xl mx-auto">
                Know your AI unit economics before you scale. Compare 40+ models
                across OpenAI, Anthropic, Google, DeepSeek, and more.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8"
            >
              {/* Left: Inputs */}
              <div className="space-y-6">
                {/* Use case presets */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <label className="block text-[13px] font-medium text-[#888] uppercase tracking-wider mb-3">
                    Use Case
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((preset, i) => (
                      <button
                        key={preset.label}
                        onClick={() => applyPreset(i)}
                        className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                          presetIndex === i
                            ? "bg-violet-500/20 border border-violet-500/30 text-violet-300"
                            : "bg-white/[0.04] border border-white/[0.06] text-[#888] hover:text-white hover:border-white/[0.12]"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Selection */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <label className="block text-[13px] font-medium text-[#888] uppercase tracking-wider mb-3">
                    Model
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-[14px] focus:outline-none focus:border-violet-500/50 appearance-none cursor-pointer"
                  >
                    {["OpenAI", "Anthropic", "Google", "DeepSeek", "Mistral", "Meta", "xAI"].map(
                      (provider) => {
                        const providerModels = MODELS.filter(
                          (m) => m.provider === provider
                        );
                        if (providerModels.length === 0) return null;
                        return (
                          <optgroup key={provider} label={provider}>
                            {providerModels.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.name} &mdash; ${m.input} in / ${m.output} out per 1M
                              </option>
                            ))}
                          </optgroup>
                        );
                      }
                    )}
                  </select>
                  <p className="mt-2 text-[12px] text-[#555]">
                    {model.provider} &middot; ${model.input}/1M input &middot; $
                    {model.output}/1M output
                  </p>
                </div>

                {/* Token Inputs */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <label className="block text-[13px] font-medium text-[#888] uppercase tracking-wider mb-4">
                    Tokens Per Request
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] text-[#666] mb-1.5">
                        Avg input tokens
                      </label>
                      <input
                        type="number"
                        value={inputTokensField.raw}
                        onChange={(e) => {
                          inputTokensField.set(e.target.value);
                          setPresetIndex(PRESETS.length - 1);
                        }}
                        min={0}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-[14px] focus:outline-none focus:border-violet-500/50"
                      />
                      <p className="mt-1 text-[11px] text-[#444]">
                        ~{Math.round(inputTokens * 0.75)} words
                      </p>
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#666] mb-1.5">
                        Avg output tokens
                      </label>
                      <input
                        type="number"
                        value={outputTokensField.raw}
                        onChange={(e) => {
                          outputTokensField.set(e.target.value);
                          setPresetIndex(PRESETS.length - 1);
                        }}
                        min={0}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-[14px] focus:outline-none focus:border-violet-500/50"
                      />
                      <p className="mt-1 text-[11px] text-[#444]">
                        ~{Math.round(outputTokens * 0.75)} words
                      </p>
                    </div>
                  </div>
                </div>

                {/* Usage & Revenue */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <label className="block text-[13px] font-medium text-[#888] uppercase tracking-wider mb-4">
                    Usage & Revenue
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[12px] text-[#666] mb-1.5">
                        Requests / user / month
                      </label>
                      <input
                        type="number"
                        value={requestsPerUserField.raw}
                        onChange={(e) => {
                          requestsPerUserField.set(e.target.value);
                          setPresetIndex(PRESETS.length - 1);
                        }}
                        min={0}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-[14px] focus:outline-none focus:border-violet-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#666] mb-1.5">
                        Total users
                      </label>
                      <input
                        type="number"
                        value={totalUsersField.raw}
                        onChange={(e) => totalUsersField.set(e.target.value)}
                        min={0}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-[14px] focus:outline-none focus:border-violet-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#666] mb-1.5">
                        Revenue / user / month ($)
                      </label>
                      <input
                        type="number"
                        value={revenuePerUserField.raw}
                        onChange={(e) => revenuePerUserField.set(e.target.value)}
                        min={0}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-[14px] focus:outline-none focus:border-violet-500/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Results Panel */}
              <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                {/* Cost per request */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[12px] text-[#666] uppercase tracking-wider">
                      Cost per request
                    </span>
                  </div>
                  <p className="text-2xl font-semibold text-white">
                    {formatCurrency(calculations.costPerRequest)}
                  </p>
                </div>

                {/* Cost per user / month */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-[12px] text-[#666] uppercase tracking-wider">
                      AI cost per user / month
                    </span>
                  </div>
                  <p className="text-2xl font-semibold text-white">
                    {formatCurrency(calculations.costPerUserMonth)}
                  </p>
                  <p className="text-[12px] text-[#555] mt-1">
                    {calculations.costAsPercentOfRevenue.toFixed(1)}% of ${revenuePerUser} revenue
                  </p>
                </div>

                {/* Total monthly cost */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[12px] text-[#666] uppercase tracking-wider">
                      Total monthly AI cost
                    </span>
                  </div>
                  <p className="text-2xl font-semibold text-white">
                    {formatCurrency(calculations.totalMonthlyCost)}
                  </p>
                  <p className="text-[12px] text-[#555] mt-1">
                    {totalUsers.toLocaleString()} users &times; {requestsPerUser} req/mo
                  </p>
                </div>

                {/* AI Margin */}
                <div className="rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[12px] text-[#666] uppercase tracking-wider">
                      AI Gross Margin
                    </span>
                  </div>
                  <p className={`text-3xl font-bold ${marginColor}`}>
                    {calculations.aiMarginPercent.toFixed(1)}%
                  </p>
                  <div className="mt-2 flex justify-between text-[11px] text-[#555]">
                    <span>
                      Revenue: {formatCurrency(calculations.totalMonthlyRevenue)}
                    </span>
                    <span>
                      AI Cost: {formatCurrency(calculations.totalMonthlyCost)}
                    </span>
                  </div>
                  {/* Margin bar */}
                  <div className="mt-2 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        calculations.aiMarginPercent >= 70
                          ? "bg-emerald-500"
                          : calculations.aiMarginPercent >= 50
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.max(0, Math.min(100, calculations.aiMarginPercent))}%`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-[#555]">
                    {calculations.aiMarginPercent >= 70
                      ? "Healthy margin for an AI-powered SaaS."
                      : calculations.aiMarginPercent >= 50
                      ? "Moderate margin. Consider cheaper models for high-volume features."
                      : calculations.aiMarginPercent >= 0
                      ? "Low margin. You may need to adjust pricing or switch models."
                      : "Negative margin. AI costs exceed revenue per user."}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="https://app.withorbit.io/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-12 bg-white text-black font-medium text-[14px] rounded-full hover:bg-white/90 transition-all"
                >
                  Track real costs with Orbit
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-center text-[11px] text-[#444]">
                  Free tier &middot; One-line SDK &middot; No credit card
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cheaper Alternatives */}
        {cheaperAlternatives.length > 0 && (
          <section className="py-16 border-t border-white/[0.04]">
            <div className="max-w-5xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Cheaper Alternatives to {model.name}
                </h2>
                <p className="text-[#888] text-[15px] mb-8">
                  Same token configuration, lower cost. Savings are per user per month.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cheaperAlternatives.map((alt) => {
                    const savingsPercent =
                      ((calculations.costPerRequest - alt.costPerRequest) /
                        calculations.costPerRequest) *
                      100;
                    const monthlySavings =
                      (calculations.costPerUserMonth - alt.costPerUserMonth) *
                      totalUsers;
                    return (
                      <button
                        key={alt.id}
                        onClick={() => setSelectedModel(alt.id)}
                        className="text-left p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[14px] font-medium text-white group-hover:text-violet-300 transition-colors">
                            {alt.name}
                          </span>
                          <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            -{savingsPercent.toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-[12px] text-[#666]">
                          {alt.provider} &middot;{" "}
                          {formatCurrency(alt.costPerRequest)}/req
                        </p>
                        <p className="text-[12px] text-emerald-400/80 mt-1">
                          Save {formatCurrency(monthlySavings)}/mo at{" "}
                          {totalUsers.toLocaleString()} users
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Full Model Comparison Table */}
        <section className="py-16 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-semibold text-white mb-2">
                Full Model Comparison
              </h2>
              <p className="text-[#888] text-[15px] mb-8">
                Cost per request with {inputTokens.toLocaleString()} input and{" "}
                {outputTokens.toLocaleString()} output tokens.
              </p>
              <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="text-left py-3 px-4 text-[12px] text-[#888] font-medium">
                        Model
                      </th>
                      <th className="text-left py-3 px-4 text-[12px] text-[#888] font-medium">
                        Provider
                      </th>
                      <th className="text-left py-3 px-4 text-[12px] text-[#888] font-medium">
                        Input / 1M
                      </th>
                      <th className="text-left py-3 px-4 text-[12px] text-[#888] font-medium">
                        Output / 1M
                      </th>
                      <th
                        className="text-left py-3 px-4 text-[12px] text-[#888] font-medium cursor-pointer hover:text-white transition-colors select-none"
                        onClick={() =>
                          setSortBy(sortBy === "cost" ? "name" : "cost")
                        }
                      >
                        <span className="inline-flex items-center gap-1">
                          Cost / Request
                          <ArrowUpDown className="w-3 h-3" />
                        </span>
                      </th>
                      <th className="text-left py-3 px-4 text-[12px] text-[#888] font-medium">
                        Cost / User / Mo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelComparison.map((m) => (
                      <tr
                        key={m.id}
                        onClick={() => setSelectedModel(m.id)}
                        className={`border-b border-white/[0.04] cursor-pointer transition-colors ${
                          m.id === selectedModel
                            ? "bg-violet-500/[0.08]"
                            : "hover:bg-white/[0.03]"
                        }`}
                      >
                        <td className="py-3 px-4 text-[13px] text-white font-medium">
                          {m.name}
                        </td>
                        <td className="py-3 px-4 text-[13px] text-[#666]">
                          {m.provider}
                        </td>
                        <td className="py-3 px-4 text-[13px] text-[#888]">
                          ${m.input.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-[13px] text-[#888]">
                          ${m.output.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-[13px] text-white font-mono">
                          {formatCurrency(m.costPerRequest)}
                        </td>
                        <td className="py-3 px-4 text-[13px] text-white font-mono">
                          {formatCurrency(m.costPerUserMonth)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[11px] text-[#444]">
                Prices per 1M tokens from official provider pricing pages. Click a row to select that model.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                Questions
              </h2>
            </motion.div>
            <div className="space-y-4">
              {faqs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
                >
                  <h3 className="text-[16px] font-medium text-white mb-3">
                    {item.q}
                  </h3>
                  <p className="text-[15px] text-[#666] leading-relaxed">
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-6">
                Estimates are good.
                <br />
                <span className="bg-gradient-to-r from-white via-[#888] to-[#444] bg-clip-text text-transparent">
                  Real data is better.
                </span>
              </h2>
              <p className="text-[17px] text-[#666] mb-10 max-w-[500px] mx-auto">
                Orbit tracks actual AI costs from your production API calls.
                One-line SDK, real-time dashboards, per-feature breakdown.
              </p>
              <a
                href="https://app.withorbit.io/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center h-14 px-8 bg-white text-black font-medium text-[15px] rounded-full hover:bg-white/90 transition-all"
              >
                Start tracking free
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
