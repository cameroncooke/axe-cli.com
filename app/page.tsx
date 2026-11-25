"use client"

import {
  Github,
  Download,
  Terminal,
  Copy,
  CheckCircle,
  Menu,
  X,
  Smartphone,
  ArrowRight,
  BookOpen,
  Timer,
  Bot,
  Sparkles,
  Play,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, type ReactNode } from "react"
import { AppStoreBadge, GetTheApp } from "./_components/app-store-badge"
import { MediaCard } from "./_components/media"

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


export default function AXeLanding() {
  const [githubStats, setGithubStats] = useState<GitHubStats>({ stars: 0, forks: 0 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const navItems = [
    { label: "UI automation", href: "/automation" },
    { label: "Mirror", href: "/mirror" },
    { label: "Builds", href: "/builds" },
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

          <div className="mb-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
            <AppStoreBadge />
            <p className="text-sm text-axe-text-secondary">
              AXe Mirror, the companion app for iPhone and iPad.
              <br className="hidden sm:block" /> Free, with no account.
            </p>
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
              href="/automation"
              cta="More about UI automation"
            >
              <p>
                AXe reads the screen and uses the app, so your agent can check what it has just built. The same commands
                run in your scripts and CI jobs.
              </p>
            </MediaCard>
            <MediaCard
              clip="mirror"
              label="An iPhone Duo with a coding agent on the left and a live simulator on the right. A small Mac in the corner shows the same simulator following each touch."
              eyebrow="Mirror"
              title="Your simulator, in your hand"
              href="/mirror"
              cta="More about Mirror"
              footer={<AppStoreBadge small />}
            >
              <p>
                The simulator your agent is using, live on your iPhone or iPad, with your touches sent back. Leave your
                desk and keep watching, touching and steering.
              </p>
            </MediaCard>
            <MediaCard
              clip="builds"
              label="AXe Mirror on an iPhone Duo offers a new build of an app with an Install button. It is installed, and the real app opens beside the agent."
              eyebrow="Builds"
              title="The real app, on your phone"
              href="/builds"
              cta="More about Builds"
              footer={<AppStoreBadge small />}
            >
              <p>
                One command builds your app and signs it for your devices. Tap Install in AXe Mirror, and it is on the
                phone in your hand.
              </p>
            </MediaCard>
          </div>
        </div>
      </section>

      {/* Underneath */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              A plain command <span className="text-axe-cyan">underneath</span>
            </h2>
            <p className="text-axe-text-secondary text-lg max-w-2xl mx-auto">
              Everything AXe does is a command you can type, script or hand to an agent.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Timer, title: "A tap in 80 ms", desc: "Simulator input fast enough to feel live." },
              { icon: Terminal, title: "Scripts and CI", desc: "One binary, typed JSON results and error codes to branch on." },
              { icon: Smartphone, title: "Simulators and devices", desc: "iPhone and iPad simulators, the iPhone Duo simulator and connected devices." },
              { icon: Bot, title: "Any agent", desc: "A bundled skill teaches yours. No model or API key." },
            ].map((fact) => (
              <div key={fact.title} className="card-glow rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/50 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-axe-cyan/10">
                  <fact.icon className="h-5 w-5 text-axe-cyan" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{fact.title}</h3>
                <p className="text-sm leading-relaxed text-axe-text-secondary">{fact.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/automation" className="inline-flex items-center gap-2 text-sm text-axe-cyan transition-colors hover:text-axe-cyan-light">
              More about UI automation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
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

          <div className="mt-6">
            <GetTheApp>
              Then get AXe Mirror on your iPhone or iPad, for your simulator in your hand and your builds on your phone.
              It is free, with no account.
            </GetTheApp>
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
