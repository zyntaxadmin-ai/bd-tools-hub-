
import { siteConfig } from "@/lib/seo";

export default function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: "BD Tools Hub",
        alternateName: "BDToolsHub",
        url: `${siteConfig.url}/`,
        inLanguage: "bn",
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: "BD Tools Hub",
        url: `${siteConfig.url}/`,
        description:
          "বাংলাদেশের মানুষের জন্য বিনামূল্যের অনলাইন ক্যালকুলেটর ও ইউটিলিটি টুলস প্ল্যাটফর্ম।",
        email: "bdtoolhudadmin@gmail.com",
        founder: {
          "@type": "Person",
          name: "Md Rohan Islam",
          jobTitle: "Founder & Developer",
          url: `${siteConfig.url}/about`,
          sameAs: [
            "https://github.com/zyntaxadmin-ai",
            "https://www.instagram.com/rohan3prime/",
            "https://www.facebook.com/rohan3prime",
            "https://www.tiktok.com/@rohan3prime",
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
        }
        
