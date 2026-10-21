# FILE_MAP — my-portfolio

> সব line number বর্তমান commit (`2fba326`) অনুযায়ী verified।
> "খুলবেন কখন" = কোন সমস্যা দেখলে কোন file-এ যাবেন।

## Directory tree

```
my-portfolio/
├── app/
│   ├── layout.tsx                    # root HTML shell, fonts, metadata
│   ├── page.tsx                      # Home page — fetch → build → render
│   ├── globals.css                   # Tailwind layers + custom CSS classes
│   └── api/
│       ├── contact/route.ts          # POST /api/contact
│       └── github/
│           ├── profile/route.ts      # GET /api/github/profile
│           └── repos/route.ts        # GET /api/github/repos
│
├── components/
│   ├── Hero.tsx                      # typewriter, stat counters, 3D tilt card
│   ├── CodeShowcase.tsx              # code editor panel, 3 tabs
│   ├── Projects.tsx                  # project grid + category filter + modal
│   ├── Terminal.tsx                  # interactive CLI emulator
│   ├── Contact.tsx                   # contact form + social links + toasts
│   ├── Skills.tsx                    # skill cards + category filter
│   ├── Experience.tsx                # career timeline
│   ├── About.tsx                     # 3 philosophy cards
│   ├── Navbar.tsx                    # nav + scroll progress + mobile drawer
│   ├── Footer.tsx                    # footer
│   ├── IconMap.tsx                   # icon key → react-icons component
│   ├── MatrixRain.tsx                # "digital rain" canvas easter egg
│   ├── ParticleBackground.tsx        # ambient particle canvas
│   └── ui/
│       └── dialog.tsx                # Radix Dialog wrapper
│
├── lib/
│   ├── github.ts                     # GitHub REST client + repo → card mapping
│   ├── profile.ts                    # pure profile derivation
│   ├── contact.ts                    # contact payload validation
│   ├── html.ts                       # escapeHtml()
│   ├── portrait.ts                   # local portrait lookup (server-only)
│   ├── types.ts                      # shared types
│   ├── data.ts                       # curated static content
│   ├── utils.ts                      # cn() — Tailwind class merge
│   └── __tests__/                    # Vitest suites
│       ├── html.test.ts
│       ├── github.test.ts
│       ├── profile.test.ts
│       └── contact.test.ts
│
├── docs/                             # এই documentation
├── portfolio1 → Portfolio1/          # gitlink: আলাদা nested repo, tsconfig-এ exclude
└── package.json · tsconfig.json · tailwind.config.ts · next.config.mjs
    postcss.config.mjs · vitest.config.mts · README.md
```

> **দ্রষ্টব্য:** `Portfolio1/` একটি **gitlink (mode 160000)** — আলাদা nested git repo। `tsconfig.json:26`-এ exclude করা। এটি ignore করুন, ভেতরে ঢুকবেন না।

---

## `app/` — routing ও server

### `app/layout.tsx`
- **কী করে:** পুরো সাইটের HTML skeleton বানায়। `<html>`, `<body>`, font, metadata।
- **Export:** `metadata` (L17), `RootLayout` (L23)
- **Import করে:** `./globals.css`, `next/font/google` (L2-3)
- **কে ব্যবহার করে:** Next.js runtime — স্বয়ংক্রিয়ভাবে, কোনো file থেকে call হয় না
- **Error handling:** দরকার নেই (static)
- **Test:** নেই
- **খুলবেন কখন:** font বা `<title>`/`description` বদলাতে হলে

### `app/page.tsx`
- **কী করে:** Homepage — GitHub থেকে data নেয়, transform করে, ১১টি section সাজায়।
- **Export:** `Home` (L21, `async` Server Component)
- **Import করে:** `lib/profile` (L6), `lib/portrait` (L7), `lib/data` (L8), ১১টি component (L9-19)
- **কে ব্যবহার করে:** Next.js routing — `/` URL-এ serve হয়
- **Key lines:** `Promise.all` (L22-25), `buildHeroProfile` (L27), `splitBrandName` (L28), `resolvePortraitSrc` (L29)
- **Error handling:** ইমরাাইডে নয় — `buildHeroProfile(null, …)` null-safe, তাই GitHub fail করলেও page render হয়
- **Test:** নেই
- **খুলবেন কখন:** নতুন section যোগ/বাদ দিতে, বা data কোথা থেকে আসছে দেখতে

