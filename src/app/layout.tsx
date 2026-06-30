import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "QuantumCanary — AI-Powered Cybersecurity Deception Platform",
    template: "%s | QuantumCanary",
  },
  description:
    "Deploy intelligent honeypots, detect attackers in real-time, and protect your infrastructure with AI-powered deception technology. Start free.",
  keywords: [
    "cybersecurity",
    "honeypot",
    "canary token",
    "threat detection",
    "deception technology",
    "AI security",
  ],
  authors: [{ name: "QuantumCanary" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quantumcanary.io",
    siteName: "QuantumCanary",
    title: "QuantumCanary — AI-Powered Cybersecurity Deception Platform",
    description:
      "Deploy intelligent honeypots, detect attackers in real-time, and protect your infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantumCanary",
    description:
      "AI-Powered Cybersecurity Deception Platform",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased bg-space text-[#E8EDF5] min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SessionProvider>
            {children}
          </SessionProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#0D1525",
                color: "#E8EDF5",
                border: "1px solid rgba(55,138,221,0.2)",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: {
                iconTheme: {
                  primary: "#1D9E75",
                  secondary: "#E8EDF5",
                },
              },
              error: {
                iconTheme: {
                  primary: "#E24B4A",
                  secondary: "#E8EDF5",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
