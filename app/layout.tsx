
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
  title: {
    default: "BD Tools Flow - Free Online Tools for Bangladesh",
    template: "%s | BD Tools Flow",
  },
  description:
    "ফ্রি অনলাইন টুলস: Age Calculator, GPA Calculator, bKash Calculator, Word Counter ও আরও অনেক কিছু। Fast, Free, No Signup.",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: "BD Tools Flow - Free Online Tools for Bangladesh",
    description:
      "ফ্রি অনলাইন টুলস: Age Calculator, GPA Calculator, bKash Calculator, Word Counter ও আরও অনেক কিছু। Fast, Free, No Signup.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BD Tools Flow - Free Online Tools for Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BD Tools Flow - Free Online Tools for Bangladesh",
    description: "Free online tools for Bangladesh. Fast, free, no signup.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Google AdSense
  const adsenseId =
    process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-3581088994822973";

  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        {adsenseId ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>

      <body className={inter.className}>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N78SKNNJ9Z"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N78SKNNJ9Z');
            `,
          }}
        />

        <ThemeProvider>
          <LangProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LangProvider>
        </ThemeProvider>

        {/* BD Flow Helper Chat Widget */}
        <Script src="/chatbot.js?v=1" strategy="lazyOnload" />
      </body>
    </html>
  );
  }
        
