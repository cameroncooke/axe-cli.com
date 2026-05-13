"use client"

import { useMemo, useState } from "react"
import { AXE_COMMANDS, type AxeCommandCategory } from "../_data/commands"
import { Icons } from "./icons"

const CATEGORIES: (AxeCommandCategory | "all")[] = ["all", "discovery", "interaction", "keyboard", "media", "batch", "setup"]

interface CommandExplorerProps {
  category?: AxeCommandCategory
}

export function CommandExplorer({ category: initialCategory }: CommandExplorerProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<AxeCommandCategory | "all">(initialCategory ?? "all")

  const commands = useMemo(() => {
    const q = query.trim().toLowerCase()
    return AXE_COMMANDS.filter((command) => {
      const matchesCategory = category === "all" || command.category === category
      const flagText = command.flags.map((flag) => `${flag.name} ${flag.type} ${flag.default ?? ""} ${flag.description}`).join(" ")
      const noteText = command.notes?.join(" ") ?? ""
      const haystack = [command.name, command.category, command.summary, flagText, noteText].join(" ").toLowerCase()
      return matchesCategory && (!q || haystack.includes(q))
    })
  }, [category, query])

  return (
    <div className="command-explorer">
      <div className="command-controls">
        <label className="search-wrap">
          <span className="si"><Icons.Search size={14} /></span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter commands or flags" />
        </label>
        <div className="seg">
          {CATEGORIES.map((item) => (
            <button key={item} type="button" className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="command-grid">
        {commands.map((command) => (
          <article key={command.name} className="command-card">
            <div>
              <div className="cmd-name">axe {command.name}</div>
              <p>{command.summary}</p>
            </div>
            <div className="cmd-badges">
              <span className="tc-badge">{command.category}</span>
              {command.requiresUdid ? <span className="tc-badge warn">requires UDID</span> : <span className="tc-badge">no UDID</span>}
              {command.supportsBatch ? <span className="tc-badge new">batch step</span> : null}
            </div>
            {command.flags.length > 0 ? (
              <div className="cmd-flag-table">
                <table>
                  <thead>
                    <tr>
                      <th>Flag</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {command.flags.map((flag) => (
                      <tr key={flag.name}>
                        <td><code>{flag.name}</code>{flag.required ? <span className="required"> required</span> : null}</td>
                        <td>{flag.type}</td>
                        <td>{flag.default ?? "—"}</td>
                        <td>{flag.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {command.notes?.length ? (
              <ul className="cmd-notes">
                {command.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
