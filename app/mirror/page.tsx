import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ConnectionDiagram, PairingDiagram, VisibilityDiagram } from "./_components/diagrams"
import { AppStoreBadge } from "../_components/app-store-badge"
import { ToolFilm } from "../_components/media"
import { Card, Code, Command, OtherTools, Section, Step } from "../_components/tool-page"
import { ISSUES_URL, MirrorShell } from "./_components/mirror-page"

const TITLE = "AXe Mirror - your iOS Simulator and your builds, on your iPhone or iPad"
const DESCRIPTION =
  "AXe Mirror is a free companion app for the AXe command-line tool. It shows an iOS Simulator running on your Mac on an iPhone or iPad and sends your touches back, so you can watch and steer your coding agent's work from anywhere. It also installs your own builds on the device in your hand."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://axe-cli.com/mirror",
    images: [{ url: "https://axe-cli.com/mirror/axe-mirror-poster.jpg", width: 1920, height: 1080 }],
  },
}

function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[230px] overflow-hidden rounded-[2rem] border-4 border-axe-dark-600 bg-black shadow-2xl shadow-black/50">
      <Image src={src} alt={alt} width={598} height={1300} className="h-auto w-full" />
    </div>
  )
}

/** What `axe remote pair` prints, with a sample code. The code shown was cancelled when it was made. */
function PairingTerminal() {
  return (
    <div className="terminal-glow overflow-hidden rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/80">
      <div className="flex items-center gap-2 border-b border-axe-dark-600/50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]/85" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]/85" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]/85" />
        <span className="ml-2 font-mono text-xs text-axe-text-muted">Terminal</span>
      </div>
      <div className="px-4 py-4 font-mono text-[13px] leading-relaxed text-axe-text-secondary">
        <p className="text-axe-text-primary">
          <span className="text-axe-cyan">❯ </span>axe remote pair
        </p>
        <p className="mt-2">Scan this with the viewer app, or type the code. It works once, for ten minutes.</p>
        <Image
          src="/mirror/pairing-qr.svg"
          alt="A sample pairing QR code. It is an example and cannot be used to pair."
          width={148}
          height={148}
          className="my-4 h-[148px] w-[148px] rounded-md"
        />
        <p className="text-axe-text-primary">Code: 2ANZ6-A88DN</p>
        <p className="mt-2">Waiting for the viewer. Press Ctrl+C to cancel.</p>
        <p className="text-emerald-400">Paired with iPhone Duo.</p>
      </div>
      <p className="border-t border-axe-dark-600/50 px-4 py-2 text-xs text-axe-text-muted">
        A sample. This code was cancelled when it was made, so it pairs nothing.
      </p>
    </div>
  )
}

