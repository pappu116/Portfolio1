# CODE_GLOSSARY — my-portfolio

> শুধু এই repository-তে **সত্যিই থাকা** term ও symbol ব্যাখ্যা করা হয়েছে।
> প্রতিটি উদাহরণ বর্তমান commit (`2fba326`) থেকে verified, লাইন নম্বর দেওয়া আছে।

---

## A. Next.js / React framework term

### `page.tsx`
**বাংলায়:** App Router-এর একটি রুট — এই ফাইলটি একটা URL-এর জন্য page তৈরি করে।

**এই repo-তে:** `app/page.tsx:21` — `export default async function Home()`. এটা **Server Component**, তাই `async` হতে পারে এবং সরাসরি `await` লিখতে পারে।

**কখন কাজে:** কোনো ইন্টারঅ্যাকশন না থাকা, data fetch করতে হবে এমন section-এর জন্য।

### `layout.tsx`
**বাংলায়:** পুরো সাইটের HTML কাঠামো (shell) — প্রতিটি page-এর বাইরে থাকে।

**এই repo-তে:** `app/layout.tsx:23` — `RootLayout`। এখানেই `<html>`, `<body>`, font (`Inter`, `JetBrains_Mono` — L5, L11) এবং `metadata` (L17) আছে।

**কখন কাজে:** সব page-এর জন্য common চেহারা বদলাতে।

### `route.ts` (API route handler)
**বাংলায়:** `app/api/`-এর ফাইল — একটা URL-এ HTTP response দেয়।

**এই repo-তে:** তিনটি আছে:
- `app/api/contact/route.ts:16` — `export async function POST(request: Request)`
- `app/api/github/profile/route.ts:7` — `export async function GET()`
- `app/api/github/repos/route.ts:6` — `export async function GET()`

**গুরুত্বপূর্ণ:** method-এর নামই route — `GET` handler থাকলে `/api/...` GET-এ কাজ করবে, `POST` handler থাকলে POST-এ।

### `export const dynamic = "force-dynamic"`
**বাংলায়:** ঘোষণা করে যে এই route সবসময় server-এ fresh হিসেবে compute হবে, cache হবে না।

**এই repo-তে:** তিনটি API route-এই আছে (`route.ts:4`, `route.ts:5`, `route.ts:4`)।

**কখন কাজে:** user-এর পাঠানো data (যেমন contact message) cache করা ভুল হতো — তখন এটা দরকার।

### `"use client"`
**বাংলায়:** ফাইলের প্রথম লাইনে এই directive থাকলে সেটা **browser-এর** কোড — state রাখতে পারে, event handle করতে পারে।

**এই repo-তে:** `components/`-এর প্রায় প্রতিটি ফাইলে আছে। `app/page.tsx`, `app/layout.tsx`, `lib/`-এর ফাইলগুলোতে **নেই**।

**কখন কাজে:** কোনো component-এ `useState`/`useEffect` লাগলে।

**⚠️ গুরুত্বপূর্ণ:** `"use client"` থাকলে সেই component-এর সব import-ও client bundle-এ যায়। তাই `lib/github.ts` (যেখানে `process.env` পড়া হয়) কখনো client component-এ import করা উচিত নয়।

### Server Component vs Client Component
**বাংলায়:** Server Component server-এ চলে (দ্রুত, secret পড়তে পারে)। Client Component browser-এ চলে (interactive)।

**এই repo-তে:** `app/page.tsx` server → data fetch করে, ফল props হিসেবে client component-গুলোকে দেয়। যেমন `app/page.tsx:40` — `<Hero profile={heroProfile} portraitSrc={portraitSrc} />`।

**কখন কাজে:** data যেখানে আনা হচ্ছে সেখানেই server রাখুন; শুধু যেখানে interactivity দরকার সেখানে `"use client"`.

---

## B. React concept

### Component
**বাংলায়:** UI-এর একটি reusable অংশ। Function যার নাম বড় হাতে শুরু হয়।

**এই repo-তে:** `components/Hero.tsx:249` — `export default function Hero({ profile, portraitSrc })`।

### Props
**বাংলায়:** Parent থেকে child-কে দেওয়া data — function-এর parameter হিসেবে আসে।

