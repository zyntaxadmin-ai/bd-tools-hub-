import { LIVE_SLUGS } from "@/lib/live";

export type Category = "Education & Calculation" | "Image & PDF" | "Text & SEO" | "Bangladesh Special" | "Daily Utility";

export interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: Category;
  icon: string;
}

export const categories: { name: Category; slug: string; desc: string }[] = [
  { name: "Bangladesh Special", slug: "bangladesh-special", desc: "বাংলাদেশের জন্য বিশেষ টুলস" },
  { name: "Education & Calculation", slug: "education-calculation", desc: "For Students & Daily Math" },
  { name: "Image & PDF", slug: "image-pdf", desc: "Compress, Convert & Merge" },
  { name: "Text & SEO", slug: "text-seo", desc: "For Bloggers & Writers" },
  { name: "Daily Utility", slug: "daily-utility", desc: "Everyday Life Tools" },
];

const allTools: Tool[] = [
  { id: 31, name: "bKash Calculator", slug: "/tool/bkash-calculator", description: "Cash out charge হিসাব করুন", category: "Bangladesh Special", icon: "Wallet" },
  { id: 32, name: "Nagad Calculator", slug: "/tool/nagad-calculator", description: "Nagad charge calculator", category: "Bangladesh Special", icon: "Smartphone" },
  { id: 34, name: "Land Calculator", slug: "/tool/land-calculator-bd", description: "শতাংশ, কাঠা, বিঘা হিসাব", category: "Bangladesh Special", icon: "MapPinned" },
  { id: 35, name: "BDT Currency Converter", slug: "/tool/bdt-currency-converter", description: "BDT to USD, SAR, INR", category: "Bangladesh Special", icon: "Banknote" },
  { id: 36, name: "Electricity Bill Calculator", slug: "/tool/electricity-bill-calculator-bd", description: "DPDC, DESCO, REB bill check", category: "Bangladesh Special", icon: "Zap" },
  { id: 37, name: "Govt Job Age Calculator", slug: "/tool/govt-job-age-calculator", description: "চাকরির বয়স আছে কিনা দেখুন", category: "Bangladesh Special", icon: "Briefcase" },
  { id: 33, name: "Rocket Calculator", slug: "/tool/rocket-calculator", description: "Rocket charge হিসাব", category: "Bangladesh Special", icon: "Send" },
  { id: 38, name: "Passport Fee Calculator", slug: "/tool/passport-fee-calculator-bd", description: "E-Passport fee check", category: "Bangladesh Special", icon: "Plane" },
  { id: 40, name: "Upay Calculator", slug: "/tool/upay-calculator", description: "Upay charge calculator", category: "Bangladesh Special", icon: "CreditCard" },

  { id: 1, name: "Age Calculator", slug: "/tool/age-calculator", description: "জন্ম তারিখ দিয়ে বয়স বের করুন", category: "Education & Calculation", icon: "Cake" },
  { id: 2, name: "GPA Calculator", slug: "/tool/gpa-calculator-bd", description: "SSC/HSC GPA নির্ণয়", category: "Education & Calculation", icon: "GraduationCap" },
  { id: 3, name: "CGPA Calculator", slug: "/tool/cgpa-calculator", description: "University CGPA calculator", category: "Education & Calculation", icon: "Award" },
  { id: 6, name: "BMI Calculator", slug: "/tool/bmi-calculator", description: "BMI ও স্বাস্থ্য চেক", category: "Education & Calculation", icon: "HeartPulse" },
  { id: 7, name: "EMI Calculator", slug: "/tool/emi-calculator-bd", description: "Loan EMI হিসাব করুন", category: "Education & Calculation", icon: "Calculator" },
  { id: 4, name: "Percentage Calculator", slug: "/tool/percentage-calculator", description: "শতকরা হিসাব ১ ক্লিকে", category: "Education & Calculation", icon: "Percent" },
  { id: 5, name: "Scientific Calculator", slug: "/tool/scientific-calculator", description: "Advanced scientific calc", category: "Education & Calculation", icon: "Sigma" },
  { id: 8, name: "Unit Converter", slug: "/tool/unit-converter", description: "Length, Weight converter", category: "Education & Calculation", icon: "Ruler" },
  { id: 9, name: "Bill Calculator", slug: "/tool/bill-calculator", description: "ভাগ করে বিল হিসাব", category: "Education & Calculation", icon: "Receipt" },
  { id: 10, name: "Date Difference", slug: "/tool/date-difference-calculator", description: "দুটি তারিখের পার্থক্য", category: "Education & Calculation", icon: "CalendarDays" },

  { id: 11, name: "Image Compressor", slug: "/tool/image-compressor", description: "ছবির সাইজ কমান", category: "Image & PDF", icon: "ImageDown" },
  { id: 12, name: "Image Resizer", slug: "/tool/image-resizer", description: "Passport size resize", category: "Image & PDF", icon: "Expand" },
  { id: 13, name: "Image Converter", slug: "/tool/image-converter", description: "JPG to PNG, WebP", category: "Image & PDF", icon: "RefreshCw" },
  { id: 16, name: "Image to PDF", slug: "/tool/image-to-pdf", description: "ছবি থেকে PDF বানান", category: "Image & PDF", icon: "FileImage" },
  { id: 18, name: "Merge PDF", slug: "/tool/merge-pdf", description: "একাধিক PDF জোড়া দিন", category: "Image & PDF", icon: "Combine" },
  { id: 19, name: "Split PDF", slug: "/tool/split-pdf", description: "PDF পেজ আলাদা করুন", category: "Image & PDF", icon: "Scissors" },
  { id: 20, name: "Compress PDF", slug: "/tool/compress-pdf", description: "PDF সাইজ ছোট করুন", category: "Image & PDF", icon: "FileDown" },
  { id: 15, name: "QR Code Generator", slug: "/tool/qr-code-generator", description: "QR কোড বানান ফ্রি", category: "Image & PDF", icon: "QrCode" },
  { id: 17, name: "PDF to JPG", slug: "/tool/pdf-to-jpg", description: "PDF to Image convert", category: "Image & PDF", icon: "FileUp" },

  { id: 21, name: "Word Counter", slug: "/tool/word-counter", description: "শব্দ ও অক্ষর গণনা", category: "Text & SEO", icon: "Type" },
  { id: 29, name: "Password Generator", slug: "/tool/password-generator", description: "Strong password তৈরি", category: "Text & SEO", icon: "KeyRound" },
  { id: 25, name: "Meta Tag Generator", slug: "/tool/meta-tag-generator", description: "SEO meta tags বানান", category: "Text & SEO", icon: "Tags" },
  { id: 22, name: "Character Counter", slug: "/tool/character-counter", description: "Character count check", category: "Text & SEO", icon: "Hash" },
  { id: 23, name: "Case Converter", slug: "/tool/case-converter", description: "UPPER to lower", category: "Text & SEO", icon: "CaseSensitive" },
  { id: 26, name: "Keyword Density", slug: "/tool/keyword-density-checker", description: "SEO density checker", category: "Text & SEO", icon: "Search" },
  { id: 30, name: "Color Picker", slug: "/tool/color-picker", description: "HEX, RGB color picker", category: "Text & SEO", icon: "Palette" },
  { id: 24, name: "Lorem Ipsum", slug: "/tool/lorem-ipsum-generator", description: "Dummy text generator", category: "Text & SEO", icon: "Text" },

  { id: 42, name: "Stopwatch & Timer", slug: "/tool/stopwatch-timer", description: "Online stopwatch", category: "Daily Utility", icon: "Timer" },
  { id: 43, name: "To-Do List", slug: "/tool/todo-list", description: "দৈনিক কাজের লিস্ট", category: "Daily Utility", icon: "ListTodo" },
  { id: 44, name: "Bangla Calendar", slug: "/tool/bangla-calendar", description: "আজকের বাংলা তারিখ", category: "Daily Utility", icon: "Calendar" },
  { id: 48, name: "Text to Speech", slug: "/tool/text-to-speech", description: "লেখা থেকে ভয়েস", category: "Daily Utility", icon: "Mic" },
  { id: 41, name: "QR Scanner", slug: "/tool/qr-scanner", description: "QR scan with camera", category: "Daily Utility", icon: "ScanLine" },
  { id: 45, name: "Time Zone Converter", slug: "/tool/time-zone-converter", description: "BD to USA, UK time", category: "Daily Utility", icon: "Globe" },
  { id: 46, name: "Random Number", slug: "/tool/random-number-generator", description: "Random number picker", category: "Daily Utility", icon: "Dices" },
  { id: 47, name: "Invoice Generator", slug: "/tool/invoice-generator", description: "Free invoice PDF", category: "Daily Utility", icon: "FileText" },
  { id: 49, name: "Countdown Timer", slug: "/tool/countdown-timer", description: "ঈদ, রোজার কাউন্টডাউন", category: "Daily Utility", icon: "Hourglass" },
  { id: 50, name: "Expense Tracker", slug: "/tool/expense-tracker", description: "দৈনিক খরচের হিসাব", category: "Daily Utility", icon: "WalletCards" },
];

// Only tools that are actually built are shown (homepage, categories, search, sitemap).
// Add a slug to lib/live.ts when a new tool is ready and it appears automatically.
export const tools: Tool[] = allTools.filter((t) => LIVE_SLUGS.includes(t.slug.replace("/tool/", "")));
