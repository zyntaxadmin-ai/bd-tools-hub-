export type ScanKind = "url" | "text";
// Only http(s) links are treated as links. Anything else (javascript:, data: ...) stays plain text.
export function classifyScan(raw: string): { kind: ScanKind; href?: string } {
  const t = raw.trim();
  if (/^https?:\/\//i.test(t) && !/\s/.test(t)) {
    try {
      const u = new URL(t);
      if (u.protocol === "http:" || u.protocol === "https:") return { kind: "url", href: u.href };
    } catch { /* not a valid URL */ }
  }
  return { kind: "text" };
}
