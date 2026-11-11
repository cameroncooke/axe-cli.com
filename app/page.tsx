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
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, type ReactNode } from "react"

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

export default function AXeLanding() {
  const [githubStats, setGithubStats] = useState<GitHubStats>({ stars: 0, forks: 0 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const navItems = [
    { label: "Features", href: "#features" },
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
          <Link
            href="/docs/whats-new"
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-axe-cyan/20 bg-axe-dark-400/50 text-sm text-axe-text-secondary hover:border-axe-cyan/40 hover:text-axe-text-primary transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-axe-cyan animate-pulse" />
            AXe 2: physical devices, iPhone Duo simulator and agent mode
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="mb-8 flex items-center justify-center gap-3">
            <Image src="/icon.png" alt="AXe" width={96} height={96} className="w-24 h-24 rounded-2xl icon-glow" />
            <Image src="/axe-text.png" alt="AXe" width={791} height={315} className="h-16 sm:h-20 w-auto" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            iOS automation
            <br />
            <span className="bg-gradient-to-r from-axe-cyan via-axe-blue to-axe-purple bg-clip-text text-transparent">
              for simulators, devices &amp; agents
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-axe-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            One CLI for iOS simulators, including the dual-screen iPhone Duo simulator, and connected iPhones and iPads. Read the
            accessibility tree, tap, type, swipe and draw, capture screenshots and video, and change device settings.
            Agent mode gives AI agents checked, stateful control of the UI.
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
            {["MIT Licensed", "Single Binary", "Simulators & Devices", "Xcode 26 & 27", "AI Agent Ready"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-axe-cyan" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Runs on */}
      <section className="pb-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-axe-text-muted mb-6">One set of commands, one set of error codes, every target</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: Smartphone,
                title: "iOS Simulator",
                desc: "iPhone and iPad simulators on Xcode 26 and 27, in every orientation.",
              },
              {
                icon: Columns2,
                title: "iPhone Duo Simulator",
                desc: "Both screens of the dual-screen iPhone Duo simulator, in every fold and orientation, with hinge control.",
              },
              {
                icon: Tablet,
                title: "iPhone & iPad",
                desc: "Connected devices over Xcode's CoreDevice. Pass the hardware UDID to the same commands.",
              },
            ].map((target) => (
              <div
                key={target.title}
                className="flex items-start gap-4 p-5 rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/50"
              >
                <div className="w-10 h-10 rounded-lg bg-axe-cyan/10 flex items-center justify-center shrink-0">
                  <target.icon className="w-5 h-5 text-axe-cyan" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{target.title}</h3>
                  <p className="text-sm text-axe-text-secondary leading-relaxed">{target.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need for
              <span className="text-axe-cyan"> iOS automation</span>
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
                desc: "Run many input steps in one command and one input session, with selector waiting between steps.",
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
              <Pill tone="green">New in AXe 2</Pill>
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
            <Pill tone="green">New in AXe 2</Pill>
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
              <Zap className="w-3 h-3" /> Faster in AXe 2
            </Pill>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simulator input in <span className="text-axe-cyan">milliseconds</span>
            </h2>
            <p className="text-axe-text-secondary text-lg max-w-2xl mx-auto">
              Measured on an iPhone 18 Pro simulator against AXe 1.8.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Tap", now: "0.08 s", before: "about 1 s" },
              { label: "Drag", now: "0.9 s", before: "2.5 s" },
              { label: "describe-ui", now: "0.3 s", before: "1.1 to 1.9 s" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="card-glow p-6 rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/50 text-center"
              >
                <div className="text-sm text-axe-text-muted mb-2 font-mono">{stat.label}</div>
                <div className="text-4xl font-bold text-axe-cyan neon-glow mb-2">{stat.now}</div>
                <div className="text-sm text-axe-text-secondary">was {stat.before}</div>
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
              Practical iOS automation for terminals, scripts, CI jobs and AI agents.
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
                desc: "Agent mode, a bundled skill and plugin marketplaces make AXe the iOS hands for your coding agent.",
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
              href="/docs/whats-new"
              className="inline-flex items-center gap-2 text-sm text-axe-cyan hover:text-axe-cyan-light transition-colors"
            >
              What&apos;s new in AXe 2
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
                AXe is MIT licensed and welcomes contributions. Help shape the future of iOS automation.
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
