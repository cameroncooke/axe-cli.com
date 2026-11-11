import type { ComponentType } from "react"
import type { DocSlug } from "../_data/routes"
import AccessibilityTargetingPage from "./accessibility-targeting.mdx"
import AgentModePage from "./agent-mode.mdx"
import AgentSkillsPage from "./agent-skills.mdx"
import AutonomousAgentPage from "./autonomous-agent.mdx"
import BatchPage from "./batch.mdx"
import ChangelogPage from "./changelog.mdx"
import CLIPage from "./cli.mdx"
import CommandReferencePage from "./command-reference.mdx"
import ContributingPage from "./contributing.mdx"
import GesturesPage from "./gestures.mdx"
import InstallationPage from "./installation.mdx"
import IntroductionPage from "./introduction.mdx"
import IPhoneDuoPage from "./iphone-duo.mdx"
import KeyboardInputPage from "./keyboard-input.mdx"
import OutputAndErrorsPage from "./output-and-errors.mdx"
import PhysicalDevicesPage from "./physical-devices.mdx"
import QuickStartPage from "./quick-start.mdx"
import ScreenshotsVideoPage from "./screenshots-video.mdx"
import SettingsPage from "./settings.mdx"
import TestingPage from "./testing.mdx"
import TroubleshootingPage from "./troubleshooting.mdx"
import WhatsNewPage from "./whats-new.mdx"

export const PAGE_COMPONENTS: Record<DocSlug, ComponentType> = {
  introduction: IntroductionPage,
  "whats-new": WhatsNewPage,
  installation: InstallationPage,
  "quick-start": QuickStartPage,
  cli: CLIPage,
  "output-and-errors": OutputAndErrorsPage,
  "command-reference": CommandReferencePage,
  "accessibility-targeting": AccessibilityTargetingPage,
  gestures: GesturesPage,
  "keyboard-input": KeyboardInputPage,
  batch: BatchPage,
  "screenshots-video": ScreenshotsVideoPage,
  settings: SettingsPage,
  "physical-devices": PhysicalDevicesPage,
  "iphone-duo": IPhoneDuoPage,
  "agent-mode": AgentModePage,
  "agent-skills": AgentSkillsPage,
  "autonomous-agent": AutonomousAgentPage,
  troubleshooting: TroubleshootingPage,
  changelog: ChangelogPage,
  contributing: ContributingPage,
  testing: TestingPage,
}
