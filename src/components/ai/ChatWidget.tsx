"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hi! I'm the QuantumCanary AI assistant. How can I help you with cybersecurity today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [...messages, userMsg] }) });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiText = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          aiText += decoder.decode(value);
          setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: aiText }]);
        }
      }
    } catch { setMessages((m) => [...m, { role: "assistant", content: "Sorry, I couldn't process that. Please try again." }]); }
    finally { setLoading(false); }
  };

  return (
    <>
      {/* Floating Button */}
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-honey text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[500px] bg-space-800 border border-[rgba(55,138,221,0.2)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[rgba(55,138,221,0.1)] flex items-center gap-2">
              <Bot size={20} className="text-honey" />
              <span className="font-display font-semibold text-sm">AI Assistant</span>
              <span className="ml-auto w-2 h-2 rounded-full bg-asset blink" />
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${m.role === "user" ? "bg-honey text-white" : "bg-space-700 text-[#C4D0E0]"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && <div className="flex justify-start"><div className="px-3 py-2 rounded-xl bg-space-700"><Loader2 size={16} className="animate-spin text-honey" /></div></div>}
            </div>
            {/* Input */}
            <div className="p-3 border-t border-[rgba(55,138,221,0.1)]">
              <div className="flex gap-2">
                <input className="input-field flex-1 h-10 text-sm" value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Ask about security..." />
                <button onClick={sendMessage} disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-lg bg-honey text-white flex items-center justify-center hover:bg-honey-dark transition-colors disabled:opacity-50">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
