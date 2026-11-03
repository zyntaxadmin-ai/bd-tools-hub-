# BD Tools Hub

Free online tools for Bangladesh. Fast, no signup, and everything runs in your browser (no server, no database, no uploads).

**Live:** https://bdtoolsflow.cyou/

## Tools

52 tools are live. A tool is shown on the site only after its slug is added to `lib/live.ts`.

| Category | Tools |
| --- | --- |
| Bangladesh Special (12) | bKash, Nagad, Rocket and Upay cash out calculators, Land Calculator (শতাংশ/কাঠা/বিঘা), BDT Currency Converter, Electricity Bill Calculator, Govt Job Age Calculator, Passport Fee Calculator, Zakat Calculator, Gold Weight Converter (ভরি/আনা/রতি), Income Tax Calculator |
| Education & Calculation (12) | Number to Words, FDR/DPS Calculator, Age, GPA (SSC/HSC), CGPA, BMI, EMI, Percentage, Scientific Calculator, Unit Converter, Bill Calculator, Date Difference |
| Image & PDF (10) | Image Compressor, Image Resizer, Image Converter, Image to PDF, Merge PDF, Split PDF, Compress PDF, QR Code Generator, PDF to JPG, Rotate PDF |
| Text & SEO (8) | Word Counter, Character Counter, Case Converter, Password Generator, Color Picker, Lorem Ipsum, Meta Tag Generator, Keyword Density |
| Daily Utility (10) | Stopwatch & Timer, To-Do, Random Number, Countdown, Time Zone Converter, Expense Tracker, Invoice Generator, QR Scanner, Text to Speech, Bangla Calendar |

Dropped: Background Remover, TIN Check, Plagiarism Helper, Article Rewriter. Not built yet: Bijoy to Unicode converter.

## Guides

The `/guides` section has Bangla and English how-to articles, each linked to a tool. Guides live in `lib/guides.ts` (a `GUIDES` array). Add an object there and the guide page, the `/guides` list, the sitemap, the home page section and the link on the matching tool page all pick it up. Every guide needs a dated `updated` field, a tool link, sections and FAQs. Check facts against official sources before publishing.

Live guides (23): cash out charges (and a charge table for 500 to 10,000 taka), SSC GPA, GPA to grade, GPA with the 4th subject, income tax 2026-27, electricity bill, zakat, FDR/DPS, passport fee, how many grams in a vori, CGPA, university grade points, EMI, flat vs reducing EMI, how to lower an EMI, BMI, percentage, age, number to words, square feet to shotangsho, US time to Bangladesh time, and tracking monthly expenses.

## SEO

- `lib/seoMeta.ts` holds the page title and description for every tool (Bangla and English keywords). Titles stay under about 52 characters because the layout adds " | BD Tools Flow".
- Tool and guide pages include JSON-LD structured data (guides: Article and FAQPage). `app/sitemap.ts` lists the home page, categories, tools and guides.
- `public/ads.txt` holds the AdSense publisher line.

## Tech stack

- Next.js 14 (App Router) and TypeScript
- Tailwind CSS (class based dark mode), lucide-react, framer-motion, next-themes
- `qrcode` and `jsqr` (loaded only when the QR tools are opened)
- Hosting: Vercel (free tier)

## Project structure

```
app/
  page.tsx                  Server wrapper for the homepage (passes only guide slugs and titles)
  layout.tsx                Root layout (header, footer, theme, optional AdSense script)
  tool/[slug]/page.tsx      Renders any tool from the registry (+ SEO metadata, JSON-LD)
  category/[categorySlug]/  Category pages
  guides/, guides/[slug]/   Guides list and guide pages
  about, contact, privacy-policy, disclaimer
  sitemap.ts, robots.ts
components/
  tools/                    One file per tool (client components)
  toolRegistry.tsx          Base tools and merge of the batch registries
  toolRegistryB1.tsx ... B3.tsx    Registries for earlier batches
  toolRegistryB4.tsx ... B11.tsx   Registries for later batches (each entry: component, title, desc, howTo, faqs)
  ToolLayout.tsx            Shared page layout (title, how-to, FAQ, related tools). The tool page passes in only that tool's article and English text, to keep the JS small
  HomeContent.tsx           Homepage UI with search and categories (client component)
  ToolCard, Header, Footer, SearchBar, JsonLd, AdSlot, ThemeProvider
data/tools.ts               The full list of tools (name, slug, category, icon)
lib/
  live.ts                   Slugs that are actually built (sitemap and related tools use this)
  seo.ts                    Site URL and name
  dateCalc.ts, sciEval.ts, imageUtil.ts, colorUtil.ts, lorem.ts,
  keywords.ts, metaTags.ts, rand.ts, tz.ts,
  banglaDate.ts, expense.ts, invoice.ts, scan.ts, tts.ts, ttsEngine.ts   Shared, tested logic
  lang.tsx                  Language provider (BN default, EN) saved in localStorage
  i18nData.ts               UI strings, category names, English card descriptions
  guides.ts                 Guide articles (Bangla and English)
  seoMeta.ts                SEO titles and descriptions per tool
  toolArticles.ts           Long-form text shown under every tool (Bangla and English)
  toolContentEn.ts          English title/description/how-to/FAQ for every live tool
  site.ts                   CONTACT_EMAIL (edit this one line)
```

## Languages (Bangla default, English toggle)

The header has a BN | EN toggle. The choice is saved in the browser. The page frame (header, footer, homepage, categories, tool title, description, how-to and FAQ) is translated. The text inside each tool (labels and buttons) is still Bangla only.

## Add a new tool

1. Create `components/tools/MyTool.tsx` (`"use client"`, default export). Do not render a page title or outer card, because `ToolLayout` already does that.
2. Add an entry to a registry file (`component`, `title`, `desc`, `howTo`, `faqs`). The slug must match `data/tools.ts`.
3. Add the slug to `lib/live.ts`.
4. Add the English version to `lib/toolContentEn.ts` (the English card text is already in `lib/i18nData.ts`).

## Environment variables

Set these in Vercel under Settings, Environment Variables.

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, used by the sitemap, canonical links and Open Graph (no trailing slash) |
| `NEXT_PUBLIC_ADS` | Set to `1` after AdSense approval to show ad slots |
| `NEXT_PUBLIC_ADSENSE_ID` | AdSense publisher ID (`ca-pub-...`) |

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Import the repo in Vercel (Next.js is detected automatically). Every commit to `main` redeploys.

## Rates and rules that change

Public sources for these disagree or change often, and none is official, so check them and edit the numbers when needed:

- Cash out rates (taka per 1,000) are at the top of `NagadCalculator.tsx`, `RocketCalculator.tsx` and `UpayCalculator.tsx`.
- Electricity slabs and demand charge: top of `ElectricityBillCalculator.tsx` (June 2026 billing rates).
- Income tax slabs, rebate and minimum tax: top of `IncomeTaxCalculator.tsx` (Finance Act 2026, FY 2026-27).
- Zakat nisab (7.5 vori gold, 52.5 vori silver) is in `ZakatCalculator.tsx`.
- Passport fees: `PassportFeeCalculator.tsx`.

## Notes

- All calculations happen in the browser. Images and text never leave the device.
- Rates and rules (bKash charges, govt job age limits, loan fees) change over time. Always check the official source. Each tool says so on its page.
- Google Search Console verification file is kept in `public/`. Do not delete it.
