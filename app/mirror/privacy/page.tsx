import type { Metadata } from "next"
import { ISSUES_URL, MirrorPage } from "../_components/mirror-page"

const TITLE = "AXe Mirror Privacy Policy"
const DESCRIPTION =
  "AXe Mirror has no accounts, no analytics, no advertising and no tracking. This page explains what the app stores on your device and how video and touches travel."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://axe-cli.com/mirror/privacy",
  },
}

export default function MirrorPrivacyPage() {
  return (
    <MirrorPage
      title="Privacy Policy"
      lede="AXe Mirror is an app for iPhone and iPad that shows an iOS Simulator running on your Mac and sends your touches back to it. This policy covers the AXe Mirror app."
      note="Effective 18 November 2026"
    >
      <h2>Summary</h2>
      <p>
        AXe Mirror has no accounts, no analytics, no advertising and no tracking. The developer collects no personal
        data through it.
      </p>

      <h2>What the app stores on your device</h2>
      <p>The app stores only these things, and only on your device:</p>
      <ul>
        <li>
          <strong>The list of Macs it has been paired with:</strong> each Mac&apos;s name, ID and relay address. The
          list is stored in the app&apos;s own files and is removed with the app.
        </li>
        <li>
          <strong>Its own identity key.</strong> This is a random number kept in the device&apos;s Keychain. It never
          leaves the device. iOS may keep Keychain items after an app is removed, so if you reinstall the app it reuses
          the same key. Erasing the device removes it.
        </li>
      </ul>

      <h2>Permissions</h2>
      <ul>
        <li>
          <strong>Camera.</strong> Used only to scan the pairing QR code. Images are processed on the device and are
          never stored or sent.
        </li>
        <li>
          <strong>Local network.</strong> Used to connect directly to your own Mac.
        </li>
      </ul>

      <h2>How video and touches travel</h2>
      <p>
        Video and touches travel between your own devices and are end-to-end encrypted. When your devices cannot connect
        directly, the encrypted traffic passes through a relay operated by the AXe project, hosted by Hetzner in
        Germany. If that relay is unavailable, it passes through public relays operated by the iroh project (n0, Inc.).
      </p>
      <p>
        A relay necessarily sees the IP addresses and public connection IDs of the devices that use it. It cannot read
        the content.
      </p>
      <p>
        The AXe relay keeps short-lived operational logs and aggregate counts, such as the number of connections and the
        volume of traffic, for running the service. It does not keep video or touch data.
      </p>

      <h2>DNS lookups</h2>
      <p>The app looks up small public DNS records under axe-cli.com to learn the relay list and settings.</p>

      <h2>The demo</h2>
      <p>
        When you use the demo, the touches you make are sent to a demo simulator run by the AXe project, and its screen
        is sent to you. Nothing that identifies you is stored.
      </p>

      <h2>Children</h2>
      <p>AXe Mirror is a developer tool and is not directed at children.</p>

      <h2>Changes to this policy</h2>
      <p>When this policy changes, this page will be updated and will show the new date.</p>

      <h2>Contact</h2>
      <p>
        For questions about this policy, open an issue on the{" "}
        <a href={ISSUES_URL}>AXe GitHub repository</a>.
      </p>
    </MirrorPage>
  )
}
