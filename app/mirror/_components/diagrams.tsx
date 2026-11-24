/**
 * The diagrams on the AXe Mirror page, drawn as inline SVG so they stay sharp and need no image
 * requests. Each has a title and description for screen readers; the text beside it on the page
 * says the same thing in words.
 */

const CYAN = "#22D3EE"
const CYAN_LIGHT = "#67E8F9"
const PANEL = "#111620"
const LINE = "#2A3244"
const TEXT = "#E2E8F0"
const SUB = "#8B9AB5"
const MUTED = "#64748B"
const FONT = "Rubik, system-ui, sans-serif"
const MONO = "'Roboto Mono', Monaco, Consolas, monospace"

function Laptop({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="14" y="0" width="132" height="86" rx="8" fill={PANEL} stroke={CYAN_LIGHT} strokeWidth="2" />
      <rect x="24" y="10" width="112" height="66" rx="3" fill="#0C1017" />
      <rect x="92" y="16" width="34" height="54" rx="6" fill="#171D2A" stroke={LINE} />
      <rect x="32" y="20" width="46" height="4" rx="2" fill={CYAN} opacity="0.8" />
      <rect x="32" y="30" width="36" height="4" rx="2" fill={SUB} opacity="0.6" />
      <rect x="32" y="40" width="42" height="4" rx="2" fill={SUB} opacity="0.6" />
      <path d="M0 90h160l-8 10H8z" fill="#2A3244" stroke={CYAN_LIGHT} strokeWidth="2" strokeLinejoin="round" />
    </g>
  )
}

function Phone({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="62" height="118" rx="13" fill={PANEL} stroke={CYAN_LIGHT} strokeWidth="2" />
      <rect x="7" y="8" width="48" height="102" rx="7" fill="#171D2A" />
      <rect x="22" y="12" width="18" height="5" rx="2.5" fill="#07090F" />
      <rect x="13" y="26" width="36" height="22" rx="4" fill={CYAN} opacity="0.35" />
      <rect x="13" y="54" width="36" height="22" rx="4" fill="#7C3AED" opacity="0.4" />
      <rect x="13" y="82" width="36" height="22" rx="4" fill="#3B82F6" opacity="0.4" />
    </g>
  )
}

function Lock({ x, y, color = CYAN }: { x: number; y: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="15" fill="#07090F" stroke={color} strokeWidth="1.5" />
      <rect x="-6" y="-2" width="12" height="9" rx="2" fill={color} />
      <path d="M-4 -2v-3a4 4 0 0 1 8 0v3" fill="none" stroke={color} strokeWidth="2" />
    </g>
  )
}

/** Your Mac and your device, the direct path between them, and the relay path used when there is none. */
export function ConnectionDiagram() {
  return (
    <svg viewBox="0 0 760 380" role="img" aria-labelledby="conn-title conn-desc" className="w-full h-auto">
      <title id="conn-title">How AXe Mirror connects</title>
      <desc id="conn-desc">
        Your Mac, running axe remote, and your iPhone or iPad, running AXe Mirror, connect directly when they can. When
        they cannot, the same encrypted traffic passes through a relay, which cannot read it.
      </desc>

      {/* Relay path */}
      <path d="M150 190 C 220 60, 300 52, 330 52" fill="none" stroke={SUB} strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
      <path d="M430 52 C 470 52, 560 60, 632 180" fill="none" stroke={SUB} strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
      <rect x="330" y="22" width="100" height="60" rx="12" fill={PANEL} stroke={LINE} strokeWidth="1.5" />
      <text x="380" y="48" textAnchor="middle" fontFamily={FONT} fontSize="15" fontWeight="500" fill={TEXT}>
        Relay
      </text>
      <text x="380" y="67" textAnchor="middle" fontFamily={FONT} fontSize="11.5" fill={MUTED}>
        cannot read it
      </text>
      <text x="380" y="108" textAnchor="middle" fontFamily={FONT} fontSize="13" fill={SUB}>
        only when a direct path is not possible
      </text>

      {/* Direct path */}
      <path d="M186 232 H 596" fill="none" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
      <path d="M186 232l12 -7v14z M596 232l-12 -7v14z" fill={CYAN} />
      <Lock x={391} y={232} />
      <text x="391" y="272" textAnchor="middle" fontFamily={FONT} fontSize="15" fontWeight="500" fill={CYAN}>
        Direct, encrypted from end to end
      </text>
      <text x="391" y="292" textAnchor="middle" fontFamily={FONT} fontSize="13" fill={SUB}>
        the same network, or straight across the internet
      </text>

      <text x="290" y="222" textAnchor="middle" fontFamily={MONO} fontSize="11.5" fill={SUB}>
        video →
      </text>
      <text x="492" y="222" textAnchor="middle" fontFamily={MONO} fontSize="11.5" fill={SUB}>
        ← touches
      </text>

      {/* Devices */}
      <Laptop x={20} y={182} />
      <text x="100" y="312" textAnchor="middle" fontFamily={FONT} fontSize="17" fontWeight="500" fill={TEXT}>
        Your Mac
      </text>
      <text x="100" y="332" textAnchor="middle" fontFamily={MONO} fontSize="12.5" fill={SUB}>
        axe remote
      </text>
      <text x="100" y="352" textAnchor="middle" fontFamily={FONT} fontSize="12.5" fill={MUTED}>
        the simulator and your agent
      </text>

      <Phone x={610} y={172} />
      <text x="641" y="312" textAnchor="middle" fontFamily={FONT} fontSize="17" fontWeight="500" fill={TEXT}>
        Your iPhone or iPad
      </text>
      <text x="641" y="332" textAnchor="middle" fontFamily={MONO} fontSize="12.5" fill={SUB}>
        AXe Mirror
      </text>
      <text x="641" y="352" textAnchor="middle" fontFamily={FONT} fontSize="12.5" fill={MUTED}>
        the picture and your touches
      </text>
    </svg>
  )
}

