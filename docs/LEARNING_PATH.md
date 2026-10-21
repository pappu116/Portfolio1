# LEARNING_PATH — my-portfolio

> এটি একটি **পড়ার ও অনুশীলনের পরিকল্পনা** — কোনো code এখানে বদলানো হয়নি।
> প্রতিটি ধাপে: কী পড়বেন → কী করবেন → কী প্রশ্নের উত্তর দিতে পারা উচিত।

## কীভাবে ব্যবহার করবেন

প্রতি ধাপ শেষে নিজেকে যাচাই করুন। উত্তর না পারলে ওই ধাপ আবার পড়ুন — পরের ধাপে যাওয়ার আগে।

**সবচেয়ে জরুরি নিয়ম:** কোনো ধাপে production code বদলানোর দরকার নেই। পড়া, চালানো, ছোট অনুশীলন — এটুকুই যথেষ্ট।

---

## ধাপ ০ — হাতিয়া যাচাই (১০ মিনিট)

### পড়ুন
`package.json` (L5-12) — কোন script আছে।

### চালান
```bash
npm install      # একবারই
npm run typecheck  # TypeScript error আছে কিনা
npm test           # ৫১টি test
```

### নিজে যাচাই করুন
```bash
npm run dev
```
তারপর browser-এ `http://localhost:3000` খুলুন।

### এই ধাপে যা বোঝা যাবে
- ✅ কোন script কী করে
- ✅ `npm run dev` কী বানায়
- ✅ test চালালে কী আসে

### এই ধাপে আপনার প্রশ্নের উত্তর দিতে হবে
1. `npm run dev` আর `npm run build`-এর মধ্যে পার্থক্য কী?
2. `npm run typecheck` কি কোনো file বদলায়? (উত্তর: না — `tsc --noEmit`)
3. `npm test` সফল হলে output-এ কী দেখাবে?

---

## ধাপ ১ — Project-এর খোলামেলা (৩০ মিনিট)

### পড়ুন
1. `README.md`
2. [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md) — বিশেষ করে §৩ architecture ও §৬ সীমাবদ্ধতা
3. `docs/FILE_MAP.md`-এর directory tree

### খুঁজে বের করুন
Terminal-এ:
```bash
npm run dev
```
এরপর browser-এ পেজ স্ক্রল করুন এবং প্রতিটি section-এর নাম মিলিয়ে দেখুন — Hero, Code Showcase, About, Skills, Projects, Terminal, Experience, Contact।

### অনুশীলন (নিরাপদ — কোনো file বদলাবেন না)
`app/page.tsx` খুলুন এবং প্রতিটি import-এর পাশে মনে করুন: এই component-টি কোন section দেখায়?

### এই ধাপে আপনার প্রশ্নের উত্তর দিতে হবে
1. এই সাইটে content কতগুলো জায়গা থেকে আসে?
2. `app/`, `components/`, `lib/` — তিনটার দায়িত্ব কী?
3. কোন folder-এ browser-এর code আছে, কোন folder-এ server-এর?
4. Contact form কি সত্যিই email পাঠায়?

---

## ধাপ ২ — Homepage কীভাবে data আনে (৪৫ মিনিট)

**এটি সবচেয়ে গুরুত্বপূর্ণ ধাপ — এখান থেকেই বাকি সব বোঝা যায়।**

### পড়ুন
1. [`DATA_FLOWS.md`](./DATA_FLOWS.md) → "Flow 1"
2. `app/page.tsx` — পুরো ফাইল (৬০ লাইন)
3. `lib/types.ts` — পুরো ফাইল
4. `lib/github.ts` → L1-95 (fetch অংশ)

### খুঁজে বের করুন
`lib/github.ts` এই কয়টা বের করুন:
- `GITHUB_USER` কোথায় define (L8)
- `headers` কীভাবে বানানো হয়েছে (L11-14)
- `GITHUB_TOKEN` কোথায় ব্যবহার হয় (L16-18)
- `revalidate` মান কত (L56)

