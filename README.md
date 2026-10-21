# BD Tools Hub

Free online tools for Bangladesh. Fast, no signup, and everything runs in your browser (no server, no database, no uploads).

**Live:** https://bd-tools-hub.vercel.app

## Tools

50 tools are planned. 30 are live; the other 20 show a "Coming soon" page and are kept out of the sitemap.

| Category | Live | Coming soon |
| --- | --- | --- |
| Education & Calculation | Age, GPA (SSC/HSC), CGPA, Percentage, BMI, EMI, Unit Converter, Bill Splitter, Date Difference, Scientific Calculator | |
| Bangladesh Special | bKash Calculator, Land Calculator (শতাংশ/কাঠা/বিঘা), Govt Job Age | Nagad, Rocket, Upay, BDT Converter, Electricity Bill, Passport Fee, TIN Check |
| Image & PDF | Image Compressor, Image Resizer, Image Converter, QR Code Generator | Background Remover, Image to PDF, PDF to JPG, Merge PDF, Split PDF, Compress PDF |
| Text & SEO | Word Counter, Character Counter, Case Converter, Password Generator, Color Picker, Lorem Ipsum, Meta Tag Generator, Keyword Density | Plagiarism Helper, Article Rewriter |
| Daily Utility | Stopwatch & Timer, To-Do, Random Number, Countdown, Time Zone Converter | Bangla Calendar, Text to Speech, QR Scanner, Invoice, Expense Tracker |

## Tech stack

- Next.js 14 (App Router) and TypeScript
- Tailwind CSS (class based dark mode), lucide-react, framer-motion, next-themes
- `qrcode` (loaded only when the QR tool is opened)
- Hosting: Vercel (free tier)

## Project structure

```
app/
  page.tsx                  Homepage with search and categories
  layout.tsx                Root layout (header, footer, theme, optional AdSense script)
  tool/[slug]/page.tsx      Renders any tool from the registry (+ SEO metadata, JSON-LD)
  category/[categorySlug]/  Category pages
  about, contact, privacy-policy, disclaimer
  sitemap.ts, robots.ts
components/
  tools/                    One file per tool (client components)
  toolRegistry.tsx          Base tools and merge of the batch registries
  toolRegistryB1.tsx        Registry for batch 1 tools
  toolRegistryB2.tsx        Registry for batch 2 tools
  toolRegistryB3.tsx        Registry for batch 3 tools
  ToolLayout.tsx            Shared page layout (title, how-to, FAQ, related tools)
  ToolCard, Header, Footer, SearchBar, JsonLd, AdSlot, ThemeProvider
data/tools.ts               The full list of 50 tools (name, slug, category, icon)
lib/
  live.ts                   Slugs that are actually built (sitemap and related tools use this)
  seo.ts                    Site URL and name
  dateCalc.ts, sciEval.ts, imageUtil.ts, colorUtil.ts, lorem.ts,
  keywords.ts, metaTags.ts, rand.ts, tz.ts   Shared, tested logic
  lang.tsx                  Language provider (BN default, EN) saved in localStorage
  i18nData.ts               UI strings, category names, English card descriptions
  toolContentEn.ts          English title/description/how-to/FAQ for every live tool
  site.ts                   CONTACT_EMAIL (edit this one line)
```

## Languages (Bangla default, English toggle)

The header has a BN | EN toggle. The choice is saved in the browser. The page frame (header, footer, homepage, categories, tool title, description, how-to and FAQ) is translated. The text inside each tool is being translated tool by tool with `const tr = useTr();` and `tr("বাংলা", "English")` (see `lib/lang.tsx`). Done so far: the Education & Calculation tools.

## Add a new tool

1. Create `components/tools/MyTool.tsx` (`"use client"`, default export). Do not render a page title or outer card, because `ToolLayout` already does that.
2. Add an entry to a registry file (`component`, `title`, `desc`, `howTo`, `faqs`). The slug must match `data/tools.ts`.
3. Add the slug to `lib/live.ts`.
4. Write every label and message with `tr("বাংলা", "English")` so the tool works in both languages.
5. Add the English version to `lib/toolContentEn.ts` (the English card text is already in `lib/i18nData.ts`).

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

## Notes

- All calculations happen in the browser. Images and text never leave the device.
- Rates and rules (bKash charges, govt job age limits, loan fees) change over time. Always check the official source. Each tool says so on its page.
- Google Search Console verification file is kept in `public/`. Do not delete it.