/** Who can see what: the two paired devices see everything, a relay sees addresses, nobody else sees anything. */
export function VisibilityDiagram() {
  const columns = [
    {
      title: "Your Mac and your device",
      tone: CYAN,
      rows: [
        ["yes", "The simulator's screen"],
        ["yes", "Your touches and button presses"],
        ["yes", "Each other's public key"],
      ],
    },
    {
      title: "A relay, when one is used",
      tone: SUB,
      rows: [
        ["no", "The simulator's screen"],
        ["no", "Your touches and button presses"],
        ["yes", "Both IP addresses and public IDs"],
      ],
    },
    {
      title: "Anyone else",
      tone: MUTED,
      rows: [
        ["no", "The simulator's screen"],
        ["no", "Your touches and button presses"],
        ["no", "A way to connect: they are not paired"],
      ],
    },
  ]
  return (
    <svg viewBox="0 0 760 250" role="img" aria-labelledby="vis-title vis-desc" className="w-full h-auto">
      <title id="vis-title">Who can see what</title>
      <desc id="vis-desc">
        Your Mac and your paired device see the simulator&apos;s screen and your touches. A relay sees only the IP addresses
        and public IDs of the two devices. Anyone else sees nothing and cannot connect.
      </desc>
      {columns.map((column, i) => {
        const x = 8 + i * 252
        return (
          <g key={column.title} transform={`translate(${x} 8)`}>
            <rect width="240" height="234" rx="14" fill={PANEL} stroke={i === 0 ? CYAN : LINE} strokeWidth={i === 0 ? 1.5 : 1} />
            <text x="20" y="38" fontFamily={FONT} fontSize="16" fontWeight="500" fill={i === 0 ? CYAN_LIGHT : TEXT}>
              {column.title}
            </text>
            <line x1="20" y1="54" x2="220" y2="54" stroke={LINE} />
            {column.rows.map(([state, label], r) => {
              const y = 88 + r * 52
              const words = label.split(" ")
              // Two lines at most: break near the middle when the label is long.
              let first = label
              let second = ""
              if (label.length > 24) {
                let count = 0
                let at = words.length
                for (let w = 0; w < words.length; w++) {
                  count += words[w].length + 1
                  if (count > 22) {
                    at = w
                    break
                  }
                }
                first = words.slice(0, at).join(" ")
                second = words.slice(at).join(" ")
              }
              return (
                <g key={label}>
                  {state === "yes" ? (
                    <g transform={`translate(32 ${y - 5})`}>
                      <circle r="11" fill={i === 0 ? CYAN : SUB} opacity={i === 0 ? 0.18 : 0.14} />
                      <path d="M-5 0l3.5 4L5.5 -4.5" fill="none" stroke={i === 0 ? CYAN : SUB} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  ) : (
                    <g transform={`translate(32 ${y - 5})`}>
                      <circle r="11" fill="#07090F" stroke={LINE} />
                      <path d="M-4 -4l8 8M4 -4l-8 8" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
                    </g>
                  )}
                  <text x="54" y={second ? y - 8 : y} fontFamily={FONT} fontSize="13.5" fill={state === "yes" ? TEXT : SUB}>
                    {first}
                  </text>
                  {second ? (
                    <text x="54" y={y + 9} fontFamily={FONT} fontSize="13.5" fill={state === "yes" ? TEXT : SUB}>
                      {second}
                    </text>
                  ) : null}
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

/** Pairing, in three moves: the Mac shows a code, the app reads it, the two swap public keys. */
export function PairingDiagram() {
  const steps = [
    { n: "1", title: "Your Mac shows a code", sub: "one use, ten minutes" },
    { n: "2", title: "The app scans it", sub: "or you type the code" },
    { n: "3", title: "They swap public keys", sub: "and your Mac remembers it" },
  ]
  return (
    <svg viewBox="0 0 760 120" role="img" aria-labelledby="pair-title pair-desc" className="w-full h-auto">
      <title id="pair-title">How pairing works</title>
      <desc id="pair-desc">
        Your Mac shows a one-time code. The app scans it or you type it. The two devices then exchange public keys, and
        the Mac remembers the device.
      </desc>
      {steps.map((step, i) => {
        const x = 8 + i * 252
        return (
          <g key={step.n} transform={`translate(${x} 10)`}>
            <rect width="240" height="100" rx="14" fill={PANEL} stroke={LINE} />
            <circle cx="34" cy="50" r="17" fill="#07090F" stroke={CYAN} strokeWidth="1.5" />
            <text x="34" y="56" textAnchor="middle" fontFamily={FONT} fontSize="17" fontWeight="600" fill={CYAN}>
              {step.n}
            </text>
            <text x="64" y="46" fontFamily={FONT} fontSize="14.5" fontWeight="500" fill={TEXT}>
              {step.title}
            </text>
            <text x="64" y="66" fontFamily={FONT} fontSize="12.5" fill={SUB}>
              {step.sub}
            </text>
            {i < 2 ? <path d="M242 50h8m-4 -4l4 4l-4 4" fill="none" stroke={SUB} strokeWidth="1.5" strokeLinecap="round" /> : null}
          </g>
        )
      })}
    </svg>
  )
}
