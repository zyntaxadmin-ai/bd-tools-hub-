// Split text into chunks (Chrome stops long utterances). Sentences end with । . ! ? or a new line.
export function chunkText(text: string, max = 180): string[] {
  const sentences = text.replace(/\r/g, "").split(/(?<=[।.!?\n])/u).map((s) => s.trim()).filter(Boolean);
  const out: string[] = [];
  let cur = "";
  const push = (s: string) => { if (s) out.push(s); };
  for (const s of sentences) {
    if (s.length > max) {
      push(cur); cur = "";
      let rest = s;
      while (rest.length > max) {
        let cut = rest.lastIndexOf(" ", max);
        if (cut < max * 0.4) cut = max;
        push(rest.slice(0, cut).trim());
        rest = rest.slice(cut).trim();
      }
      cur = rest;
    } else if ((cur + " " + s).trim().length <= max) {
      cur = (cur + " " + s).trim();
    } else {
      push(cur); cur = s;
    }
  }
  push(cur);
  return out;
}
export const hasBangla = (t: string) => /[\u0980-\u09FF]/.test(t);
