export type AxeCommandCategory = "discovery" | "interaction" | "keyboard" | "media" | "batch" | "setup"

export interface AxeCommandFlag {
  name: string
  type: string
  required: boolean
  default?: string
  description: string
}

export interface AxeCommandEntry {
  name: string
  category: AxeCommandCategory
  summary: string
  requiresUdid: boolean
  supportsBatch: boolean
  flags: AxeCommandFlag[]
  notes?: string[]
}

export const AXE_COMMANDS: AxeCommandEntry[] = [
  {
    name: "list-simulators",
    category: "discovery",
    summary: "List every simulator AXe can see, with state and UDID.",
    requiresUdid: false,
    supportsBatch: false,
    flags: [],
  },
  {
    name: "describe-ui",
    category: "discovery",
    summary: "Dump the accessibility tree as JSON for the whole screen or a single point.",
    requiresUdid: true,
    supportsBatch: false,
    flags: [
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
      { name: "--point", type: "x,y", required: false, description: "Describe only the element under that screen point." },
    ],
  },
  {
    name: "tap",
    category: "interaction",
    summary: "Tap a coordinate or the activation point of an accessibility match.",
    requiresUdid: true,
    supportsBatch: true,
    flags: [
      { name: "-x / -y", type: "double", required: false, description: "Tap point. Both must be provided together." },
      { name: "--id", type: "string", required: false, description: "Match by AXUniqueId." },
      { name: "--label", type: "string", required: false, description: "Match by AXLabel." },
      { name: "--value", type: "string", required: false, description: "Match by AXValue." },
      { name: "--element-type", type: "string", required: false, description: "Narrow selector results, for example Button, TextField, or Switch." },
      { name: "--tap-style", type: "automatic, simulator, physical", required: false, default: "automatic", description: "Tap dispatch style. automatic uses physical touch for switch-like controls and simulator tapAt for other targets; simulator always uses tapAt; physical always uses touch down/up." },
      { name: "--wait-timeout", type: "double", required: false, default: "0", description: "Seconds to poll for a selector before failing." },
      { name: "--poll-interval", type: "double", required: false, default: "0.25", description: "Polling cadence while waiting." },
      { name: "--pre-delay", type: "double", required: false, description: "Seconds to wait before tapping. Range 0–10." },
      { name: "--post-delay", type: "double", required: false, description: "Seconds to wait after tapping. Range 0–10." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
    notes: ["Provide either -x and -y, or exactly one of --id, --label, or --value."],
  },
  {
    name: "slider",
    category: "interaction",
    summary: "Set a slider to a verified 0–100 percentage via accessibility selector.",
    requiresUdid: true,
    supportsBatch: false,
    flags: [
      { name: "--id", type: "string", required: false, description: "Match by AXUniqueId." },
      { name: "--label", type: "string", required: false, description: "Match by AXLabel." },
      { name: "--element-type", type: "string", required: false, description: "Narrow matches, usually Slider." },
      { name: "--value", type: "double", required: true, description: "Target percentage, 0–100." },
      { name: "--wait-timeout", type: "double", required: false, default: "0", description: "Seconds to poll for the slider before failing." },
      { name: "--poll-interval", type: "double", required: false, default: "0.25", description: "Polling cadence while waiting." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
    notes: ["Uses one calibrated low-level HID drag, then re-reads AXValue and fails if outside tolerance.", "Not supported as a batch step."],
  },
  {
    name: "swipe",
    category: "interaction",
    summary: "Multi-touch swipe gesture between two screen points.",
    requiresUdid: true,
    supportsBatch: true,
    flags: [
      { name: "--start-x / --start-y", type: "double", required: true, description: "Starting point." },
      { name: "--end-x / --end-y", type: "double", required: true, description: "Ending point. Must differ from start." },
      { name: "--duration", type: "double", required: false, default: "1.0", description: "Total swipe duration in seconds." },
      { name: "--delta", type: "double", required: false, default: "50", description: "Distance between touch sample points in pixels." },
      { name: "--pre-delay", type: "double", required: false, description: "Range 0–10." },
      { name: "--post-delay", type: "double", required: false, description: "Range 0–10." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
  },
  {
    name: "drag",
    category: "interaction",
    summary: "Low-level point-to-point drag using explicit touch move events.",
    requiresUdid: true,
    supportsBatch: false,
    flags: [
      { name: "--start-x / --start-y", type: "double", required: true, description: "Starting point." },
      { name: "--end-x / --end-y", type: "double", required: true, description: "Ending point. Must differ from start." },
      { name: "--duration", type: "double", required: false, default: "0.6", description: "Total drag duration in seconds." },
      { name: "--steps", type: "int", required: false, default: "60", description: "Touch move event count. Range 1–1000." },
      { name: "--pre-delay", type: "double", required: false, description: "Range 0–10." },
      { name: "--post-delay", type: "double", required: false, description: "Range 0–10." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
    notes: ["Not supported as a batch step."],
  },
  {
    name: "touch",
    category: "interaction",
    summary: "Single-contact touch down, touch up, or both at one coordinate.",
    requiresUdid: true,
    supportsBatch: true,
    flags: [
      { name: "-x / -y", type: "double", required: true, description: "Touch point." },
      { name: "--down", type: "flag", required: false, description: "Emit a touch down event." },
      { name: "--up", type: "flag", required: false, description: "Emit a touch up event." },
      { name: "--delay", type: "double", required: false, description: "Seconds between down and up when both are set. Range 0–10." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
    notes: ["At least one of --down or --up is required."],
  },
  {
    name: "gesture",
    category: "interaction",
    summary: "Run a preset gesture pattern such as scroll-down or swipe-from-left-edge.",
    requiresUdid: true,
    supportsBatch: true,
    flags: [
      { name: "preset", type: "enum", required: true, description: "scroll-up, scroll-down, scroll-left, scroll-right, or edge-swipe preset." },
      { name: "--screen-width", type: "double", required: false, default: "390", description: "Logical screen width. Range 1–2000." },
      { name: "--screen-height", type: "double", required: false, default: "844", description: "Logical screen height. Range 1–3000." },
      { name: "--duration", type: "double", required: false, description: "Range 0–10. Preset default applies if omitted." },
      { name: "--delta", type: "double", required: false, description: "Range 1–200. Preset default applies if omitted." },
      { name: "--pre-delay", type: "double", required: false, description: "Range 0–10." },
      { name: "--post-delay", type: "double", required: false, description: "Range 0–10." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
  },
  {
    name: "button",
    category: "interaction",
    summary: "Press a hardware button: home, lock, side-button, siri, or apple-pay.",
    requiresUdid: true,
    supportsBatch: true,
    flags: [
      { name: "buttonType", type: "enum", required: true, description: "apple-pay, home, lock, side-button, or siri." },
      { name: "--duration", type: "double", required: false, description: "Hold duration. Range >0 and <=10." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
  },
  {
    name: "type",
    category: "keyboard",
    summary: "Type text from an argument, stdin, or a file via HID keyboard events.",
    requiresUdid: true,
    supportsBatch: true,
    flags: [
      { name: "text", type: "positional", required: false, description: "Inline text. Mutually exclusive with --stdin and --file." },
      { name: "--stdin", type: "flag", required: false, description: "Read all stdin as text." },
      { name: "--file", type: "path", required: false, description: "Read text from a file." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
    notes: ["Exactly one input source must be supplied.", "US keyboard characters only; accented and non-ASCII characters fail."],
  },
  {
    name: "key",
    category: "keyboard",
    summary: "Press a single HID keycode, optionally held.",
    requiresUdid: true,
    supportsBatch: true,
    flags: [
      { name: "keycode", type: "int 0–255", required: true, description: "Positional HID keycode." },
      { name: "--duration", type: "double", required: false, description: "Hold duration. Range >0 and <=10." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
  },
  {
    name: "key-sequence",
    category: "keyboard",
    summary: "Press up to 100 keycodes in order.",
    requiresUdid: true,
    supportsBatch: true,
    flags: [
      { name: "--keycodes", type: "comma-separated ints 0–255", required: true, description: "List of HID keycodes." },
      { name: "--delay", type: "double", required: false, default: "0.1", description: "Seconds between presses. Range 0–5." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
  },
  {
    name: "key-combo",
    category: "keyboard",
    summary: "Hold up to eight modifier keycodes and press one target key atomically.",
    requiresUdid: true,
    supportsBatch: true,
    flags: [
      { name: "--modifiers", type: "comma-separated ints 0–255", required: true, description: "Modifiers held in order, released in reverse order." },
      { name: "--key", type: "int 0–255", required: true, description: "Target keycode pressed once while modifiers are held." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
  },
  {
    name: "screenshot",
    category: "media",
    summary: "Capture a PNG of the simulator display.",
    requiresUdid: true,
    supportsBatch: false,
    flags: [
      { name: "--output", type: "path", required: false, description: "File path, directory path, or omitted. Existing files are replaced." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
    notes: ["Prints the saved path to stdout. Not supported as a batch step."],
  },
  {
    name: "record-video",
    category: "media",
    summary: "Record the simulator to an MP4 until Ctrl+C.",
    requiresUdid: true,
    supportsBatch: false,
    flags: [
      { name: "--fps", type: "int 1–30", required: false, default: "10", description: "Capture frame rate." },
      { name: "--quality", type: "int 1–100", required: false, default: "80", description: "H.264 quality factor." },
      { name: "--scale", type: "double 0.1–1.0", required: false, default: "1.0", description: "Output scale." },
      { name: "--output", type: "path", required: false, description: "MP4 path or directory; auto-generated if omitted." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
    notes: ["SIGINT/SIGTERM finalizes the MP4 cleanly and prints its path to stdout."],
  },
  {
    name: "stream-video",
    category: "media",
    summary: "Stream simulator frames to stdout in mjpeg, raw, ffmpeg, or bgra format.",
    requiresUdid: true,
    supportsBatch: false,
    flags: [
      { name: "--format", type: "mjpeg|raw|ffmpeg|bgra", required: false, default: "mjpeg", description: "Output format." },
      { name: "--fps", type: "int 1–30", required: false, default: "10", description: "Capture frame rate. Ignored by bgra." },
      { name: "--quality", type: "int 1–100", required: false, default: "80", description: "JPEG quality for compressed formats." },
      { name: "--scale", type: "double 0.1–1.0", required: false, default: "1.0", description: "Output scale." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID." },
    ],
    notes: ["Stdout is binary; pipe or redirect it."],
  },
  {
    name: "batch",
    category: "batch",
    summary: "Run an ordered set of supported interaction steps in one HID session.",
    requiresUdid: true,
    supportsBatch: false,
    flags: [
      { name: "--step", type: "string, repeatable", required: false, description: "Inline step. Exactly one source allowed across --step, --file, and --stdin." },
      { name: "--file", type: "path", required: false, description: "Read one step per line. Blank lines and # comments are ignored." },
      { name: "--stdin", type: "flag", required: false, description: "Read one step per line from stdin." },
      { name: "--ax-cache", type: "perBatch|perStep|none", required: false, default: "perBatch", description: "Accessibility snapshot reuse policy." },
      { name: "--type-submission", type: "chunked|composite", required: false, default: "chunked", description: "How type steps submit HID events." },
      { name: "--type-chunk-size", type: "int >0", required: false, default: "200", description: "HID events per chunk when chunked." },
      { name: "--tap-style", type: "automatic, simulator, physical", required: false, default: "automatic", description: "Default tap dispatch for tap steps. automatic uses physical touch for switch-like controls and simulator tapAt for other targets; simulator always uses tapAt; physical always uses touch down/up." },
      { name: "--continue-on-error", type: "flag", required: false, description: "Collect failures and report them at the end." },
      { name: "--wait-timeout", type: "double", required: false, default: "0", description: "Seconds to poll for selector elements." },
      { name: "--poll-interval", type: "double", required: false, default: "0.25", description: "Polling cadence." },
      { name: "--verbose", type: "flag", required: false, description: "Verbose stderr logging." },
      { name: "--udid", type: "string", required: true, description: "Target simulator UDID. Per-step --udid is rejected." },
    ],
    notes: ["Supported steps: tap, swipe, gesture, touch, type, button, key, key-sequence, key-combo, and sleep."],
  },
  {
    name: "init",
    category: "setup",
    summary: "Install, uninstall, or print the bundled AXe agent skill.",
    requiresUdid: false,
    supportsBatch: false,
    flags: [
      { name: "--client", type: "auto|claude|agents", required: false, default: "auto", description: "Target AI client." },
      { name: "--dest", type: "path", required: false, description: "Custom skills directory. Overrides --client." },
      { name: "--force", type: "flag", required: false, description: "Overwrite an existing skill file." },
      { name: "--uninstall", type: "flag", required: false, description: "Remove the installed skill." },
      { name: "--print", type: "flag", required: false, description: "Print SKILL.md to stdout." },
    ],
    notes: ["Non-interactive sessions must pass --client or --dest unless --print is used."],
  },
]
