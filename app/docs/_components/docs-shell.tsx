"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { docPath, PAGE_META, PAGES_ORDER, SIDEBAR_GROUPS, type DocSlug } from "../_data/routes"
import { createSearchEntry, searchDocs, type SearchEntry } from "../_data/search"
import { Icons } from "./icons"
import { PageActions } from "./page-actions"
import { PageToc } from "./page-toc"

type Theme = "light" | "dark"

const TOPBAR_LINKS: { slug: DocSlug; label: string }[] = [
  { slug: "introduction", label: "Docs" },
  { slug: "command-reference", label: "Commands" },
  { slug: "changelog", label: "Changelog" },
]

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark"
  return document.documentElement.getAttribute("data-docs-theme") === "light" ? "light" : "dark"
}

function readInitialSidebar(): boolean {
  if (typeof document === "undefined") return true
  return document.documentElement.getAttribute("data-docs-sidebar") !== "off"
}

export function DocsShell({ activeSlug, children }: { activeSlug: DocSlug; children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [theme, setTheme] = useState<Theme>(() => readInitialTheme())
  const [sidebarOn, setSidebarOn] = useState<boolean>(() => readInitialSidebar())
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchEntries, setSearchEntries] = useState<SearchEntry[]>([])

  const searchResults = useMemo(() => searchDocs(searchEntries, searchQuery), [searchEntries, searchQuery])

  useEffect(() => {
    document.documentElement.setAttribute("data-docs-theme", theme)
    localStorage.setItem("axe-docs-theme", theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute("data-docs-sidebar", sidebarOn ? "on" : "off")
    localStorage.setItem("axe-docs-sidebar", String(sidebarOn))
  }, [sidebarOn])

  useEffect(() => {
    window.scrollTo(0, 0)
    setMobileNavOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    let cancelled = false

    async function loadSearchEntries() {
      const entries = await Promise.all(
        PAGES_ORDER.map(async (slug) => {
          try {
            const response = await fetch(`/docs/raw/${slug}`)
            const content = response.ok ? await response.text() : ""
            return createSearchEntry(slug, content)
          } catch {
            return createSearchEntry(slug, "")
          }
        })
      )
      if (!cancelled) setSearchEntries(entries)
    }

    loadSearchEntries()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const runSearch = () => {
    const first = searchResults[0]
    if (!first) return
    router.push(first.href)
    setSearchOpen(false)
  }

  const renderSearchResults = () => {
    const hasQuery = searchQuery.trim().length > 0
    if (!searchOpen || !hasQuery) return null

    return (
      <div className="search-results" role="listbox">
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <Link
              key={result.slug}
              href={result.href}
              className="search-result"
              role="option"
              onClick={() => {
                setSearchOpen(false)
                setMobileNavOpen(false)
              }}
            >
              <span className="sr-title">{result.title}</span>
              <span className="sr-section">{result.section}</span>
              <span className="sr-desc">{PAGE_META[result.slug].description}</span>
            </Link>
          ))
        ) : (
          <div className="search-empty">
            {searchEntries.length === 0 ? "Loading docs search…" : `No docs match “${searchQuery}”.`}
          </div>
        )}
      </div>
    )
  }

  const renderSearchInput = (variant: "topbar" | "sidebar") => (
    <div className={variant === "topbar" ? "search" : "sb-search"}>
      <span className="si"><Icons.Search size={14} /></span>
      <input
        ref={variant === "topbar" ? searchInputRef : undefined}
        value={searchQuery}
        placeholder="Search docs, commands, flags…"
        onChange={(e) => {
          setSearchQuery(e.target.value)
          setSearchOpen(true)
        }}
        onFocus={() => setSearchOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") runSearch()
          if (e.key === "Escape") setSearchOpen(false)
        }}
      />
      {variant === "topbar" ? <kbd>⌘ K</kbd> : null}
      {renderSearchResults()}
    </div>
  )

  return (
    <div className={`docs-root${sidebarOn ? "" : " no-sidebar"}${mobileNavOpen ? " mobile-nav-open" : ""}`}>
      <div className="topbar">
        <button
          className="tb-burger ic-btn"
          type="button"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileNavOpen((v) => !v)}
        >
          {mobileNavOpen ? <Icons.X size={18} /> : <Icons.List size={18} />}
        </button>
        <Link className="brand" href="/docs">
          <span className="brand-logo" aria-hidden>
            <Image src="/icon.png" alt="" width={28} height={28} priority />
          </span>
          <div className="brand-title">
            AXe
            <span className="brand-chip">docs</span>
          </div>
        </Link>
        <div className="tb-divider" />
        <nav>
          <Link href="/" className="tb-home">← axe-cli.com</Link>
          {TOPBAR_LINKS.map((item) => (
            <Link key={item.slug} href={docPath(item.slug)} className={activeSlug === item.slug ? "active" : ""}>
              {item.label}
            </Link>
          ))}
          <a href="https://github.com/cameroncooke/AXe" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
        <div className="grow" />
        <PageActions activeSlug={activeSlug} />
        {renderSearchInput("topbar")}
        <button className="ic-btn" aria-label="Toggle theme" type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <Icons.Moon size={14} /> : <Icons.Sun size={14} />}
        </button>
        <button className="ic-btn" aria-label="Toggle sidebar" type="button" onClick={() => setSidebarOn((v) => !v)}>
          <Icons.SidebarIc size={14} />
        </button>
        <Link className="cta-install" href="/docs/installation">
          <Icons.Download size={14} /> Install
        </Link>
      </div>

      <div className="docs-body">
        <div className="sidebar-backdrop" aria-hidden onClick={() => setMobileNavOpen(false)} />
        <aside className="sidebar">
          {renderSearchInput("sidebar")}
          {SIDEBAR_GROUPS.map((group) => {
            const GroupIcon = Icons[group.icon]
            return (
              <div key={group.label}>
                <div className="sb-group-label">{group.label}</div>
                {group.items.map((item, idx) => {
                  const route = PAGE_META[item.slug]
                  return (
                    <Link key={item.slug} className={`sb-item${activeSlug === item.slug ? " active" : ""}`} href={docPath(item.slug)}>
                      <span className="sb-icon">{idx === 0 ? <GroupIcon size={14} /> : <span style={{ width: 14 }} />}</span>
                      {route.title}
                    </Link>
                  )
                })}
              </div>
            )
          })}
          <div className="sb-version">
            <div className="sb-version-title">AXe docs</div>
            <div className="sb-version-sub">Static docs for iOS Simulator automation.</div>
          </div>
        </aside>
        <main className="content">
          <div className="page">
            <div className="prose">{children}</div>
          </div>
        </main>
        <PageToc />
      </div>
    </div>
  )
}
