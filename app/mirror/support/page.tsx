import type { Metadata } from "next"
import Link from "next/link"
import { ISSUES_URL, MirrorPage } from "../_components/mirror-page"

const TITLE = "AXe Mirror Support"
const DESCRIPTION =
  "How to set up AXe Mirror, pair it with your Mac, fix common problems and get help."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://axe-cli.com/mirror/support",
  },
}

export default function MirrorSupportPage() {
  return (
    <MirrorPage
      title="Support"
      lede="AXe Mirror lets you see and touch an iOS Simulator running on your Mac from an iPhone or iPad. It is a free companion app for the AXe command-line tool, and it is on the App Store."
    >
      <h2>What you need</h2>
      <ul>
        <li>
          An Apple silicon Mac running macOS 14.5 or later, with <Link href="/docs/installation">AXe</Link> and
          Xcode&apos;s Simulator.
        </li>
        <li>An iPhone or iPad running iOS or iPadOS 17.5 or later, with the AXe Mirror app.</li>
      </ul>
      <p>
        You can also try the app without a Mac. The <strong>Try the demo</strong> button connects to a demo simulator run
        by the AXe project.
      </p>

      <h2>Pair the app with your Mac</h2>
      <ol>
        <li>
          On the Mac, run <code>axe remote pair</code>. It shows a QR code and a one-time code in the form{" "}
          <code>XXXXX-XXXXX</code>.
        </li>
        <li>In AXe Mirror, scan the QR code or type the code. The code works once, and for ten minutes.</li>
        <li>
          On the Mac, run <code>axe remote</code>, then tap your Mac in the app and choose a simulator. To show one
          simulator only, run <code>axe remote mirror --udid &lt;UDID&gt;</code> with the UDID of a booted simulator.
        </li>
      </ol>
      <p>
        You pair once. After that, the app can connect whenever <code>axe remote</code> is running. Press{" "}
        <code>Ctrl+C</code> on the Mac to stop.
      </p>

      <h2>Troubleshooting</h2>
      <ul>
        <li>
          <strong>The code has expired.</strong> Run <code>axe remote pair</code> again to get a new one.
        </li>
        <li>
          <strong>The app says &quot;not paired&quot;.</strong> Pair again, or run <code>axe remote devices</code> on the
          Mac to check that your device is in the list.
        </li>
        <li>
          <strong>The app cannot connect.</strong> Check that the Mac is awake and online, and that{" "}
          <code>axe remote</code> is running.
        </li>
        <li>
          <strong>The picture is laggy on the same Wi-Fi.</strong> A wired network connection for the Mac helps.
        </li>
      </ul>

      <h2>Get help</h2>
      <p>
        If something does not work, open an issue on the <a href={ISSUES_URL}>AXe GitHub repository</a>.
      </p>
      <p>
        For every command and option, see the <Link href="/docs/mirror">AXe Mirror documentation</Link>. For how the app
        handles your data, see the <Link href="/mirror/privacy">privacy policy</Link>.
      </p>
    </MirrorPage>
  )
}
