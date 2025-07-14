import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: user.id },
    include: { project: true },
  })
  return NextResponse.json({ bookmarks })
}

export async function POST(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { projectId } = await request.json()
  if (!projectId) return NextResponse.json({ error: "Missing projectId" }, { status: 400 })
  const bookmark = await prisma.bookmark.create({ data: { userId: user.id, projectId } })
  return NextResponse.json({ message: "Bookmarked", bookmark })
}

export async function DELETE(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { projectId } = await request.json()
  if (!projectId) return NextResponse.json({ error: "Missing projectId" }, { status: 400 })
  await prisma.bookmark.deleteMany({ where: { userId: user.id, projectId } })
  return NextResponse.json({ message: "Bookmark removed", projectId })
}
