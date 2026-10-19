// Uniform random integer in [0, max) using crypto (no modulo bias)
export function secureInt(max: number): number {
  if (max <= 1) return 0;
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
  return buf[0] % max;
}

export function randomNumbers(min: number, max: number, count: number, unique: boolean, rnd: (m: number) => number = secureInt): number[] {
  const range = max - min + 1;
  if (!unique) return Array.from({ length: count }, () => min + rnd(range));
  if (count > range) throw new Error("unique count exceeds range");
  if (range <= 1_000_000) {
    const arr = Array.from({ length: range }, (_, i) => min + i);
    for (let i = 0; i < count; i++) {
      const j = i + rnd(range - i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, count);
  }
  const set = new Set<number>();
  while (set.size < count) set.add(min + rnd(range));
  return Array.from(set);
}
