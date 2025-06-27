import { NextResponse } from "next/server"
import { githubFetch } from "@/lib/github"

interface Params {
  params: { owner: string; repo: string }
}

export async function GET(request: Request, { params }: Params): Promise<Response> {
  const res = await githubFetch(`https://api.github.com/repos/${params.owner}/${params.repo}/contributors`)
  if (!res.ok) {
    return NextResponse.json({ error: "Contributors not found" }, { status: 404 })
  }
  const contributors = await res.json()
  return NextResponse.json(contributors)
}
