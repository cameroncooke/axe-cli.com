"use client"

import { useEffect, useRef, useState } from "react"
import { docPath, type DocSlug } from "../_data/routes"
import { Icons } from "./icons"

const SITE_ORIGIN = "https://axe-cli.com"

function pageUrl(slug: DocSlug, origin: string): string {
  return `${origin}${docPath(slug)}`
}

function rawUrl(slug: DocSlug, origin: string): string {
  return `${origin}/docs/raw/${slug}`
}

export function PageActions({ activeSlug }: { activeSlug: DocSlug }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const pillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (!pillRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onEsc)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onEsc)
    }
  }, [open])

  const copyPageMarkdown = async () => {
    const res = await fetch(rawUrl(activeSlug, window.location.origin))
    if (!res.ok) return
    await navigator.clipboard.writeText(await res.text())
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const origin = typeof window !== "undefined" ? window.location.origin : SITE_ORIGIN
  const fullUrl = pageUrl(activeSlug, origin)
  const llmPrompt = `Read from ${fullUrl} so I can ask questions about its contents`

  return (
    <div className="pa-pill" ref={pillRef}>
      <button type="button" className="pa-btn pa-btn-primary" onClick={copyPageMarkdown}>
        {copied ? <Icons.Check size={14} /> : <Icons.Copy size={14} />}
        <span>{copied ? "Copied" : "Copy page"}</span>
      </button>
      <div className="pa-divider" />
      <button type="button" className="pa-btn pa-btn-menu" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <Icons.ChevDown size={14} />
      </button>
      {open ? (
        <div className="pa-menu" role="menu">
          <a className="pa-item" href={rawUrl(activeSlug, "")} target="_blank" rel="noreferrer" role="menuitem">
            <div className="pa-item-icon"><Icons.FileText size={14} /></div>
            <div className="pa-item-body">
              <div className="pa-item-title">View as Markdown</div>
              <div className="pa-item-desc">Plain text version for agents</div>
            </div>
          </a>
          <a className="pa-item" href={`https://chatgpt.com/?hint=search&q=${encodeURIComponent(llmPrompt)}`} target="_blank" rel="noreferrer" role="menuitem">
            <div className="pa-item-icon"><Icons.Ext size={14} /></div>
            <div className="pa-item-body">
              <div className="pa-item-title">Open in ChatGPT</div>
              <div className="pa-item-desc">Ask questions about this page</div>
            </div>
          </a>
          <a className="pa-item" href={`https://claude.ai/new?q=${encodeURIComponent(llmPrompt)}`} target="_blank" rel="noreferrer" role="menuitem">
            <div className="pa-item-icon"><Icons.Ext size={14} /></div>
            <div className="pa-item-body">
              <div className="pa-item-title">Open in Claude</div>
              <div className="pa-item-desc">Ask questions about this page</div>
            </div>
          </a>
        </div>
      ) : null}
    </div>
  )
}
