"use client";

import { motion } from "framer-motion";

// Hero Visual - 3D layered cards with depth effect
export function HeroVisual() {
  return (
    <>
      {/* Mobile version - simplified stacked cards */}
      <div className="lg:hidden relative w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-violet-500/20 rounded-full blur-[80px]" />

        <div className="relative space-y-4">
          {/* Efficiency Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-violet-500/20 bg-[#0c0c0e] p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <span className="text-[12px] text-violet-400">Efficiency Score</span>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-[42px] font-semibold text-emerald-400 leading-none">90</span>
              <span className="text-[13px] text-emerald-400/70 mb-1">Excellent</span>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Reliability', value: '93%', pct: 93, color: 'emerald' },
                { label: 'Speed', value: '2.0s', pct: 75, color: 'amber' },
                { label: 'Efficiency', value: '100%', pct: 100, color: 'emerald' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[10px] text-[#555] w-16">{item.label}</span>
                  <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className={`text-[10px] w-10 text-right ${item.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Scaling Health Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.08] bg-[#0a0a0c] p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
                <span className="text-[11px] text-[#666]">Scaling Health</span>
              </div>
              <span className="text-[9px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">Efficient</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-[20px] font-semibold text-emerald-400">+275%</div>
                <div className="text-[9px] text-[#555]">Usage Growth</div>
              </div>
              <div>
                <div className="text-[20px] font-semibold text-emerald-400">-50.9%</div>
                <div className="text-[9px] text-[#555]">Cost Change</div>
              </div>
              <div>
                <div className="text-[20px] font-semibold text-emerald-400">+326%</div>
                <div className="text-[9px] text-[#555]">Net Efficiency</div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-3"
          >
            <div className="flex-1 rounded-xl border border-white/[0.08] bg-[#0a0a0c] px-4 py-3">
              <div className="text-[16px] font-semibold text-white">$0.0031</div>
              <div className="text-[9px] text-[#666]">Avg Cost/Request</div>
            </div>
            <div className="flex-1 rounded-xl border border-white/[0.08] bg-[#0a0a0c] px-4 py-3">
              <div className="text-[16px] font-semibold text-emerald-400">2.4M</div>
              <div className="text-[9px] text-[#666]">Total Tokens</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop version - 3D layered cards */}
      <div className="relative w-full h-[480px] hidden lg:block">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-violet-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-0 w-[180px] h-[180px] bg-emerald-500/15 rounded-full blur-[80px]" />

        {/* 3D Layered Cards Container */}
        <div className="relative w-full h-full" style={{ perspective: '1200px' }}>

          {/* Back Card - Features Table */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-0 left-0 right-0 w-full rounded-2xl border border-white/[0.06] bg-[#08080a] p-5 shadow-2xl"
            style={{ transform: 'translateZ(-60px) translateY(20px)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] text-[#555]">Features · 4 tracked</span>
              <span className="text-[10px] text-[#444]">Last 7 days</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: 'chat', cost: '$0.083', score: 92, color: 'emerald' },
                { name: 'summarize', cost: '$0.027', score: 88, color: 'emerald' },
                { name: 'test-chat', cost: '$0.025', score: 76, color: 'amber' },
                { name: 'autocomplete', cost: '$0.004', score: 94, color: 'emerald' },
              ].map((f, i) => (
                <div key={i} className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${f.color === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span className="text-[11px] text-white font-medium truncate">{f.name}</span>
                  </div>
                  <div className="text-[14px] text-white font-medium mb-1">{f.cost}</div>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${f.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${f.score}%` }} />
                    </div>
                    <span className={`text-[9px] ${f.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>{f.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Middle Card - Scaling Health */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute top-[130px] left-0 w-[58%] rounded-2xl border border-white/[0.08] bg-[#0a0a0c] p-5 shadow-2xl"
            style={{ transform: 'translateZ(-30px)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
                <span className="text-[12px] text-[#666]">Scaling Health</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">Efficient</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-[26px] font-semibold text-emerald-400">+275%</div>
                <div className="text-[11px] text-[#555]">Usage Growth</div>
              </div>
              <div>
                <div className="text-[26px] font-semibold text-emerald-400">-50.9%</div>
                <div className="text-[11px] text-[#555]">Cost Change</div>
              </div>
            </div>
            <div className="border-t border-white/[0.06] pt-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#555]">Net efficiency</span>
                <span className="text-[20px] font-semibold text-emerald-400">+325.9%</span>
              </div>
            </div>
          </motion.div>

          {/* Front Card - Efficiency Score (main focus) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute top-[190px] right-0 w-[55%] rounded-2xl border border-violet-500/20 bg-[#0c0c0e] p-6 shadow-2xl"
            style={{ transform: 'translateZ(0px)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <span className="text-[12px] text-violet-400">Efficiency Score</span>
            </div>
            <div className="flex items-end gap-3 mb-5">
              <span className="text-[52px] font-semibold text-emerald-400 leading-none">90</span>
              <span className="text-[14px] text-emerald-400/70 mb-2">Excellent</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#555] w-18">Reliability</span>
                <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '93%' }} />
                </div>
                <span className="text-[11px] text-emerald-400 w-10 text-right">93%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#555] w-18">Speed</span>
                <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }} />
                </div>
                <span className="text-[11px] text-amber-400 w-10 text-right">2.0s</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#555] w-18">Efficiency</span>
                <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
                <span className="text-[11px] text-emerald-400 w-10 text-right">100%</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-8 left-0 flex gap-4"
          >
            <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0c]/95 backdrop-blur px-6 py-4">
              <div className="text-[20px] font-semibold text-white">$0.0031</div>
              <div className="text-[11px] text-[#666]">Avg Cost/Request</div>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0c]/95 backdrop-blur px-6 py-4">
              <div className="text-[20px] font-semibold text-emerald-400">2.4M</div>
              <div className="text-[11px] text-[#666]">Total Tokens</div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

// Feature Analytics Visual - Based on actual Features page
export function FeatureAnalyticsVisual() {
  return (
    <div className="relative w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[400px] h-[200px] lg:h-[300px] bg-violet-500/15 rounded-full blur-[80px]" />

      {/* Main features dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0c] p-4 lg:p-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 lg:mb-5">
          <div>
            <div className="text-[14px] lg:text-[15px] text-white font-medium">Features</div>
            <div className="text-[10px] lg:text-[11px] text-[#555]">Feature-level analytics</div>
          </div>
          <div className="text-[9px] lg:text-[10px] text-[#444] border border-white/[0.08] px-2 py-1 rounded">Last 30 days</div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 mb-4 lg:mb-5">
          {[
            { label: "Total Features", value: "7", icon: "grid" },
            { label: "Total Cost", value: "$0.0074", icon: "dollar" },
            { label: "Total Requests", value: "34", icon: "zap" },
            { label: "Avg Latency", value: "1254ms", icon: "clock" },
          ].map((kpi, i) => (
            <div key={i} className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-2 lg:p-3">
              <div className="text-[8px] lg:text-[9px] text-[#555] uppercase mb-1">{kpi.label}</div>
              <div className="text-[14px] lg:text-[18px] font-semibold text-white">{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Features label */}
        <div className="flex items-center justify-between mb-2 lg:mb-3">
          <div className="text-[11px] lg:text-[12px] text-[#666]">Features</div>
          <div className="text-[9px] lg:text-[10px] text-[#444]">7 features tracked</div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
          {[
            { name: "code-generator", cost: "$0.0037", requests: "8", latency: "1067ms", errors: "12.5%", success: 100, color: "emerald" },
            { name: "chat-assistant", cost: "$0.0037", requests: "8", latency: "1849ms", errors: "12.5%", success: 100, color: "emerald" },
            { name: "content-writer", cost: "$0.0000", requests: "2", latency: "1122ms", errors: "0.0%", success: 100, color: "emerald" },
            { name: "document-summarizer", cost: "$0.0000", requests: "2", latency: "1121ms", errors: "0.0%", success: 100, color: "emerald" },
            { name: "error-test-model", cost: "$0.0000", requests: "6", latency: "1163ms", errors: "50.0%", success: 100, color: "amber" },
            { name: "error-test-valid", cost: "$0.0000", requests: "6", latency: "1162ms", errors: "50.0%", success: 100, color: "amber" },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 lg:p-3"
            >
              <div className="flex items-center justify-between mb-1 lg:mb-2">
                <div className="flex items-center gap-1 lg:gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${f.color === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span className="text-[9px] lg:text-[11px] text-white font-medium truncate max-w-[70px] lg:max-w-[100px]">{f.name}</span>
                </div>
                <span className={`text-[8px] lg:text-[10px] ${f.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>↗ {f.success}%</span>
              </div>
              <div className="text-[13px] lg:text-[16px] font-semibold text-white mb-1 lg:mb-2">{f.cost}</div>
              <div className="grid grid-cols-2 gap-1 lg:gap-2 text-[8px] lg:text-[10px]">
                <div>
                  <span className="text-[#555]">{f.requests}</span>
                  <span className="text-[#444] ml-1">Req</span>
                </div>
                <div>
                  <span className={`${parseFloat(f.errors) > 10 ? 'text-red-400' : 'text-[#555]'}`}>{f.errors}</span>
                  <span className="text-[#444] ml-1">Err</span>
                </div>
              </div>
              <div className="text-[8px] lg:text-[10px] text-[#555] mt-1">{f.latency}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Cost Analytics Visual - Scaling Health focused
export function CostAnalyticsVisual() {
  return (
    <div className="relative w-full h-[480px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px]" />

      {/* Top Row - Trend Chart (left) + Scaling Health (right) */}
      <div className="flex gap-4">
        {/* Left - Cost Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 rounded-2xl border border-white/[0.08] bg-[#0a0a0c] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] text-white font-medium">Cost Trend</span>
            <span className="text-[10px] text-[#444] border border-white/[0.08] px-2 py-1 rounded">Last 30 days</span>
          </div>
          <div className="h-[200px] flex items-end gap-[6px]">
            {[25, 30, 28, 35, 32, 38, 36, 42, 40, 45, 43, 48, 46, 52, 50, 55, 53, 58, 56, 60, 58, 62, 60, 65].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-emerald-500/60 to-emerald-500/10 rounded-sm hover:from-emerald-400/70 hover:to-emerald-400/20 transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-[#444] mt-3">
            <span>Dec 10</span>
            <span>Dec 25</span>
            <span>Jan 10</span>
          </div>
        </motion.div>

        {/* Right - Scaling Health Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-[200px] rounded-2xl border border-white/[0.08] bg-[#0a0a0c] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              <span className="text-[12px] text-[#666]">Scaling Health</span>
            </div>
          </div>
          <div className="text-center mb-4">
            <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">Efficient</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-[24px] font-semibold text-emerald-400">+275%</div>
              <div className="text-[10px] text-[#555]">Usage Growth</div>
            </div>
            <div>
              <div className="text-[24px] font-semibold text-emerald-400">-50.9%</div>
              <div className="text-[10px] text-[#555]">Cost Change</div>
            </div>
            <div className="border-t border-white/[0.06] pt-4">
              <div className="text-[10px] text-[#555] mb-1">Net Efficiency</div>
              <div className="text-[22px] font-semibold text-emerald-400">+325.9%</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom KPI cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 flex gap-4"
      >
        <div className="flex-1 rounded-xl border border-white/[0.08] bg-[#0a0a0c] px-5 py-4">
          <div className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Avg Cost / Request</div>
          <div className="text-[22px] font-semibold text-white">$0.0002</div>
        </div>
        <div className="flex-1 rounded-xl border border-white/[0.08] bg-[#0a0a0c] px-5 py-4">
          <div className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Total Tokens</div>
          <div className="text-[22px] font-semibold text-white">1.2k</div>
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
            <span className="text-emerald-400"> &apos;@with-orbit/sdk&apos;</span>
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
