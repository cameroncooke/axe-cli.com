import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

export const APP_STORE_URL = "https://apps.apple.com/app/id6836545597"
export const ISSUES_URL = "https://github.com/cameroncooke/AXe/issues"

/** AXe's three tools. Each has its own page, and every one of those pages links to the other two. */
export const TOOLS = [
  { id: "automation", label: "UI automation", href: "/automation", gives: "Your agent tests its own work." },
  { id: "mirror", label: "Mirror", href: "/mirror", gives: "Your simulator, in your hand." },
  { id: "builds", label: "Builds", href: "/builds", gives: "The real app, on your phone." },
] as const
export type ToolID = (typeof TOOLS)[number]["id"]

/** The header and footer the tool pages share. The page lays out its own content. */
export function ToolShell({ current, children }: { current?: ToolID; children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-axe-dark-100 text-axe-text-primary circuit-bg">
      <header className="border-b border-axe-dark-600/50 bg-axe-dark-100/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-4 h-16">
            <Link href="/" className="flex shrink-0 items-center gap-1 hover:opacity-80 transition-opacity">
              <Image src="/icon.png" alt="AXe" width={32} height={32} className="w-8 h-8 rounded-lg icon-glow" />
              {/* The wordmark gives way on a phone, where the four links need the width. */}
              <Image src="/axe-text.png" alt="" width={791} height={315} className="h-6 w-auto max-[480px]:hidden" />
            </Link>
            <nav className="flex items-center gap-4 sm:gap-8">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  aria-current={tool.id === current ? "page" : undefined}
                  className={`whitespace-nowrap text-sm transition-colors hover:text-axe-cyan ${tool.id === current ? "text-axe-cyan" : "text-axe-text-secondary"}`}
                >
                  {tool.label}
                </Link>
              ))}
              <Link href="/docs" className="whitespace-nowrap text-sm text-axe-text-secondary hover:text-axe-cyan transition-colors">
                Docs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-axe-dark-600/30 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              <Image src="/icon.png" alt="AXe" width={20} height={20} className="w-5 h-5 rounded icon-glow" />
              <Image src="/axe-text.png" alt="AXe" width={791} height={315} className="h-5 w-auto" />
              <span className="text-sm text-axe-text-muted ml-2">&copy; {new Date().getFullYear()} Cameron Cooke</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/mirror/support" className="text-sm text-axe-text-muted hover:text-axe-cyan transition-colors">
                Support
              </Link>
              <Link href="/mirror/privacy" className="text-sm text-axe-text-muted hover:text-axe-cyan transition-colors">
                Privacy
              </Link>
              <Link href="/docs" className="text-sm text-axe-text-muted hover:text-axe-cyan transition-colors">
                Docs
              </Link>
              <a
                href="https://github.com/cameroncooke/AXe"
                className="text-sm text-axe-text-muted hover:text-axe-cyan transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
          <p className="mt-6 text-center sm:text-left text-xs text-axe-text-muted">
            AXe is an independent open-source project and is not affiliated with Deque Systems or its axe® accessibility
            products.
          </p>
        </div>
      </footer>
    </div>
  )
}

/** The top of a tool page: the tool's name, what it gives you in one line, and a paragraph. */
export function ToolHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-axe-cyan/10 blur-[130px]" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-20 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-axe-cyan">{eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">{title}</h1>
        {children}
      </div>
    </section>
  )
}

export function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow?: string; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-axe-dark-600/30 py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow ? <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-axe-cyan">{eyebrow}</p> : null}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{title}</h2>
        {intro ? <p className="mt-4 max-w-3xl text-lg leading-relaxed text-axe-text-secondary">{intro}</p> : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card-glow rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/50 p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-2 leading-relaxed text-axe-text-secondary">{children}</div>
    </div>
  )
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded border border-axe-dark-600/50 bg-axe-dark-300 px-1.5 py-0.5 font-mono text-[0.88em] text-axe-text-primary">
      {children}
    </code>
  )
}

export function Command({ children }: { children: string }) {
  return (
    <div className="terminal-glow mt-4 overflow-x-auto rounded-lg border border-axe-dark-600/50 bg-axe-dark-200/80 px-4 py-3 font-mono text-sm text-axe-text-primary">
      <span className="select-none text-axe-cyan">❯ </span>
      {children}
    </div>
  )
}

/** A numbered step: words on one side and a picture, if there is one, on the other. */
export function Step({ n, title, children, picture }: { n: number; title: string; children: ReactNode; picture?: ReactNode }) {
  return (
    <div className={picture ? "grid items-center gap-8 md:grid-cols-[1fr_300px] md:gap-12" : ""}>
      <div>
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-axe-cyan/60 bg-axe-dark-200 text-lg font-semibold text-axe-cyan">
            {n}
          </span>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="mt-4 leading-relaxed text-axe-text-secondary [&_p]:mt-3">{children}</div>
      </div>
      {picture ? <div>{picture}</div> : null}
    </div>
  )
}

/** The other two tools, at the foot of a tool page. */
export function OtherTools({ current }: { current: ToolID }) {
  return (
    <section className="border-t border-axe-dark-600/30 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-axe-cyan">The rest of the toolbox</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {TOOLS.filter((tool) => tool.id !== current).map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="card-glow group rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/50 p-6 transition-colors hover:border-axe-cyan/40"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-axe-cyan">{tool.label}</p>
              <p className="mt-2 text-xl font-semibold text-white">{tool.gives}</p>
              <p className="mt-3 text-sm text-axe-cyan group-hover:text-axe-cyan-light">Read more →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
