"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, type ReactNode } from "react"

/**
 * A short silent clip that plays while it is on screen and stops when it is not. Nothing is
 * downloaded until it scrolls into view. With "reduce motion" on it does not start by itself and
 * shows controls instead.
 */
export function LoopVideo({ name, label }: { name: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={`/home/${name}.jpg`}
      aria-label={label}
      className="block aspect-video w-full bg-axe-dark-100"
    >
      <source src={`/home/${name}.mp4`} type="video/mp4" />
    </video>
  )
}

/** A card with a clip on top and words underneath. */
export function MediaCard({
  clip,
  label,
  eyebrow,
  title,
  href,
  cta,
  children,
}: {
  clip: string
  label: string
  eyebrow?: string
  title: string
  href?: string
  cta?: string
  children: ReactNode
}) {
  return (
    <div className="card-glow group flex flex-col overflow-hidden rounded-2xl border border-axe-dark-600/50 bg-axe-dark-200/60">
      <div className="border-b border-axe-dark-600/50">
        <LoopVideo name={clip} label={label} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {eyebrow ? <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-axe-cyan">{eyebrow}</p> : null}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <div className="mt-2 flex-1 text-sm leading-relaxed text-axe-text-secondary">{children}</div>
        {href && cta ? (
          <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm text-axe-cyan transition-colors hover:text-axe-cyan-light">
            {cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </div>
  )
}

/**
 * A tool page's short film. It plays silently while it is on screen and loops, and has controls,
 * so a visitor can turn the sound on or go back. With "reduce motion" on it waits to be played.
 */
export function ToolFilm({ name, label }: { name: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      muted
      loop
      controls
      playsInline
      preload="none"
      poster={`/tools/${name}.jpg`}
      aria-label={label}
      className="block aspect-video w-full bg-axe-dark-100"
    >
      <source src={`/tools/${name}.mp4`} type="video/mp4" />
    </video>
  )
}
