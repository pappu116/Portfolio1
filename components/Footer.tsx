import Link from "next/link";

export default function Footer({
  name,
  profileUrl,
}: {
  name: string;
  profileUrl: string;
}) {
  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 font-mono text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <div>
          © {new Date().getFullYear()}{" "}
          <Link href={profileUrl} target="_blank" className="hover:text-cyan-400">
            {name}
          </Link>
          . Engineered with Precision &amp; 3D Interactive Design.
        </div>
        <div className="flex space-x-6">
          <a href="#hero" className="transition-colors hover:text-cyan-400">
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
