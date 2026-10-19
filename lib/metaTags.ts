export type MetaFields = {
  title: string; description: string; keywords: string; author: string;
  canonical: string; ogImage: string; siteName: string;
  robotsIndex: boolean; robotsFollow: boolean;
};

export const escAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const isHttpUrl = (s: string) => /^https?:\/\/[^\s]+\.[^\s]+$/i.test(s.trim());

export function buildMetaTags(f: MetaFields): string {
  const t = f.title.trim(), d = f.description.trim(), k = f.keywords.trim(), a = f.author.trim();
  const c = f.canonical.trim(), img = f.ogImage.trim(), site = f.siteName.trim();
  const L: string[] = ['<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1">'];
  if (t) L.push(`<title>${escAttr(t)}</title>`);
  if (d) L.push(`<meta name="description" content="${escAttr(d)}">`);
  if (k) L.push(`<meta name="keywords" content="${escAttr(k)}">`);
  if (a) L.push(`<meta name="author" content="${escAttr(a)}">`);
  L.push(`<meta name="robots" content="${f.robotsIndex ? "index" : "noindex"}, ${f.robotsFollow ? "follow" : "nofollow"}">`);
  if (c) L.push(`<link rel="canonical" href="${escAttr(c)}">`);
  L.push('<meta property="og:type" content="website">');
  if (t) L.push(`<meta property="og:title" content="${escAttr(t)}">`);
  if (d) L.push(`<meta property="og:description" content="${escAttr(d)}">`);
  if (c) L.push(`<meta property="og:url" content="${escAttr(c)}">`);
  if (img) L.push(`<meta property="og:image" content="${escAttr(img)}">`);
  if (site) L.push(`<meta property="og:site_name" content="${escAttr(site)}">`);
  L.push(`<meta name="twitter:card" content="${img ? "summary_large_image" : "summary"}">`);
  if (t) L.push(`<meta name="twitter:title" content="${escAttr(t)}">`);
  if (d) L.push(`<meta name="twitter:description" content="${escAttr(d)}">`);
  if (img) L.push(`<meta name="twitter:image" content="${escAttr(img)}">`);
  return L.join("\n");
}
