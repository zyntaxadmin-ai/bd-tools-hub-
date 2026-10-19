export type Wall = { y: number; mo: number; d: number; h: number; mi: number; s: number };

export function wallParts(ms: number, tz: string): Wall {
  const f = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
  const p = f.formatToParts(new Date(ms));
  const g = (t: string) => parseInt(p.find((x) => x.type === t)!.value, 10);
  return { y: g("year"), mo: g("month"), d: g("day"), h: g("hour") % 24, mi: g("minute"), s: g("second") };
}

// zone's UTC offset (minutes) at instant ms
export function offsetMinutes(ms: number, tz: string): number {
  const w = wallParts(ms, tz);
  const asUtc = Date.UTC(w.y, w.mo - 1, w.d, w.h, w.mi, w.s);
  return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
}

// wall-clock time in a zone -> real instant (ms)
export function zonedToInstant(y: number, mo: number, d: number, h: number, mi: number, tz: string): number {
  const guess = Date.UTC(y, mo - 1, d, h, mi, 0);
  const o1 = offsetMinutes(guess, tz);
  let t = guess - o1 * 60000;
  const o2 = offsetMinutes(t, tz);
  if (o2 !== o1) t = guess - o2 * 60000;
  return t;
}

export function fmtOffset(min: number): string {
  const sign = min < 0 ? "-" : "+";
  const a = Math.abs(min);
  const hh = Math.floor(a / 60), mm = a % 60;
  return `UTC${sign}${hh}${mm ? ":" + String(mm).padStart(2, "0") : ""}`;
}

export function formatInZone(ms: number, tz: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(ms));
}

export function splitDuration(ms: number): { d: number; h: number; m: number; s: number } {
  const t = Math.floor(Math.abs(ms) / 1000);
  return { d: Math.floor(t / 86400), h: Math.floor((t % 86400) / 3600), m: Math.floor((t % 3600) / 60), s: t % 60 };
}
