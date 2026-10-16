import Link from "next/link";
export default function NotFound() {
  return (
    <div className="max-w-[600px] mx-auto px-4 py-24 text-center">
      <h1 className="text-5xl font-bold text-indigo-600">404</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">পেজটি খুঁজে পাওয়া যায়নি।</p>
      <Link href="/" className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium">Home</Link>
    </div>
  );
}
