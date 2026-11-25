import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ToolFilm } from "../_components/media"
import { APP_STORE_URL, Card, Code, Command, OtherTools, Section, Step, ToolHero, ToolShell } from "../_components/tool-page"

const TITLE = "AXe Builds - the real app, on your phone"
const DESCRIPTION =
  "One command builds your iOS app, signs it for your devices and offers it in the AXe Mirror app, where you tap Install. The build goes straight from your Mac to the phone in your hand: no TestFlight and no cable."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://axe-cli.com/builds",
    images: [{ url: "https://axe-cli.com/home/axe-tour-poster.jpg", width: 1920, height: 1080 }],
  },
}

const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "Is this TestFlight?",
    a: "No. Nothing is uploaded to Apple and nothing waits for processing or review. The build goes from your Mac to your own devices.",
  },
  {
    q: "Which devices can install a build?",
    a: (
      <>
        A device that is paired with your Mac in AXe Mirror, and that is in the build&apos;s provisioning profile. Builds
        are signed for Ad Hoc distribution, so that means a device registered with your Apple developer team. AXe tells
        you which of the devices your Mac knows a build will install on.
      </>
    ),
  },
  {
    q: "Is there anything to set up first?",
    a: "Once per Mac. iOS installs an app only over HTTPS from a name it trusts, so the first Install opens a short setup in the app: you install a certificate and switch it on in Settings, with a video of the taps playing alongside. The certificate can vouch only for the names the app uses, and you can remove it in Settings at any time.",
  },
  {
    q: "Does the build pass through your servers?",
    a: (
      <>
        Usually not. It travels over the same paired connection as the mirror, direct between your devices when it can be.
        When it cannot, it passes through a relay, still encrypted from end to end, so the relay cannot read it. See{" "}
        <Link href="/mirror#how-it-connects">how it connects</Link>.
      </>
    ),
  },
  {
    q: "I already have an IPA. Can I use that?",
    a: (
      <>
        Yes. <Code>axe remote publish App.ipa</Code> checks it and offers it in the same way.
      </>
    ),
  },
  {
    q: "Can my agent make the build?",
    a: "Yes. It is one command, so an agent that has finished a piece of work can run it when you ask. In the film on the homepage, the agent makes the build.",
  },
  {
    q: "What happens to old builds?",
    a: (
      <>
        <Code>axe remote builds</Code> lists what is on offer. It can remove a build, keep only the newest few of each app,
        or change a build&apos;s notes. Removing a build stops it being offered; it does not take the app off a device that
        installed it.
      </>
    ),
  },
]

export default function BuildsPage() {
  return (
    <ToolShell current="builds">
      <ToolHero
        eyebrow="Builds"
        title={
          <>
            The real app,
            <br className="hidden sm:block" /> on your phone.
          </>
        }
      >
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-axe-text-secondary">
          A simulator shows you that the app works. Holding it tells you how it feels. AXe builds your app, signs it for
          your devices and offers it in the AXe Mirror app, where you tap Install. No TestFlight, and no cable.
        </p>
        <div className="mt-8">
          <a href="#how-it-works" className="text-sm font-medium text-axe-cyan transition-colors hover:text-axe-cyan-light">
            How it works ↓
          </a>
        </div>
        <div className="terminal-glow mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-axe-dark-600/50 bg-black">
          <ToolFilm
            name="builds"
            label="A twenty-second film. On an iPhone Duo, someone asks their coding agent for a build. AXe builds and signs it, AXe Mirror offers it with an Install button, and the real app opens on the phone."
          />
        </div>
        <p className="mt-3 text-sm text-axe-text-muted">
          A real session, shown faster than real time: the build is asked for, arrives, is installed and opens.
        </p>
      </ToolHero>

      <Section
        id="how-it-works"
        eyebrow="How it works"
        title="Ask, tap, hold"
        intro={
          <>
            You need <Link href="/mirror" className="text-axe-cyan hover:text-axe-cyan-light">AXe Mirror</Link> paired with
            your Mac, and <Code>axe remote</Code> running.
          </>
        }
      >
        <div className="space-y-14">
          <Step n={1} title="Ask for a build">
            <p>Run one command, or ask your agent to. Say what changed in the notes.</p>
            <Command>{'axe remote build --project App.xcodeproj --scheme App --notes "What changed"'}</Command>
            <p>
              AXe archives the scheme with Xcode, exports it with your project&apos;s own signing, checks the result and
              publishes it.
            </p>
          </Step>
          <Step n={2} title="It arrives in AXe Mirror">
            <p>
              The build appears under Apps on your Mac&apos;s menu, with its version and your notes. If you are in the
              mirror when it lands, a <strong className="font-medium text-axe-text-primary">Build ready</strong> banner
              offers it there and then.
            </p>
          </Step>
          <Step n={3} title="Tap Install">
            <p>iOS asks you to confirm, and the app is on your Home screen like any other.</p>
          </Step>
        </div>
      </Section>

      <Section
        id="what-axe-does"
        eyebrow="What AXe takes care of"
        title="The parts that usually go wrong"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Card title="Checked before it is offered">
            A build has to be a device app signed for Ad Hoc distribution, with profiles that have not expired. One that
            iOS would refuse is refused on your Mac, with the reason, instead of failing on your phone.
          </Card>
          <Card title="Over the pairing you already have">
            The build travels the same encrypted connection as the mirror, direct when it can be. There is no server to
            run, no port to open and no VPN.
          </Card>
          <Card title="Picks up where it stopped">
            A download that loses its connection carries on from where it was, so a large app on a poor signal still
            arrives.
          </Card>
          <Card title="Yours to tidy">
            <Code>axe remote builds</Code> lists what is on offer, removes builds, and keeps only the newest few of each
            app.
          </Card>
        </div>
      </Section>

      <Section id="requirements" eyebrow="What you need" title="Requirements">
        <div className="grid gap-5 md:grid-cols-2">
          <Card title="On your Mac">
            Apple silicon, with{" "}
            <Link href="/docs/installation" className="text-axe-cyan hover:text-axe-cyan-light">
              AXe 2.2 or later
            </Link>{" "}
            and Xcode, and a project that signs for your Apple developer team.
            <Command>brew install cameroncooke/axe/axe</Command>
          </Card>
          <Card title="On your iPhone or iPad">
            The AXe Mirror app, version 1.2 or later, paired with your Mac. The device has to be registered with your Apple
            developer team, as for any Ad Hoc build.
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
        <p className="mt-6 text-sm text-axe-text-muted">
          The{" "}
          <Link href="/docs/mirror#install-your-builds" className="text-axe-cyan hover:text-axe-cyan-light">
            documentation
          </Link>{" "}
          has every option.
        </p>
      </Section>

      <section className="border-t border-axe-dark-600/30 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Get AXe Mirror</h2>
          <p className="mt-3 text-axe-text-secondary">Builds arrive in the AXe Mirror app. Free for iPhone and iPad. No account.</p>
          <div className="mt-6">
            <a href={APP_STORE_URL} className="inline-block transition-opacity hover:opacity-85">
              <Image src="/mirror/app-store-badge.svg" alt="Download AXe Mirror on the App Store" width={180} height={60} className="h-[60px] w-auto" />
            </a>
          </div>
        </div>
      </section>

      <OtherTools current="builds" />
    </ToolShell>
  )
}
