import { NextResponse } from "next/server"
import { githubFetch } from "@/lib/github"

interface Params {
  params: { owner: string; repo: string }
}

export async function GET(request: Request, { params }: Params): Promise<Response> {
  const res = await githubFetch(`https://api.github.com/repos/${params.owner}/${params.repo}/languages`)
  if (!res.ok) {
    return NextResponse.json({ error: "Languages not found" }, { status: 404 })
  }
  const data = await res.json()
  return NextResponse.json(data)
}
