"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, MessageSquare, Handshake, Mail, DollarSign, BarChart3, Zap, AlertTriangle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left side - Copy and messaging */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-white">
              Let's talk
            </h1>

            <p className="text-[17px] text-[#888] mb-10 leading-relaxed">
              Whether you're spending $100 or $100,000 on AI APIs, understanding where that money goes is the first step to optimizing it.
            </p>

            {/* Pain points */}
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-white mb-1">
                    AI bills growing faster than revenue?
                  </h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    Most teams have no idea which features are eating their budget.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-white mb-1">
                    No visibility into AI usage?
                  </h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    Provider dashboards show totals, not per-feature breakdowns.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-white mb-1">
                    Want to ship AI features faster?
                  </h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    Know what's working so you can double down.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-white mb-1">
                    Catching errors too late?
                  </h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    Monitor failures in real-time before users complain.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct email */}
            <div className="flex items-center gap-3 pt-6 border-t border-white/[0.06]">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-[13px] text-[#666]">Prefer email?</p>
                <a
                  href="mailto:hello@withorbit.io"
                  className="text-[15px] text-white hover:text-violet-400 transition-colors"
                >
                  hello@withorbit.io
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isSubmitted ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  Message sent
                </h2>
                <p className="text-[#666] mb-6">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[14px] text-[#888] hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/[0.1] bg-white/[0.02] p-8"
              >
                <h2 className="text-xl font-semibold text-white mb-6">
                  Send us a message
                </h2>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[14px] font-medium text-[#a1a1aa] mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#52525b] focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all text-[15px]"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[14px] font-medium text-[#a1a1aa] mb-2"
                    >
                      Work email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#52525b] focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all text-[15px]"
                      placeholder="you@company.com"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-[14px] font-medium text-[#a1a1aa] mb-2"
                    >
                      Company{" "}
                      <span className="text-[#52525b] font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#52525b] focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all text-[15px]"
                      placeholder="Your company"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[14px] font-medium text-[#a1a1aa] mb-2"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#52525b] focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all text-[15px] resize-none"
                      placeholder="Tell us about your AI usage, challenges, or questions..."
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-red-400 text-[14px]">{error}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 flex items-center justify-center bg-white text-black font-medium text-[14px] rounded-full hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send message
                        <Send className="w-4 h-4 ml-2" />
                      </span>
                    )}
                  </button>
                </div>

                <p className="text-[12px] text-[#52525b] text-center mt-4">
                  We typically respond within 24 hours
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* How we can help - bottom section */}
        <div className="mt-20 pt-16 border-t border-white/[0.06]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold text-white mb-8 text-center"
          >
            How can we help?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-[16px] font-medium text-white mb-2">
                Questions about Orbit
              </h3>
              <p className="text-[15px] text-[#666] leading-relaxed">
                Wondering if Orbit is right for your project? Have questions about features, integrations, or pricing? We're happy to help.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <Handshake className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-[16px] font-medium text-white mb-2">
                Partnership opportunities
              </h3>
              <p className="text-[15px] text-[#666] leading-relaxed">
                Interested in partnering with us? Building something in the AI observability space? Let's talk about how we can work together.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
