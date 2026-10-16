# BD Tools Hub

Next.js 14 + Tailwind + TypeScript. Client-side free tools site.

## Deploy (Vercel, from phone)
1. Unzip, upload the folder contents to a new GitHub repo (GitHub mobile site -> Add file -> Upload files).
2. vercel.com -> Add New Project -> Import repo -> Deploy (Next.js auto-detected).
3. After deploy, set env `NEXT_PUBLIC_SITE_URL` to your real URL, redeploy.

## Add a tool
1. `components/tools/MyTool.tsx` ("use client")
2. Add entry in `TOOL_REGISTRY` in `app/tool/[slug]/page.tsx`
3. Add slug in `lib/live.ts`

## After AdSense approval
Set `NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxx` and `NEXT_PUBLIC_ADS=1`.