### `app/globals.css`
- **কী করে:** Tailwind-এর তিনটি layer (`@tailwind base/components/utilities`) + ১১টি custom class।
- **Custom class:** `.glass-panel`, `.glass-card`, `.text-gradient`, `.glow-btn`, `.perspective-1200`, `.translate-z-50`, `.translate-z-70`, `.spotlight-overlay`, `.cursor-blink`, `.matrix-canvas`, scrollbar style
- **Import করে:** কিছু না
- **কে ব্যবহার করে:** `app/layout.tsx:3`
- **Test:** নেই
- **খুলবেন কখন:** নতুন reusable visual style বানাতে, বা কোনো custom class কেন লাগছে বুঝতে

### `app/api/contact/route.ts`
- **কী করে:** Contact form-এর POST endpoint। Validate করে, server log-এ লেখে, response দেয়।
- **Export:** `POST` (L16), `dynamic = "force-dynamic"` (L4)
- **Import করে:** `lib/contact` → `validateContactPayload` (L2)
- **কে ব্যবহার করে:** `components/Contact.tsx:59` (fetch)
- **Response:** `200 {ok:true, delivered:false}` (L43) · `400 {error:"Invalid JSON body."}` (L22) · `422 {error:"…"}` (L26-28)
- **Error handling:** ✅ তিন স্তর — JSON parse, type/length validation, email format
- **Test:** `lib/__tests__/contact.test.ts`
- **খুলবেন কখন:** form submit-এ error দেখলে, বা email delivery যোগ করতে চাইলে

### `app/api/github/profile/route.ts`
- **কী করে:** Profile data JSON হিসেবে দেয়।
- **Export:** `GET` (L7), `dynamic` (L5)
- **Import করে:** `lib/github` (L2), `lib/profile` → `yearsSince` (L3)
- **কে ব্যবহার করে:** এই repository-এ কেউ না — বাইরের client (যেমন mobile app) ব্যবহার করতে পারে
- **Error handling:** ✅ GitHub unavailable হলে `503` (L10-14)
- **Test:** নেই
- **খুলবেন কখন:** profile-এর raw JSON দেখতে

### `app/api/github/repos/route.ts`
- **কী করে:** Repositories JSON হিসেবে দেয়।
- **Export:** `GET` (L6), `dynamic` (L4)
- **Import করে:** `lib/github` → `getGitHubRepos`, `reposToProjectCards` (L2)
- **কে ব্যবহার করে:** এই repository-এ কেউ না — external client
- **Error handling:** ⚠️ GitHub fail হলে `{projects: []}` (২০০ status-এ) — কোনো error signal নেই
- **Test:** নেই
- **খুলবেন কখন:** project data-এর source দেখতে

---

## `components/` — UI

প্রায় সব component-এর প্রথম লাইন `"use client";` — মানে এগুলো browser-এ চলে এবং state রাখতে পারে।

### `components/Hero.tsx`
- **কী করে:** Hero section — typing effect, count-up stats, mouse-এর উপর নড়া 3D profile card।
- **Export:** `Hero` (L249)
- **Internal:** `Typewriter` (L17), `Stat` (L59), `ProfileCard` (L111), `stats` array (L256)
- **Props:** `profile: HeroProfile`, `portraitSrc: string | null`
- **Import করে:** `lib/data` → `TYPEWRITER_ROLES` (L13), `lib/types` → `HeroProfile` (L14)
- **কে ব্যবহার করে:** `app/page.tsx:11`
- **Error handling:** দরকার নেই
- **Test:** নেই
- **খুলবেন কখন:** hero text বা stats বদলাতে, 3D tilt effect adjust করতে

