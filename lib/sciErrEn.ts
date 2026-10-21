// English versions of the error messages thrown by lib/sciEval.ts
const EXACT: Record<string, string> = {
  "সংখ্যাটি ঠিক নেই": "Invalid number",
  "Factorial শুধু ০ বা ধনাত্মক পূর্ণসংখ্যার জন্য": "Factorial works only for 0 or positive whole numbers",
  "সংখ্যাটি খুব বড়": "The number is too large",
  "tan এর মান নির্ণয় করা যায় না": "tan is undefined here",
  "মান -১ থেকে ১ এর মধ্যে হতে হবে": "The value must be between -1 and 1",
  "log এর মান ০ এর বেশি হতে হবে": "log needs a value above 0",
  "ln এর মান ০ এর বেশি হতে হবে": "ln needs a value above 0",
  "ঋণাত্মক সংখ্যার বর্গমূল নেই": "A negative number has no real square root",
  "বন্ধনী মেলেনি": "Brackets do not match",
  "এক্সপ্রেশন অসম্পূর্ণ": "Incomplete expression",
  "এক্সপ্রেশন ঠিক নেই": "Invalid expression",
  "কিছু লিখুন": "Enter something",
  "ফলাফল অবৈধ বা অসীম": "The result is invalid or infinite",
  "০ দিয়ে ভাগ করা যায় না": "Cannot divide by 0",
};

export function errEn(msg: string): string {
  if (EXACT[msg]) return EXACT[msg];
  if (msg.startsWith("অচেনা চিহ্ন: ")) return "Unknown symbol: " + msg.slice("অচেনা চিহ্ন: ".length);
  if (msg.startsWith("অচেনা ফাংশন: ")) return "Unknown function: " + msg.slice("অচেনা ফাংশন: ".length);
  const m = /^(.*) এর পরে \( দিন$/.exec(msg);
  if (m) return `Add ( after ${m[1]}`;
  return msg;
}
export const SCI_ERR_EXACT_KEYS = Object.keys(EXACT);