**এই repo-তে:** `components/Projects.tsx:22` — `function Projects({ projects }: { projects: ProjectCard[] })`। Parent থেকে `app/page.tsx:48` থেকে `projects={projects}` পাঠানো হয়।

**মনে রাখুন:** props **read-only** — child সরাসরি বদলাতে পারে না।

### State
**বাংলায়:** Component-এর ভেতরে বদলানো যায় এমন data। বদলালে React UI আবার আঁকে।

**এই repo-তে:** `components/Projects.tsx:32` — `const [category, setCategory] = useState<"all" | ProjectCategory>("all")`।

### `useState`
**বাংলায়:** `[মান, মানবদলানোরফল] = useState(প্রাথমিকমান)` — দুটো জিনিস ফেরত দেয়।

**এই repo-তে:**
```ts
const [tab, setTab] = useState<HeroTabId>("overview");   // CodeShowcase.tsx:17
const [openProject, setOpenProject] = useState<ProjectCard | null>(null); // Projects.tsx:33
```

### `useEffect`
**বাংলায়:** Component render হওয়ার পরে চালানোর কাজ — timer, event listener, canvas animation, network call।

**এই repo-তে:**
- `components/Hero.tsx:74` — stat counter চালু করে
- `components/Navbar.tsx:25` — scroll listener যোগ করে
- `components/MatrixRain.tsx:9` — canvas animation শুরু করে
- `components/ParticleBackground.tsx:10` — particle animation

**⚠️ সতর্কতা:** `useEffect`-এর ভেতরে যা শুরু করবেন (timer, listener, RAF) তার **cleanup** দিতে ভুলবেন না:

```ts
return () => { if (timer) clearTimeout(timer); };   // Hero.tsx:93-95
```

এটা না করলে unmount-এর পরেও সেই কাজ চলতে থাকে।

### `useRef`
**বাংলায়:** DOM element বা একটা mutable value-এর reference রাখে, re-render হলেও থেকে থাকে।

**এই repo-তে:**
- `components/Contact.tsx:31` — `const timers = useRef<ReturnType<typeof setTimeout>[]>([])`
- `components/Hero.tsx:70` — `const ref = useRef<HTMLDivElement>(null)` (viewport-এ আসা কিনা বুঝতে)
- `components/Terminal.tsx:37` — `bodyRef` (auto-scroll করতে)

### `useMemo`
**বাংলায়:** হিসাবটা মনে রাখে যাতে প্রতিবার re-render-এ না হয়।

**এই repo-তে:** `components/Projects.tsx:24` — `availableCategories`।

### Event handler
**বাংলায়:** user-এর action-এর উত্তর।

**এই repo-তে:**
- `components/Contact.tsx:52` — `onSubmit`
- `components/Terminal.tsx` — input-এর `onKeyDown`-এ Enter চেপে `runCommand(value)`
- `components/Projects.tsx` — button-এর `onClick={() => setCategory(filter.id)}`

### `key` prop
**বাংলায়:** React-কে বলে দেয় list-এর কোন item কোনটি — তুলনা করার জন্য।

**এই repo-তে:** `components/Projects.tsx:77` — `key={project.id}` (repo-র নাম, unique)।

**কখন কাজে:** `.map()` দিয়ে list বানালে **সবসময়** `key` দিতে হয়।

---

## C. TypeScript term

### `type`
**বাংলায়:** data-এর আকার বর্ণনা।

**এই repo-তে:** `lib/types.ts:39` — `export type HeroProfile = { name: string; … }`

### Union type
**বাংলায়:** একাধিক allowed value-র সম্ভাবনা — `|` দিয়ে লেখা।

**এই repo-তে:**
```ts
export type ProjectCategory =
  | "ecommerce" | "saas" | "mobile" | "webapp" | "project";   // lib/types.ts:12-17
```
অর্থাৎ এই project-এর category এই ৫টার একটাই হতে পারে — অন্য কিছু হলে TypeScript error দেবে।

### Discriminated union
**বাংলায়:** `ok: true`/`ok: false` দিয়ে ফলাফলের ধরন বোঝানো — TypeScript জানে কোন ক্ষেত্রে কোন property আছে।

