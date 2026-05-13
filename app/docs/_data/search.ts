import { PAGE_META, docPath, type DocSlug } from "./routes"

export interface SearchEntry {
  slug: DocSlug
  title: string
  href: string
  section: string
  text: string
}

export function createSearchEntry(slug: DocSlug, content: string): SearchEntry {
  const meta = PAGE_META[slug]
  return {
    slug,
    title: meta.title,
    href: docPath(slug),
    section: meta.group,
    text: `${meta.title} ${meta.description} ${content}`,
  }
}

export function searchDocs(entries: SearchEntry[], query: string, limit = 8): SearchEntry[] {
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  if (terms.length === 0) return []

  return entries
    .map((entry) => {
      const haystack = `${entry.title} ${entry.section} ${entry.text}`.toLowerCase()
      const title = entry.title.toLowerCase()
      const score = terms.reduce((total, term) => {
        if (title === term) return total + 80
        if (title.includes(term)) return total + 40
        if (entry.slug.includes(term)) return total + 30
        if (haystack.includes(term)) return total + 10
        return total - 100
      }, 0)
      return { entry, score }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map((result) => result.entry)
}