const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "Is it free?",
    a: (
      <>
        Yes. The app is free on the App Store, with no purchases and no subscription, and AXe itself is free. Both are
        open source under the GPL version 3, and you can <Link href="/docs/mirror#get-the-app">build the app yourself</Link>{" "}
        if you prefer.
      </>
    ),
  },
  {
    q: "Do I need an account?",
    a: "No. There are no accounts, no sign-in, no analytics, no advertising and no tracking. Pairing is between your Mac and your device and involves nobody else.",
  },
  {
    q: "Does my simulator's screen pass through your servers?",
    a: (
      <>
        Usually not. The two devices connect directly whenever they can. When they cannot, the traffic passes through a
        relay, and it is still encrypted from end to end, so the relay cannot read the picture or your touches. The app
        shows <strong>Direct</strong> or <strong>Relay</strong> so you always know which it is.
      </>
    ),
  },
  {
    q: "Can somebody else connect to my Mac?",
    a: (
      <>
        Only a device you have paired can connect. Pairing needs a code from <Code>axe remote pair</Code>, which works once
        and for ten minutes. Any other device is refused before any picture or touch is exchanged. Run{" "}
        <Code>axe remote devices</Code> to see what is paired and <Code>axe remote unpair</Code> to remove a device.
      </>
    ),
  },
  {
    q: "What exactly does it send from my Mac?",
    a: (
      <>
        The screen of the simulator you open in the app, as video, and the builds you publish with{" "}
        <Code>axe remote build</Code>, and only while <Code>axe remote</Code> is running. It does not send your Mac&apos;s
        screen, your files or your source code, and the touches it receives go to that simulator and nowhere else.
      </>
    ),
  },
  {
    q: "Does it work when I am away from home?",
    a: (
      <>
        Yes, on Wi-Fi or mobile data. Your Mac has to be awake and online with <Code>axe remote</Code> running. Nothing on
        your router needs setting up: there are no ports to open and no VPN to install.
      </>
    ),
  },
  {
    q: "Which coding agents does it work with?",
    a: "Any of them. AXe Mirror shows a simulator; it does not care what is driving it. Run Claude Code, Codex or any other agent on your Mac as you normally do, and mirror the simulator it is using. On an iPhone Duo or an iPad you can keep the agent's app on one side and AXe Mirror on the other.",
  },
  {
    q: "Can I try it before installing anything on a Mac?",
    a: (
      <>
        Yes. The app has a <strong>Try the demo</strong> button, which connects to a demo simulator run by the AXe project.
        One visitor can use it at a time.
      </>
    ),
  },
  {
    q: "What do I need?",
    a: (
      <>
        An Apple silicon Mac running macOS 14.5 or later, with <Link href="/docs/installation">AXe</Link> and Xcode&apos;s
        Simulator, and an iPhone or iPad running iOS or iPadOS 17.5 or later. Intel Macs are not supported.
      </>
    ),
  },
  {
    q: "Does it mirror a real iPhone, or my Mac's screen?",
    a: "No. It mirrors iOS Simulators running on your Mac.",
  },
  {
    q: "Can it put my own app on my phone?",
    a: (
      <>
        Yes. <Code>axe remote build</Code> builds your app, signs it for Ad Hoc distribution and offers it in AXe Mirror,
        where you tap Install. The device has to be registered with your Apple developer team, as for any Ad Hoc build.
        See <Link href="/builds">Builds</Link>.
      </>
    ),
  },
  {
    q: "The picture is slow when both are on the same Wi-Fi. Why?",
    a: (
      <>
        macOS may be keeping <Code>axe</Code> off your local network, which sends the traffic through the relay. Allow your
        terminal app in System Settings &gt; Privacy &amp; Security &gt; Local Network. The{" "}
        <Link href="/docs/mirror#local-network-permission">documentation</Link> explains how to tell. A wired connection
        for the Mac helps too.
      </>
    ),
  },
  {
    q: "What does the relay keep?",
    a: (
      <>
        Short-lived operational logs and aggregate counts, such as the number of connections and the volume of traffic.
        It does not keep, and cannot read, video or touches. The <Link href="/mirror/privacy">privacy policy</Link> has the
        details.
      </>
    ),
  },
]

