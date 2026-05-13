import type { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { fetchLiveReleases, type GhRelease } from "../_data/fetch-releases"

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

export async function LiveChangelog({ limit = 10 }: { limit?: number }) {
  const releases = await fetchLiveReleases(limit)
  if (releases.length === 0) return <ChangelogFallback />

  return (
    <>
      {releases.map((release, index) => (
        <ReleaseEntry key={release.tagName} release={release} isLatest={index === 0} />
      ))}
      <div className="release-entry">
        <a href="https://github.com/cameroncooke/AXe/releases" target="_blank" rel="noreferrer">
          See every release on GitHub →
        </a>
      </div>
    </>
  )
}

function ReleaseEntry({ release, isLatest }: { release: GhRelease; isLatest: boolean }) {
  return (
    <div className="release-entry">
      <div className="r-head">
        <h3 id={release.tagName.toLowerCase()}>{release.name ?? release.tagName}</h3>
        <div className="r-date">{formatDate(release.publishedAt)}</div>
        {isLatest ? <span className="tc-badge new">latest</span> : null}
        <a href={release.htmlUrl} target="_blank" rel="noreferrer">View on GitHub ↗</a>
      </div>
      <ReleaseBody body={release.body} />
    </div>
  )
}

function ReleaseBody({ body }: { body: string }): ReactNode {
  const cleaned = body.trim()
  if (!cleaned) return <p className="muted">No release notes provided.</p>
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h4>{children}</h4>,
        h2: ({ children }) => <h4>{children}</h4>,
        h3: ({ children }) => <h5>{children}</h5>,
        h4: ({ children }) => <h5>{children}</h5>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noreferrer">
            {children}
          </a>
        ),
      }}
    >
      {cleaned}
    </ReactMarkdown>
  )
}

function ChangelogFallback() {
  return (
    <div className="callout info">
      <div className="cl-body">
        <div className="cl-title">GitHub releases could not be reached</div>
        <div>
          The live changelog feed could not be loaded right now. See{" "}
          <a href="https://github.com/cameroncooke/AXe/releases" target="_blank" rel="noreferrer">
            github.com/cameroncooke/AXe/releases
          </a>
          .
        </div>
      </div>
    </div>
  )
}