**এই repo-তে:** `lib/contact.ts:14`:
```ts
export type ContactValidation =
  | { ok: true; value: ContactMessage }
  | { ok: false; error: string };
```
ব্যবহার: `app/api/contact/route.ts:25-27` — `if (!validation.ok)` চেক করলে TypeScript নিজে থেকেই জানে `validation.error` আছে, `value` নেই।

### `null` ও `undefined`
**বাংলায়:** "কিছু নেই"। `null` = ইচ্ছাকৃতভাবে কোনো value নেই, `undefined` = value পাওয়া যায়নি।

**এই repo-তে:**
- `lib/types.ts` — `githubEmail: string | null`
- `lib/portrait.ts:24` — `resolvePortraitSrc(): string | null`
- `components/Projects.tsx:33` — `useState<ProjectCard | null>(null)` (কোনো modal খোলা নেই)

### `?` (optional parameter)
**বাংলায়:** parameter দেওয়া বা না দেওয়া — দুটোই চলে।

**এই repo-তে:** `lib/github.ts:123` — `getFeaturedProjects(limit = 6)`, এবং `lib/profile.ts:79` — `yearsSince(dateIso: string, now = Date.now())`।

### `as` (type assertion)
**বাংলায়:** "আমি নিশ্চিত এটা এই ধরনের" বলে বলা — **কিন্তু runtime-এ যাচাই করে না।**

**এই repo-তে:** `lib/github.ts:66` — `return (await res.json()) as T;`

> **⚠️ সতর্কতা:** এখানে GitHub-এর response validate হচ্ছে না — শুধু type বলা হচ্ছে। GitHub response বদলালে ভুল data চুপচাপ ঢুকে যাবে। এটাই এই repo-র একটি জানা সীমাবদ্ধতা।

### `Record<K, V>`
**বাংলায়:** key-value map-এর ধরন।

**এই repo-তে:**
- `lib/contact.ts:20` — `MAX_LENGTHS: Record<keyof ContactMessage, number>`
- `components/ui/dialog.tsx` — `ICON_MAP` (IconMap.tsx:26)

### `strict` mode
**বাংলায়:** TypeScript কড়া হয়ে চেক করে — ভুল ধরা পড়ে।

**এই repo-তে:** `tsconfig.json:7` — `"strict": true`

---

## D. Async ও network

### `async` / `await`
**বাংলায়:** কাজ শেষ হওয়ার জন্য অপেক্ষা করা, কিন্তু অপেক্ষার সময় বাকি কাজ চলতে থাকে।

**এই repo-তে:** `app/page.tsx:21` — `export default async function Home()`।

### `Promise.all`
**বাংলায়:** একাধিক async কাজ একসাথে শুরু করে, সব শেষ হলে ফল একসাথে দেয়।

**এই repo-তে:** `app/page.tsx:22-25` — profile আর projects একসাথে fetch হয়।

### `fetch`
**বাংলায়:** network থেকে data আনা।

**এই repo-তে:** `lib/github.ts:54` — GitHub API-তে call।

### `next: { revalidate: 1800 }`
**বাংলায়:** Next.js-কে বলে এই fetch-এর ফল ১৮০০ সেকেন্ড (৩০ মিনিট) cache করো।

**এই repo-তে:** `lib/github.ts:56`

**কখন কাজে:** GitHub-এ প্রতি বার hit করলে rate limit শেষ হয়ে যায় — cache এড়ায়।

### HTTP status code
**বাংলায়:** server-এর উত্তরে "কী হলো" সংকেত।

**এই repo-তে:**
| Code | কখন | ফাইল |
|---|---|---|
| `200` | সফল | `app/api/contact/route.ts:43`, `app/api/github/*/route.ts` |
| `400` | body JSON নয় | `app/api/contact/route.ts:22` |
| `422` | validation fail | `app/api/contact/route.ts:27` |
| `503` | GitHub unavailable | `app/api/github/profile/route.ts:11` |

### `try` / `catch`
**বাংলায়:** error হলে ধরে ফেলে যাতে পুরো page ভেঙে না যায়।

