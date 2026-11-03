import HomeContent from "@/components/HomeContent";
import { GUIDES } from "@/lib/guides";

// Server component: only slug and title go to the browser, not the full guide text.
export default function HomePage() {
  const guides = GUIDES.map((g) => ({ slug: g.slug, title: g.title }));
  return <HomeContent guides={guides} />;
}
