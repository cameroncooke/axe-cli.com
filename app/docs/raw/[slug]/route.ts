import { NextResponse } from "next/server"
import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"
import { docPath, isDocSlug } from "../../_data/routes"

export const revalidate = 3600

interface Params {
  params: Promise<{ slug: string }>
}

function resolveOrigin(req: Request): string {
  const origin = new URL(req.url).origin
  if (process.env.VERCEL_URL && origin.includes("localhost")) return `https://${process.env.VERCEL_URL}`
  return origin
}

function buildTurndown(): TurndownService {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    linkStyle: "inlined",
  })
  td.use(gfm)
  td.addRule("heading-anchor", {
    filter: (node) => node.nodeName === "A" && (node as HTMLElement).classList?.contains("heading-anchor"),
    replacement: () => "",
  })
  td.addRule("codeblock", {
    filter: (node) => node.nodeName === "DIV" && (node as HTMLElement).classList?.contains("codeblock"),
    replacement: (_content, node) => {
      const el = node as HTMLElement
      const lang = el.querySelector(".lang")?.textContent?.trim() ?? ""
      const code = el.querySelector("pre code")?.textContent ?? ""
      return `\n\n\`\`\`${lang}\n${code.replace(/\n+$/, "")}\n\`\`\`\n\n`
    },
  })
  td.addRule("docs-chrome", {
    filter: (node) => {
      const el = node as HTMLElement
      return ["breadcrumbs", "page-meta", "pager", "tabs", "pa-pill"].some((className) => el.classList?.contains(className))
    },
    replacement: () => "",
  })
  td.addRule("callout", {
    filter: (node) => node.nodeName === "DIV" && (node as HTMLElement).classList?.contains("callout"),
    replacement: (_content, node) => {
      const el = node as HTMLElement
      const title = el.querySelector(".cl-title")?.textContent?.trim()
      const body = el.querySelector(".cl-body")
      if (!body) return ""
      body.querySelector(".cl-title")?.remove()
      const inner = td.turndown(body.innerHTML).trim()
      const lines = inner.split("\n").map((line) => (line ? `> ${line}` : ">"))
      return `\n\n${title ? `> **${title}**\n>\n` : ""}${lines.join("\n")}\n\n`
    },
  })
  return td
}

function extractProseHtml(html: string): string | null {
  const prosePattern = /<div\b[^>]*\bclass=["'][^"']*\bprose\b[^"']*["'][^>]*>/i
  const match = html.match(prosePattern)
  if (!match) return null
  const start = match.index!
  const after = html.slice(start)
  let depth = 0
  const re = /<(\/?)div\b[^>]*>/gi
  let divMatch: RegExpExecArray | null
  while ((divMatch = re.exec(after)) !== null) {
    if (divMatch[1]) {
      depth--
      if (depth === 0) return after.slice(0, divMatch.index + divMatch[0].length)
    } else {
      depth++
    }
  }
  return null
}

export async function GET(req: Request, { params }: Params) {
  const { slug } = await params
  if (!isDocSlug(slug)) return new NextResponse("Not found", { status: 404 })
  const pagePath = docPath(slug)
  const pageUrl = `${resolveOrigin(req)}${pagePath}`

  try {
    const res = await fetch(pageUrl, {
      next: { revalidate: 3600, tags: ["axe-docs-raw"] },
    })
    if (!res.ok) throw new Error(`GET ${pageUrl} -> ${res.status}`)
    const prose = extractProseHtml(await res.text())
    if (!prose) throw new Error("Could not locate prose content")
    const markdown = buildTurndown().turndown(prose).replace(/\n{3,}/g, "\n\n").trim()
    return new NextResponse(`${markdown}\n`, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (err) {
    return new NextResponse(`# Markdown view unavailable\n\nCould not render ${pagePath}: ${(err as Error).message}\n`, {
      status: 500,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    })
  }
}
