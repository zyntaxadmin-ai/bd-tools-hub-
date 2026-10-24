// Bangladesh (Bangla Academy revised) calendar.
// Rules: new year = 14 April. Boishakh-Ashwin 31 days; Kartik-Magh and Chaitra 30 days;
// Falgun 29 days (30 in a Gregorian leap year).
export const MONTHS_BN = ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];
export const MONTHS_EN = ["Boishakh", "Joishtho", "Asharh", "Srabon", "Bhadro", "Ashwin", "Kartik", "Agrahayan", "Poush", "Magh", "Falgun", "Chaitra"];
export const SEASONS: { bn: string; en: string }[] = [
  { bn: "গ্রীষ্ম", en: "Grishma (Summer)" }, { bn: "বর্ষা", en: "Barsha (Monsoon)" }, { bn: "শরৎ", en: "Sharat (Autumn)" },
  { bn: "হেমন্ত", en: "Hemanta (Late autumn)" }, { bn: "শীত", en: "Sheet (Winter)" }, { bn: "বসন্ত", en: "Basanta (Spring)" },
];
export const GREG_MONTHS_BN = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
export const GREG_MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const WEEKDAYS_BN = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
export const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const WEEKDAYS_BN_SHORT = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"];
export const WEEKDAYS_EN_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DAY = 86400000;
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export const toBnDigits = (n: number | string) => String(n).replace(/\d/g, (d) => BN_DIGITS[+d]);

export const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
export const daysInGregMonth = (y: number, m0: number) => new Date(Date.UTC(y, m0 + 1, 0)).getUTCDate();

// month lengths of the Bangla year that starts on 14 April of `startY` (Gregorian)
export function monthLengths(startY: number): number[] {
  return [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, isLeap(startY + 1) ? 30 : 29, 30];
}

export type BnDate = { year: number; month: number; day: number }; // month: 0-11
export type YMD = { y: number; m: number; d: number }; // m: 1-12

export function toBangla(y: number, m: number, d: number): BnDate {
  const startY = m > 4 || (m === 4 && d >= 14) ? y : y - 1;
  let off = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(startY, 3, 14)) / DAY);
  const lens = monthLengths(startY);
  let mi = 0;
  while (mi < 11 && off >= lens[mi]) { off -= lens[mi]; mi++; }
  return { year: startY - 593, month: mi, day: off + 1 };
}

export function fromBangla(year: number, month: number, day: number): YMD | null {
  const startY = year + 593;
  const lens = monthLengths(startY);
  if (month < 0 || month > 11 || day < 1 || day > lens[month]) return null;
  let off = day - 1;
  for (let i = 0; i < month; i++) off += lens[i];
  const dt = new Date(Date.UTC(startY, 3, 14) + off * DAY);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

export const weekdayOf = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d)).getUTCDay();
export const seasonOf = (month: number) => SEASONS[Math.floor(month / 2)];

export type Cell = { g: number; bn: BnDate } | null;
// Gregorian month as weeks (Sunday first) with the Bangla date for every day
export function monthGrid(y: number, m0: number): Cell[][] {
  const first = new Date(Date.UTC(y, m0, 1)).getUTCDay();
  const n = daysInGregMonth(y, m0);
  const cells: Cell[] = Array(first).fill(null);
  for (let d = 1; d <= n; d++) cells.push({ g: d, bn: toBangla(y, m0 + 1, d) });
  while (cells.length % 7) cells.push(null);
  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
