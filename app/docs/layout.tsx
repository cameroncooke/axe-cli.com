import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { DocsThemeScript } from "./_components/theme-script"
import "./_styles/docs.css"

export const metadata: Metadata = {
  title: {
    default: "AXe Docs",
    template: "%s · AXe Docs",
  },
  description:
    "Documentation for AXe, a CLI that automates iOS simulators, including the iPhone Duo simulator, and connected iPhones and iPads, with an agent mode for AI agents.",
  openGraph: {
    title: "AXe Docs",
    description: "Documentation for AXe: iOS automation for simulators, devices and AI agents.",
    type: "website",
    url: "https://axe-cli.com/docs",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#07090F" },
  ],
}

export const revalidate = 3600

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsThemeScript />
      {children}
    </>
  )
}
