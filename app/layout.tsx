import type { Metadata } from "next";
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
  title: { default: "BD Tools Hub - Free Online Tools for Bangladesh", template: "%s | BD Tools Hub" },
  description: "ফ্রি অনলাইন টুলস: Age Calculator, GPA Calculator, bKash Calculator, Word Counter ও আরও অনেক কিছু। Fast, Free, No Signup.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
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
      </body>
    </html>
  );
}
