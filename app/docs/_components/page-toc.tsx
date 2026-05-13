"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface Heading {
  id: string
  text: string
  level: 2 | 3
}

function collectHeadings(): Heading[] {
  const prose = document.querySelector(".prose")
  if (!prose) return []
  const items: Heading[] = []
  prose.querySelectorAll("h2[id], h3[id]").forEach((node) => {
    if (!(node instanceof HTMLElement)) return
    const text = node.textContent?.replace("#", "").trim()
    if (!node.id || !text) return
    items.push({ id: node.id, text, level: node.tagName === "H2" ? 2 : 3 })
  })
  return items
}

export function PageToc() {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    setHeadings(collectHeadings())
    const timer = window.setTimeout(() => setHeadings(collectHeadings()), 150)
    return () => window.clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    if (headings.length === 0) return
    const visible = new Set<string>()
    const ids = headings.map((h) => h.id)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const first = ids.find((id) => visible.has(id))
        if (first) setActiveId(first)
      },
      { rootMargin: "-84px 0px -70% 0px", threshold: 0 }
    )
    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <aside className="page-toc" aria-label="On this page">
      <div className="toc-title">On this page</div>
      <ul className="toc-list">
        {headings.map((h) => (
          <li key={h.id} className={`toc-entry toc-h${h.level}${activeId === h.id ? " active" : ""}`}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
