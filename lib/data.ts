// ---------------------------------------------------------------------------
// Curated content: skills, timeline, typewriter roles, code panel tabs.
// GitHub drives name/avatar/bio/stats/projects automatically (lib/github.ts).
// Edit the arrays below to change the rest of the content.
// ---------------------------------------------------------------------------

export type Skill = {
  name: string;
  category: "frontend" | "backend" | "devops" | "mobile";
  icon: string; // react-icons component key, looked up in components/IconMap.tsx
  level: number;
  color: string;
  tags: string[];
};

export const SKILLS: Skill[] = [
  { name: "React.js", category: "frontend", icon: "brand:react", level: 95, color: "#00f0ff", tags: ["Next.js", "Redux", "Hooks"] },
  { name: "TypeScript", category: "frontend", icon: "solid:code", level: 90, color: "#3178c6", tags: ["Generics", "Strict", "AST"] },
  { name: "Node.js", category: "backend", icon: "brand:node", level: 92, color: "#22c55e", tags: ["Express", "NestJS", "Microservices"] },
  { name: "Python", category: "backend", icon: "brand:python", level: 88, color: "#38bdf8", tags: ["FastAPI", "Django", "Asyncio"] },
  { name: "PostgreSQL", category: "devops", icon: "solid:database", level: 86, color: "#a855f7", tags: ["Prisma", "SQL", "Indexing"] },
  { name: "Docker & K8s", category: "devops", icon: "brand:docker", level: 84, color: "#0284c7", tags: ["Containers", "CI/CD", "Pods"] },
  { name: "GraphQL", category: "backend", icon: "solid:diagram", level: 85, color: "#ec4899", tags: ["Apollo", "Resolvers", "Schema"] },
  { name: "Tailwind CSS", category: "frontend", icon: "solid:palette", level: 98, color: "#38bdf8", tags: ["Flexbox", "Design System", "CSS"] },
  { name: "Flutter / Mobile", category: "mobile", icon: "solid:mobile", level: 80, color: "#60a5fa", tags: ["Dart", "iOS", "Android"] },
  { name: "AWS Cloud", category: "mobile", icon: "brand:aws", level: 82, color: "#f59e0b", tags: ["S3", "ECS", "Lambda"] },
];

export const SKILL_CATEGORIES = [
  { id: "all", label: "All Tech" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "Database & DevOps" },
  { id: "mobile", label: "Mobile & Cloud" },
] as const;

export type TimelineItem = {
  icon: "briefcase" | "code" | "laptop";
  period: string;
  title: string;
  org: string;
  textColor: string;
  accent: "cyan" | "violet" | "pink";
  orgColor: string;
  description: string;
  tags: { label: string; text: string }[];
};

export const TIMELINE: TimelineItem[] = [
  {
    icon: "briefcase",
    period: "2026 - Present",
    title: "React Developer & Builder",
    org: "Self-directed Projects",
    textColor: "text-cyan-400 text-sm font-semibold md:hidden",
    accent: "cyan",
    orgColor: "text-violet-400 text-sm font-semibold mb-4",
    description:
      "Building modern web experiences: an Al-Quran mobile-web study companion in TypeScript and a full e-commerce storefront (b-traders) shipped on Vercel.",
    tags: [
      { label: "TypeScript", text: "text-cyan-300" },
      { label: "React", text: "text-cyan-300" },
      { label: "Vercel", text: "text-cyan-300" },
    ],
  },
  {
    icon: "code",
    period: "2021 - 2025",
    title: "Frontend Developer",
    org: "Client & Personal Projects",
    textColor: "text-violet-400 text-sm font-semibold md:hidden",
    accent: "violet",
    orgColor: "text-violet-400 text-sm font-semibold mb-4",
    description:
      "Shipped a wide range of client work in React and JavaScript — agency and travel sites, landing pages, a chat application, blogs and login systems — dozens of repos on GitHub.",
    tags: [
      { label: "React", text: "text-violet-300" },
      { label: "JavaScript", text: "text-violet-300" },
      { label: "Netlify", text: "text-violet-300" },
    ],
  },
  {
    icon: "laptop",
    period: "2019",
    title: "Open Source Journey Begins",
    org: "github.com/pappu116",
    textColor: "text-pink-400 text-sm font-semibold md:hidden",
    accent: "pink",
    orgColor: "text-pink-400 text-sm font-semibold mb-4",
    description:
      "Created the GitHub account (June 2019) and began learning web development from the ground up — HTML, CSS and JavaScript through hands-on practice.",
    tags: [
      { label: "HTML", text: "text-pink-300" },
      { label: "CSS", text: "text-pink-300" },
      { label: "Bootstrap-era JS", text: "text-pink-300" },
    ],
  },
];

