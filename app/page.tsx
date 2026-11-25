"use client"

import {
  Github,
  Download,
  Terminal,
  Zap,
  Copy,
  CheckCircle,
  Menu,
  X,
  Smartphone,
  Tablet,
  Keyboard,
  Camera,
  Layers,
  ArrowRight,
  BookOpen,
  MousePointerClick,
  Timer,
  Bot,
  Braces,
  SlidersHorizontal,
  ScanEye,
  ShieldCheck,
  Columns2,
  RotateCw,
  Sparkles,
  Play,
  MonitorSmartphone,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef, type ReactNode } from "react"

interface GitHubStats {
  stars: number
  forks: number
}

function CircuitDecoration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 0v60M100 140v60M0 100h60M140 100h60" stroke="rgba(14,165,197,0.12)" strokeWidth="1" />
      <path d="M100 60h40v40" stroke="rgba(14,165,197,0.12)" strokeWidth="1" />
      <path d="M100 140h-40v-40" stroke="rgba(14,165,197,0.12)" strokeWidth="1" />
      <path d="M60 100v-40h40" stroke="rgba(14,165,197,0.12)" strokeWidth="1" />
      <path d="M140 100v40h-40" stroke="rgba(14,165,197,0.12)" strokeWidth="1" />
      <circle cx="100" cy="60" r="3" fill="rgba(14,165,197,0.15)" />
      <circle cx="100" cy="140" r="3" fill="rgba(14,165,197,0.15)" />
      <circle cx="60" cy="100" r="3" fill="rgba(14,165,197,0.15)" />
      <circle cx="140" cy="100" r="3" fill="rgba(14,165,197,0.15)" />
      <circle cx="140" cy="60" r="2" fill="rgba(14,165,197,0.1)" />
      <circle cx="60" cy="140" r="2" fill="rgba(14,165,197,0.1)" />
      <circle cx="60" cy="60" r="2" fill="rgba(14,165,197,0.1)" />
      <circle cx="140" cy="140" r="2" fill="rgba(14,165,197,0.1)" />
    </svg>
  )
}

function TerminalWindow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="terminal-glow rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/80 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-axe-dark-600/50 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-axe-text-muted ml-2 font-mono">{title}</span>
      </div>
      {children}
    </div>
  )
}

