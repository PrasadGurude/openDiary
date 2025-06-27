import { NextResponse } from "next/server"
import { githubFetch } from "@/lib/github"

interface Params {
  params: { username: string }
}

export async function GET(request: Request, { params }: Params): Promise<Response> {
  const res = await githubFetch(`https://api.github.com/users/${params.username}`)
  if (!res.ok) {
    return NextResponse.json({ error: "GitHub user not found" }, { status: 404 })
  }
  const user = await res.json()
  return NextResponse.json({ user })
}
