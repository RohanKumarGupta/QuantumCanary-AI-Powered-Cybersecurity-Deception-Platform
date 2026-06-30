import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Blog" };

const posts = [
  { title: "How Honeypots Detected a $2M Ransomware Attack", date: "June 20, 2024", category: "Case Study", excerpt: "Learn how a financial services firm used QuantumCanary to detect and stop a sophisticated ransomware campaign before any data was encrypted." },
  { title: "The Rise of AI-Powered Deception Technology", date: "June 15, 2024", category: "Industry", excerpt: "Deception technology is evolving rapidly with AI. We explore how machine learning is transforming honeypot effectiveness and threat analysis." },
  { title: "5 Canary Token Strategies Every SOC Should Deploy", date: "June 10, 2024", category: "Tutorial", excerpt: "Practical guide to deploying canary tokens across your infrastructure to catch insider threats and data exfiltration attempts." },
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Blog</h1>
        <p className="text-lg text-muted mb-12">Insights on cybersecurity, deception technology, and threat intelligence.</p>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.title} className="glass-card hover:border-honey/20 transition-all cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase text-honey bg-honey/10">{post.category}</span>
                <span className="text-xs text-muted">{post.date}</span>
              </div>
              <h2 className="text-xl font-display font-semibold mb-2 group-hover:text-honey transition-colors">{post.title}</h2>
              <p className="text-sm text-muted mb-3">{post.excerpt}</p>
              <span className="text-sm text-honey flex items-center gap-1">Read more <ArrowRight size={14} /></span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
