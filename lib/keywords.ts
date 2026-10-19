const EN_STOP = new Set("a an the and or but if of to in on at by for with from as is are was were be been it its this that these those i you he she we they them his her our your not no so than then there here do does did have has had will would can could should may might about into over also just".split(" "));
const BN_STOP = new Set(["এবং", "ও", "এই", "এটি", "এটা", "যে", "যা", "করে", "করা", "করতে", "থেকে", "জন্য", "একটি", "একটা", "হয়", "না", "সে", "তার", "আমি", "আমরা", "তুমি", "আপনি", "কি", "কী", "এর", "তা", "তাই", "তবে", "কিন্তু", "বা", "আর", "হবে", "হয়েছে", "থাকে", "দিয়ে", "মধ্যে", "পর", "পরে", "সব", "খুব", "যদি", "তো"]);

export const isStop = (w: string) => EN_STOP.has(w) || BN_STOP.has(w);
const len = (w: string) => Array.from(w).length;

export function tokenize(text: string): string[] {
  return text.normalize("NFC").toLowerCase().match(/[\p{L}\p{M}\p{N}]+/gu) || [];
}

export type Row = { phrase: string; count: number; pct: number };

export function analyze(text: string, n: 1 | 2 | 3, skipShort: boolean, skipStop: boolean): { total: number; unique: number; rows: Row[] } {
  const tokens = tokenize(text);
  const total = tokens.length;
  const counts = new Map<string, number>();
  for (let i = 0; i + n <= total; i++) {
    const g = tokens.slice(i, i + n);
    if (skipShort && g.some((w) => len(w) <= 2)) continue;
    if (skipStop) {
      if (n === 1 ? isStop(g[0]) : isStop(g[0]) || isStop(g[n - 1])) continue;
    }
    const key = g.join(" ");
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const rows: Row[] = Array.from(counts, ([phrase, count]) => ({ phrase, count, pct: total ? Math.round((count / total) * 10000) / 100 : 0 }));
  rows.sort((a, b) => b.count - a.count || a.phrase.localeCompare(b.phrase));
  return { total, unique: new Set(tokens).size, rows };
}
