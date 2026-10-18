import type { Entry } from "@/components/toolRegistry";
import ImageCompressor from "@/components/tools/ImageCompressor";
import ImageResizer from "@/components/tools/ImageResizer";
import ImageConverter from "@/components/tools/ImageConverter";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import CharacterCounter from "@/components/tools/CharacterCounter";
import ColorPicker from "@/components/tools/ColorPicker";
import LoremIpsumGenerator from "@/components/tools/LoremIpsumGenerator";

export const TOOL_REGISTRY_B2: Record<string, Entry> = {
  "image-compressor": {
    component: ImageCompressor,
    title: "Image Compressor (ছবির সাইজ কমান)",
    desc: "ছবির সাইজ KB/MB কমান, কোয়ালিটি নিজে ঠিক করুন। ছবি আপলোড হয় না, সব কাজ আপনার ফোনেই হয়।",
    howTo: ["ছবি সিলেক্ট করুন", "JPEG বা WebP বেছে কোয়ালিটি স্লাইডার ঠিক করুন", "আগে-পরের সাইজ দেখে ডাউনলোড করুন"],
    faqs: [
      { q: "আমার ছবি কি কোথাও আপলোড হয়?", a: "না। কম্প্রেশন সম্পূর্ণ আপনার ব্রাউজারেই হয়, ছবি কোনো সার্ভারে যায় না।" },
      { q: "PNG এর বদলে JPEG/WebP কেন?", a: "PNG লসলেস ফরম্যাট, তাই কোয়ালিটি কমিয়ে সাইজ কমানো যায় না। JPEG ও WebP এ কোয়ালিটি কমালে সাইজ কমে। PNG ছবি দিলে এখানে JPEG/WebP তে বদলে যাবে।" },
      { q: "সাইজ আরও কমাতে কী করব?", a: "কোয়ালিটি কমান অথবা সর্বোচ্চ প্রস্থ (px) কমিয়ে দিন। মাপ ছোট হলে ফাইলও ছোট হয়।" },
    ],
  },
  "image-resizer": {
    component: ImageResizer,
    title: "Image Resizer (ছবির মাপ বদলান)",
    desc: "ছবির প্রস্থ-উচ্চতা px এ বদলান। পাসপোর্ট সাইজসহ প্রিসেট আছে। ছবি আপলোড হয় না।",
    howTo: ["ছবি সিলেক্ট করুন", "প্রিসেট বাছুন অথবা প্রস্থ ও উচ্চতা লিখুন", "রিসাইজ চেপে ডাউনলোড করুন"],
    faqs: [
      { q: "পাসপোর্ট সাইজ ছবি কত পিক্সেল?", a: "৩.৫ × ৪.৫ সেমি ছবি ৩০০ DPI তে প্রায় ৪১৩ × ৫৩১ পিক্সেল হয়। তবে ফর্ম বা ওয়েবসাইটের নির্দেশনা আলাদা হলে সেটাই মানুন।" },
      { q: "অনুপাত ঠিক রাখা মানে কী?", a: "Lock চালু থাকলে একটি মাপ বদলালে অন্যটি নিজে ঠিক হয়, ফলে ছবি বিকৃত হয় না।" },
      { q: "আমার ছবি কি আপলোড হয়?", a: "না, সব কাজ আপনার ব্রাউজারেই হয়।" },
    ],
  },
  "image-converter": {
    component: ImageConverter,
    title: "Image Converter (JPG, PNG, WebP রূপান্তর)",
    desc: "ছবি JPG, PNG ও WebP এর মধ্যে বদলান। ছবি আপলোড হয় না, সব কাজ ব্রাউজারেই হয়।",
    howTo: ["ছবি সিলেক্ট করুন", "কোন ফরম্যাটে বদলাবেন তা বাছুন", "ডাউনলোড করুন"],
    faqs: [
      { q: "PNG থেকে JPG করলে স্বচ্ছ অংশের কী হয়?", a: "JPG স্বচ্ছতা সাপোর্ট করে না, তাই স্বচ্ছ অংশ সাদা হয়ে যায়।" },
      { q: "WebP কী?", a: "WebP গুগলের তৈরি ছবির ফরম্যাট, যা সাধারণত JPG/PNG এর চেয়ে ছোট সাইজে একই মানের ছবি দেয়।" },
    ],
  },
  "qr-code-generator": {
    component: QrCodeGenerator,
    title: "QR Code Generator (কিউআর কোড বানান)",
    desc: "লিংক বা লেখা থেকে ফ্রি QR কোড বানান, রং ও সাইজ ঠিক করে PNG ডাউনলোড করুন।",
    howTo: ["লিংক বা লেখা লিখুন", "সাইজ ও রং ঠিক করুন", "PNG ডাউনলোড করুন"],
    faqs: [
      { q: "এই QR কোডের কি মেয়াদ আছে?", a: "না। লেখা বা লিংক সরাসরি QR এর ভেতরেই থাকে, তাই এটি স্থায়ী। তবে লিংকের ওয়েবসাইট বন্ধ হলে সেই লিংক কাজ করবে না।" },
      { q: "ভুল সংশোধনের মাত্রা (L, M, Q, H) কী?", a: "QR এর কিছু অংশ নষ্ট হলেও পড়া যাবে কিনা তা ঠিক করে। L প্রায় ৭%, M ১৫%, Q ২৫%, H ৩০% পর্যন্ত। মাত্রা বাড়ালে QR ঘন হয়।" },
      { q: "লেখা কি কোথাও পাঠানো হয়?", a: "না, QR আপনার ব্রাউজারেই তৈরি হয়।" },
    ],
  },
  "character-counter": {
    component: CharacterCounter,
    title: "Character Counter (অক্ষর গণনা)",
    desc: "স্পেসসহ ও স্পেস ছাড়া অক্ষর গুনুন। SMS, X, SEO Title ও Description এর লিমিট চেক করুন।",
    howTo: ["বক্সে লেখা টাইপ বা পেস্ট করুন", "গণনা সাথে সাথে দেখুন", "লিমিট (যেমন SMS) বেছে বাকি অক্ষর দেখুন"],
    faqs: [
      { q: "SMS এ কত অক্ষর যায়?", a: "ইংরেজি (GSM) SMS এ এক অংশে ১৬০ অক্ষর, আর বাংলা বা ইউনিকোড SMS এ এক অংশে ৭০ অক্ষর। এর বেশি হলে একাধিক SMS হিসেবে গণ্য হয়।" },
      { q: "SEO Title কত অক্ষরের হওয়া উচিত?", a: "প্রায় ৫০-৬০ অক্ষর। Google মূলত পিক্সেল দেখে ছাঁটে, তাই এটি আনুমানিক সীমা।" },
    ],
  },
  "color-picker": {
    component: ColorPicker,
    title: "Color Picker (রঙের কোড)",
    desc: "রং বেছে নিন বা HEX লিখুন, HEX, RGB ও HSL কোড দেখুন এবং এক ক্লিকে কপি করুন।",
    howTo: ["রং বাছুন অথবা HEX কোড লিখুন", "HEX, RGB ও HSL কোড দেখুন", "কপি বাটনে ট্যাপ করুন"],
    faqs: [
      { q: "HEX, RGB ও HSL এর পার্থক্য কী?", a: "একই রংকে তিনভাবে লেখা হয়। HEX ও RGB লাল-সবুজ-নীলের মিশ্রণ, আর HSL এ রঙের ধরন (hue), ঘনত্ব (saturation) ও উজ্জ্বলতা (lightness) থাকে।" },
      { q: "৩ অক্ষরের HEX কোড চলে?", a: "হ্যাঁ, যেমন #FFF মানে #FFFFFF।" },
    ],
  },
  "lorem-ipsum-generator": {
    component: LoremIpsumGenerator,
    title: "Lorem Ipsum Generator (ডামি টেক্সট)",
    desc: "ডিজাইন বা ওয়েবসাইটের জন্য প্যারাগ্রাফ, বাক্য বা শব্দ হিসেবে Lorem Ipsum ডামি টেক্সট বানান।",
    howTo: ["প্যারাগ্রাফ, বাক্য বা শব্দ বেছে নিন", "কতগুলো লাগবে লিখুন", "Copy করে ব্যবহার করুন"],
    faqs: [
      { q: "Lorem Ipsum কী?", a: "এটি ডামি লেখা, যা ডিজাইনে আসল লেখা বসার আগে জায়গা কেমন দেখাবে তা বোঝাতে ব্যবহার হয়।" },
      { q: "এর কি কোনো অর্থ আছে?", a: "না, এটি অর্থহীন ল্যাটিন-ধাঁচের শব্দ, শুধু লেখার আকার বোঝানোর জন্য।" },
    ],
  },
};
