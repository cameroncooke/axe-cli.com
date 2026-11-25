import type { Metadata } from "next"
import Link from "next/link"
import { LoopVideo, MediaCard } from "../_components/media"
import { Card, Code, Command, OtherTools, Section, ToolHero, ToolShell } from "../_components/tool-page"

const TITLE = "AXe UI automation - your agent tests its own work"
const DESCRIPTION =
  "AXe reads an iOS app's screen and drives it: taps, typing, swipes, screenshots and video, on simulators, the iPhone Duo simulator and connected iPhones and iPads. Give it to any coding agent so it can test what it builds, or call it from scripts and CI."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://axe-cli.com/automation",
    images: [{ url: "https://axe-cli.com/home/axe-tour-poster.jpg", width: 1920, height: 1080 }],
  },
}

function Terminal({ title, children }: { title: string; children: string }) {
  return (
    <div className="terminal-glow overflow-hidden rounded-xl border border-axe-dark-600/50 bg-axe-dark-200/80">
      <div className="flex items-center gap-2 border-b border-axe-dark-600/50 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-axe-text-muted">{title}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-axe-text-primary">{children}</pre>
    </div>
  )
}

const AGENT_SESSION = `# Capture the screen as rows with refs
$ axe describe-ui --agent --view navigation --udid $UDID
snapshotID 3FF70D78-…
e7|tap|text-field|First name|
e9|tap|text-field|Last name|
e12|tap|button|Save|

# Fill the form in one checked call
$ axe batch --agent --udid $UDID --steps-json '{…}'
completedSteps 3 · input checked before every step
returns the settled screen with a new snapshot`

const SCRIPT = `# Tap by accessibility label, waiting for it to appear
$ axe tap --label "Sign In" --wait-timeout 5 --udid $UDID

# Scroll until an element is on screen
$ axe gesture scroll-up --until-label "Privacy" --udid $UDID

# One typed JSON result, or a typed error code to branch on
$ axe --output json screenshot --output screen.png --udid $UDID`

