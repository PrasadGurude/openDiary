import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

// In-memory bookmarks for demo
let bookmarks: { userId: string; projectId: string }[] = []

export async function GET(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // Return all bookmarks for this user
  return NextResponse.json({ bookmarks: bookmarks.filter((b) => b.userId === user.id) })
}

export async function POST(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { projectId } = await request.json()
  if (!projectId) return NextResponse.json({ error: "Missing projectId" }, { status: 400 })
  if (!bookmarks.find((b) => b.userId === user.id && b.projectId === projectId)) {
    bookmarks.push({ userId: user.id, projectId })
  }
  return NextResponse.json({ message: "Bookmarked", projectId })
}

export async function DELETE(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { projectId } = await request.json()
  if (!projectId) return NextResponse.json({ error: "Missing projectId" }, { status: 400 })
  bookmarks = bookmarks.filter((b) => !(b.userId === user.id && b.projectId === projectId))
  return NextResponse.json({ message: "Bookmark removed", projectId })
}