### `components/CodeShowcase.tsx`
- **কী করে:** "DeveloperProfile.ts" দেখানো code-editor চেহারার panel, ৩টি tab সহ।
- **Export:** `CodeShowcase` (L16)
- **Internal:** `TABS` (L10), HTML তৈরি (L22-25)
- **Props:** `profile: HeroProfile`
- **Import করে:** `lib/data` → `HERO_TAB_DATA`, `HeroTabId` (L6) · `lib/html` → `escapeHtml` (L7) · `lib/types` (L8)
- **কে ব্যবহার করে:** `app/page.tsx:12`
- **Error handling:** ❌ `dangerouslySetInnerHTML` (L71) — তবে value-গুলো `escapeHtml` দিয়ে escape করা (L23-25)
- **Test:** নেই (escaping-এর logic `lib/__tests__/html.test.ts`-এ tested)
- **খুলবেন কখন:** panel-এর content বা tab বদলাতে

### `components/Projects.tsx`
- **কী করে:** Project card grid, category filter tab, "Details & Architecture" modal।
- **Export:** `Projects` (L22)
- **Internal:** `FILTERS` (L13), `availableCategories` (L24), `filtered` (L35)
- **Props:** `projects: ProjectCard[]`
- **Import করে:** `components/IconMap` (L6) · `components/ui/dialog` (L7) · `lib/types` (L8)
- **কে ব্যবহার করে:** `app/page.tsx:15`
- **State:** `category` (`"all" | ProjectCategory`), `openProject`
- **Error handling:** দরকার নেই
- **Test:** নেই
- **খুলবেন কখন:** filter tab বা card layout বদলাতে

### `components/Terminal.tsx`
- **কী করে:** Terminal-এর ভেতরে command লিখে ফল দেখানো। ৭টি command support করে।
- **Export:** `Terminal` (L11)
- **Internal:** `login` (L20), `name` (L21), `escapedLogin` (L25), `runCommand` (L44)
- **Props:** `profile: HeroProfile`, `projects: ProjectCard[]`, `skills: Skill[]`
- **Import করে:** `lib/data` → `Skill` (L4) · `lib/types` (L5) · `lib/html` → `escapeHtml` (L6) · `components/MatrixRain` (L7)
- **কে ব্যবহার করে:** `app/page.tsx:16`
- **Error handling:** ✅ প্রতিটি dynamic value `escapeHtml` দিয়ে escape করা (L67, 75, 82, 87, 98)
- **Test:** নেই
- **খুলবেন কখন:** নতুন terminal command যোগ করতে

### `components/Contact.tsx`
- **কী করে:** Contact form, social links, toast notification।
- **Export:** `Contact` (L23)
- **Internal:** `TOAST_LIFETIME_MS` (L20), `SENT_BADGE_LIFETIME_MS` (L21), `timers` ref (L31), `showToast` (L41), `onSubmit` (L52), `socials` (L95)
- **Props:** `profile: HeroProfile`
- **Import করে:** `lib/types` → `HeroProfile` (L16)
- **কে ব্যবহার করে:** `app/page.tsx:18`
- **Error handling:** ✅ `try/catch` (L58-82), server-এর `error` message toast-এ দেখায় (L72-79), timer unmount-এ clear (L33-38)
- **Test:** নেই
- **খুলবেন কখন:** form-এর copy বা validation বদলাতে

### `components/Skills.tsx`
- **কী করে:** Skill card grid + category filter।
- **Export:** `Skills` (L8)
- **Props:** `skills: Skill[]`
- **Import করে:** `components/IconMap` (L5) · `lib/data` → `SKILL_CATEGORIES`, `Skill` (L6)
- **কে ব্যবহার করে:** `app/page.tsx:14`
- **Test:** নেই
- **খুলবেন কখন:** skill যোগ/বাদ দিতে → `lib/data.ts`-এ `SKILLS` array বদলান

### `components/Experience.tsx`
- **কী করে:** Career timeline, প্রতিটি item-এর accent color অনুযায়ী timeline dot।
- **Export:** `Experience` (L31)
- **Internal:** `DOT` map (L7), `TimelineIcon` (L25)
- **Props:** `items: TimelineItem[]`
- **Import করে:** `lib/data` → `TimelineItem` (L5)
- **কে ব্যবহার করে:** `app/page.tsx:17`
- **Test:** নেই
- **খুলবেন কখন:** career entry বদলাতে → `lib/data.ts`-এ `TIMELINE`

