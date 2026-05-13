import Link from "next/link"
import { docPath, type DocRoute } from "../_data/routes"

export interface PagerProps {
  prev: DocRoute | null
  next: DocRoute | null
}

export function Pager({ prev, next }: PagerProps) {
  return (
    <div className="pager">
      {prev ? (
        <Link href={docPath(prev.slug)}>
          <div className="pg-dir">← Previous</div>
          <div className="pg-title">{prev.title}</div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link className="next" href={docPath(next.slug)}>
          <div className="pg-dir">Next →</div>
          <div className="pg-title">{next.title}</div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
