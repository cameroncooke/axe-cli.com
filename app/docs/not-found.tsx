import Link from "next/link"
import { DocsShell } from "./_components/docs-shell"
import { PageHeader } from "./_components/page-header"

export default function DocsNotFound() {
  return (
    <DocsShell activeSlug="introduction">
      <PageHeader
        breadcrumbs={["Docs", "404"]}
        title="Page not found"
        lede="The AXe docs page you requested does not exist."
      />
      <p>
        Start at the <Link href="/docs">Introduction</Link>, open the{" "}
        <Link href="/docs/command-reference">Command Reference</Link>, or report a docs gap on{" "}
        <a href="https://github.com/cameroncooke/AXe/issues" target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
    </DocsShell>
  )
}