### `components/About.tsx`
- **কী করে:** ৩টি philosophy card (Modern Frontend / Robust Backend / Cloud & DevOps)।
- **Export:** `About` (L30)
- **Internal:** `CARDS` array (L6) — content file-এর ভেতরেই, `lib/data.ts`-এ নয়
- **Props:** নেই
- **কে ব্যবহার করে:** `app/page.tsx:13`
- **Test:** নেই
- **খুলবেন কখন:** এই card-গুলোর text বা icon বদলাতে

### `components/Navbar.tsx`
- **কী করে:** Top nav link, scroll progress bar, mobile menu drawer।
- **Export:** `Navbar` (L15)
- **Internal:** `NAV_LINKS` (L6), scroll listener (L25-34), `closeMenu` (L36)
- **Props:** `brandMain: string`, `brandAccent: string`
- **কে ব্যবহার করে:** `app/page.tsx:10`
- **Test:** নেই
- **খুলবেন কখন:** nav link যোগ/বাদ দিতে, বা brand style বদলাতে

### `components/Footer.tsx`
- **কী করে:** Footer — নাম, GitHub link, "Back to Top"।
- **Export:** `Footer` (L3)
- **Props:** `name: string`, `profileUrl: string`
- **Import করে:** `next/link` (L3)
- **কে ব্যবহার করে:** `app/page.tsx:19`
- **Test:** নেই
- **খুলবেন কখন:** footer text বদলাতে

### `components/IconMap.tsx`
- **কী করে:** string key (যেমন `"brand:react"`) → react-icons component-এর মানচিত্র।
- **Export:** `Icon` (L48)
- **Internal:** `ICON_MAP` (L26) — ১৯টি key, fallback `FaLaptopCode` (L55)
- **Props:** `iconKey?: string`, `className?: string`
- **কে ব্যবহার করে:** `components/Skills.tsx:5`, `components/Projects.tsx:6`
- **Test:** নেই
- **খুলবেন কখন:** নতুন icon key যোগ করতে, বা key ভুল হয়ে default icon দেখাচ্ছে কিনা বুঝতে

### `components/MatrixRain.tsx`
- **কী করে:** "digital rain" easter-egg canvas animation।
- **Export:** `MatrixRain` (L6)
- **Props:** `active: boolean`
- **Import করে:** কিছু না
- **কে ব্যবহার করে:** `components/Terminal.tsx:7`
- **Error handling:** ✅ cleanup-এ `cancelAnimationFrame` (L46)
- **Test:** নেই
- **খুলবেন কখন:** matrix effect tune করতে

### `components/ParticleBackground.tsx`
- **কী করে:** পেছনের particle + connecting line canvas animation।
- **Export:** `ParticleBackground` (L7)
- **Import করে:** কিছু না
- **কে ব্যবহার করে:** `app/page.tsx:9`
- **Error handling:** ✅ cleanup-এ RAF cancel + event listener remove
- **Test:** নেই
- **খুলবেন কখন:** background effect বদলাতে

### `components/ui/dialog.tsx`
- **কী করে:** Radix UI Dialog-এর thin wrapper (shadcn/ui ধাঁচের)।
- **Export:** `Dialog`, `DialogClose`, `DialogContent` (L46)
- **Internal:** `Dialog` (L7), `DialogPortal` (L8), `DialogClose` (L9), `DialogOverride` (L11), `DialogContent` (L26)
- **Import করে:** `lib/utils` → `cn` (L5), `@radix-ui/react-dialog` (L4)
- **কে ব্যবহার করে:** `components/Projects.tsx:7`
- **Test:** নেই
- **খুলবেন কখন:** modal style বদলাতে
- **⚠️ নাম সতর্কতা:** `DialogOverride` (L11) আসলে Radix **Overlay** render করে — নামটি বিভ্রান্তিকর

---

## `lib/` — pure logic ও data

