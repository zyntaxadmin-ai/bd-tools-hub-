// Renders nothing until NEXT_PUBLIC_ADS=1 (after AdSense approval).
export default function AdSlot({ label }: { label: string }) {
  if (process.env.NEXT_PUBLIC_ADS !== "1") return null;
  return (
    <div className="w-full py-6 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 text-center">
      <span className="text-xs font-medium tracking-widest text-slate-400 uppercase">{label}</span>
    </div>
  );
}