### অনুশীলন (নিরাপদ)
```bash
# চালু করে রাখুন, তারপর এই URL-এর JSON দেখুন:
#   http://localhost:3000/api/github/profile
#   http://localhost:3000/api/github/repos
```
এই JSON-ই সেই raw data যা `lib/github.ts` পড়ে।

### এই ধাপে আপনার প্রশ্নের উত্তর দিতে হবে
1. `Home()` কেন `async`? কী জন্য `await` করে?
2. `Promise.all` কেন ব্যবহার করা হলো? একটা করলে কী হতো?
3. `GITHUB_USER` বদলালে কী বদলাবে?
4. `revalidate: 1800` মানে কী?
5. GitHub API ব্যর্থ হলে পেজ কি ভাঙবে? কেন?
6. `HeroProfile` type-টা কোথায় define, কে import করে?

---

## ধাপ ৩ — Transform: raw data → UI data (৪৫ মিনিট)

### পড়ুন
1. `lib/profile.ts` — পুরো ফাইল
2. [`DATA_FLOWS.md`](./DATA_FLOWS.md) → "Flow 1"-এর ধাপ ৫
3. [`CODE_GLOSSARY.md`](./CODE_GLOSSARY.md) → "Fallback value" অংশ

### খুঁজে বের করুন
`lib/profile.ts`-এ:
- `FALLBACK_PROFILE` (L16) — কোন field আছে?
- `buildHeroProfile` (L89) — প্রতিটি field-এ কোন fallback দেওয়া হয়েছে?
- `deriveRoleFromBio` (L60) — তিনটা `.replace()` কী করে?
- `splitBrandName` (L36) — কখন `.dev` accent আসে?

### অনুশীলন (নিরাপদ, কোনো file বদলাবেন না)
Terminal-এ এই একটি command চালান:
```bash
node -e "console.log('Pappu Hasan'.split(' ')[0])"
```
তারপর `lib/profile.ts:36`-এর `splitBrandName` লাইনটা পড়ে মিলিয়ে নিন।

আরেকটি অনুশীলন — `deriveRoleFromBio`-এর behavior বুঝুন:
```bash
node -e "
const bio = 'Hi My Name is Pappu Hasan , I am a React  Frontend Developer';
const n = bio.trim().replace(/\s+/g,' ');
console.log(n.replace(/^(hi|hello)[^,.,]*[,.\s]+/i,'').replace(/^my name is [^,.\s]*[^,.\s]*[,.\s]+/i,'').replace(/^(i am a|i'm a|iam a) /i,'').trim());
"
```
Output: `React Frontend Developer`

> এটা `lib/profile.ts:67-71`-এর হুবহু একই logic — `lib/__tests__/profile.test.ts`-এও এই exact case আছে।

### এই ধাপে আপনার প্রশ্নের উত্তর দিতে হবে
1. GitHub fail হলে `FALLBACK_PROFILE` থেকে কোন কোন value আসে?
2. `buildHeroProfile` কেন `fallbackLogin` প্যারামিটার নেয়, hardcode না করে?
3. `deriveRoleFromBio` কেন regex ব্যবহার করে?
4. `??` আর `||`-এর মধ্যে পার্থক্য কী? (`lib/profile.ts:101`-এ `?? 0` কেন?)
5. `lib/profile.ts` কেন "pure" বলা হয়?

---

## ধাপ ৪ — Projects: filter আর category (৪৫ মিনিট)

### পড়ুন
1. [`DATA_FLOWS.md`](./DATA_FLOWS.md) → "Flow 3"
2. `lib/github.ts` → L94-135 (দুটো sort) ও L137-165 (`mapCategory`)
3. `components/Projects.tsx` → L1-80
4. `lib/types.ts` → `ProjectCategory`

### খুঁজে বের করুন
- `sortRepos` (L94) কোন ৪টা repo বাদ দেয়?
- `selectFeatured` (L112) score কীভাবে দেয়?
- `mapCategory` (L137) কোন regex-গুলো ব্যবহার করে?
- `Projects.tsx:24`-এ `availableCategories` কেন `useMemo`-তে?

