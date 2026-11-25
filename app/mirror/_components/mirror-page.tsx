import type { ReactNode } from "react"
import { ToolShell } from "../../_components/tool-page"

export { APP_STORE_URL, ISSUES_URL } from "../../_components/tool-page"

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
    <MirrorShell>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {eyebrow ? <p className="mb-3 text-sm font-medium text-axe-cyan">{eyebrow}</p> : null}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">{title}</h1>
        <p className="text-lg text-axe-text-secondary leading-relaxed">{lede}</p>
        {note ? <p className="mt-3 text-sm text-axe-text-muted">{note}</p> : null}
        <div className={PROSE}>{children}</div>
      </article>
    </MirrorShell>
  )
}

/** The header and footer every AXe Mirror page shares: the tool pages' own, with Mirror marked as the current one. */
export function MirrorShell({ children }: { children: ReactNode }) {
  return <ToolShell current="mirror">{children}</ToolShell>
}
