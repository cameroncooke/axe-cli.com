import { NextResponse } from "next/server"

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    }

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(
      "https://api.github.com/repos/cameroncooke/AXe/releases/latest",
      {
        headers,
        next: { revalidate: 3600 },
      },
    )

    if (!response.ok) {
      return NextResponse.json({ version: "" })
    }

    const data = await response.json()
    return NextResponse.json({
      version: data.tag_name || "",
    })
  } catch {
    return NextResponse.json({ version: "" })
  }
}
