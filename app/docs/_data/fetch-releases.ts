import "server-only"

const REPO = "cameroncooke/AXe"
const GH_API = "https://api.github.com"

export const RELEASES_REVALIDATE_SECONDS = 60 * 60

export interface GhRelease {
  tagName: string
  name: string | null
  publishedAt: string
  htmlUrl: string
  body: string
  prerelease: boolean
  draft: boolean
}

interface RawRelease {
  tag_name: string
  name: string | null
  published_at: string
  html_url: string
  body: string | null
  prerelease: boolean
  draft: boolean
}

function ghHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "axe-cli-docs",
  }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  return headers
}

export async function fetchLiveReleases(limit = 10): Promise<GhRelease[]> {
  try {
    const fetchSize = Math.min(limit * 3, 100)
    const res = await fetch(`${GH_API}/repos/${REPO}/releases?per_page=${fetchSize}`, {
      headers: ghHeaders(),
      next: { revalidate: RELEASES_REVALIDATE_SECONDS, tags: ["axe-releases"] },
    })
    if (!res.ok) throw new Error(`GET releases -> ${res.status} ${res.statusText}`)
    const raw = (await res.json()) as RawRelease[]
    return raw
      .filter((release) => !release.draft && !release.prerelease)
      .slice(0, limit)
      .map((release) => ({
        tagName: release.tag_name,
        name: release.name,
        publishedAt: release.published_at,
        htmlUrl: release.html_url,
        body: release.body ?? "",
        prerelease: release.prerelease,
        draft: release.draft,
      }))
  } catch (err) {
    console.warn(`[axe-docs] releases fetch failed: ${(err as Error).message}`)
    return []
  }
}
