"use client";

import { motion } from "framer-motion";
import { Copy, Check, Terminal, Package, Code, Zap, ExternalLink } from "lucide-react";
import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 rounded-md bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : (
        <Copy className="w-4 h-4 text-[#666]" />
      )}
    </button>
  );
}

function CodeBlock({ code, language = "javascript" }: { code: string; language?: string }) {
  return (
    <div className="relative bg-[#0a0a0a] rounded-xl border border-white/[0.06] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <span className="text-[11px] text-[#555] uppercase tracking-wider">{language}</span>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-[13px] text-[#a1a1aa] font-mono leading-relaxed">{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${
        active
          ? "bg-white/[0.1] text-white"
          : "text-[#666] hover:text-[#888]"
      }`}
    >
      {children}
    </button>
  );
}

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<"node" | "python">("node");

  // Node.js code examples
  const nodeInstallCode = `npm install @with-orbit/sdk`;

  const nodeInitCode = `import { Orbit } from '@with-orbit/sdk';
import OpenAI from 'openai';

const orbit = new Orbit({
  apiKey: process.env.ORBIT_API_KEY,
});

// Wrap your OpenAI client
const openai = orbit.wrapOpenAI(new OpenAI());`;

  const nodeFeatureCode = `// Track usage by feature
const chatClient = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'chat-assistant',
  environment: 'production',
});

// Make API calls as normal
const response = await chatClient.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }],
});`;

  // Python code examples
  const pythonInstallCode = `pip install withorbit-sdk`;

  const pythonInitCode = `from withorbit_sdk import Orbit
from openai import OpenAI
import os

orbit = Orbit(
    api_key=os.environ.get("ORBIT_API_KEY"),
)

# Wrap your OpenAI client
openai = orbit.wrap_openai(OpenAI())`;

  const pythonFeatureCode = `# Track usage by feature
openai = orbit.wrap_openai(OpenAI(),
    feature="chat-assistant",
    environment="production",
)

# Make API calls as normal
response = openai.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}],
)`;

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4 text-white">
              Documentation
            </h1>
            <p className="text-[17px] text-[#666]">
              Get started in minutes. Track your AI usage with just a few lines of code.
            </p>
          </motion.div>

          {/* Resources - Up top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            <a
              href="https://www.npmjs.com/package/@with-orbit/sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] text-white font-medium">Node.js SDK</div>
                <div className="text-[12px] text-[#555]">@with-orbit/sdk</div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#444] group-hover:text-[#666] transition-colors" />
            </a>

            <a
              href="https://pypi.org/project/withorbit-sdk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] text-white font-medium">Python SDK</div>
                <div className="text-[12px] text-[#555]">withorbit-sdk</div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#444] group-hover:text-[#666] transition-colors" />
            </a>

            <a
              href="https://app.withorbit.io/settings"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                <Terminal className="w-5 h-5 text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] text-white font-medium">Get API Key</div>
                <div className="text-[12px] text-[#555]">Dashboard settings</div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#444] group-hover:text-[#666] transition-colors" />
            </a>
          </motion.div>

          {/* Supported Providers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-[13px]"
          >
            <span className="text-white">Supported:</span>{" "}
            <span className="text-violet-400">OpenAI, Anthropic</span>
            <span className="mx-3 text-[#333]">|</span>
            <span className="text-[#555]">Coming soon: Gemini, Mistral, Groq, DeepSeek</span>
          </motion.div>
        </div>
      </section>

      {/* Quick Start with Tabs */}
      <section className="py-12 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-white">Quick Start</h2>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <TabButton active={activeTab === "node"} onClick={() => setActiveTab("node")}>
                  Node.js
                </TabButton>
                <TabButton active={activeTab === "python"} onClick={() => setActiveTab("python")}>
                  Python
                </TabButton>
              </div>
            </div>

            {/* Step 1 - Install */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-violet-500/10 flex items-center justify-center text-[13px] font-medium text-violet-400">
                  1
                </div>
                <h3 className="text-[17px] font-medium text-white">Install the SDK</h3>
              </div>
              <CodeBlock
                code={activeTab === "node" ? nodeInstallCode : pythonInstallCode}
                language="bash"
              />
            </div>

            {/* Step 2 - Initialize */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-violet-500/10 flex items-center justify-center text-[13px] font-medium text-violet-400">
                  2
                </div>
                <h3 className="text-[17px] font-medium text-white">Initialize and wrap your client</h3>
              </div>
              <CodeBlock
                code={activeTab === "node" ? nodeInitCode : pythonInitCode}
                language={activeTab === "node" ? "javascript" : "python"}
              />
              <p className="text-[13px] text-[#555] mt-3">
                Get your API key from{" "}
                <a
                  href="https://app.withorbit.io/settings"
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Settings
                </a>
                {" "}in your dashboard.
              </p>
            </div>

            {/* Step 3 - Feature tracking */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-violet-500/10 flex items-center justify-center text-[13px] font-medium text-violet-400">
                  3
                </div>
                <h3 className="text-[17px] font-medium text-white">Add feature tracking</h3>
              </div>
              <CodeBlock
                code={activeTab === "node" ? nodeFeatureCode : pythonFeatureCode}
                language={activeTab === "node" ? "javascript" : "python"}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* What gets tracked */}
      <section className="py-12 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-white mb-3">What gets tracked</h2>
            <p className="text-[15px] text-[#555] mb-8">
              The SDK captures metadata about each AI request. Your prompts and responses are never sent to Orbit.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Feature name", desc: "Group requests by feature" },
                { label: "Model", desc: "gpt-4o, claude-3, etc." },
                { label: "Tokens", desc: "Input and output counts" },
                { label: "Latency", desc: "Request to response time" },
                { label: "Cost", desc: "Estimated based on pricing" },
                { label: "Status", desc: "Success or error" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="text-[14px] text-white font-medium mb-1">{item.label}</div>
                  <div className="text-[12px] text-[#555]">{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Environment Variables */}
      <section className="py-12 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Environment Variables</h2>
            <CodeBlock
              code={`# Add to your .env file
ORBIT_API_KEY=orb_live_xxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxx`}
              language="bash"
            />
            <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <p className="text-[13px] text-amber-200/80">
                <strong className="text-amber-200">Note:</strong> Never commit API keys to version control.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SDK Features */}
      <section className="py-12 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">SDK Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Non-blocking", desc: "Analytics sent asynchronously" },
                { title: "Lightweight", desc: "Minimal dependencies" },
                { title: "Type-safe", desc: "Full TypeScript support" },
                { title: "Secure", desc: "Your API keys never leave your app" },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <h3 className="text-[15px] font-medium text-white mb-1">{item.title}</h3>
                  <p className="text-[13px] text-[#555]">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
              Ready to start?
            </h2>
            <p className="text-[#555] mb-6">
              Create your account and get your API key in seconds.
            </p>
            <a
              href="https://app.withorbit.io/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 bg-white text-black font-medium text-[14px] rounded-full hover:bg-white/90 transition-all"
            >
              Get started free
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
