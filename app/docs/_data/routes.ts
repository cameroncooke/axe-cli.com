import type { IconName } from "../_components/icons"

export type DocSlug =
  | "introduction"
  | "whats-new"
  | "installation"
  | "quick-start"
  | "cli"
  | "output-and-errors"
  | "command-reference"
  | "accessibility-targeting"
  | "gestures"
  | "keyboard-input"
  | "batch"
  | "screenshots-video"
  | "settings"
  | "physical-devices"
  | "iphone-duo"
  | "agent-mode"
  | "agent-skills"
  | "autonomous-agent"
  | "troubleshooting"
  | "changelog"
  | "contributing"
  | "testing"

export interface DocRoute {
  slug: DocSlug
  title: string
  description: string
  group: string
}

export interface SidebarItem {
  slug: DocSlug
}

export interface SidebarGroup {
  label: string
  icon: IconName
  items: SidebarItem[]
}

export const PAGES_ORDER: DocSlug[] = [
  "introduction",
  "whats-new",
  "installation",
  "quick-start",
  "cli",
  "output-and-errors",
  "command-reference",
  "accessibility-targeting",
  "gestures",
  "keyboard-input",
  "batch",
  "screenshots-video",
  "settings",
  "physical-devices",
  "iphone-duo",
  "agent-mode",
  "agent-skills",
  "autonomous-agent",
  "troubleshooting",
  "changelog",
  "contributing",
  "testing",
]

