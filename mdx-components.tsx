import type { MDXComponents } from "mdx/types"
import type { ReactElement } from "react"
import { Callout } from "@/app/docs/_components/callout"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { CommandExplorer } from "@/app/docs/_components/command-explorer"
import { LiveChangelog } from "@/app/docs/_components/live-changelog"
import { PageHeader } from "@/app/docs/_components/page-header"
import { Tabs } from "@/app/docs/_components/tabs"

type PreChild = ReactElement<{
  children?: string
  className?: string
  "data-filename"?: string
}>

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: (props) => {
      const child = (props as { children?: PreChild }).children
      if (!child || typeof child !== "object") return <pre>{(props as { children?: never }).children}</pre>
      const codeClass = child.props.className ?? ""
      const langMatch = /language-([a-zA-Z0-9-]+)/.exec(codeClass)
      const lang = langMatch ? langMatch[1] : undefined
      const filename = child.props["data-filename"]
      const raw = typeof child.props.children === "string" ? child.props.children : ""
      const content = raw.replace(/\n$/, "")
      return (
        <CodeBlock lang={lang} filename={filename} plain={content}>
          {content}
        </CodeBlock>
      )
    },
    h2: ({ children, ...props }) => (
      <h2 className="section" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="sub" {...props}>
        {children}
      </h3>
    ),
    table: ({ children, ...props }) => (
      <table className="docs-table" {...props}>
        {children}
      </table>
    ),
    Callout,
    CodeBlock,
    CommandExplorer,
    LiveChangelog,
    PageHeader,
    Tabs,
    ...components,
  }
}