function Cmd({ comment, children }: { comment?: string; children: ReactNode }) {
  return (
    <div>
      {comment ? <div className="text-axe-text-muted text-xs mb-1"># {comment}</div> : null}
      <span className="text-axe-cyan">$</span> <span className="text-axe-text-primary break-words">{children}</span>
    </div>
  )
}

function Pill({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "green" | "blue" | "purple" }) {
  const tones = {
    cyan: "bg-axe-cyan/10 text-axe-cyan border-axe-cyan/20",
    green: "bg-green-400/10 text-green-400 border-green-400/20",
    blue: "bg-axe-blue/10 text-axe-blue border-axe-blue/20",
    purple: "bg-purple-400/10 text-purple-400 border-purple-400/20",
  }
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-xs font-medium border ${tones[tone]}`}>
      {children}
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-axe-text-secondary">
          <CheckCircle className="w-4 h-4 text-axe-cyan mt-0.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

/**
 * A short silent clip that plays while it is on screen and stops when it is not. Nothing is
 * downloaded until it scrolls into view. With "reduce motion" on it does not start by itself and
 * shows controls instead.
 */
function LoopVideo({ name, label }: { name: string; label: string }) {
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
function MediaCard({
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

export default function AXeLanding() {
  const [githubStats, setGithubStats] = useState<GitHubStats>({ stars: 0, forks: 0 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Mirror", href: "/mirror" },
    { label: "Agent Mode", href: "#agent-mode" },
    { label: "Devices", href: "#devices" },
    { label: "Get Started", href: "#get-started" },
    { label: "Docs", href: "/docs" },
  ]

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  useEffect(() => {
    async function fetchStats() {
      try {
        const statsResponse = await fetch("/api/github-stats")
        if (statsResponse.ok) {
          const stats = await statsResponse.json()
          setGithubStats(stats)
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }
    fetchStats()
  }, [])

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const installSteps = [
    { label: "Install with Homebrew:", text: "brew install cameroncooke/axe/axe", key: "brew" },
    { label: "Check a booted simulator or connected device:", text: "axe doctor --udid <UDID>", key: "doctor" },
    { label: "Teach your AI agent to use AXe:", text: "axe init", key: "init" },
    { label: "Pair your iPhone or iPad with AXe Mirror:", text: "axe remote pair", key: "pair" },
  ]

  return (
    <div className="min-h-screen bg-axe-dark-100 text-axe-text-primary circuit-bg">
      {/* Header */}
      <header className="border-b border-axe-dark-600/50 bg-axe-dark-100/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="#" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Image src="/icon.png" alt="AXe" width={32} height={32} className="w-8 h-8 rounded-lg icon-glow" />
              <Image src="/axe-text.png" alt="AXe" width={791} height={315} className="h-6 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-axe-text-secondary hover:text-axe-cyan transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/cameroncooke/AXe"
                className="hidden sm:flex items-center gap-2 text-sm text-axe-text-secondary hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                {githubStats.stars > 0 && <span>{githubStats.stars.toLocaleString()}</span>}
              </Link>
              <a
                href="#get-started"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-axe-cyan-deep hover:bg-axe-cyan text-white transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                Get Started
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
                className="md:hidden p-2 text-axe-text-secondary hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden pb-6 border-t border-axe-dark-600/50 pt-4">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-axe-text-secondary hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-36 lg:pb-28 circuit-lines">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-axe-cyan/8 blur-[120px] animate-glow-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-axe-blue/5 blur-[100px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-axe-purple/5 blur-[80px] animate-glow-pulse" style={{ animationDelay: "4s" }} />
        </div>

        <CircuitDecoration className="absolute top-10 left-10 w-40 h-40 opacity-50" />
        <CircuitDecoration className="absolute bottom-10 right-10 w-40 h-40 opacity-50 rotate-180" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="#toolbox"
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-axe-cyan/20 bg-axe-dark-400/50 text-sm text-axe-text-secondary hover:border-axe-cyan/40 hover:text-axe-text-primary transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-axe-cyan animate-pulse" />
            UI automation, Mirror and Builds
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <div className="mb-8 flex items-center justify-center gap-3">
            <Image src="/icon.png" alt="AXe" width={96} height={96} className="w-24 h-24 rounded-2xl icon-glow" />
            <Image src="/axe-text.png" alt="AXe" width={791} height={315} className="h-16 sm:h-20 w-auto" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            The iOS toolbox
            <br />
            <span className="bg-gradient-to-r from-axe-cyan via-axe-blue to-axe-purple bg-clip-text text-transparent">
              for agents
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-axe-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            One CLI that automates iOS simulators, including the dual-screen iPhone Duo simulator, and connected iPhones
            and iPads, from scripts, CI jobs and any coding agent. Your agent tests its own work, AXe Mirror puts the
            simulator in your hand, and Builds puts the real app on your phone.
          </p>

          <div className="mx-auto mb-8 flex max-w-xl items-center gap-2 rounded-xl border border-axe-dark-600/60 bg-axe-dark-200/80 p-3 pl-4 font-mono text-sm terminal-glow">
            <span className="select-none text-axe-cyan">$</span>
            <code className="flex-1 overflow-x-auto whitespace-nowrap text-left text-axe-text-primary">brew install cameroncooke/axe/axe</code>
            <button
              onClick={() => copyToClipboard("brew install cameroncooke/axe/axe", "hero")}
              aria-label="Copy the install command"
              className="shrink-0 rounded p-1.5 transition-colors hover:bg-axe-dark-400"
            >
              {copiedText === "hero" ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-axe-text-muted" />}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-axe-cyan-deep hover:bg-axe-cyan text-white font-medium transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              <Download className="w-4 h-4" />
              Get Started
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-axe-dark-600 hover:border-axe-cyan/30 text-axe-text-primary hover:bg-axe-dark-400/50 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Read the Docs
            </Link>
            <Link
              href="https://github.com/cameroncooke/AXe"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-axe-dark-600 hover:border-axe-cyan/30 text-axe-text-primary hover:bg-axe-dark-400/50 transition-all"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-axe-text-muted">
            {["Open Source", "Single Binary", "Simulators & Devices", "Xcode 26 & 27", "Works with any agent"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-axe-cyan" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* The tour */}
      <section id="tour" className="relative pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="terminal-glow overflow-hidden rounded-2xl border border-axe-dark-600/50 bg-black">
            <video
              controls
              playsInline
              preload="none"
              poster="/home/axe-tour-poster.jpg"
              className="block aspect-video w-full"
              aria-label="A two-minute tour of AXe. At a desk, a coding agent adds a search field to an app and tests it in the simulator. Its owner goes out, carries on from an iPhone Duo with the agent beside AXe Mirror, asks for a second feature, tries it by hand, then asks for a build and installs it on the phone."
            >
              <source src="/home/axe-tour.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-axe-text-muted">
            <Play className="h-3.5 w-3.5 text-axe-cyan" />
            A two-minute tour: one feature, from your desk to your phone. One take, recorded on a Mac and an iPhone Duo.
          </p>
        </div>
      </section>

      {/* The toolbox */}
      <section id="toolbox" className="relative scroll-mt-20 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-axe-dark-200/50 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Pill tone="green">
              <Sparkles className="w-3 h-3" /> The toolbox
            </Pill>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Three tools for <span className="text-axe-cyan">building with your agent</span>
            </h2>
            <p className="text-axe-text-secondary text-lg max-w-2xl mx-auto">
              AXe works with any agent that can run a command, and just as well with none: every tool is a plain command
              you can type or script.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <MediaCard
              clip="automation"
              label="A coding agent's conversation beside an iPhone simulator. The agent types Japan into a search field it has just added, and the list narrows to Kyoto."
              eyebrow="UI automation"
              title="Your agent tests its own work"
              href="#features"
              cta="What AXe can drive"
            >
              <p>
                Read the screen, tap, type, swipe and capture, on simulators and connected devices.{" "}
                <a href="#agent-mode" className="text-axe-cyan hover:text-axe-cyan-light">Agent mode</a> checks every
                action against the screen the agent saw, in apps and on web pages. The same commands run in your
                scripts and CI jobs.
              </p>
            </MediaCard>
            <MediaCard
              clip="mirror"
              label="An iPhone Duo with a coding agent on the left and a live simulator on the right. A small Mac in the corner shows the same simulator following each touch."
              eyebrow="Mirror"
              title="Your simulator, in your hand"
              href="/mirror"
              cta="Meet AXe Mirror"
            >
              <p>
                <code className="font-mono text-axe-cyan">axe remote</code> shows your Mac&apos;s simulators in the free AXe
                Mirror app on an iPhone or iPad, live, and sends your touches back. It is the same simulator your agent is
                using, so you can leave your desk and keep watching, touching and steering. Encrypted from end to end.
              </p>
            </MediaCard>
            <MediaCard
              clip="builds"
              label="AXe Mirror on an iPhone Duo offers a new build of an app with an Install button. It is installed, and the real app opens beside the agent."
              eyebrow="Builds"
              title="The real app, on your phone"
              href="/docs/mirror#install-your-builds"
              cta="How Builds works"
            >
              <p>
                <code className="font-mono text-axe-cyan">axe remote build</code> builds your app, signs it for your
                devices and offers it in AXe Mirror. Tap Install and the real app is on the phone in your hand, over the
                pairing alone: no TestFlight and no cable.
              </p>
            </MediaCard>
          </div>
        </div>
      </section>

      {/* Runs on */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              One CLI, <span className="text-axe-cyan">every target</span>
            </h2>
            <p className="text-axe-text-secondary text-lg max-w-2xl mx-auto">
              One set of commands and one set of error codes, on simulators, on the dual-screen iPhone Duo simulator and on
              real hardware.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <MediaCard
              clip="speed"
              label="One axe tap played back in real time: it takes 0.08 seconds. A drag takes 0.9 seconds and reading the screen 0.3 seconds."
              eyebrow="iOS Simulator"
              title="A tap in 80 milliseconds"
            >
              <p>
                iPhone and iPad simulators on Xcode 26 and 27, in every orientation. A warm input connection is reused
                across commands, so input is fast enough to feel live.
              </p>
            </MediaCard>
            <MediaCard
              clip="duo"
              label="The iPhone Duo simulator opening, folding to a tabletop posture and closing as AXe moves its hinge."
              eyebrow="iPhone Duo Simulator"
              title="Two screens, every fold"
              href="/docs/iphone-duo"
              cta="iPhone Duo guide"
            >
              <p>
                Read both screens, move the hinge, rotate, and drive whichever display is active, in any fold and
                orientation.
              </p>
            </MediaCard>
            <MediaCard
              clip="device"
              label="A real iPhone painting a picture of a red car, one stroke at a time, driven by AXe."
              eyebrow="iPhone and iPad"
              title="Real devices, precise enough to paint"
              href="/docs/physical-devices"
              cta="Physical devices guide"
            >
              <p>
                Connected devices over Xcode&apos;s CoreDevice. Pass the hardware UDID to the same commands:{" "}
                <code className="font-mono text-axe-cyan">doctor</code> tells you what a device still needs.
              </p>
            </MediaCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need for
              <span className="text-axe-cyan"> UI automation</span>
            </h2>
            <p className="text-axe-text-secondary text-lg max-w-2xl mx-auto">
              Read the screen, drive any input, capture the result and configure the device, from your terminal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: ScanEye,
                title: "Accessibility Reads",
                desc: "The full accessibility tree as JSON, or the element at one point. Tap by ID, label or value, and wait for elements to appear.",
                color: "text-yellow-400",
                bg: "bg-yellow-400/10",
              },
              {
                icon: MousePointerClick,
                title: "Touch & Gestures",
                desc: "Taps, long presses, double and two-finger taps, swipes, scroll-until-visible, pinch, rotate, drag to reorder and one-finger drawing.",
                color: "text-axe-cyan",
                bg: "bg-axe-cyan/10",
              },
              {
                icon: Keyboard,
                title: "Text & Keyboard",
                desc: "Type text from an argument, stdin or a file. Single keys, key sequences and shortcuts such as Cmd+A by HID key code.",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
              },
              {
                icon: Camera,
                title: "Screenshots & Video",
                desc: "PNG screenshots, H.264 MP4 recording, MJPEG, JPEG and BGRA streams, and native H.264 from a physical device.",
                color: "text-green-400",
                bg: "bg-green-400/10",
              },
              {
                icon: SlidersHorizontal,
                title: "Device Settings",
                desc: "Dark mode, text size, contrast, reduce motion, colour filters, VoiceOver, a simulated location and a clean status bar.",
                color: "text-orange-400",
                bg: "bg-orange-400/10",
              },
              {
                icon: Braces,
                title: "Structured Output",
                desc: "Put --output json before any command for one typed result, or a typed error code to branch on. JSON Schemas describe every result.",
                color: "text-purple-400",
                bg: "bg-purple-400/10",
              },
              {
                icon: RotateCw,
                title: "Buttons & Rotation",
                desc: "Home, lock, side button, Siri and Apple Pay. Rotate the iPhone Duo simulator or a physical device and wait for the new orientation.",
                color: "text-pink-400",
                bg: "bg-pink-400/10",
              },
              {
                icon: Layers,
                title: "Batch Automation",
                desc: "Run many input steps in one command and one input session, or keep one process open with axe serve and send it a command per line.",
                color: "text-teal-400",
                bg: "bg-teal-400/10",
              },
              {
                icon: Bot,
                title: "Agent Mode",
                desc: "Compact captures with refs, actions checked against the screen the agent saw, and the settled screen in every reply.",
                color: "text-axe-cyan",
                bg: "bg-axe-cyan/10",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="card-glow group p-6 rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/50 hover:bg-axe-dark-300/50 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-axe-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLI Examples */}
      <section id="examples" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-axe-dark-200/50 to-transparent" />
        <CircuitDecoration className="absolute top-20 right-0 w-32 h-32 opacity-40" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Pill>Simple &amp; Powerful</Pill>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Intuitive <span className="text-axe-cyan">CLI</span> commands
              </h2>
              <p className="text-axe-text-secondary text-lg mb-6 leading-relaxed">
                Every interaction is one command with an explicit target. Coordinates are points in the current
                orientation, and AXe handles rotation, letterboxing and each iPhone Duo simulator screen for you.
              </p>
              <CheckList
                items={[
                  "Selector taps by accessibility ID, label or value, with waiting",
                  "Scroll until an element is on screen, then stop exactly there",
                  "Gesture presets that measure the real screen size",
                  "Text from arguments, files or stdin for flexible scripting",
                ]}
              />
            </div>

            <TerminalWindow title="Terminal">
              <div className="p-5 font-mono text-sm space-y-4">
                <Cmd comment="Tap by accessibility label, waiting for it to appear">
                  axe tap --label &quot;Sign In&quot; --wait-timeout 5 --udid $UDID
                </Cmd>
                <Cmd comment="Scroll until an element is on screen">
                  axe gesture scroll-up --until-label &quot;Privacy&quot; --udid $UDID
                </Cmd>
                <Cmd comment="Long press, then pinch to zoom">
                  axe tap --label &quot;Photo&quot; --hold 1 --udid $UDID
                </Cmd>
                <Cmd>axe gesture pinch --scale 2 --udid $UDID</Cmd>
                <Cmd comment="Dark mode and a large text size">
                  axe settings set --appearance dark --text-size accessibility-large --udid $UDID
                </Cmd>
                <Cmd comment="Typed JSON result">
                  axe --output json screenshot --output screen.png --udid $UDID
                </Cmd>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* Agent Mode */}
      <section id="agent-mode" className="py-24 relative">
        <CircuitDecoration className="absolute bottom-10 left-0 w-32 h-32 opacity-40 rotate-90" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-4">
              <div className="terminal-glow overflow-hidden rounded-xl border border-axe-dark-600/50">
                <LoopVideo name="agent" label="An agent's commands on the left and an iPhone simulator on the right: each action is checked and each reply carries the new screen." />
              </div>
              <TerminalWindow title="agent session">
                <div className="p-5 font-mono text-xs space-y-4">
                  <div>
                    <Cmd comment="Capture the screen as rows with refs">
                      axe describe-ui --agent --view navigation --udid $UDID
                    </Cmd>
                    <pre className="mt-2 text-axe-text-secondary leading-relaxed overflow-x-auto">{`snapshotID 3FF70D78-…
e7|tap|text-field|First name|
e9|tap|text-field|Last name|
e12|tap|button|Save|`}</pre>
                  </div>
                  <div>
                    <Cmd comment="Fill the form in one checked call">
                      {`axe batch --agent --udid $UDID --steps-json '{"snapshotID":"3FF70D78-…","steps":[{"action":"type","ref":"e7","text":"Ada","focus":true},{"action":"type","ref":"e9","text":"Lovelace","focus":true},{"action":"tap","ref":"e12"}]}'`}
                    </Cmd>
                    <div className="mt-2 space-y-1">
                      <div className="text-green-400">completedSteps 3 · input checked before every step</div>
                      <div className="text-axe-cyan neon-glow">returns the settled screen with a new snapshot</div>
                    </div>
                  </div>
                </div>
              </TerminalWindow>
            </div>

            <div className="order-1 lg:order-2">
              <Pill tone="green">
                <Bot className="w-3 h-3" /> Agent mode
              </Pill>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-axe-cyan">Agent mode</span> for AI agents
              </h2>
              <p className="text-axe-text-secondary text-lg mb-6 leading-relaxed">
                Add <code className="text-axe-cyan font-mono text-base">--agent</code> and every read and action is
                checked. AXe confirms the control is still the one the agent saw, sends the input and returns the new
                screen, so an agent never taps the wrong thing after a layout change and needs no extra read.
              </p>
              <CheckList
                items={[
                  "Compact rows with a ref for each control, in navigation, reading or full views",
                  "Refusals send no input and carry a typed code with the current screen",
                  "Batch up to eight same-screen taps and types in one call",
                  "Focus a field and type in one command",
                  "Web pages too: --web lists a page's links, buttons and fields as refs",
                  "No model or API key required",
                ]}
              />
              <Link
                href="/docs/agent-mode"
                className="mt-8 inline-flex items-center gap-2 text-sm text-axe-cyan hover:text-axe-cyan-light transition-colors"
              >
                Read the agent mode guide
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Devices */}
      <section id="devices" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-axe-dark-200/50 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Pill tone="blue">
              <MonitorSmartphone className="w-3 h-3" /> Beyond the simulator
            </Pill>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Real devices &amp; <span className="text-axe-cyan">dual screens</span>
            </h2>
            <p className="text-axe-text-secondary text-lg max-w-2xl mx-auto">
              Automate connected iPhones and iPads, and every screen and fold of the iPhone Duo simulator, with the commands you
              already use.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card-glow relative rounded-2xl border border-axe-dark-600/50 bg-gradient-to-br from-axe-dark-300/80 to-axe-dark-200/50 p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-axe-cyan/5 rounded-full blur-[60px]" />
              <CircuitDecoration className="absolute -top-4 -right-4 w-24 h-24 opacity-30" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-axe-cyan/10 flex items-center justify-center">
                    <Tablet className="w-5 h-5 text-axe-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold">Physical iPhone &amp; iPad</h3>
                </div>
                <p className="text-axe-text-secondary mb-6 leading-relaxed">
                  Pass the hardware UDID to screenshots, accessibility reads, selector taps, gestures, typing, buttons,
                  batches, rotation, settings and video, including native H.264. <code className="text-axe-cyan font-mono text-sm">doctor</code> tells
                  you exactly what a device still needs.
                </p>
                <div className="rounded-lg bg-axe-dark-100 p-4 font-mono text-xs border border-axe-dark-600/30 space-y-2">
                  <Cmd>axe list-devices</Cmd>
                  <Cmd>axe doctor --udid $DEVICE</Cmd>
                  <Cmd>axe tap --id Continue --wait-timeout 15 --udid $DEVICE</Cmd>
                  <Cmd>axe stream-video --format h264 --udid $DEVICE &gt; screen.h264</Cmd>
                </div>
              </div>
            </div>

            <div className="card-glow relative rounded-2xl border border-axe-dark-600/50 bg-gradient-to-br from-axe-dark-300/80 to-axe-dark-200/50 p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-axe-blue/5 rounded-full blur-[60px]" />
              <CircuitDecoration className="absolute -bottom-4 -left-4 w-24 h-24 opacity-30 rotate-180" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-axe-blue/10 flex items-center justify-center">
                    <Columns2 className="w-5 h-5 text-axe-blue" />
                  </div>
                  <h3 className="text-2xl font-bold">iPhone Duo Simulator</h3>
                </div>
                <p className="text-axe-text-secondary mb-6 leading-relaxed">
                  Every input, read and capture command works on the dual-screen simulator, on whichever screen is active, in any fold and
                  orientation. Show the screens, move the hinge, rotate, guard input to one screen, and record one movie
                  through every fold.
                </p>
                <div className="rounded-lg bg-axe-dark-100 p-4 font-mono text-xs border border-axe-dark-600/30 space-y-2">
                  <Cmd>axe displays --udid $UDID</Cmd>
                  <Cmd>axe hinge set tabletop --udid $UDID</Cmd>
                  <Cmd>axe rotate left --udid $UDID</Cmd>
                  <Cmd>axe record-video --follow-active-display --udid $UDID</Cmd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Integration */}
      <section className="py-24 relative">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built for <span className="text-axe-cyan">AI agents</span>
            </h2>
            <p className="text-axe-text-secondary text-lg max-w-2xl mx-auto">
              The AXe skill teaches your coding agent to test and operate iOS apps with agent mode.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card-glow relative rounded-2xl border border-axe-dark-600/50 bg-gradient-to-br from-axe-dark-300/80 to-axe-dark-200/50 p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-axe-cyan/5 rounded-full blur-[60px]" />
              <div className="relative">
                <Pill>AI Skill</Pill>
                <h3 className="text-2xl font-bold mb-4">One command setup</h3>
                <p className="text-axe-text-secondary mb-6 leading-relaxed">
                  Run <code className="text-axe-cyan font-mono text-sm">axe init</code> to install the skill bundled
                  with your binary, or add the AXe plugin marketplace to Claude Code or Codex so the skill stays
                  updated as releases ship.
                </p>
                <div className="rounded-lg bg-axe-dark-100 p-4 font-mono text-xs border border-axe-dark-600/30 space-y-3">
                  <Cmd>axe init</Cmd>
                  <Cmd>claude plugin marketplace add cameroncooke/AXe &amp;&amp; claude plugin install axe@axe</Cmd>
                  <Cmd>codex plugin marketplace add cameroncooke/AXe &amp;&amp; codex plugin add axe@axe</Cmd>
                </div>
              </div>
            </div>

            <div className="card-glow relative rounded-2xl border border-axe-dark-600/50 bg-gradient-to-br from-axe-dark-300/80 to-axe-dark-200/50 p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-axe-blue/5 rounded-full blur-[60px]" />
              <div className="relative">
                <Pill tone="blue">Agent Example</Pill>
                <h3 className="text-2xl font-bold mb-4">Autonomous testing</h3>
                <p className="text-axe-text-secondary mb-6 leading-relaxed">
                  Agents capture the screen, act on refs, batch same-screen actions and verify from the screen each
                  action returns.
                </p>
                <div className="rounded-lg bg-axe-dark-100 p-4 text-sm space-y-2 border border-axe-dark-600/30">
                  <div className="font-mono">
                    <span className="text-axe-text-muted">&gt;</span>{" "}
                    <span className="text-axe-text-primary">Sign up a new user and check the welcome screen</span>
                  </div>
                  <div className="h-px bg-axe-dark-600/50" />
                  <div className="space-y-1.5 text-xs">
                    {[
                      "Captured the sign-up form (navigation view)",
                      "Filled name, email and password in one batch",
                      "Tapped \"Create Account\"; reply returned the new screen",
                      "Read the welcome text from the returned capture",
                    ].map((step) => (
                      <div key={step} className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-3 h-3 shrink-0" /> {step}
                      </div>
                    ))}
                    <div className="h-px bg-axe-dark-600/50 my-1" />
                    <div className="text-axe-text-primary">
                      Sign-up works. The welcome screen shows &quot;Welcome, Ada&quot;.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-axe-text-muted mb-6">Works with your favourite AI tools</p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-axe-text-muted">
              {["Claude Code", "Codex", "Cursor", "VS Code", "Shell Scripts", "CI"].map((client) => (
                <span key={client} className="text-sm font-medium text-axe-text-secondary hover:text-axe-cyan transition-colors">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-axe-dark-200/50 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Pill tone="purple">
              <Zap className="w-3 h-3" /> Performance
            </Pill>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simulator input in <span className="text-axe-cyan">milliseconds</span>
            </h2>
            <p className="text-axe-text-secondary text-lg max-w-2xl mx-auto">
              Single commands, measured on an iPhone 18 Pro simulator.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Tap", now: "0.08 s", what: "for one tap" },
              { label: "Drag", now: "0.9 s", what: "for a drag" },
              { label: "describe-ui", now: "0.3 s", what: "to read the whole screen" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="card-glow p-6 rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/50 text-center"
              >
                <div className="text-sm text-axe-text-muted mb-2 font-mono">{stat.label}</div>
                <div className="text-4xl font-bold text-axe-cyan neon-glow mb-2">{stat.now}</div>
                <div className="text-sm text-axe-text-secondary">{stat.what}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AXe */}
      <section className="py-24 relative">
        <CircuitDecoration className="absolute top-1/2 left-0 w-40 h-40 opacity-30 -translate-y-1/2" />
        <CircuitDecoration className="absolute top-1/2 right-0 w-40 h-40 opacity-30 -translate-y-1/2 rotate-180" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why <span className="text-axe-cyan">AXe</span>?
            </h2>
            <p className="text-axe-text-secondary text-lg max-w-2xl mx-auto">
              A practical toolbox for terminals, scripts, CI jobs and AI agents.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Terminal,
                title: "Terminal Native",
                desc: "Shell commands that fit scripts, CI jobs and agent workflows. No server, no test target, no app changes.",
                color: "text-axe-cyan",
                bg: "bg-axe-cyan/10",
              },
              {
                icon: ShieldCheck,
                title: "Safe by Design",
                desc: "AXe never picks a device for you, never replays uncertain input, and blocks input if a touch might still be held.",
                color: "text-green-400",
                bg: "bg-green-400/10",
              },
              {
                icon: Timer,
                title: "Fast",
                desc: "A warm input connection is reused across commands, so a simulator tap takes about 80 ms.",
                color: "text-yellow-400",
                bg: "bg-yellow-400/10",
              },
              {
                icon: Braces,
                title: "Typed Errors",
                desc: "Simulators and devices share one error vocabulary. Branch on error.code, not on message text.",
                color: "text-purple-400",
                bg: "bg-purple-400/10",
              },
              {
                icon: Sparkles,
                title: "Agent First",
                desc: "Agent mode, a bundled skill and plugin marketplaces make AXe the iOS hands for your coding agent, whichever agent that is.",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
              },
              {
                icon: ScanEye,
                title: "Accessibility First",
                desc: "Built on Apple's accessibility APIs. Target elements by ID or label, not just coordinates.",
                color: "text-orange-400",
                bg: "bg-orange-400/10",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="card-glow group p-6 rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/50 hover:bg-axe-dark-300/50 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-axe-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation */}
      <section id="get-started" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-axe-dark-200/50 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get started in seconds</h2>
            <p className="text-axe-text-secondary text-lg">
              Install AXe with Homebrew. Requires macOS 14 or later and Xcode 26 or 27.
            </p>
          </div>

          <div className="terminal-glow rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/80 overflow-hidden p-6 space-y-6">
            {installSteps.map((step) => (
              <div key={step.key}>
                <p className="text-sm text-axe-text-secondary mb-3">{step.label}</p>
                <div className="flex items-center gap-2 bg-axe-dark-100 rounded-lg p-3 font-mono text-sm border border-axe-dark-600/30">
                  <code className="text-green-400 flex-1 break-all">{step.text}</code>
                  <button
                    onClick={() => copyToClipboard(step.text, step.key)}
                    aria-label={`Copy ${step.text}`}
                    className="p-1.5 rounded hover:bg-axe-dark-400 transition-colors shrink-0"
                  >
                    {copiedText === step.key ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-axe-text-muted" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/docs/quick-start"
              className="inline-flex items-center gap-2 text-sm text-axe-cyan hover:text-axe-cyan-light transition-colors"
            >
              Quick start
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs/changelog"
              className="inline-flex items-center gap-2 text-sm text-axe-cyan hover:text-axe-cyan-light transition-colors"
            >
              Release notes
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/mirror"
              className="inline-flex items-center gap-2 text-sm text-axe-cyan hover:text-axe-cyan-light transition-colors"
            >
              AXe Mirror for iPhone and iPad
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contributing */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-border rounded-2xl border border-axe-dark-600/50 bg-gradient-to-br from-axe-dark-300/50 to-axe-dark-200/30 p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full bg-axe-cyan/5 blur-[80px]" />
              <div className="absolute -top-20 -left-20 w-[200px] h-[200px] rounded-full bg-axe-blue/5 blur-[60px]" />
            </div>
            <CircuitDecoration className="absolute top-0 left-0 w-32 h-32 opacity-20" />
            <CircuitDecoration className="absolute bottom-0 right-0 w-32 h-32 opacity-20 rotate-180" />
            <div className="relative">
              <Image src="/icon.png" alt="AXe" width={64} height={64} className="w-16 h-16 mx-auto rounded-xl icon-glow mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Open source, community driven</h2>
              <p className="text-axe-text-secondary text-lg max-w-xl mx-auto mb-8">
                AXe is open source under the GPL version 3 and welcomes contributions. Help shape the future of iOS
                automation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://github.com/cameroncooke/AXe/issues"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-axe-cyan-deep hover:bg-axe-cyan text-white font-medium transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  <Github className="w-4 h-4" />
                  View Issues
                </Link>
                <Link
                  href="/docs/contributing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-axe-dark-600 hover:border-axe-cyan/30 text-axe-text-primary hover:bg-axe-dark-400/50 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  Contributing Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-axe-dark-600/30 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              <Image src="/icon.png" alt="AXe" width={20} height={20} className="w-5 h-5 rounded icon-glow" />
              <Image src="/axe-text.png" alt="AXe" width={791} height={315} className="h-5 w-auto" />
              <span className="text-sm text-axe-text-muted ml-2">&copy; {new Date().getFullYear()} Cameron Cooke</span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/mirror" className="text-sm text-axe-text-muted hover:text-axe-cyan transition-colors">
                AXe Mirror
              </Link>
              <Link
                href="/docs"
                className="text-sm text-axe-text-muted hover:text-axe-cyan transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Docs
              </Link>
              <Link
                href="https://github.com/cameroncooke/AXe"
                className="text-sm text-axe-text-muted hover:text-axe-cyan transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </Link>
              <Link
                href="https://buymeacoffee.com/cameroncooke"
                className="text-sm text-axe-text-muted hover:text-axe-cyan transition-colors"
              >
                Support
              </Link>
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