**এই repo-তে:**
- `lib/github.ts:53-75` — fetch-এর error ধরে `null` ফেরত দেয়
- `app/api/contact/route.ts:18-22` — JSON parse error ধরে `400`
- `components/Contact.tsx:58-82` — network error ধরে toast দেখায়

---

## E. Data ও validation

### Fallback value
**বাংলায়:** data না থাকলে ব্যবহার করা বিকল্প মান — যাতে page খালি না দেখায়।

**এই repo-তে:** `lib/profile.ts:16` — `FALLBACK_PROFILE`। `buildHeroProfile` (L89) প্রতিটি field-এ `||` বা `??` দিয়ে fallback দেয়:
```ts
name: profile?.name || FALLBACK_PROFILE.name,      // lib/profile.ts:93
followers: profile?.followers ?? 0,                // L101
```

### Validation
**বাংলায়:** ইনপুট নিয়মের সাথে মিলছে কিনা দেখা, **boundary-তে** (বাইরের থেকে আসা data ঢোকার আগে)।

**এই repo-তে:** `lib/contact.ts:35` `validateContactPayload` — ৬টি ধাপে check করে (object → string → trim → required → length → email)।

**কেন বিশেষ:** এটাই একমাত্র জায়গা যেখানে user-এর কাছ থেকে আসা data ঢোকে। এখানে না থামালে অন্য সব জায়গায় আলাদা করে চেক করতে হতো।

### `??` বনাম `||`
**বাংলায়:** দুটোই "খালি হলে বিকল্প নাও" — কিন্তু `??` শুধু `null`/`undefined`-এর জন্য, `||` যেকোনো falsy মানের জন্য (`0`, `""`, `false`)।

**এই repo-তে:** `lib/profile.ts:101` — `profile?.followers ?? 0` (০ একটা বৈধ value, তাই `??` সঠিক)।

---

## F. Security

### `escapeHtml`
**বাংলায়:** HTML-এর special character-গুলো নিরাপদ text-এ বদলে দেয়, যাতে সেগুলো markup হিসেবে interpret না হয়।

**এই repo-তে:** `lib/html.ts:24` — `& < > " '` → `&amp; &lt; &gt; &quot; &#39;`

```ts
escapeHtml('<img src=x onerror="alert(1)">')
// → "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"
```

**কখন কাজে:** যেকোনো বাইরের data (GitHub name, bio, email) HTML string-এ বসানোর আগে।

### `dangerouslySetInnerHTML`
**বাংলায়:** React-কে বলে দেয় "এই string-টাকে HTML হিসেবে বসাও" — React-এর স্বয়ংক্রিয় escaping **বন্ধ** হয়ে যায়।

**এই repo-তে:** দুটো জায়গায় —
- `components/CodeShowcase.tsx:71` — code panel
- `components/Terminal.tsx:139, L141` — terminal output

**⚠️ সবচেয়ে গুরুত্বপূর্ণ নিয়ম:**
> **শুধু markup escape করবেন না — শুধু VALUE escape করুন।**

এই repo-তে `lib/html.ts:4-6`-এ rule-টা comment করা:
> "Rule: escape the VALUES, never the template. Escaping the finished markup would turn its own `<span>` tags into visible text."

**কখন কাজে:** যখন সত্যিই HTML markup দরকার (যেমন code editor-এর colored span)।

### XSS (Cross-Site Scripting)
**বাংলায়:** বাইরের কারো data (যেমন GitHub-এর display name) HTML হিসেবে ঢুকে গিয়ে ব্রাউজারে অন্যের কাছে কোড চালানো।

**এই repo-তে:** GitHub-এর `name`, `bio`, `location`, `email` — সব user-controlled। এগুলো `escapeHtml` দিয়ে রক্ষা করা হয় (Terminal.tsx:67, 75, 82, 87 · CodeShowcase.tsx:23-25)।

**Live যাচাই করা হয়েছে:** terminal-এ `<img src=x onerror=alert(1)>` লিখলে text হিসেবেই দেখায়, কোনো tag inject হয় না।

---

## G. Test ও tooling

### Vitest
**বাংলায়:** দ্রুত test runner — Vite-এর উপর তৈরি।

