"use client"

import { useState, type ReactNode } from "react"

export interface CodeBlockProps {
  lang?: string
  filename?: string
  children?: ReactNode
  plain?: string
}

export function CodeBlock({ lang, filename, children, plain }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    const text = plain ?? (typeof children === "string" ? children : "")
    if (!text) return
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    })
  }

  return (
    <div className="codeblock">
      <div className="cb-head">
        {lang ? <span className="lang">{lang}</span> : null}
        {lang && filename ? <span className="sep">·</span> : null}
        {filename ? <span className="filename">{filename}</span> : null}
        <button className="cb-copy" onClick={copy} type="button">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  )
}