### `lib/github.ts`
- **কী করে:** GitHub REST API call করে এবং raw repo data → UI-ready `ProjectCard` রূপান্তর করে।
- **Export:** `GitHubProfile` (L20) · `GitHubRepo` (L36) · `getGitHubUser` (L78) · `getGitHubProfile` (L82) · `getGitHubRepos` (L86) · `getFeaturedProjects` (L123) · `mapCategory` (L137) · `mapIcon` (L166) · `reposToProjectCards` (L216)
- **Internal:** `GITHUB_USER` (L8) · `API` (L9) · `headers` (L11-14) · token header (L16-18) · `githubFetch` (L52) · `sortRepos` (L94) · `selectFeatured` (L112) · `titleize` (L130) · `mapFullDescription`
- **Import করে:** `lib/data` → `PROJECT_ACCENTS` (L5) · `lib/types` (L6)
- **কে ব্যবহার করে:** `app/page.tsx:1-5` · `app/api/github/profile/route.ts:2` · `app/api/github/repos/route.ts:2` · `lib/profile.ts:9` (type-only) · `lib/__tests__/github.test.ts`
- **Caching:** `next: { revalidate: 1800 }` (L56) → ৩০ মিনিট পর fresh হয়
- **Error handling:** ✅ non-OK status → `console.warn` + `null` (L59-64); network error → `console.warn` + `null` (L66-75)
- **Test:** `lib/__tests__/github.test.ts`
- **খুলবেন কখন:** project-গুলো কীভাবে আসে ও sort/category হয়, বা GitHub API fail হলে কী হয়

### `lib/profile.ts`
- **কী করে:** GitHub profile থেকে UI-র জন্য দরকারি তথ্য বের করে (role, brand name, fallback)।
- **Export:** `FALLBACK_PROFILE` (L16) · `splitBrandName` (L36) · `deriveRoleFromBio` (L60) · `yearsSince` (L79) · `buildHeroProfile` (L89)
- **Import করে:** `lib/github` → `GitHubProfile` (type-only, L9) · `lib/types` → `HeroProfile` (L10)
- **কে ব্যবহার করে:** `app/page.tsx:6` · `app/api/github/profile/route.ts:3` · `lib/__tests__/profile.test.ts`
- **Error handling:** ✅ সব function null-safe; খালি bio হলে fallback role
- **Test:** `lib/__tests__/profile.test.ts`
- **খুলবেন কখন:** hero-র name/role/stats কীভাবে বের হয়

### `lib/contact.ts`
- **কী করে:** Contact form-এর untrusted payload validate করে।
- **Export:** `ContactMessage` (L7) · `ContactValidation` (L14) · `validateContactPayload` (L35)
- **Internal:** `MAX_LENGTHS` (L20) · `EMAIL_PATTERN` (L27)
- **Import করে:** কিছু না — সম্পূর্ণ standalone
- **কে ব্যবহার করে:** `app/api/contact/route.ts:2` · `lib/__tests__/contact.test.ts`
- **Validation ধাপ:** object check (L36-38) → string check (L41-45) → trim (L47-52) → required (L54-61) → length cap (L63-70) → email (L71-74)
- **Test:** `lib/__tests__/contact.test.ts`
- **খুলবেন কখন:** form-এর validation rule বদলাতে

### `lib/html.ts`
- **কী করে:** HTML-এ নেয়ামিলে ঢোকানোর আগে string escape করে।
- **Export:** `escapeHtml` (L24)
- **Internal:** `HTML_ESCAPES` map (L11)
- **Import করে:** কিছু না
- **কে ব্যবহার করে:** `components/Terminal.tsx:6` · `components/CodeShowcase.tsx:7` · `lib/__tests__/html.test.ts`
- **Test:** `lib/__tests__/html.test.ts`
- **খুলবেন কখন:** নতুন HTML-rendering জায়গায় value যোগ করলে

### `lib/portrait.ts`
- **কী করে:** `public/` folder-এ local portrait আছে কিনা দেখে।
- **Export:** `resolvePortraitSrc` (L24)
- **Internal:** `PORTRAIT_CANDIDATES` (L14)
- **Import করে:** `node:fs`, `node:path` — তাই **server-only**
- **কে ব্যবহার করে:** `app/page.tsx:7`
- **⚠️ বাস্তবতা:** `public/` folder নেই, তাই এখন **সবসময় `null`** ফেরত দেয়
- **Test:** নেই (fs-নির্ভর)
- **খুলবেন কখন:** local portrait feature ব্যবহার করতে চাইলে

