import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { APP_STORE_URL, MirrorPage } from "../mirror/_components/mirror-page"
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
        <a href={APP_STORE_URL} className="inline-block transition-opacity hover:opacity-85">
          <Image src="/mirror/app-store-badge.svg" alt="Download AXe Mirror on the App Store" width={180} height={60} className="h-[60px] w-auto" />
        </a>
      </p>
      <p>
        New here? <Link href="/mirror">See what AXe Mirror does</Link>.
      </p>
    </MirrorPage>
  )
}
