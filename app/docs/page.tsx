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
      className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-[13px] font-medium rounded-lg transition-colors whitespace-nowrap ${
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
  const [langTab, setLangTab] = useState<"node" | "python">("node");
  const [providerTab, setProviderTab] = useState<"openai" | "anthropic" | "gemini">("openai");

  // Install commands
  const installCode = {
    node: `npm install @with-orbit/sdk`,
    python: `pip install withorbit-sdk`,
  };

  // Node.js code examples by provider
  const nodeInitCode = {
    openai: `import { Orbit } from '@with-orbit/sdk';
import OpenAI from 'openai';

const orbit = new Orbit({
  apiKey: process.env.ORBIT_API_KEY,
});

// Wrap your OpenAI client
const openai = orbit.wrapOpenAI(new OpenAI());`,
    anthropic: `import { Orbit } from '@with-orbit/sdk';
import Anthropic from '@anthropic-ai/sdk';

const orbit = new Orbit({
  apiKey: process.env.ORBIT_API_KEY,
});

// Wrap your Anthropic client
const anthropic = orbit.wrapAnthropic(new Anthropic());`,
    gemini: `import { Orbit } from '@with-orbit/sdk';
import { GoogleGenAI } from '@google/genai';

const orbit = new Orbit({
  apiKey: process.env.ORBIT_API_KEY,
});

// Wrap your Google GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const wrappedAI = orbit.wrapGoogle(ai);`,
  };

  const nodeFeatureCode = {
    openai: `// Track usage by feature
const chatClient = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'chat-assistant',
  environment: 'production',
});

// Make API calls as normal
const response = await chatClient.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }],
});`,
    anthropic: `// Track usage by feature
const chatClient = orbit.wrapAnthropic(new Anthropic(), {
  feature: 'chat-assistant',
  environment: 'production',
});

// Make API calls as normal
const response = await chatClient.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello!' }],
});`,
    gemini: `// Track usage by feature
const wrappedAI = orbit.wrapGoogle(ai, {
  feature: 'chat-assistant',
  environment: 'production',
});

// Make API calls as normal
const response = await wrappedAI.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: 'Hello!',
});`,
  };

  // Python code examples by provider
  const pythonInitCode = {
    openai: `from withorbit_sdk import Orbit
from openai import OpenAI
import os

orbit = Orbit(
    api_key=os.environ.get("ORBIT_API_KEY"),
)

# Wrap your OpenAI client
openai = orbit.wrap_openai(OpenAI())`,
    anthropic: `from withorbit_sdk import Orbit
from anthropic import Anthropic
import os

orbit = Orbit(
    api_key=os.environ.get("ORBIT_API_KEY"),
)

# Wrap your Anthropic client
anthropic = orbit.wrap_anthropic(Anthropic())`,
    gemini: `from withorbit_sdk import Orbit
from google import genai
import os

orbit = Orbit(
    api_key=os.environ.get("ORBIT_API_KEY"),
)

# Wrap your Google GenAI client
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
wrapped = orbit.wrap_google(client)`,
  };

  const pythonFeatureCode = {
    openai: `# Track usage by feature
openai = orbit.wrap_openai(OpenAI(),
    feature="chat-assistant",
    environment="production",
)

# Make API calls as normal
response = openai.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}],
)`,
    anthropic: `# Track usage by feature
anthropic = orbit.wrap_anthropic(Anthropic(),
    feature="chat-assistant",
    environment="production",
)

# Make API calls as normal
response = anthropic.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}],
)`,
    gemini: `# Track usage by feature
from withorbit_sdk import WrapperOptions

wrapped = orbit.wrap_google(client,
    WrapperOptions(feature="chat-assistant", environment="production")
)

# Make API calls as normal
response = wrapped.models.generate_content(
    model="gemini-2.0-flash",
    contents="Hello!",
)`,
  };

  // Task tracking code examples
  const nodeTaskCode = {
    openai: `// Group LLM calls by task and customer
const agent = orbit.wrapOpenAI(new OpenAI(), {
  feature: 'ai-agent',
  task_id: 'task_abc123',      // Groups all calls for this task
  customer_id: 'cust_xyz789',  // Attributes cost to this customer
});

// All calls with this client are tracked together
await agent.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Step 1: Analyze data...' }],
});

await agent.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Step 2: Generate report...' }],
});`,
    anthropic: `// Group LLM calls by task and customer
const agent = orbit.wrapAnthropic(new Anthropic(), {
  feature: 'ai-agent',
  task_id: 'task_abc123',      // Groups all calls for this task
  customer_id: 'cust_xyz789',  // Attributes cost to this customer
});

// All calls with this client are tracked together
await agent.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Step 1: Analyze data...' }],
});

await agent.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Step 2: Generate report...' }],
});`,
    gemini: `// Group LLM calls by task and customer
const agent = orbit.wrapGoogle(ai, {
  feature: 'ai-agent',
  task_id: 'task_abc123',      // Groups all calls for this task
  customer_id: 'cust_xyz789',  // Attributes cost to this customer
});

// All calls with this client are tracked together
await agent.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: 'Step 1: Analyze data...',
});

await agent.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: 'Step 2: Generate report...',
});`,
  };

  const pythonTaskCode = {
    openai: `# Group LLM calls by task and customer
from withorbit_sdk import WrapperOptions

agent = orbit.wrap_openai(OpenAI(), WrapperOptions(
    feature="ai-agent",
    task_id="task_abc123",      # Groups all calls for this task
    customer_id="cust_xyz789",  # Attributes cost to this customer
))

# All calls with this client are tracked together
agent.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Step 1: Analyze data..."}],
)

agent.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Step 2: Generate report..."}],
)`,
    anthropic: `# Group LLM calls by task and customer
from withorbit_sdk import WrapperOptions

agent = orbit.wrap_anthropic(Anthropic(), WrapperOptions(
    feature="ai-agent",
    task_id="task_abc123",      # Groups all calls for this task
    customer_id="cust_xyz789",  # Attributes cost to this customer
))

# All calls with this client are tracked together
agent.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Step 1: Analyze data..."}],
)

agent.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Step 2: Generate report..."}],
)`,
    gemini: `# Group LLM calls by task and customer
from withorbit_sdk import WrapperOptions

agent = orbit.wrap_google(client, WrapperOptions(
    feature="ai-agent",
    task_id="task_abc123",      # Groups all calls for this task
    customer_id="cust_xyz789",  # Attributes cost to this customer
))

# All calls with this client are tracked together
agent.models.generate_content(
    model="gemini-2.0-flash",
    contents="Step 1: Analyze data...",
)

agent.models.generate_content(
    model="gemini-2.0-flash",
    contents="Step 2: Generate report...",
)`,
  };

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
            <span className="text-violet-400">OpenAI, Anthropic, Gemini</span>
            <span className="mx-3 text-[#333]">|</span>
            <span className="text-[#555]">Coming soon: Mistral, Groq, DeepSeek</span>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-2xl font-semibold text-white">Quick Start</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <TabButton active={langTab === "node"} onClick={() => setLangTab("node")}>
                    Node.js
                  </TabButton>
                  <TabButton active={langTab === "python"} onClick={() => setLangTab("python")}>
                    Python
                  </TabButton>
                </div>
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <TabButton active={providerTab === "openai"} onClick={() => setProviderTab("openai")}>
                    OpenAI
                  </TabButton>
                  <TabButton active={providerTab === "anthropic"} onClick={() => setProviderTab("anthropic")}>
                    Anthropic
                  </TabButton>
                  <TabButton active={providerTab === "gemini"} onClick={() => setProviderTab("gemini")}>
                    Gemini
                  </TabButton>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[15px] font-medium text-white mb-3">1. Install the SDK</h3>
                <CodeBlock
                  code={installCode[langTab]}
                  language="bash"
                />
              </div>

              <div>
                <h3 className="text-[15px] font-medium text-white mb-3">2. Initialize and wrap your client</h3>
                <CodeBlock
                  code={langTab === "node" ? nodeInitCode[providerTab] : pythonInitCode[providerTab]}
                  language={langTab === "node" ? "javascript" : "python"}
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

              <div>
                <h3 className="text-[15px] font-medium text-white mb-3">3. Add feature tracking</h3>
                <CodeBlock
                  code={langTab === "node" ? nodeFeatureCode[providerTab] : pythonFeatureCode[providerTab]}
                  language={langTab === "node" ? "javascript" : "python"}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agentic Task Tracking */}
      <section className="py-12 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-white">Agentic Task Tracking</h2>
                <span className="px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                  New
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <TabButton active={langTab === "node"} onClick={() => setLangTab("node")}>
                    Node.js
                  </TabButton>
                  <TabButton active={langTab === "python"} onClick={() => setLangTab("python")}>
                    Python
                  </TabButton>
                </div>
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <TabButton active={providerTab === "openai"} onClick={() => setProviderTab("openai")}>
                    OpenAI
                  </TabButton>
                  <TabButton active={providerTab === "anthropic"} onClick={() => setProviderTab("anthropic")}>
                    Anthropic
                  </TabButton>
                  <TabButton active={providerTab === "gemini"} onClick={() => setProviderTab("gemini")}>
                    Gemini
                  </TabButton>
                </div>
              </div>
            </div>
            <p className="text-[15px] text-[#555] mb-8">
              Group multi-step LLM workflows together and attribute costs to specific customers.
              Perfect for AI agents that make multiple API calls per task.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-violet-400" />
                  <span className="text-[14px] text-white font-medium">task_id</span>
                </div>
                <p className="text-[13px] text-[#555]">
                  Groups all LLM calls in a workflow together. Track total cost and token usage per task.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-[14px] text-white font-medium">customer_id</span>
                </div>
                <p className="text-[13px] text-[#555]">
                  Attribute AI costs to specific customers. Essential for usage-based billing.
                </p>
              </div>
            </div>

            <CodeBlock
              code={langTab === "node" ? nodeTaskCode[providerTab] : pythonTaskCode[providerTab]}
              language={langTab === "node" ? "javascript" : "python"}
            />
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Feature name", desc: "Group requests by feature" },
                { label: "Model", desc: "gpt-4o, claude-3, etc." },
                { label: "Tokens", desc: "Input and output counts" },
                { label: "Latency", desc: "Request to response time" },
                { label: "Cost", desc: "Estimated based on pricing" },
                { label: "Status", desc: "Success or error" },
                { label: "Task ID", desc: "Group multi-step workflows" },
                { label: "Customer ID", desc: "Attribute costs per customer" },
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
            <h2 className="text-[clamp(32px,4.5vw,56px)] font-medium leading-[1.05] tracking-[-0.03em] text-white mb-6">
              Ready to
              <br />
              <span className="bg-gradient-to-r from-white via-[#888] to-[#444] bg-clip-text text-transparent">
                start?
              </span>
            </h2>
            <p className="text-[17px] text-[#666] mb-10 max-w-[450px] mx-auto">
              Create your account and get your API key in seconds.
            </p>
            <a
              href="https://app.withorbit.io/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center h-14 px-8 bg-white text-black font-medium text-[15px] rounded-full hover:bg-white/90 transition-all"
            >
              Get started free
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
