import type { ComponentType } from "react"
import type { DocSlug } from "../_data/routes"
import AccessibilityTargetingPage from "./accessibility-targeting.mdx"
import AgentSkillsPage from "./agent-skills.mdx"
import BatchPage from "./batch.mdx"
import ChangelogPage from "./changelog.mdx"
import CLIPage from "./cli.mdx"
import CommandReferencePage from "./command-reference.mdx"
import ContributingPage from "./contributing.mdx"
import InstallationPage from "./installation.mdx"
import IntroductionPage from "./introduction.mdx"
import KeyboardInputPage from "./keyboard-input.mdx"
import QuickStartPage from "./quick-start.mdx"
import ScreenshotsVideoPage from "./screenshots-video.mdx"
import TestingPage from "./testing.mdx"
import TroubleshootingPage from "./troubleshooting.mdx"

export const PAGE_COMPONENTS: Record<DocSlug, ComponentType> = {
  introduction: IntroductionPage,
  installation: InstallationPage,
  "quick-start": QuickStartPage,
  cli: CLIPage,
  "command-reference": CommandReferencePage,
  batch: BatchPage,
  "accessibility-targeting": AccessibilityTargetingPage,
  "keyboard-input": KeyboardInputPage,
  "screenshots-video": ScreenshotsVideoPage,
  "agent-skills": AgentSkillsPage,
  troubleshooting: TroubleshootingPage,
  changelog: ChangelogPage,
  contributing: ContributingPage,
  testing: TestingPage,
}