export default function MirrorLandingPage() {
  return (
    <MirrorShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-axe-cyan/10 blur-[130px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-20 text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-axe-cyan">Free for iPhone and iPad</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Your simulator,
            <br className="hidden sm:block" /> in your hand.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-axe-text-secondary">
            AXe Mirror shows an iOS Simulator running on your Mac on your iPhone or iPad, live, and sends your touches back.
            Leave your Mac and your coding agent working, and watch, touch and steer from anywhere. When the work is ready,
            it installs the real app on the device in your hand.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <AppStoreBadge />
            <a href="#get-started" className="text-sm font-medium text-axe-cyan transition-colors hover:text-axe-cyan-light">
              How to set it up ↓
            </a>
          </div>
          <p className="mt-4 text-sm text-axe-text-muted">
            No Mac to hand? The app&apos;s <strong className="font-medium text-axe-text-secondary">Try the demo</strong> button
            needs none.
          </p>

          <div className="terminal-glow mt-12 overflow-hidden rounded-2xl border border-axe-dark-600/50 bg-black">
            <ToolFilm
              name="mirror"
              label="A twenty-five-second film. An iPhone Duo opens a coding agent's app, brings AXe Mirror in beside it and connects to a Mac. The Mac's simulator appears live, and its owner taps through the app in it while the Mac's own simulator follows."
            />
          </div>
          <p className="mt-3 text-sm text-axe-text-muted">
            A real session, recorded on a Mac and an iPhone Duo and shown faster than real time.
          </p>
        </div>
      </section>

      <Section
        id="what-it-is-for"
        eyebrow="What it is for"
        title="Stay with your agent's work when you leave your desk"
        intro="A coding agent can build your app, run it in the Simulator and use it by itself. What it cannot do is show you. AXe Mirror puts that simulator in your hand."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Card title="Watch it work">
            The simulator&apos;s screen arrives as video at up to 60 frames a second, so you see each tap and each screen as
            your agent gets there.
          </Card>
          <Card title="Touch it yourself">
            Tap, swipe and pinch with one or two fingers, and press Home, the app switcher or Lock. It is the same
            simulator your agent is using, not a copy, so your touches land on your Mac.
          </Card>
          <Card title="Keep directing">
            Say what should change, watch the agent rebuild, and try the result a moment later. It works with any agent
            that runs on your Mac.
          </Card>
        </div>
      </Section>

      <Section
        id="get-started"
        eyebrow="Get started"
        title="Set up in three steps"
        intro={
          <>
            You need an Apple silicon Mac with <Link href="/docs/installation" className="text-axe-cyan hover:text-axe-cyan-light">AXe</Link>{" "}
            installed, and an iPhone or iPad.
          </>
        }
      >
        <div className="space-y-16">
          <Step n={1} title="Get the app" picture={<Shot src="/mirror/app-welcome.jpg" alt="AXe Mirror's first screen: three steps, a Pair with your Mac button and a Try the demo button." />}>
            <p>AXe Mirror is free on the App Store for iPhone and iPad.</p>
            <div className="mt-5">
              <AppStoreBadge />
            </div>
            <p className="text-sm text-axe-text-muted">
              Prefer to build it? The source is in the AXe repository, and the{" "}
              <Link href="/docs/mirror#get-the-app" className="text-axe-cyan hover:text-axe-cyan-light">
                documentation
              </Link>{" "}
              has the steps.
            </p>
          </Step>

          <Step n={2} title="Pair it with your Mac, once" picture={<PairingTerminal />}>
            <p>On your Mac, run the pairing command. It prints a QR code and a ten-character code.</p>
            <Command>axe remote pair</Command>
            <p>
              In the app, tap <strong className="font-medium text-axe-text-primary">Pair with your Mac</strong> and scan the QR
              code, or type the code. The code works once, and for ten minutes. After that your device stays paired until
              you remove it.
            </p>
          </Step>

          <Step n={3} title="Mirror a simulator" picture={<Shot src="/mirror/app-stream.jpg" alt="AXe Mirror showing a simulator live, with Home, app switcher and Lock buttons." />}>
            <p>Start the host, then tap your Mac&apos;s name in the app and choose a simulator.</p>
            <Command>axe remote</Command>
            <p>
              To show one simulator only, such as the one your agent uses, run{" "}
              <Code>{'axe remote mirror --udid "$UDID"'}</Code> instead. <Code>Ctrl+C</Code> stops hosting.
            </p>
          </Step>
        </div>
      </Section>

      <Section
        id="builds"
        eyebrow="Then hold it"
        title="When it looks right, install the real app"
        intro="A simulator shows you that the app works. Holding it tells you how it feels. AXe Mirror also installs your own builds, straight from your Mac."
      >
        <Link
          href="/builds"
          className="card-glow group block rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/50 p-6 transition-colors hover:border-axe-cyan/40"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-axe-cyan">Builds</p>
          <p className="mt-2 text-xl font-semibold text-white">The real app, on your phone.</p>
          <p className="mt-2 leading-relaxed text-axe-text-secondary">
            One command builds your app and signs it for your devices. It appears in AXe Mirror, and you tap Install.
          </p>
          <p className="mt-3 text-sm text-axe-cyan group-hover:text-axe-cyan-light">How Builds works →</p>
        </Link>
      </Section>

      <Section
        id="how-it-connects"
        eyebrow="How it connects"
        title="Straight from your Mac to your device"
        intro="There is no cloud service in the middle holding your screen. The two devices find each other and talk directly whenever the networks between them allow it."
      >
        <div className="rounded-2xl border border-axe-dark-600/50 bg-axe-dark-200/40 p-4 sm:p-8">
          <ConnectionDiagram />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card title="Direct first">
            On the same network, or across the internet when both networks allow it, video and touches travel straight
            between the two devices. Nothing to configure on your router.
          </Card>
          <Card title="A relay when needed">
            Some networks block direct connections. Then the same encrypted traffic passes through a relay run by the AXe
            project in Germany, or a public iroh relay if that one is unavailable.
          </Card>
          <Card title="You can always tell">
            The app shows <strong className="font-medium text-axe-text-primary">Direct</strong> or{" "}
            <strong className="font-medium text-axe-text-primary">Relay</strong> beside the picture, and{" "}
            <Code>axe remote</Code> prints the route it is using.
          </Card>
        </div>
      </Section>

      <Section
        id="privacy"
        eyebrow="Privacy and security"
        title="Encrypted from end to end, and only for devices you paired"
        intro="AXe Mirror was built so that the people running it never see what you are working on."
      >
        <div className="rounded-2xl border border-axe-dark-600/50 bg-axe-dark-200/40 p-4 sm:p-8">
          <VisibilityDiagram />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card title="End-to-end encryption">
            The connection is QUIC, through the open-source iroh library, and is encrypted between your Mac and your
            device. A relay forwards encrypted packets. It sees the two IP addresses and public IDs, and cannot read the
            picture or the touches.
          </Card>
          <Card title="Pairing, not passwords">
            Each side has its own key: your Mac&apos;s is a file only your user can read, and the app&apos;s is in your
            device&apos;s Keychain. Pairing tells each side the other&apos;s public key, and a device that is not paired is
            refused before anything is exchanged.
          </Card>
          <Card title="No accounts, no tracking">
            There is no sign-in, no analytics, no advertising and no tracking. The app stores the list of Macs you paired
            and its own key, on your device, and nothing else.
          </Card>
          <Card title="Only what you choose to share">
            <Code>axe remote</Code> sends the screen of the simulator you open and the builds you publish, while you run
            it. It never sends your Mac&apos;s screen, your files or your code. The camera is used only to scan the pairing code, and its images stay on the device.
          </Card>
        </div>
        <div className="mt-8 rounded-2xl border border-axe-dark-600/50 bg-axe-dark-200/40 p-4 sm:p-8">
          <PairingDiagram />
        </div>
        <p className="mt-6 text-axe-text-secondary">
          The full detail is in the{" "}
          <Link href="/mirror/privacy" className="text-axe-cyan hover:text-axe-cyan-light">
            privacy policy
          </Link>{" "}
          and the{" "}
          <Link href="/docs/mirror#security" className="text-axe-cyan hover:text-axe-cyan-light">
            security section of the documentation
          </Link>
          . Everything is open source, so you can read how it works.
        </p>
      </Section>

      <Section id="requirements" eyebrow="What you need" title="Requirements">
        <div className="grid gap-5 md:grid-cols-2">
          <Card title="On your Mac">
            Apple silicon and macOS 14.5 or later, with{" "}
            <Link href="/docs/installation" className="text-axe-cyan hover:text-axe-cyan-light">
              AXe 2.2 or later
            </Link>{" "}
            and Xcode&apos;s Simulator.
            <Command>brew install cameroncooke/axe/axe</Command>
          </Card>
          <Card title="On your iPhone or iPad">
            iOS or iPadOS 17.5 or later, with the AXe Mirror app. On an iPhone Duo or an iPad it runs beside your
            agent&apos;s app in split screen.
            <div className="mt-4">
              <AppStoreBadge />
            </div>
          </Card>
        </div>
      </Section>

      <Section id="faq" eyebrow="Questions" title="Frequently asked questions">
        <div className="divide-y divide-axe-dark-600/40 rounded-2xl border border-axe-dark-600/50 bg-axe-dark-200/40">
          {FAQ.map((item) => (
            <details key={item.q} className="group px-5 sm:px-7">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-medium text-white marker:hidden [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="shrink-0 text-2xl leading-none text-axe-cyan transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="pb-6 leading-relaxed text-axe-text-secondary [&_a]:text-axe-cyan [&_a:hover]:text-axe-cyan-light [&_strong]:font-medium [&_strong]:text-axe-text-primary">
                {item.a}
              </div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-axe-text-secondary">
          Something else? See{" "}
          <Link href="/mirror/support" className="text-axe-cyan hover:text-axe-cyan-light">
            Support
          </Link>
          , read the{" "}
          <Link href="/docs/mirror" className="text-axe-cyan hover:text-axe-cyan-light">
            documentation
          </Link>
          , or open an issue on the{" "}
          <a href={ISSUES_URL} className="text-axe-cyan hover:text-axe-cyan-light">
            AXe GitHub repository
          </a>
          .
        </p>
      </Section>

      <section className="border-t border-axe-dark-600/30 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Get AXe Mirror</h2>
          <p className="mt-3 text-axe-text-secondary">Free for iPhone and iPad. No account.</p>
          <div className="mt-6">
            <AppStoreBadge />
          </div>
        </div>
      </section>
      <OtherTools current="mirror" />
    </MirrorShell>
  )
}
