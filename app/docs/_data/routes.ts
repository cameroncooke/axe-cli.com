import type { IconName } from "../_components/icons"

export type DocSlug =
  | "introduction"
  | "installation"
  | "quick-start"
  | "cli"
  | "command-reference"
  | "batch"
  | "accessibility-targeting"
  | "keyboard-input"
  | "screenshots-video"
  | "agent-skills"
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
  "installation",
  "quick-start",
  "cli",
  "command-reference",
  "batch",
  "accessibility-targeting",
  "keyboard-input",
  "screenshots-video",
  "agent-skills",
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
    description: "AXe is a single-binary CLI for automating iOS Simulators with Accessibility and HID input.",
  },
  installation: {
    slug: "installation",
    title: "Installation",
    group: "Getting Started",
    description: "Install AXe with Homebrew or build it from source.",
  },
  "quick-start": {
    slug: "quick-start",
    title: "Quick Start",
    group: "Getting Started",
    description: "Find a simulator, inspect the UI, interact with controls, and capture the result.",
  },
  cli: {
    slug: "cli",
    title: "CLI",
    group: "Usage",
    description: "How AXe commands, UDIDs, timing flags, and cancellation behavior fit together.",
  },
  "command-reference": {
    slug: "command-reference",
    title: "Command Reference",
    group: "Usage",
    description: "A concise reference for every AXe command and the most important flags.",
  },
  batch: {
    slug: "batch",
    title: "Batch Automation",
    group: "Usage",
    description: "Run supported interaction steps in one AXe invocation.",
  },
  "accessibility-targeting": {
    slug: "accessibility-targeting",
    title: "Accessibility Targeting",
    group: "Usage",
    description: "Prefer stable accessibility selectors over brittle coordinates.",
  },
  "keyboard-input": {
    slug: "keyboard-input",
    title: "Keyboard & Text Input",
    group: "Usage",
    description: "Type text, press key codes, and send key combinations.",
  },
  "screenshots-video": {
    slug: "screenshots-video",
    title: "Screenshots & Video",
    group: "Usage",
    description: "Capture PNGs, record MP4 files, or stream simulator frames.",
  },
  "agent-skills": {
    slug: "agent-skills",
    title: "Agent Skills",
    group: "Usage",
    description: "Install AXe skill files so AI coding agents know how to drive simulators.",
  },
  troubleshooting: {
    slug: "troubleshooting",
    title: "Troubleshooting",
    group: "Guides",
    description: "Common AXe failures and the fastest fixes.",
  },
  changelog: {
    slug: "changelog",
    title: "Changelog",
    group: "Guides",
    description: "Recent AXe releases from GitHub.",
  },
  contributing: {
    slug: "contributing",
    title: "Contributing",
    group: "Contributing",
    description: "Build AXe locally and understand the project layout.",
  },
  testing: {
    slug: "testing",
    title: "Testing",
    group: "Contributing",
    description: "Run unit and opt-in simulator E2E tests.",
  },
}

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  { label: "Overview", icon: "Home", items: [{ slug: "introduction" }] },
  { label: "Getting Started", icon: "Rocket", items: [{ slug: "installation" }, { slug: "quick-start" }] },
  {
    label: "Usage",
    icon: "Terminal",
    items: [
      { slug: "cli" },
      { slug: "command-reference" },
      { slug: "batch" },
      { slug: "accessibility-targeting" },
      { slug: "keyboard-input" },
      { slug: "screenshots-video" },
      { slug: "agent-skills" },
    ],
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