### অনুশীলন (নিরাপদ)
Browser-এ Projects section-এ যান। খুঁজে দেখুন কোন tab-গুলো দেখাচ্ছে — শুধু সেগুলোই দেখাবে যেগুলোতে repo আছে।

তারপর ব্যাখ্যা করুন: `app/page.tsx:24`-এ `getFeaturedProjects(6)` মানে মাত্র ৬টি repo-ই আসে — তাই বাকি ৫৯টি repo-র কোনো tab-ই থাকে না। এটা কি bug? (উত্তর: না — এটা "Featured" grid, এমন করেই সাজানো)

### এই ধাপে আপনার প্রশ্নের উত্তর দিতে হবে
1. "Machine Learning" tab কেন দেখায় না? (উত্তর: `mapCategory` এই category ফেরত দেয় না)
2. `sortRepos` আর `selectFeatured` — দুটো কী আলাদা করে?
3. `mapCategory` কেন keyword-এর উপর নির্ভর করে? সমস্যা কোথায়?
4. `availableCategories` আর `filtered` — পার্থক্য কী?
5. `ProjectCategory` union type কী সুবিধা দেয়?

---

## ধাপ ৫ — Contact form: পুরো চক্র (৪৫ মিনিট)

### পড়ুন
1. [`DATA_FLOWS.md`](./DATA_FLOWS.md) → "Flow 2"
2. `lib/contact.ts` — পুরো ফাইল
3. `app/api/contact/route.ts` — পুরো ফাইল
4. `components/Contact.tsx` → L20-100

### খুঁজে বের করুন
- `lib/contact.ts`-এ ৬টি validation ধাপ কোথায় (L36, L41, L47, L54, L63, L71)?
- `MAX_LENGTHS` (L20) এর মান কত কত?
- `app/api/contact/route.ts:43` কী ফেরত দেয়?
- `components/Contact.tsx:41`-এ `showToast` কীভাবে toast সরায়?

### অনুশীলন (নিরাপদ — server চালু থাকলেই হবে)
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"bad-email","subject":"Hi","message":"Hello"}'
```
**প্রত্যাশিত উত্তর:** `{"error":"Email address looks invalid."}` — HTTP status 422

আরেকটি:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"a@b.com"}'
```
**প্রত্যাশিত:** `{"error":"Field \"email\" must be a string."}` — ২য় field-টাই string না হওয়ায় error

