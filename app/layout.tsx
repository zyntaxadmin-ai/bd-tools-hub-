import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/lang";
import { siteConfig } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "BD Tools Flow - Free Online Tools for Bangladesh", template: "%s | BD Tools Flow" },
  description: "ফ্রি অনলাইন টুলস: Age Calculator, GPA Calculator, bKash Calculator, Word Counter ও আরও অনেক কিছু। Fast, Free, No Signup.",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: "BD Tools Flow - Free Online Tools for Bangladesh",
    description: "ফ্রি অনলাইন টুলস: Age Calculator, GPA Calculator, bKash Calculator, Word Counter ও আরও অনেক কিছু। Fast, Free, No Signup.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BD Tools Flow - Free Online Tools for Bangladesh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BD Tools Flow - Free Online Tools for Bangladesh",
    description: "Free online tools for Bangladesh. Fast, free, no signup.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Falls back to the publisher ID so the AdSense script is always present, even if the env var is not set on Vercel.
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-3581088994822973";
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        {adsenseId ? (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`} crossOrigin="anonymous" />
        ) : null}
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LangProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LangProvider>
        </ThemeProvider>
        {/* BD Flow Helper chat widget (public/chatbot.js). It talks to /api/chat. */}
        <Script src="/chatbot.js?v=1" strategy="lazyOnload" />
      </body>
    </html>
  );
}
