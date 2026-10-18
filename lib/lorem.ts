const WORDS = ("lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum").split(" ");
const START = "lorem ipsum dolor sit amet consectetur adipiscing elit".split(" ");

export type LoremKind = "paragraphs" | "sentences" | "words";

export function generateLorem(kind: LoremKind, count: number, startWithLorem: boolean, rand: () => number = Math.random): string {
  const pick = () => WORDS[Math.floor(rand() * WORDS.length)];
  const between = (a: number, b: number) => a + Math.floor(rand() * (b - a + 1));
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const sentence = (first: boolean): string => {
    const len = between(8, 14);
    const w: string[] = first && startWithLorem ? START.slice() : [];
    while (w.length < len) w.push(pick());
    if (len > 9 && !(first && startWithLorem)) w[between(3, len - 3)] += ",";
    return cap(w.join(" ")) + ".";
  };

  if (kind === "words") {
    const w: string[] = startWithLorem ? START.slice(0, Math.min(count, START.length)) : [];
    while (w.length < count) w.push(pick());
    return w.slice(0, count).join(" ");
  }
  if (kind === "sentences") {
    const s: string[] = [];
    for (let i = 0; i < count; i++) s.push(sentence(i === 0));
    return s.join(" ");
  }
  const paras: string[] = [];
  for (let p = 0; p < count; p++) {
    const n = between(4, 7);
    const s: string[] = [];
    for (let i = 0; i < n; i++) s.push(sentence(p === 0 && i === 0));
    paras.push(s.join(" "));
  }
  return paras.join("\n\n");
}
