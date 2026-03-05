import { NextResponse } from "next/server"

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    }

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch("https://api.github.com/repos/cameroncooke/AXe", {
      headers,
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return NextResponse.json({ stars: 0, forks: 0 })
    }

    const data = await response.json()
    return NextResponse.json({
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
    })
  } catch {
    return NextResponse.json({ stars: 0, forks: 0 })
  }
}
