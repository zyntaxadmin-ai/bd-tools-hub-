import type { PlanItem } from "@/lib/tts";

export type UtteranceLike = {
  lang: string; rate: number; pitch: number;
  onstart: ((e: unknown) => void) | null; onend: ((e: unknown) => void) | null; onerror: ((e: { error?: string }) => void) | null;
};
export type SynthLike = { speak(u: never): void; cancel(): void; pause(): void; resume(): void; speaking: boolean; pending: boolean; paused: boolean };
export type Handlers = { onStart(): void; onEnd(): void; onError(code: string): void; onSlow(): void };

const safe = (f: () => void) => { try { f(); } catch { /* some browsers throw here */ } };

// Speaks the plan reliably:
//  * clears any old/paused speech and waits a moment before speaking (a cancel() followed straight by speak() is dropped by some browsers)
//  * reports real errors (missing voice, network, audio) instead of failing silently
//  * detects "nothing started" so the buttons never get stuck
export function speakPlan<U extends UtteranceLike>(
  synth: SynthLike, make: (item: PlanItem, index: number) => U, plan: PlanItem[], h: Handlers, opts: { delayMs?: number; checkMs?: number } = {}
): { stop(): void; utterances: U[] } {
  const delay = opts.delayMs ?? 80, check = opts.checkMs ?? 2500;
  let stopped = false, finished = false, started = false;
  const utterances: U[] = [];
  const timers: ReturnType<typeof setTimeout>[] = [];
  const clear = () => { timers.forEach(clearTimeout); timers.length = 0; };
  const fail = (code: string) => {
    if (stopped || finished) return;
    finished = true; clear();
    safe(() => synth.cancel());
    h.onError(code);
  };

  safe(() => synth.cancel());
  safe(() => synth.resume()); // a paused engine would swallow the new speech

  timers.push(setTimeout(() => {
    if (stopped) return;
    plan.forEach((item, i) => {
      const u = make(item, i);
      u.onstart = () => { if (!started) { started = true; h.onStart(); } };
      u.onend = () => { if (i === plan.length - 1 && !stopped && !finished) { finished = true; clear(); h.onEnd(); } };
      u.onerror = (e) => {
        const code = (e && e.error) || "unknown";
        if (code === "interrupted" || code === "canceled") return;
        fail(code);
      };
      utterances.push(u);
    });
    utterances.forEach((u) => synth.speak(u as never));
    timers.push(setTimeout(() => {
      if (stopped || finished || started) return;
      if (!synth.speaking && !synth.pending) fail("no-audio"); else h.onSlow();
    }, check));
  }, delay));

  return {
    utterances,
    stop() { stopped = true; finished = true; clear(); safe(() => synth.cancel()); safe(() => synth.resume()); },
  };
}