export const PAGE_META: Record<DocSlug, DocRoute> = {
  introduction: {
    slug: "introduction",
    title: "Introduction",
    group: "Overview",
    description:
      "AXe is a single-binary CLI that automates iOS simulators, including the dual-screen iPhone Duo simulator, and connected iPhones and iPads, with an agent mode for AI agents.",
  },
  "whats-new": {
    slug: "whats-new",
    title: "What's New in AXe 2",
    group: "Overview",
    description: "Physical devices, the iPhone Duo simulator, agent mode, structured output, device settings and much faster input.",
  },
  installation: {
    slug: "installation",
    title: "Installation",
    group: "Getting Started",
    description: "Install AXe with Homebrew, add the AI skill, and check that a simulator or device is ready.",
  },
  "quick-start": {
    slug: "quick-start",
    title: "Quick Start",
    group: "Getting Started",
    description: "Find a simulator or device, read the UI, tap, type and capture the result.",
  },
  cli: {
    slug: "cli",
    title: "CLI Basics",
    group: "Usage",
    description: "How AXe commands, UDIDs, coordinates, input routes and cancellation fit together.",
  },
  "output-and-errors": {
    slug: "output-and-errors",
    title: "Output & Errors",
    group: "Usage",
    description: "Text output, --output json result envelopes, --verbose receipts, typed error codes and JSON Schemas.",
  },
  "command-reference": {
    slug: "command-reference",
    title: "Command Reference",
    group: "Usage",
    description: "Every AXe command with its options, defaults and where it runs.",
  },
  "accessibility-targeting": {
    slug: "accessibility-targeting",
    title: "Reading & Tapping",
    group: "Usage",
    description: "Read the accessibility tree, tap by selector or point, wait for elements, long press and double tap.",
  },
  gestures: {
    slug: "gestures",
    title: "Swipes, Gestures & Drawing",
    group: "Usage",
    description: "Swipes, scroll-until, gesture presets, pinch, rotate, two-finger gestures, drags and drawing.",
  },
  "keyboard-input": {
    slug: "keyboard-input",
    title: "Keyboard & Text Input",
    group: "Usage",
    description: "Type text, press key codes, run key sequences and send modifier shortcuts.",
  },
  batch: {
    slug: "batch",
    title: "Batch Automation",
    group: "Usage",
    description: "Run several input steps in order in one AXe command.",
  },
  "screenshots-video": {
    slug: "screenshots-video",
    title: "Screenshots & Video",
    group: "Usage",
    description: "Capture PNGs, record MP4s, stream frames and native H.264, and follow folds and rotations.",
  },
  settings: {
    slug: "settings",
    title: "Device Settings",
    group: "Usage",
    description: "Change appearance, text size, accessibility settings, VoiceOver, simulated location and the status bar.",
  },
  "physical-devices": {
    slug: "physical-devices",
    title: "Physical iPhone & iPad",
    group: "Devices",
    description: "Automate connected iPhones and iPads with the same commands you use on simulators.",
  },
  "iphone-duo": {
    slug: "iphone-duo",
    title: "iPhone Duo Simulator",
    group: "Devices",
    description: "Drive the dual-screen iPhone Duo simulator: screens, hinge, rotation and screen-selected input.",
  },
  "agent-mode": {
    slug: "agent-mode",
    title: "Agent Mode",
    group: "AI Agents",
    description: "Checked, stateful UI control for AI agents: compact captures with refs, guarded actions and the settled screen in every reply.",
  },
  "agent-skills": {
    slug: "agent-skills",
    title: "AI Skill",
    group: "AI Agents",
    description: "Install the AXe skill for Claude Code, Codex and other agents, from the binary or a plugin marketplace.",
  },
  "autonomous-agent": {
    slug: "autonomous-agent",
    title: "Autonomous Agent",
    group: "AI Agents",
    description: "Reach a plain-language goal on a simulator with axe agent, one checked action at a time.",
  },
  troubleshooting: {
    slug: "troubleshooting",
    title: "Troubleshooting",
    group: "Guides",
    description: "Common AXe failures, what their error codes mean and how to fix them.",
  },
  changelog: {
    slug: "changelog",
    title: "Changelog",
    group: "Guides",
    description: "AXe releases from GitHub.",
  },
  contributing: {
    slug: "contributing",
    title: "Contributing",
    group: "Contributing",
    description: "Build AXe from source and understand the project layout.",
  },
  testing: {
    slug: "testing",
    title: "Testing",
    group: "Contributing",
    description: "Unit tests, release checks, the Playground end-to-end matrix and the physical device suite.",
  },
}

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  { label: "Overview", icon: "Home", items: [{ slug: "introduction" }, { slug: "whats-new" }] },
  { label: "Getting Started", icon: "Rocket", items: [{ slug: "installation" }, { slug: "quick-start" }] },
  {
    label: "Usage",
    icon: "Terminal",
    items: [
      { slug: "cli" },
      { slug: "output-and-errors" },
      { slug: "command-reference" },
      { slug: "accessibility-targeting" },
      { slug: "gestures" },
      { slug: "keyboard-input" },
      { slug: "batch" },
      { slug: "screenshots-video" },
      { slug: "settings" },
    ],
  },
  { label: "Devices", icon: "Smartphone", items: [{ slug: "physical-devices" }, { slug: "iphone-duo" }] },
  {
    label: "AI Agents",
    icon: "Sparkles",
    items: [{ slug: "agent-mode" }, { slug: "agent-skills" }, { slug: "autonomous-agent" }],
  },
  { label: "Guides", icon: "FileText", items: [{ slug: "troubleshooting" }, { slug: "changelog" }] },
  { label: "Contributing", icon: "Github", items: [{ slug: "contributing" }, { slug: "testing" }] },
]

export function isDocSlug(value: string): value is DocSlug {
  return (PAGES_ORDER as string[]).includes(value)
}

export function docPath(slug: DocSlug): string {
  return slug === "introduction" ? "/docs" : `/docs/${slug}`
}

export function neighbors(slug: DocSlug): { prev: DocRoute | null; next: DocRoute | null } {
  const idx = PAGES_ORDER.indexOf(slug)
  const prev = idx > 0 ? PAGE_META[PAGES_ORDER[idx - 1]] : null
  const next = idx < PAGES_ORDER.length - 1 ? PAGE_META[PAGES_ORDER[idx + 1]] : null
  return { prev, next }
}
