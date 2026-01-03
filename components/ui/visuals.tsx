"use client";

import { motion } from "framer-motion";

// Hero Visual - Multiple layered cards like Linear
export function HeroVisual() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-500/20 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-fuchsia-500/20 rounded-full blur-[80px]" />

      {/* Background card - Features list */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 right-0 w-[320px] rounded-2xl border border-white/[0.08] bg-[#0c0c0e] p-5 shadow-2xl"
        style={{ transform: 'perspective(1000px) rotateY(-8deg)' }}
      >
        <div className="text-[11px] text-[#666] uppercase tracking-wider mb-4">Features tracked</div>
        <div className="space-y-3">
          {[
            { name: "chat-assistant", cost: "$0.0037", status: "green" },
            { name: "code-generator", cost: "$0.0042", status: "green" },
            { name: "summarizer", cost: "$0.0018", status: "yellow" },
          ].map((f, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${f.status === 'green' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="text-[13px] text-white">{f.name}</span>
              </div>
              <span className="text-[13px] text-[#888]">{f.cost}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main card - Cost overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute top-20 left-0 w-[380px] rounded-2xl border border-white/[0.1] bg-[#0c0c0e] p-6 shadow-2xl"
        style={{ transform: 'perspective(1000px) rotateY(5deg)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="text-[13px] text-[#888]">Total AI Cost</div>
          <div className="text-[11px] text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">Live</div>
        </div>
        <div className="text-[42px] font-medium text-white tracking-tight mb-2">$127.43</div>
        <div className="text-[13px] text-[#666] mb-6">This month · 4 features</div>

        {/* Mini chart */}
        <div className="h-[80px] flex items-end gap-1">
          {[35, 42, 28, 55, 48, 62, 45, 70, 58, 82, 75, 90].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-violet-500/40 to-violet-500/10 rounded-sm"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-[#444]">
          <span>Jan 1</span>
          <span>Jan 12</span>
        </div>
      </motion.div>

      {/* Floating metric card - Latency */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-16 left-[200px] rounded-xl border border-white/[0.1] bg-[#0c0c0e]/90 backdrop-blur-xl px-5 py-4 shadow-2xl"
      >
        <div className="text-[10px] text-[#666] uppercase tracking-wider mb-1">Avg Latency</div>
        <div className="text-[24px] font-medium text-white">1.2s</div>
        <div className="text-[11px] text-emerald-400">↓ 18% from last week</div>
      </motion.div>

      {/* Floating metric card - Requests */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-32 right-[40px] rounded-xl border border-white/[0.1] bg-[#0c0c0e]/90 backdrop-blur-xl px-5 py-4 shadow-2xl"
      >
        <div className="text-[10px] text-[#666] uppercase tracking-wider mb-1">Total Requests</div>
        <div className="text-[24px] font-medium text-white">12.4k</div>
        <div className="text-[11px] text-[#888]">Last 30 days</div>
      </motion.div>

      {/* Error indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute top-[280px] right-[60px] rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[12px] text-red-400">3 errors detected</span>
        </div>
      </motion.div>
    </div>
  );
}

// Feature Analytics Visual
export function FeatureAnalyticsVisual() {
  return (
    <div className="relative w-full h-[450px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-violet-500/15 rounded-full blur-[80px]" />

      {/* Main features grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 rounded-2xl border border-white/[0.08] bg-[#0a0a0c] p-6"
      >
        <div className="text-[13px] text-[#888] mb-6">Features · 7 tracked</div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "chat-assistant", cost: "$12.84", requests: "2.4k", latency: "1.8s", error: "2.1%", color: "emerald" },
            { name: "code-generator", cost: "$45.20", requests: "890", latency: "3.2s", error: "0.8%", color: "violet" },
            { name: "content-writer", cost: "$8.90", requests: "1.2k", latency: "2.1s", error: "1.2%", color: "amber" },
            { name: "summarizer", cost: "$3.45", requests: "3.1k", latency: "0.9s", error: "0.3%", color: "blue" },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${f.color === 'emerald' ? 'bg-emerald-400' : f.color === 'violet' ? 'bg-violet-400' : f.color === 'amber' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                  <span className="text-[13px] text-white font-medium">{f.name}</span>
                </div>
                <span className="text-[12px] text-emerald-400">↗ 100%</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-[#555] uppercase">Cost</div>
                  <div className="text-[15px] text-white">{f.cost}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#555] uppercase">Requests</div>
                  <div className="text-[15px] text-white">{f.requests}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#555] uppercase">Latency</div>
                  <div className="text-[15px] text-[#888]">{f.latency}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#555] uppercase">Errors</div>
                  <div className={`text-[15px] ${parseFloat(f.error) > 1 ? 'text-red-400' : 'text-emerald-400'}`}>{f.error}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating detail */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-4 -right-4 rounded-xl border border-violet-500/20 bg-[#0c0c0e] px-4 py-3 shadow-2xl"
      >
        <div className="text-[10px] text-violet-400 uppercase tracking-wider mb-1">Top Feature</div>
        <div className="text-[16px] font-medium text-white">code-generator</div>
        <div className="text-[11px] text-[#666]">64% of total cost</div>
      </motion.div>
    </div>
  );
}

// Cost Analytics Visual
export function CostAnalyticsVisual() {
  return (
    <div className="relative w-full h-[450px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px]" />

      {/* Main cost card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 w-[340px] rounded-2xl border border-white/[0.08] bg-[#0a0a0c] p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-[13px] text-[#888]">Cost Trend</div>
          <div className="text-[11px] text-[#555] border border-white/[0.08] px-2 py-1 rounded">Last 30 days</div>
        </div>

        {/* Chart */}
        <div className="h-[140px] flex items-end gap-[6px] mb-4">
          {[20, 35, 28, 45, 38, 52, 48, 65, 58, 72, 68, 85, 78, 92].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-emerald-500/50 to-emerald-500/10 rounded-sm hover:from-emerald-400/60 hover:to-emerald-400/20 transition-colors cursor-pointer"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        <div className="flex justify-between text-[10px] text-[#444]">
          <span>Dec 4</span>
          <span>Jan 3</span>
        </div>
      </motion.div>

      {/* Environment breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-4 right-0 w-[260px] rounded-2xl border border-white/[0.08] bg-[#0a0a0c] p-5"
      >
        <div className="text-[13px] text-[#888] mb-4">By Environment</div>

        {/* Donut chart representation */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-[80px] h-[80px]">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#1a1a1a" strokeWidth="4" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="75 25" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-75" strokeLinecap="round" />
            </svg>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[12px] text-[#888]">Production</span>
              <span className="text-[12px] text-white ml-auto">75%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-[12px] text-[#888]">Staging</span>
              <span className="text-[12px] text-white ml-auto">20%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#333]" />
              <span className="text-[12px] text-[#888]">Dev</span>
              <span className="text-[12px] text-white ml-auto">5%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-0 left-0 flex gap-3"
      >
        <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0c] px-5 py-4">
          <div className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Avg / Request</div>
          <div className="text-[20px] font-medium text-white">$0.0024</div>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0c] px-5 py-4">
          <div className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Total Tokens</div>
          <div className="text-[20px] font-medium text-white">2.4M</div>
        </div>
      </motion.div>
    </div>
  );
}

// Error Tracking Visual
export function ErrorTrackingVisual() {
  return (
    <div className="relative w-full h-[450px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-red-500/10 rounded-full blur-[80px]" />

      {/* Error overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 rounded-2xl border border-white/[0.08] bg-[#0a0a0c] p-6"
      >
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Errors", value: "47", color: "white" },
            { label: "Error Rate", value: "2.8%", color: "red" },
            { label: "Success Rate", value: "97.2%", color: "emerald" },
            { label: "Affected", value: "3 features", color: "amber" },
          ].map((kpi, i) => (
            <div key={i} className="text-center">
              <div className="text-[10px] text-[#555] uppercase tracking-wider mb-1">{kpi.label}</div>
              <div className={`text-[22px] font-medium ${kpi.color === 'red' ? 'text-red-400' : kpi.color === 'emerald' ? 'text-emerald-400' : kpi.color === 'amber' ? 'text-amber-400' : 'text-white'}`}>
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        {/* Error types */}
        <div className="text-[11px] text-[#666] uppercase tracking-wider mb-3">By Type</div>
        <div className="space-y-2">
          {[
            { type: "model_not_found", count: 24, pct: 51 },
            { type: "rate_limit_exceeded", count: 15, pct: 32 },
            { type: "invalid_request", count: 8, pct: 17 },
          ].map((err, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-[12px] text-[#888]">{err.type}</span>
                  <span className="text-[12px] text-white">{err.count}</span>
                </div>
                <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    style={{ width: `${err.pct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent error */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-0 right-0 w-[300px] rounded-xl border border-red-500/20 bg-[#0c0c0e] p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[11px] text-red-400 uppercase tracking-wider">Recent Error</span>
        </div>
        <div className="text-[13px] text-white mb-1">model_not_found</div>
        <div className="text-[12px] text-[#666] mb-2">Feature: code-generator</div>
        <div className="text-[11px] text-[#444] font-mono bg-[#0a0a0a] rounded px-2 py-1">
          Model &apos;gpt-5&apos; does not exist
        </div>
      </motion.div>
    </div>
  );
}

// Model Analytics Visual
export function ModelAnalyticsVisual() {
  return (
    <div className="relative w-full h-[450px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[80px]" />

      {/* Provider breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 w-[280px] rounded-2xl border border-white/[0.08] bg-[#0a0a0c] p-5"
      >
        <div className="text-[13px] text-[#888] mb-4">Cost by Provider</div>
        <div className="space-y-3">
          {[
            { name: "OpenAI", cost: "$89.40", pct: 70, color: "emerald" },
            { name: "Anthropic", cost: "$32.10", pct: 25, color: "violet" },
            { name: "Other", cost: "$5.93", pct: 5, color: "gray" },
          ].map((p, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="text-[12px] text-white">{p.name}</span>
                <span className="text-[12px] text-[#888]">{p.cost}</span>
              </div>
              <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${p.color === 'emerald' ? 'bg-emerald-500' : p.color === 'violet' ? 'bg-violet-500' : 'bg-[#444]'}`}
                  style={{ width: `${p.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Model table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-4 right-0 w-[320px] rounded-2xl border border-white/[0.08] bg-[#0a0a0c] p-5"
      >
        <div className="text-[13px] text-[#888] mb-4">Model Performance</div>
        <div className="space-y-3">
          {[
            { model: "gpt-4o", latency: "1.8s", cost: "$0.003", errors: "0.2%" },
            { model: "gpt-4o-mini", latency: "0.9s", cost: "$0.0004", errors: "0.1%" },
            { model: "claude-3-opus", latency: "2.4s", cost: "$0.015", errors: "0.5%" },
          ].map((m, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
              <span className="text-[12px] text-white font-medium">{m.model}</span>
              <div className="flex gap-4">
                <span className="text-[11px] text-[#666]">{m.latency}</span>
                <span className="text-[11px] text-emerald-400">{m.cost}</span>
                <span className="text-[11px] text-[#666]">{m.errors}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating insight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-4 left-[100px] rounded-xl border border-amber-500/20 bg-[#0c0c0e] px-4 py-3"
      >
        <div className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Insight</div>
        <div className="text-[13px] text-white">gpt-4o-mini is 7x cheaper</div>
        <div className="text-[11px] text-[#666]">with similar error rates</div>
      </motion.div>
    </div>
  );
}

// Integration Visual
export function IntegrationVisual() {
  return (
    <div className="relative w-full rounded-2xl border border-white/[0.08] bg-[#0a0a0c] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-10 bg-[#0c0c0e] border-b border-white/[0.06] flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        <span className="text-[11px] text-[#666] ml-4">app.ts</span>
      </div>
      <div className="pt-14 pb-6 px-6">
        <pre className="text-[13px] leading-relaxed">
          <code>
            <span className="text-violet-400">import</span>
            <span className="text-white"> {'{'} Orbit {'}'} </span>
            <span className="text-violet-400">from</span>
            <span className="text-emerald-400"> &apos;@orbithq/sdk&apos;</span>
            <span className="text-white">;</span>
            {'\n'}
            <span className="text-violet-400">import</span>
            <span className="text-white"> OpenAI </span>
            <span className="text-violet-400">from</span>
            <span className="text-emerald-400"> &apos;openai&apos;</span>
            <span className="text-white">;</span>
            {'\n\n'}
            <span className="text-[#666]">// Initialize Orbit</span>
            {'\n'}
            <span className="text-violet-400">const</span>
            <span className="text-white"> orbit = </span>
            <span className="text-violet-400">new</span>
            <span className="text-amber-400"> Orbit</span>
            <span className="text-white">({'{'}</span>
            {'\n'}
            <span className="text-white">  apiKey: process.env.</span>
            <span className="text-amber-400">ORBIT_API_KEY</span>
            {'\n'}
            <span className="text-white">{'}'})</span>
            {'\n\n'}
            <span className="text-[#666]">// Wrap your OpenAI client</span>
            {'\n'}
            <span className="text-violet-400">const</span>
            <span className="text-white"> openai = orbit.</span>
            <span className="text-amber-400">wrapOpenAI</span>
            <span className="text-white">(</span>
            <span className="text-violet-400">new</span>
            <span className="text-amber-400"> OpenAI</span>
            <span className="text-white">(), {'{'}</span>
            {'\n'}
            <span className="text-white">  feature: </span>
            <span className="text-emerald-400">&apos;chat-assistant&apos;</span>
            {'\n'}
            <span className="text-white">{'}'})</span>
          </code>
        </pre>
      </div>
    </div>
  );
}
