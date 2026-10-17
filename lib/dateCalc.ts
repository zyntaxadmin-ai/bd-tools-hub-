// Pure date helpers (UTC based, no timezone bugs). Dates are "YYYY-MM-DD" strings.
export type YMD = { y: number; m: number; d: number };

export function parseYMD(s: string): YMD | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  if (mo < 1 || mo > 12 || d < 1 || d > daysInMonth(y, mo - 1)) return null;
  return { y, m: mo, d };
}

export function daysInMonth(y: number, monthIdx: number): number {
  return new Date(Date.UTC(y, monthIdx + 1, 0)).getUTCDate();
}

export function utcMs(p: YMD): number {
  return Date.UTC(p.y, p.m - 1, p.d);
}

// a + n months, day clamped to end of month (returns UTC ms)
function addMonthsMs(a: YMD, n: number): number {
  const t = a.y * 12 + (a.m - 1) + n;
  const ny = Math.floor(t / 12);
  const nm = t - ny * 12;
  return Date.UTC(ny, nm, Math.min(a.d, daysInMonth(ny, nm)));
}

// Calendar difference between a (earlier) and b (later): years, months, days + total days
export function diffYMD(a: YMD, b: YMD): { y: number; m: number; d: number; totalDays: number } {
  const bMs = utcMs(b);
  let months = (b.y - a.y) * 12 + (b.m - a.m);
  if (addMonthsMs(a, months) > bMs) months--;
  const anchor = addMonthsMs(a, months);
  const d = Math.round((bMs - anchor) / 86400000);
  const totalDays = Math.round((bMs - utcMs(a)) / 86400000);
  return { y: Math.floor(months / 12), m: months % 12, d, totalDays };
}

// Add (sign=1) or subtract (sign=-1) years, months, days. Day is clamped to the end of month.
export function addToDate(base: YMD, years: number, months: number, days: number, sign: 1 | -1): Date {
  const t = base.y * 12 + (base.m - 1) + sign * (years * 12 + months);
  const ny = Math.floor(t / 12);
  const nm = t - ny * 12;
  const day = Math.min(base.d, daysInMonth(ny, nm));
  return new Date(Date.UTC(ny, nm, day) + sign * days * 86400000);
}

export function toYMD(dt: Date): YMD {
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

// The date a person turns `years` old (Feb 29 -> Feb 28 in non-leap years)
export function birthdayAt(dob: YMD, years: number): YMD {
  const y = dob.y + years;
  return { y, m: dob.m, d: Math.min(dob.d, daysInMonth(y, dob.m - 1)) };
}

export function fmtDate(dt: Date): string {
  return dt.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
