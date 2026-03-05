import type React from "react"
import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://axe-cli.com"),
  title: "AXe - iOS Simulator Automation via Accessibility APIs",
  description:
    "A comprehensive CLI tool for automating iOS Simulators using Apple's Accessibility APIs and HID functionality. Single binary, no servers, no dependencies.",
  openGraph: {
    title: "AXe - iOS Simulator Automation via Accessibility APIs",
    description:
      "A comprehensive CLI tool for automating iOS Simulators using Apple's Accessibility APIs and HID functionality. Single binary, no servers, no dependencies.",
    type: "website",
    url: "https://axe-cli.com",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "AXe CLI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AXe - iOS Simulator Automation via Accessibility APIs",
    description:
      "A comprehensive CLI tool for automating iOS Simulators using Apple's Accessibility APIs and HID functionality. Single binary, no servers, no dependencies.",
    images: ["/banner.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&family=Roboto+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
