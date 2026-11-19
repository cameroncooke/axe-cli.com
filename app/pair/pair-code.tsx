"use client"

import { useEffect, useState } from "react"

/**
 * Shows the pairing code carried after the `#` of the address, as two groups of five. The part
 * after `#` is never sent to a web server, so the code is read here in the browser and nowhere else.
 */
export function PairCode() {
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "").replace(/[\s-]/g, "").toUpperCase()
    setCode(/^[A-Z0-9]{10}$/.test(raw) ? `${raw.slice(0, 5)}-${raw.slice(5)}` : null)
  }, [])

  if (!code) return null
  return (
    <p className="mt-8 text-center">
      <span className="block text-sm text-axe-text-muted">Your code</span>
      <span className="mt-2 inline-block rounded-xl border border-axe-cyan/40 bg-axe-dark-200 px-6 py-3 font-mono text-3xl tracking-widest text-white">
        {code}
      </span>
    </p>
  )
}
