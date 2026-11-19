import type { Metadata } from "next"
import Link from "next/link"
import { MirrorPage } from "./_components/mirror-page"

const TITLE = "AXe Mirror - see and touch your iOS Simulator from an iPhone or iPad"
const DESCRIPTION =
  "AXe Mirror is a free companion app for the AXe command-line tool. It shows an iOS Simulator running on your Mac on an iPhone or iPad and sends your touches back."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://axe-cli.com/mirror",
  },
}

export default function MirrorLandingPage() {
  return (
    <MirrorPage
      eyebrow="Free on the App Store"
      title="AXe Mirror"
      lede="AXe Mirror lets you see and touch an iOS Simulator running on your Mac from an iPhone or iPad. It is a free companion app for the AXe command-line tool. The simulator's screen is sent to your device as video, and your touches are sent back."
    >
      <h2>Get started</h2>
      <ol>
        <li>
          Get <a href="https://apps.apple.com/app/id6836545597">AXe Mirror on the App Store</a>. It is free.
        </li>
        <li>
          Install <Link href="/docs/installation">AXe</Link> on an Apple silicon Mac.
        </li>
        <li>
          Run <code>axe mirror pair</code> on the Mac and scan the code with the app.
        </li>
        <li>
          Run <code>axe mirror --udid &lt;UDID&gt;</code> to show a booted simulator in the app.
        </li>
      </ol>

      <h2>Try it without a Mac</h2>
      <p>
        The app has a <strong>Try the demo</strong> button. It connects to a demo simulator run by the AXe project, so
        it needs no Mac.
      </p>

      <h2>Learn more</h2>
      <ul>
        <li>
          <Link href="/docs/mirror">Documentation</Link>: the commands, how the connection works and security.
        </li>
        <li>
          <Link href="/mirror/support">Support</Link>: requirements, pairing and troubleshooting.
        </li>
        <li>
          <Link href="/mirror/privacy">Privacy policy</Link>: what the app stores and how your data travels.
        </li>
      </ul>
    </MirrorPage>
  )
}
