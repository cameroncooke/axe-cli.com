import type { Metadata } from "next"
import Link from "next/link"
import { AppStoreBadge } from "../_components/app-store-badge"
import { MirrorPage } from "../mirror/_components/mirror-page"
import { PairCode } from "./pair-code"

const TITLE = "Pair AXe Mirror with your Mac"
const DESCRIPTION = "This is an AXe Mirror pairing code. Open the AXe Mirror app to use it."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false },
}

// The QR code that `axe remote pair` prints holds this page's address with the code after `#`.
// Scanned inside AXe Mirror it pairs at once; scanned with the Camera app it opens this page.
export default function PairPage() {
  return (
    <MirrorPage
      eyebrow="AXe Mirror"
      title="Pair with your Mac"
      lede="You scanned an AXe Mirror pairing code with your camera. To use it, scan it from inside the AXe Mirror app."
    >
      <PairCode />
      <h2>What to do</h2>
      <ol>
        <li>
          Open <strong>AXe Mirror</strong> on this iPhone or iPad. If you do not have it yet, it is free on the App Store.
        </li>
        <li>
          Tap <strong>Pair with your Mac</strong>.
        </li>
        <li>
          Scan the QR code on your Mac again, or choose <strong>Type the code</strong> and enter the code.
        </li>
      </ol>
      <p>
        The code works once, and for ten minutes. If it has expired, run <code>axe remote pair</code> on your Mac again.
      </p>
      <p className="!mt-8">
        <AppStoreBadge />
      </p>
      <p>
        New here? <Link href="/mirror">See what AXe Mirror does</Link>.
      </p>
    </MirrorPage>
  )
}