export const TYPEWRITER_ROLES = [
  "React Frontend Developer",
  "Full-Stack Developer",
  "UI/UX Architect",
  "TypeScript Enthusiast",
  "Cloud Solutions Engineer",
];

export const HERO_TAB_DATA: Record<string, { __html: string }> = {
  overview: {
    __html: `
                <div><span class="text-pink-400">const</span> <span class="text-cyan-400">developer</span> = {</div>
                <div class="pl-4"><span class="text-slate-400">name:</span> <span class="text-emerald-300">'NAME_PLACEHOLDER'</span>,</div>
                <div class="pl-4"><span class="text-slate-400">role:</span> <span class="text-emerald-300">'ROLE_PLACEHOLDER'</span>,</div>
                <div class="pl-4"><span class="text-slate-400">location:</span> <span class="text-emerald-300">'LOCATION_PLACEHOLDER'</span>,</div>
                <div class="pl-4"><span class="text-slate-400">passions:</span> [<span class="text-emerald-300">'UI/UX'</span>, <span class="text-emerald-300">'Microservices'</span>, <span class="text-emerald-300">'Clean Code'</span>],</div>
                <div class="pl-4"><span class="text-slate-400">coffeeToCodeRatio:</span> <span class="text-yellow-400">Infinity</span></div>
                <div>};</div>
                <div class="mt-4 text-slate-400">// Ready to build extraordinary digital solutions.</div>
            `,
  },
  stack: {
    __html: `
                <div><span class="text-violet-400">import</span> { <span class="text-cyan-400">React</span>, <span class="text-cyan-400">Node</span>, <span class="text-cyan-400">Postgres</span> } <span class="text-violet-400">from</span> <span class="text-emerald-300">'@stack/core'</span>;</div>
                <div class="mt-2"><span class="text-pink-400">export const</span> <span class="text-yellow-300">getStackCapabilities</span> = () =&gt; ({</div>
                <div class="pl-4 text-cyan-300">Frontend: [<span class="text-emerald-300">'React 19'</span>, <span class="text-emerald-300">'Next.js'</span>, <span class="text-emerald-300">'Tailwind'</span>],</div>
                <div class="pl-4 text-violet-300">Backend: [<span class="text-emerald-300">'Express'</span>, <span class="text-emerald-300">'Node API Routes'</span>, <span class="text-emerald-300">'GraphQL'</span>],</div>
                <div class="pl-4 text-pink-300">DevOps: [<span class="text-emerald-300">'Docker'</span>, <span class="text-emerald-300">'Kubernetes'</span>, <span class="text-emerald-300">'AWS'</span>]</div>
                <div>});</div>
            `,
  },
  arch: {
    __html: `
                <div class="text-slate-400">// System Architecture Blueprint</div>
                <div><span class="text-cyan-400">Client UI</span> -&gt; <span class="text-violet-400">API Gateway</span> -&gt; <span class="text-emerald-400">Microservice Cluster</span></div>
                <div class="pl-4 text-slate-400">├── Auth Service (JWT/Redis)</div>
                <div class="pl-4 text-slate-400">├── Payments (Stripe SDK)</div>
                <div class="pl-4 text-slate-400">└── Core DB (PostgreSQL Replica)</div>
                <div class="mt-2 text-emerald-400">✓ SLA Uptime: 99.99%</div>
            `,
  },
};

export const PROJECT_ACCENTS = [
  "from-cyan-500 to-blue-600",
  "from-violet-500 to-purple-600",
  "from-pink-500 to-rose-600",
  "from-emerald-400 to-teal-600",
];

export const SOCIALS_FALLBACK = ["#", "#", "#", "#"];