export default function AutomationPage() {
  return (
    <ToolShell current="automation">
      <ToolHero
        eyebrow="UI automation"
        title={
          <>
            Your agent tests
            <br className="hidden sm:block" /> its own work.
          </>
        }
      >
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-axe-text-secondary">
          AXe reads an iOS app&apos;s screen and uses it: taps, typing, swipes, screenshots and video, on simulators and on
          connected iPhones and iPads. Give it to your coding agent and it can check what it has just built. Call it from a
          script or a CI job and it is the same plain command.
        </p>
        <div className="mx-auto mt-8 max-w-xl">
          <Command>brew install cameroncooke/axe/axe</Command>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <Link href="/docs/quick-start" className="text-sm font-medium text-axe-cyan transition-colors hover:text-axe-cyan-light">
            Quick start →
          </Link>
          <Link href="/docs/agent-mode" className="text-sm font-medium text-axe-cyan transition-colors hover:text-axe-cyan-light">
            Agent mode guide →
          </Link>
        </div>
        <div className="terminal-glow mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-axe-dark-600/50 bg-black">
          <LoopVideo
            name="automation"
            label="A coding agent's conversation beside an iPhone simulator. The agent types Japan into a search field it has just added, and the list narrows to Kyoto."
          />
        </div>
        <p className="mt-3 text-sm text-axe-text-muted">
          A real session: the agent has just added the search field, and is trying it.
        </p>
      </ToolHero>

      <Section
        id="what-it-is-for"
        eyebrow="What it is for"
        title="An agent can write the code. It cannot see the app."
        intro="Until it can look at the screen and use it, your agent is guessing whether its change worked. AXe is its eyes and hands."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Card title="It reads the screen">
            <Code>describe-ui</Code> returns every control on screen: a compact row with a ref for each in agent mode, or
            the full accessibility tree as JSON.
          </Card>
          <Card title="It uses the app">
            Taps, long presses, typing, swipes, scrolling until something is on screen, pinch, rotate, drag, drawing and
            the hardware buttons.
          </Card>
          <Card title="It sees what happened">
            Every agent-mode reply carries the screen as it settled, so the next step starts from what is really there.
            Screenshots and video are a command away when a picture is needed.
          </Card>
        </div>
      </Section>

      <Section
        id="agent-mode"
        eyebrow="Agent mode"
        title="Checked at every step"
        intro={
          <>
            Add <Code>--agent</Code> and AXe confirms that a control is still the one your agent saw before it sends any
            input. If the screen has changed, nothing is sent and the reply says why.
          </>
        }
      >
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Terminal title="agent session">{AGENT_SESSION}</Terminal>
          <div className="grid gap-5">
            <Card title="Refs, not coordinates">
              The agent acts on a ref from the screen it captured, in navigation, reading or full views.
            </Card>
            <Card title="Web pages too">
              <Code>--web</Code> lists a page&apos;s links, buttons and fields as refs, in web views, in Safari and in sign-in
              sheets.
            </Card>
            <Card title="No model, no API key">
              AXe is the hands. The thinking stays with whichever agent you use.
            </Card>
          </div>
        </div>
      </Section>

      <Section
        id="any-agent"
        eyebrow="Any agent"
        title="Works with the agent you already use"
        intro="AXe is a command, so any agent that can run one can use it. A bundled skill teaches yours how."
      >
        <div className="mx-auto max-w-2xl">
          <Command>axe init</Command>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {["Claude Code", "Codex", "Cursor", "VS Code", "Shell scripts", "CI"].map((name) => (
            <span key={name} className="rounded-full border border-axe-dark-600/60 bg-axe-dark-200/60 px-4 py-1.5 text-sm text-axe-text-secondary">
              {name}
            </span>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-axe-text-muted">
          Claude Code and Codex can also install the skill from the AXe plugin marketplace. See the{" "}
          <Link href="/docs/agent-skills" className="text-axe-cyan hover:text-axe-cyan-light">
            AI skill guide
          </Link>
          .
        </p>
      </Section>

      <Section
        id="scripts-and-ci"
        eyebrow="Scripts and CI"
        title="The same commands, with no agent at all"
        intro="Every interaction is one command with an explicit target. That makes AXe as useful in a shell script or a CI job as it is in an agent's hands."
      >
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Terminal title="Terminal">{SCRIPT}</Terminal>
          <div className="grid gap-5">
            <Card title="Selectors that wait">
              Tap by accessibility ID, label or value, and wait for the element to appear instead of sleeping.
            </Card>
            <Card title="Typed results and errors">
              <Code>--output json</Code> gives one typed result per command, or an error code to branch on. Simulators and
              devices share one set of codes.
            </Card>
            <Card title="Many steps, one process">
              <Code>axe batch</Code> runs a list of steps in one input session, and <Code>axe serve</Code> keeps one process
              open for a test harness that sends hundreds of commands.
            </Card>
          </div>
        </div>
      </Section>

      <Section
        id="targets"
        eyebrow="Where it runs"
        title="Simulators, the iPhone Duo simulator and real devices"
        intro="One set of commands and one set of error codes, whatever the target."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <MediaCard
            clip="speed"
            label="One axe tap played back in real time: it takes 0.08 seconds. A drag takes 0.9 seconds and reading the screen 0.3 seconds."
            eyebrow="iOS Simulator"
            title="A tap in 80 milliseconds"
          >
            <p>iPhone and iPad simulators on Xcode 26 and 27, in every orientation, with input fast enough to feel live.</p>
          </MediaCard>
          <MediaCard
            clip="duo"
            label="The iPhone Duo simulator opening, folding to a tabletop posture and closing as AXe moves its hinge."
            eyebrow="iPhone Duo Simulator"
            title="Two screens, every fold"
            href="/docs/iphone-duo"
            cta="iPhone Duo guide"
          >
            <p>Read both screens, move the hinge, rotate, and drive whichever display is active.</p>
          </MediaCard>
          <MediaCard
            clip="device"
            label="A real iPhone painting a picture of a red car, one stroke at a time, driven by AXe."
            eyebrow="iPhone and iPad"
            title="Real devices, precise enough to paint"
            href="/docs/physical-devices"
            cta="Physical devices guide"
          >
            <p>Connected devices take the same commands. Pass the hardware UDID.</p>
          </MediaCard>
        </div>
      </Section>

      <OtherTools current="automation" />
    </ToolShell>
  )
}
