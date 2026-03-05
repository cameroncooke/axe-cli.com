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
  Hand,
  Eye,
  Keyboard,
  Camera,
  Video,
  Layers,
  ArrowRight,
  BookOpen,
  Accessibility,
  MousePointerClick,
  Timer,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

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

export default function AXeLanding() {
  const [githubStats, setGithubStats] = useState<GitHubStats>({ stars: 0, forks: 0 })
  const [latestVersion, setLatestVersion] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [activeInstallTab, setActiveInstallTab] = useState<"homebrew" | "source">("homebrew")

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
        const [statsResponse, versionResponse] = await Promise.all([
          fetch("/api/github-stats"),
          fetch("/api/github-version"),
        ])
        if (statsResponse.ok) {
          const stats = await statsResponse.json()
          setGithubStats(stats)
        }
        if (versionResponse.ok) {
          const { version } = await versionResponse.json()
          if (version) setLatestVersion(version)
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

  return (
    <div className="min-h-screen bg-axe-dark-100 text-axe-text-primary circuit-bg">
      {/* Header */}
      <header className="border-b border-axe-dark-600/50 bg-axe-dark-100/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="#" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Image
                src="/icon.png"
                alt="AXe"
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg icon-glow"
              />
              <Image
                src="/axe-text.png"
                alt="AXe"
                width={791}
                height={315}
                className="h-6 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {["Features", "Examples", "Batch Automation", "Get Started"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-axe-text-secondary hover:text-axe-cyan transition-colors"
                >
                  {item}
                </a>
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
                className="md:hidden p-2 text-axe-text-secondary hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden pb-6 border-t border-axe-dark-600/50 pt-4">
              <nav className="flex flex-col gap-4">
                {["Features", "Examples", "Batch Automation", "Get Started"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-axe-text-secondary hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-36 lg:pb-32 circuit-lines">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-axe-cyan/8 blur-[120px] animate-glow-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-axe-blue/5 blur-[100px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-axe-purple/5 blur-[80px] animate-glow-pulse" style={{ animationDelay: "4s" }} />
        </div>

        <CircuitDecoration className="absolute top-10 left-10 w-40 h-40 opacity-50" />
        <CircuitDecoration className="absolute bottom-10 right-10 w-40 h-40 opacity-50 rotate-180" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-axe-cyan/20 bg-axe-dark-400/50 text-sm text-axe-text-secondary">
            <span className="w-2 h-2 rounded-full bg-axe-cyan animate-pulse" />
            {latestVersion ? `${latestVersion} available now` : "available now"}
          </div>

          <div className="mb-8 flex items-center justify-center gap-3">
            <Image
              src="/icon.png"
              alt="AXe"
              width={96}
              height={96}
              className="w-24 h-24 rounded-2xl icon-glow"
            />
            <Image
              src="/axe-text.png"
              alt="AXe"
              width={791}
              height={315}
              className="h-16 sm:h-20 w-auto"
            />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            iOS Simulator
            <br />
            <span className="bg-gradient-to-r from-axe-cyan via-axe-blue to-axe-purple bg-clip-text text-transparent">
              automation
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-axe-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            A comprehensive CLI tool for automating iOS Simulators using Apple&apos;s Accessibility APIs and HID
            functionality. Single binary, no servers, no external dependencies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-axe-cyan-deep hover:bg-axe-cyan text-white font-medium transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              <Download className="w-4 h-4" />
              Get Started
            </a>
            <Link
              href="https://github.com/cameroncooke/AXe"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-axe-dark-600 hover:border-axe-cyan/30 text-axe-text-primary hover:bg-axe-dark-400/50 transition-all"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-axe-text-muted">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-axe-cyan" />
              MIT Licensed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-axe-cyan" />
              Single Binary
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-axe-cyan" />
              macOS 14+
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-axe-cyan" />
              AI Agent Ready
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need for
              <span className="text-axe-cyan"> simulator automation</span>
            </h2>
            <p className="text-axe-text-secondary text-lg max-w-2xl mx-auto">
              Complete control over iOS Simulators through accessibility APIs and HID input.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: MousePointerClick,
                title: "Touch & Gestures",
                desc: "Precise tap events, swipe gestures, and low-level touch down/up events. Tap by coordinates, accessibility ID, or label.",
                color: "text-axe-cyan",
                bg: "bg-axe-cyan/10",
              },
              {
                icon: Keyboard,
                title: "Text & Keyboard Input",
                desc: "Comprehensive text typing with automatic shift handling. Individual key presses, key sequences, and key combos like Cmd+A.",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
              },
              {
                icon: Smartphone,
                title: "Hardware Buttons",
                desc: "Simulate Home, Lock/Power, Side, Siri, and Apple Pay buttons with configurable duration and timing controls.",
                color: "text-purple-400",
                bg: "bg-purple-400/10",
              },
              {
                icon: Camera,
                title: "Screenshots & Streaming",
                desc: "PNG screenshot capture and real-time streaming at 1-30 FPS in multiple formats including MJPEG and raw JPEG.",
                color: "text-green-400",
                bg: "bg-green-400/10",
              },
              {
                icon: Video,
                title: "Video Recording",
                desc: "H.264 MP4 video recording with hardware-friendly encoding. Configurable quality and scale factors.",
                color: "text-orange-400",
                bg: "bg-orange-400/10",
              },
              {
                icon: Eye,
                title: "Accessibility Inspection",
                desc: "Extract full accessibility information from any screen. Query accessibility at specific coordinates for precise automation.",
                color: "text-yellow-400",
                bg: "bg-yellow-400/10",
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
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-xs font-medium bg-axe-cyan/10 text-axe-cyan border border-axe-cyan/20">
                Simple & Powerful
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Intuitive <span className="text-axe-cyan">CLI</span> commands
              </h2>
              <p className="text-axe-text-secondary text-lg mb-6 leading-relaxed">
                Every interaction is a simple command. Tap, swipe, type, capture screenshots, and
                record video &mdash; all from your terminal.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "No server setup or background daemons required",
                  "Built-in gesture presets for common interactions",
                  "Pre/post delay controls for precise timing",
                  "Pipe text input via stdin for flexible scripting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-axe-text-secondary">
                    <CheckCircle className="w-4 h-4 text-axe-cyan mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="terminal-glow rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/80 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-axe-dark-600/50 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs text-axe-text-muted ml-2 font-mono">Terminal</span>
                </div>
                <div className="p-5 font-mono text-sm space-y-4">
                  <div>
                    <div className="text-axe-text-muted text-xs mb-1"># Tap at coordinates</div>
                    <span className="text-axe-cyan">$</span>{" "}
                    <span className="text-axe-text-primary">axe tap -x 200 -y 400 --udid &lt;UDID&gt;</span>
                  </div>
                  <div>
                    <div className="text-axe-text-muted text-xs mb-1"># Tap by accessibility label</div>
                    <span className="text-axe-cyan">$</span>{" "}
                    <span className="text-axe-text-primary">axe tap --label &quot;Sign In&quot; --udid &lt;UDID&gt;</span>
                  </div>
                  <div>
                    <div className="text-axe-text-muted text-xs mb-1"># Type text into focused field</div>
                    <span className="text-axe-cyan">$</span>{" "}
                    <span className="text-axe-text-primary">axe type &quot;hello@example.com&quot; --udid &lt;UDID&gt;</span>
                  </div>
                  <div>
                    <div className="text-axe-text-muted text-xs mb-1"># Use a gesture preset</div>
                    <span className="text-axe-cyan">$</span>{" "}
                    <span className="text-axe-text-primary">axe gesture scroll-down --udid &lt;UDID&gt;</span>
                  </div>
                  <div>
                    <div className="text-axe-text-muted text-xs mb-1"># Capture screenshot</div>
                    <span className="text-axe-cyan">$</span>{" "}
                    <span className="text-axe-text-primary">axe screenshot --output screen.png --udid &lt;UDID&gt;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Batch Automation */}
      <section id="batch-automation" className="py-24 relative">
        <CircuitDecoration className="absolute bottom-10 left-0 w-32 h-32 opacity-40 rotate-90" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="terminal-glow rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/80 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-axe-dark-600/50 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs text-axe-text-muted ml-2 font-mono">login-flow.steps</span>
                </div>
                <pre className="p-5 font-mono text-xs text-axe-text-primary leading-relaxed overflow-x-auto">{`# Tap the email field and enter address
tap --label "Email"
type "user@example.com"

# Tap the password field and enter password
tap --label "Password"
type "s3cureP@ss"

# Submit and capture result
tap --label "Sign In"
sleep 2
screenshot --output result.png`}</pre>
              </div>

              <div className="mt-4 terminal-glow rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/80 p-4">
                <div className="font-mono text-sm">
                  <span className="text-axe-cyan">$</span>{" "}
                  <span className="text-axe-text-primary">axe batch --file login-flow.steps --udid &lt;UDID&gt;</span>
                </div>
                <div className="mt-3 text-xs space-y-1">
                  <div className="text-green-400">Step 1/8: tap --label &quot;Email&quot; ... OK</div>
                  <div className="text-green-400">Step 2/8: type ... OK</div>
                  <div className="text-green-400">Step 3/8: tap --label &quot;Password&quot; ... OK</div>
                  <div className="text-green-400">Step 4/8: type ... OK</div>
                  <div className="text-green-400">Step 5/8: tap --label &quot;Sign In&quot; ... OK</div>
                  <div className="text-green-400">Step 6/8: sleep 2 ... OK</div>
                  <div className="text-green-400">Step 7/8: screenshot ... OK</div>
                  <div className="text-axe-cyan mt-2 neon-glow">All steps completed successfully.</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20">
                {latestVersion ? `New in ${latestVersion}` : "New"}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-axe-cyan">Batch</span> automation
              </h2>
              <p className="text-axe-text-secondary text-lg mb-6 leading-relaxed">
                Execute multi-step interaction workflows in a single invocation. Perfect for login flows,
                form filling, and complex UI navigation.
              </p>
              <ul className="space-y-3">
                {[
                  "Sequential execution across multi-screen flows",
                  "Built-in sleep delays between steps",
                  "Accessibility caching for faster execution",
                  "Fail-fast or best-effort execution modes",
                  "Configurable text submission strategies",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-axe-text-secondary">
                    <CheckCircle className="w-4 h-4 text-axe-cyan mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Integration */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-axe-dark-200/50 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built for <span className="text-axe-cyan">AI agents</span>
            </h2>
            <p className="text-axe-text-secondary text-lg max-w-2xl mx-auto">
              Native integration with AI coding assistants for autonomous iOS simulator testing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card-glow relative rounded-2xl border border-axe-dark-600/50 bg-gradient-to-br from-axe-dark-300/80 to-axe-dark-200/50 p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-axe-cyan/5 rounded-full blur-[60px]" />
              <CircuitDecoration className="absolute -top-4 -right-4 w-24 h-24 opacity-30" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-xs font-medium bg-axe-cyan/10 text-axe-cyan border border-axe-cyan/20">
                  AI Skills
                </div>
                <h3 className="text-2xl font-bold mb-4">One command setup</h3>
                <p className="text-axe-text-secondary mb-6 leading-relaxed">
                  Run <code className="text-axe-cyan font-mono text-sm">axe init</code> to install AI skill
                  files into <code className="text-axe-cyan font-mono text-sm">~/.claude/skills</code> and <code className="text-axe-cyan font-mono text-sm">~/.agents/skills</code>.
                  Your AI assistant instantly learns how to automate simulators.
                </p>
                <div className="rounded-lg bg-axe-dark-100 p-4 font-mono text-sm border border-axe-dark-600/30">
                  <div>
                    <span className="text-axe-cyan">$</span>{" "}
                    <span className="text-axe-text-primary">axe init</span>
                  </div>
                  <div className="text-green-400 text-xs mt-2">
                    Installed AXe skill to ~/.claude/skills
                  </div>
                  <div className="text-green-400 text-xs">
                    Installed AXe skill to ~/.agents/skills
                  </div>
                </div>
              </div>
            </div>

            <div className="card-glow relative rounded-2xl border border-axe-dark-600/50 bg-gradient-to-br from-axe-dark-300/80 to-axe-dark-200/50 p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-axe-blue/5 rounded-full blur-[60px]" />
              <CircuitDecoration className="absolute -bottom-4 -left-4 w-24 h-24 opacity-30 rotate-180" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-xs font-medium bg-axe-blue/10 text-axe-blue border border-axe-blue/20">
                  Agent Example
                </div>
                <h3 className="text-2xl font-bold mb-4">Autonomous testing</h3>
                <p className="text-axe-text-secondary mb-6 leading-relaxed">
                  AI agents use AXe to interact with your running app &mdash; tapping buttons, filling
                  forms, capturing screenshots, and verifying UI state.
                </p>
                <div className="rounded-lg bg-axe-dark-100 p-4 text-sm space-y-2 border border-axe-dark-600/30">
                  <div className="font-mono">
                    <span className="text-axe-text-muted">&gt;</span>{" "}
                    <span className="text-axe-text-primary">Test the login flow in my app</span>
                  </div>
                  <div className="h-px bg-axe-dark-600/50" />
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-3 h-3 shrink-0" /> Tapped &quot;Email&quot; field
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-3 h-3 shrink-0" /> Typed test credentials
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-3 h-3 shrink-0" /> Tapped &quot;Sign In&quot; button
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-3 h-3 shrink-0" /> Captured screenshot of dashboard
                    </div>
                    <div className="h-px bg-axe-dark-600/50 my-1" />
                    <div className="text-axe-text-primary">
                      Login flow works correctly. The dashboard loads with the expected welcome message.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-axe-text-muted mb-6">Works with your favorite AI tools</p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-axe-text-muted">
              {["Claude Code", "Codex", "Cursor", "VS Code", "Shell Scripts"].map((client) => (
                <span key={client} className="text-sm font-medium text-axe-text-secondary hover:text-axe-cyan transition-colors">
                  {client}
                </span>
              ))}
            </div>
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
              A lightweight, focused alternative to idb for iOS Simulator UI automation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Zap,
                title: "Single Binary",
                desc: "No test runner or harness to install in the simulator. Works out of the box with any booted simulator.",
                color: "text-yellow-400",
                bg: "bg-yellow-400/10",
              },
              {
                icon: Terminal,
                title: "No Setup Required",
                desc: "No external frameworks to install, no servers to run. Works out of the box on macOS 14+.",
                color: "text-axe-cyan",
                bg: "bg-axe-cyan/10",
              },
              {
                icon: Timer,
                title: "Fast & Lightweight",
                desc: "Purpose-built for UI automation. Minimal overhead, maximum performance for simulator interactions.",
                color: "text-green-400",
                bg: "bg-green-400/10",
              },
              {
                icon: Hand,
                title: "Gesture Presets",
                desc: "Built-in presets for scroll, edge swipes, and common gestures. No coordinate math needed.",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
              },
              {
                icon: Layers,
                title: "Batch Execution",
                desc: "Run multi-step workflows in a single invocation. Dramatically reduces latency for complex flows.",
                color: "text-purple-400",
                bg: "bg-purple-400/10",
              },
              {
                icon: Accessibility,
                title: "Accessibility-First",
                desc: "Built on Apple's Accessibility APIs. Tap elements by label, not just coordinates.",
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

      {/* Installation Section */}
      <section id="get-started" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-axe-dark-200/50 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get started in seconds</h2>
            <p className="text-axe-text-secondary text-lg">
              Install AXe via Homebrew or build from source.
            </p>
          </div>

          <div className="terminal-glow rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/80 overflow-hidden">
            <div className="flex border-b border-axe-dark-600/50">
              {(["homebrew", "source"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveInstallTab(tab)}
                  className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                    activeInstallTab === tab
                      ? "text-white bg-axe-dark-400/50 border-b-2 border-axe-cyan"
                      : "text-axe-text-secondary hover:text-white"
                  }`}
                >
                  {tab === "homebrew" ? "Homebrew (recommended)" : "Build from Source"}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-6">
              {activeInstallTab === "homebrew" ? (
                <>
                  <div>
                    <p className="text-sm text-axe-text-secondary mb-3">Install via Homebrew:</p>
                    <div className="flex items-center gap-2 bg-axe-dark-100 rounded-lg p-3 font-mono text-sm border border-axe-dark-600/30">
                      <code className="text-green-400 flex-1">
                        brew tap cameroncooke/axe && brew install axe
                      </code>
                      <button
                        onClick={() => copyToClipboard("brew tap cameroncooke/axe && brew install axe", "brew")}
                        className="p-1.5 rounded hover:bg-axe-dark-400 transition-colors shrink-0"
                      >
                        {copiedText === "brew" ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-axe-text-muted" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-axe-text-secondary mb-3">Verify installation:</p>
                    <div className="flex items-center gap-2 bg-axe-dark-100 rounded-lg p-3 font-mono text-sm border border-axe-dark-600/30">
                      <code className="text-green-400 flex-1">axe --help</code>
                      <button
                        onClick={() => copyToClipboard("axe --help", "verify")}
                        className="p-1.5 rounded hover:bg-axe-dark-400 transition-colors shrink-0"
                      >
                        {copiedText === "verify" ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-axe-text-muted" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-axe-text-secondary mb-3">Clone and build:</p>
                    <div className="relative bg-axe-dark-100 rounded-lg p-4 font-mono text-sm border border-axe-dark-600/30">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            "git clone https://github.com/cameroncooke/AXe.git\ncd AXe\n./scripts/build.sh dev",
                            "source",
                          )
                        }
                        className="absolute top-3 right-3 p-1.5 rounded hover:bg-axe-dark-400 transition-colors"
                      >
                        {copiedText === "source" ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-axe-text-muted" />
                        )}
                      </button>
                      <pre className="text-green-400 text-xs sm:text-sm">{`git clone https://github.com/cameroncooke/AXe.git
cd AXe
./scripts/build.sh dev`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-axe-text-secondary mb-3">Run directly:</p>
                    <div className="flex items-center gap-2 bg-axe-dark-100 rounded-lg p-3 font-mono text-sm border border-axe-dark-600/30">
                      <code className="text-green-400 flex-1">swift run axe --help</code>
                      <button
                        onClick={() => copyToClipboard("swift run axe --help", "run")}
                        className="p-1.5 rounded hover:bg-axe-dark-400 transition-colors shrink-0"
                      >
                        {copiedText === "run" ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-axe-text-muted" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="https://github.com/cameroncooke/AXe"
              className="inline-flex items-center gap-2 text-sm text-axe-cyan hover:text-axe-cyan-light transition-colors"
            >
              View full documentation
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
              <Image
                src="/icon.png"
                alt="AXe"
                width={64}
                height={64}
                className="w-16 h-16 mx-auto rounded-xl icon-glow mb-6"
              />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Open source, community driven</h2>
              <p className="text-axe-text-secondary text-lg max-w-xl mx-auto mb-8">
                AXe is MIT licensed and welcomes contributions. Help shape the future of iOS Simulator automation.
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
                  href="https://github.com/cameroncooke/AXe"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-axe-dark-600 hover:border-axe-cyan/30 text-axe-text-primary hover:bg-axe-dark-400/50 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  Documentation
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
              <Image
                src="/icon.png"
                alt="AXe"
                width={20}
                height={20}
                className="w-5 h-5 rounded icon-glow"
              />
              <Image
                src="/axe-text.png"
                alt="AXe"
                width={791}
                height={315}
                className="h-5 w-auto"
              />
              <span className="text-sm text-axe-text-muted ml-2">&copy; {new Date().getFullYear()} Cameron Cooke</span>
            </div>

            <div className="flex items-center gap-6">
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
        </div>
      </footer>
    </div>
  )
}