**এই repo-তে:** `package.json:34` (devDependency), config `vitest.config.mts`।

### `describe` / `it` / `expect`
**বাংলায়:** test-এর তিনটি অংশ — কী পরীক্ষা করছি, কোনো নির্দিষ্ট দাবি, সেটা সত্য কিনা।

**এই repo-তে:** `lib/__tests__/html.test.ts`:
```ts
describe("escapeHtml", () => {
  it("neutralizes a script tag so it cannot execute", () => {
    const result = escapeHtml('<script>alert("xss")</script>');
    expect(result).not.toContain("<script>");
  });
});
```

### Unit test
**বাংলায়:** একটা ছোট function-কে আলাদা করে পরীক্ষা করা — পুরো app চালানোর দরকার নেই।

**এই repo-তে:** ৪টি suite, ৫১টি case — শুধু `lib/`-এর pure function নিয়ে:
| Suite | কী verify করে |
|---|---|
| `html.test.ts` | `escapeHtml` script tag, ampersand, quote neutralize করে |
| `github.test.ts` | `mapCategory`, `mapIcon`, `yearsSince`, `reposToProjectCards` |
| `profile.test.ts` | `splitBrandName`, `deriveRoleFromBio`, `buildHeroProfile` |
| `contact.test.ts` | `validateContactPayload` — missing field, ভুল type, ভুল email, length cap |

**কেন শুধু pure function?** কারণ browser বা server ছাড়াই চালানো যায়, দ্রুত, আর ভুল ধরার chance বেশি।

### `@/` alias
**বাংলায়:** `@/lib/types` মানে project root থেকে `lib/types`।

**এই repo-তে:** `tsconfig.json:24-26` — `"paths": { "@/*": ["./*"] }`। Vitest-এও একই mapping `vitest.config.mts`-এ আছে, তাই test-এও একইভাবে import করা যায়।

### `tsc --noEmit`
**বাংলায়:** TypeScript-এর সব file check করে, কিন্তু **কোনো output file লিখে না**।

**এই repo-তে:** `package.json:9` — `"typecheck": "tsc --noEmit"`।

**কখন কাজে:** কোড বদলানোর পরে দ্রুত check করতে — build করার চেয়ে অনেক দ্রুত।

---

## H. এই repo-র নিজস্ব domain term

| Term | মানে | কোথায় |
|---|---|---|
| `HeroProfile` | পুরো সাইটে ব্যবহৃত profile-এর ১৪টি field | `lib/types.ts:39` |
| `ProjectCard` | UI-তে দেখানো একটি project-এর ১১টি field | `lib/types.ts:19` |
| `ProjectCategory` | project-এর ৫টি সম্ভাব্য category | `lib/types.ts:12` |
| `TimelineItem` | career timeline-এর একটি entry | `lib/data.ts:37` |
| `Skill` | একটি skill-এর তথ্য | `lib/data.ts:7` |
| `HeroTabId` | code panel-এর ৩টি tab-এর id | `lib/data.ts:147` |
| `iconKey` | icon-এর নাম, যেমন `"brand:react"` | `lib/types.ts` ও `lib/data.ts:10` |
| `accent` | card-এর gradient class | `lib/data.ts:149` (`PROJECT_ACCENTS`) |
| `FALLBACK_PROFILE` | GitHub fail হলে দেখানো profile | `lib/profile.ts:16` |
| `delivered` | contact message সত্যিই email হয়েছে কিনা | `app/api/contact/route.ts:43` |

---

## I. সংক্ষেপে — কোন term-এর জন্য কী দেখবেন

| আপনি যদি জানতে চান | উপরে খুঁজুন |
|---|---|
| Page কীভাবে serve হয় | `page.tsx`, `layout.tsx` |
| Component কীভাবে data পায় | Props, State |
| Timer/animation কোথায় হয় | `useEffect`, `useRef` |
| Type কোথায় define | `type`, Union type |
| Network call | `fetch`, `async/await`, `Promise.all` |
| GitHub fail হলে | Fallback value, `try/catch` |
| Security | `escapeHtml`, `dangerouslySetInnerHTML`, XSS |
| Test | Vitest, Unit test |