### `lib/types.ts`
- **কী করে:** একাধিক জায়গায় ব্যবহৃত type রাখে — যাতে এক জায়গায় বদলালেই সব জায়গায় বদলায়।
- **Export:** `ProjectCategory` (L12) · `ProjectCard` (L19) · `HeroProfile` (L39)
- **Import করে:** কিছু না
- **কে ব্যবহার করে:** `lib/github.ts:6` · `lib/profile.ts:10` · `components/Hero.tsx:14` · `components/CodeShowcase.tsx:8` · `components/Contact.tsx:16` · `components/Projects.tsx:8` · `components/Terminal.tsx:5`
- **Test:** টাইপ-লেভেল
- **খুলবেন কখন:** নতুন shared type যোগ করতে

### `lib/data.ts`
- **কী করে:** Curated static content — skills, timeline, typewriter roles, code panel tabs।
- **Export:** `Skill` (L7) · `SKILLS` (L16) · `SKILL_CATEGORIES` (L29) · `TimelineItem` (L37) · `TIMELINE` (L49) · `TYPEWRITER_ROLES` (L100) · `HERO_TAB_DATA` (L108) · `HeroTabId` (L147) · `PROJECT_ACCENTS` (L149)
- **Import করে:** কিছু না
- **কে ব্যবহার করে:** `app/page.tsx:8` · `components/Hero.tsx:13` · `components/CodeShowcase.tsx:6` · `components/Skills.tsx:6` · `components/Experience.tsx:5` · `components/Terminal.tsx:4` · `lib/github.ts:5`
- **Test:** নেই
- **খুলবেন কখন:** skill/timeline/role বদলাতে — এই ফাইলটাই সেই জায়গা

### `lib/utils.ts`
- **কী করে:** Class name-গুলো merge করে (`clsx` + `tailwind-merge`)।
- **Export:** `cn` (L4)
- **Import করে:** `clsx`, `tailwind-merge`
- **কে ব্যবহার করে:** `components/ui/dialog.tsx:5` — **শুধু একটি জায়গায়**
- **Test:** নেই
- **খুলবেন কখন:** conditional Tailwind class দরকার হলে

---

## Tests

| File | কী verify করে | Test count |
|---|---|---|
| `lib/__tests__/html.test.ts` | `escapeHtml` — script tag, ampersand, quote neutralize করা | ৫ |
| `lib/__tests__/github.test.ts` | `mapCategory`, `mapIcon`, `yearsSince`, `reposToProjectCards` | ২০ |
| `lib/__tests__/profile.test.ts` | `splitBrandName`, `deriveRoleFromBio`, `buildHeroProfile` | ১৮ |
| `lib/__tests__/contact.test.ts` | `validateContactPayload` — missing field, ভুল type, ভুল email, length cap | ৮ |

**সর্বমোট ৫১টি।** চালাতে: `npm test`

**Test নেই যেসব জায়গায়** — component rendering, API route (route handler), `lib/portrait.ts`, `lib/utils.ts`, `lib/data.ts`।

---

## "এই ফাইলটা কেন আছে" — দ্রুত lookup

| আপনি যা খুঁজছেন | খুলুন |
|---|---|
| নাম / ছবি / stats কোথা থেকে আসে | `lib/profile.ts` |
| Projects কীভাবে আসে ও sort হয় | `lib/github.ts` |
| নতুন skill বা timeline entry | `lib/data.ts` |
| নতুন section | `app/page.tsx` |
| Section-এর UI | `components/`-এর সেই file |
| Form validation rule | `lib/contact.ts` |
| Form-এর API response | `app/api/contact/route.ts` |
| HTML-এ dynamic value বসানো | `lib/html.ts` (**escape করতে ভুলবেন না**) |
| Style / reusable class | `app/globals.css`, `tailwind.config.ts` |
| Font, title, description | `app/layout.tsx` |
| Test চালানো | `package.json` scripts |
