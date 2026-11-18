import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

export const ISSUES_URL = "https://github.com/cameroncooke/AXe/issues"

const NAV_ITEMS = [
  { label: "AXe Mirror", href: "/mirror" },
  { label: "Support", href: "/mirror/support" },
  { label: "Privacy", href: "/mirror/privacy" },
  { label: "Docs", href: "/docs/mirror" },
]

const PROSE = [
  "text-axe-text-secondary leading-relaxed",
  "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white",
  "[&_p]:mt-4",
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2",
  "[&_strong]:font-medium [&_strong]:text-axe-text-primary",
  "[&_a]:text-axe-cyan [&_a:hover]:text-axe-cyan-light [&_a]:transition-colors",
  "[&_code]:rounded [&_code]:border [&_code]:border-axe-dark-600/50 [&_code]:bg-axe-dark-300 [&_code]:px-1.5 [&_code]:py-0.5",
  "[&_code]:font-mono [&_code]:text-[0.88em] [&_code]:text-axe-text-primary",
].join(" ")

interface MirrorPageProps {
  title: string
  lede: string
  eyebrow?: string
  note?: string
  children: ReactNode
}

export function MirrorPage({ title, lede, eyebrow = "AXe Mirror", note, children }: MirrorPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-axe-dark-100 text-axe-text-primary circuit-bg">
      <header className="border-b border-axe-dark-600/50 bg-axe-dark-100/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-4 h-16">
            <Link href="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Image src="/icon.png" alt="AXe" width={32} height={32} className="w-8 h-8 rounded-lg icon-glow" />
              <Image src="/axe-text.png" alt="AXe" width={791} height={315} className="h-6 w-auto" />
            </Link>
            <nav className="flex items-center gap-5 sm:gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-axe-text-secondary hover:text-axe-cyan transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {eyebrow ? <p className="mb-3 text-sm font-medium text-axe-cyan">{eyebrow}</p> : null}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">{title}</h1>
          <p className="text-lg text-axe-text-secondary leading-relaxed">{lede}</p>
          {note ? <p className="mt-3 text-sm text-axe-text-muted">{note}</p> : null}
          <div className={PROSE}>{children}</div>
        </article>
      </main>

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