তারপর valid payload:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"a@b.com","subject":"Hi","message":"Hello"}'
```
**প্রত্যাশিত:** `{"ok":true,"delivered":false}`

> **`delivered: false` মানে email পাঠানো হয়নি** — শুধু server log-এ লেখা হয়েছে।

### এই ধাপে আপনার প্রশ্নের উত্তর দিতে হবে
1. Validation কেন `lib/contact.ts`-এ আলাদা, route file-এ না?
2. `validateContactPayload` `unknown` কেন নেয়, `Record<string, string>` কেন না?
3. `delivered: false` কী বোঝায়? User-কে কী বলা উচিত ছিল?
4. `components/Contact.tsx:72-79` server-এর error message কেন দেখায়?
5. ৪০০, ৪২২, ৫০৩ — কোনটার মানে কী?

---

## ধাপ ৬ — Terminal ও escaping (৪৫ মিনিট)

### পড়ুন
1. [`DATA_FLOWS.md`](./DATA_FLOWS.md) → "Flow 4" ও "Flow 5"
2. [`CODE_GLOSSARY.md`](./CODE_GLOSSARY.md) → Security অংশ
3. `lib/html.ts` — পুরো ফাইল
4. `components/Terminal.tsx` → L1-105

### খুঁজে বের করুন
- `escapeHtml` কোন ৫টি character escape করে (`lib/html.ts:11`)?
- Terminal-এ কোন কোন value escape করা হয় (L67, 75, 82, 87, 98)?
- `escapedLogin` (L25) আলাদা করে কেন বানানো হলো?
- `MatrixRain` কীভাবে trigger হয়?

### অনুশীলন (নিরাপদ — production logic বদলাবেন না)
Browser-এ terminal-এ গিয়ে লিখুন:
```
<img src=x onerror=alert(1)>
```
Enter চাপুন। Output-এ text হিসেবেই দেখাবে, কোনো tag execute হবে না।

তারপর `matrix` লিখে Enter চাপুন — পেছনে rain effect শুরু হবে।

আর `clear` লিখে Enter — screen মুছে যাবে।

### এই ধাপে আপনার প্রশ্নের উত্তর দিতে হবে
1. `dangerouslySetInnerHTML` কেন ব্যবহার করা হয়েছে?
2. শুধু markup escape করলে কী হতো?
3. GitHub-এর `name`/`email` escape না করলে কী ঝুঁকি ছিল?
4. `escapedLogin` আর `login` — দুটোর কী কাজ?

---

## ধাপ ৭ — Test ও type safety (৩০ মিনিট)

### পড়ুন
1. `lib/__tests__/html.test.ts` — সবচেয়ে ছোট ও পরিষ্কার
2. `lib/__tests__/contact.test.ts`
3. `vitest.config.mts`
4. `tsconfig.json`

### খুঁজে বের করুন
- `vitest.config.mts`-এ `@` alias কীভাবে বানানো?
- `tsconfig.json`-এ `@/*` path কোথায় define?
- `lib/__tests__/profile.test.ts`-এ live GitHub bio-র exact case আছে কোথায়?

### অনুশীলন (নিরাপদ)
```bash
npm test
```
তারপর একটি test ইচ্ছাকৃতভাবে ভুল করে দেখুন কী হয়:

`lib/__tests__/html.test.ts`-এ এই assertion-টি বদলে দিন:
```ts
expect(escapeHtml("a & b")).toBe("a &amp; b");
```
এটা করে:
```ts
expect(escapeHtml("a & b")).toBe("WRONG");
```
```bash
npm test
```
→ test fail দেখাবে। **তারপর ঠিক করে ফেরত আনুন** (git checkout ব্যবহার করতে পারেন: `git checkout -- lib/__tests__/html.test.ts`)।

### এই ধাপে আপনার প্রশ্নের উত্তর দিতে হবে
1. `@/` alias কেন ব্যবহার করা হয়?
2. শুধু `lib/`-এর function-ই test করা হয় কেন?
3. `describe`/`it`/`expect` কী কাজ করে?
4. `npm run typecheck` আর `npm test`-এর মধ্যে পার্থক্য কী?

---

## ধাপ ৮ — নিজে কিছু যোগ করার আগে (৩০ মিনিট)

### পড়ুন
`components/`-এর যেকোনো ২টি file — যেমন `About.tsx` ও `Footer.tsx` (সহজ, কোনো state নেই)।

### অনুশীলন (নিরাপদ)
একটি **নতুন** section যোগ করার পরিকল্পনা লিখুন (কোড লিখবেন না):

1. নতুন component কোন folder-এ যাবে? (`components/`)
2. তার props কী হবে?
3. `app/page.tsx`-এ কোথায় import ও render যোগ হবে?
4. নতুন content GitHub থেকে আসবে নাকি `lib/data.ts` থেকে?

### এই ধাপে আপনার প্রশ্নের উত্তর দিতে হবে
1. নতুন static section যোগ করতে কোন কোন file বদলাতে হবে?
2. নতুন GitHub-derived data দেখাতে হলে কী করতে হবে?
3. নতুন shared type দরকার হলে কোথায় রাখবেন?

---

## নিরাপদ debugging exercise

এগুলো production logic বদলানোর দরকার নেই:

### ১. GitHub fail হলে কী দেখায়?
```bash
# একটা নতুন terminal-এ
GITHUB_USER=this-user-does-not-exist-xyz npm run dev
```
তারপর `http://localhost:3000` খুলুন — কোনো ভাঙা page না, fallback profile দেখাবে।
`curl http://localhost:3000/api/github/profile` → `503` পাবেন।

### ২. Escape কাজ করছে কিনা
```bash
node -e "console.log(require('./lib/html.ts'))"
```
— এটা কাজ করবে না (TS file), এটাই শেখার একটা বিষয়। সরাসরি test দিয়ে যাচাই করুন:
```bash
npm test -- html
```

### ৩. Validation দেখুন
ধাপ ৫-এর curl গুলো আবার চালান, প্রতিটি response আলাদা করে পড়ুন।

### ৪. Category বদলানোর প্রভাব
**কোনো file বদলাবেন না** — শুধু পড়ুন: `lib/github.ts:137`-এর প্রতিটি regex কোন শব্দে match করে? হাতে কয়েকটা repo-র নাম লিখে দেখুন কোন category পড়বে।

---

## Feature বোঝার আগে checklist

কোনো feature সম্পাদনা করার আগে এই তালিকা পূরণ করুন:

- [ ] **Data কোথা থেকে আসে?** — GitHub API / `lib/data.ts` / নিজে বানানো
- [ ] **Transform কোথায় হয়?** — `lib/`-এর কোন function?
- [ ] **কোন component render করে?** — `app/page.tsx`-এর কোন লাইনে?
- [ ] **কোন props যায়?** — type কোথায় define?
- [ ] **State আছে?** — কোন `useState`?
- [ ] **Error/fallback কী?** — GitHub fail করলে কী দেখাবে?
- [ ] **কোনো external value HTML-এ বসানো হচ্ছে?** — হলে `escapeHtml` লাগবে?
- [ ] **Test আছে?** — কোন suite-এ যোগ করবে?
- [ ] **`lib/`-এর pure function লিখতে পারলে** — component-এর ভেতরে logic না রেখে সেখানে রাখুন

---

## দ্রুত reference — সমস্যা হলে কোথায় যাবেন

| উপসর্গ | সম্ভাব্য কারণ | দেখুন |
|---|---|---|
| Hero-তে নাম/stats ভুল | transform | `lib/profile.ts` |
| Project দেখাচ্ছে না | category / selection | `lib/github.ts` L94, L112, L137 |
| Filter tab দেখাচ্ছে না | filter list | `components/Projects.tsx` L13, L24 |
| Form submit হচ্ছে না | validation | `lib/contact.ts` L35 |
| Email আসছে না | **delivery implement নেই** | `app/api/contact/route.ts` L43 |
| Terminal-এ raw HTML | escape বাদ | `lib/html.ts` L24 |
| পেজে GitHub data নেই | API fail | `lib/github.ts` L59-75 |
| Type error | type mismatch | `npm run typecheck` |

---

## পরবর্তী ধাপ (চাইলে)

এই ৮টি ধাপ শেষ হলে আপনি:

- ✅ পুরো codebase-এর structure বুঝবেন
- ✅ data কীভাবে আসে ও বদলায় তা বুঝবেন
- ✅ নিরাপদে নতুন feature যোগ করতে পারবেন
- ✅ error খুঁজতে সঠিক file-এ যেতে পারবেন

তারপর আপনি চাইলে:
1. **নিজে একটা ছোট feature বানান** — যেমন terminal-এ একটা নতুন command (`date` বা `clear`-এর মতো)
2. **নিজে একটা test লিখুন** — `lib/__tests__/`-এ নতুন suite
3. **নিজে documentation লিখুন** — `docs/`-এর পাঁচটি ফাইল ইতিমধ্যে আছে, নতুন কিছু যোগ করতে পারেন

> এই ধাপগুলোতে **কোনো application source file সম্পাদনা করা হয়নি** — শুধু পড়া, চালানো এবং নিরাপদ অনুশীলন করা হয়েছে।
