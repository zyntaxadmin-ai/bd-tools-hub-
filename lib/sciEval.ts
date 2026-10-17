// Safe math expression evaluator (no eval / Function).
type Tok = { t: "num"; v: number } | { t: "op"; v: string } | { t: "id"; v: string };

function tokenize(input: string): Tok[] {
  const s = input.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      let str = s.slice(i, j);
      if ((str.match(/\./g) || []).length > 1 || str === ".") throw new Error("সংখ্যাটি ঠিক নেই");
      const exp = /^[eE][+-]?\d+/.exec(s.slice(j)); // বৈজ্ঞানিক সংখ্যা, যেমন 1e-7
      if (exp) { str += exp[0]; j += exp[0].length; }
      out.push({ t: "num", v: parseFloat(str) });
      i = j; continue;
    }
    if (c === "π") { out.push({ t: "id", v: "pi" }); i++; continue; }
    if (c === "√") { out.push({ t: "id", v: "sqrt" }); i++; continue; }
    if (/[a-z]/i.test(c)) {
      let j = i;
      while (j < s.length && /[a-z]/i.test(s[j])) j++;
      out.push({ t: "id", v: s.slice(i, j).toLowerCase() });
      i = j; continue;
    }
    if ("+-*/^!%()".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
    throw new Error("অচেনা চিহ্ন: " + c);
  }
  return out;
}

function fact(n: number): number {
  if (!Number.isInteger(n) || n < 0) throw new Error("Factorial শুধু ০ বা ধনাত্মক পূর্ণসংখ্যার জন্য");
  if (n > 170) throw new Error("সংখ্যাটি খুব বড়");
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export function evaluate(src: string, deg: boolean, ans: number): number {
  const toks = tokenize(src);
  let p = 0;
  const isOp = (v: string) => { const t = toks[p]; return !!t && t.t === "op" && t.v === v; };
  const toRad = (x: number) => (deg ? (x * Math.PI) / 180 : x);
  const fromRad = (x: number) => (deg ? (x * 180) / Math.PI : x);

  function fn(name: string, a: number): number {
    switch (name) {
      case "sin": return Math.sin(toRad(a));
      case "cos": return Math.cos(toRad(a));
      case "tan": {
        const x = toRad(a);
        if (Math.abs(Math.cos(x)) < 1e-12) throw new Error("tan এর মান নির্ণয় করা যায় না");
        return Math.tan(x);
      }
      case "asin": if (a < -1 || a > 1) throw new Error("মান -১ থেকে ১ এর মধ্যে হতে হবে"); return fromRad(Math.asin(a));
      case "acos": if (a < -1 || a > 1) throw new Error("মান -১ থেকে ১ এর মধ্যে হতে হবে"); return fromRad(Math.acos(a));
      case "atan": return fromRad(Math.atan(a));
      case "log": if (a <= 0) throw new Error("log এর মান ০ এর বেশি হতে হবে"); return Math.log10(a);
      case "ln": if (a <= 0) throw new Error("ln এর মান ০ এর বেশি হতে হবে"); return Math.log(a);
      case "sqrt": if (a < 0) throw new Error("ঋণাত্মক সংখ্যার বর্গমূল নেই"); return Math.sqrt(a);
      default: throw new Error("অচেনা ফাংশন: " + name);
    }
  }

  function primary(): number {
    const t = toks[p];
    if (!t) throw new Error("এক্সপ্রেশন অসম্পূর্ণ");
    if (t.t === "num") { p++; return t.v; }
    if (t.t === "op" && t.v === "(") {
      p++;
      const v = expr();
      if (!isOp(")")) throw new Error("বন্ধনী মেলেনি");
      p++;
      return v;
    }
    if (t.t === "id") {
      p++;
      if (t.v === "pi") return Math.PI;
      if (t.v === "e") return Math.E;
      if (t.v === "ans") return ans;
      if (!isOp("(")) throw new Error(t.v + " এর পরে ( দিন");
      p++;
      const a = expr();
      if (!isOp(")")) throw new Error("বন্ধনী মেলেনি");
      p++;
      return fn(t.v, a);
    }
    throw new Error("এক্সপ্রেশন ঠিক নেই");
  }
  function postfix(): number {
    let v = primary();
    for (;;) {
      if (isOp("!")) { p++; v = fact(v); }
      else if (isOp("%")) { p++; v = v / 100; }
      else break;
    }
    return v;
  }
  function power(): number {
    const b = postfix();
    if (isOp("^")) { p++; return Math.pow(b, unary()); }
    return b;
  }
  function unary(): number {
    if (isOp("-")) { p++; return -unary(); }
    if (isOp("+")) { p++; return unary(); }
    return power();
  }
  function startsFactor(): boolean {
    const t = toks[p];
    if (!t) return false;
    return t.t === "num" || t.t === "id" || (t.t === "op" && t.v === "(");
  }
  function term(): number {
    let v = unary();
    for (;;) {
      if (isOp("*") || isOp("/")) {
        const op = (toks[p++] as { v: string }).v;
        const r = unary();
        if (op === "/") { if (r === 0) throw new Error("০ দিয়ে ভাগ করা যায় না"); v = v / r; } else v = v * r;
      } else if (startsFactor()) {
        v = v * unary(); // implicit multiplication: 2π, 3(4+1)
      } else break;
    }
    return v;
  }
  function expr(): number {
    let v = term();
    while (isOp("+") || isOp("-")) {
      const op = (toks[p++] as { v: string }).v;
      const r = term();
      v = op === "+" ? v + r : v - r;
    }
    return v;
  }

  if (toks.length === 0) throw new Error("কিছু লিখুন");
  const result = expr();
  if (p < toks.length) throw new Error("এক্সপ্রেশন ঠিক নেই");
  if (!isFinite(result)) throw new Error("ফলাফল অবৈধ বা অসীম");
  return Math.abs(result) < 1e-12 ? 0 : result;
}

export const fmtResult = (n: number) => String(Number(n.toPrecision(12)));
