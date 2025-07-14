import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { followingId } = await request.json()
  if (!followingId) return NextResponse.json({ error: "Missing followingId" }, { status: 400 })
  const follow = await prisma.userFollow.create({
    data: { followerId: user.id, followingId },
  })
  return NextResponse.json({ message: "Followed", follow })
}

export async function DELETE(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { followingId } = await request.json()
  if (!followingId) return NextResponse.json({ error: "Missing followingId" }, { status: 400 })
  await prisma.userFollow.deleteMany({ where: { followerId: user.id, followingId } })
  return NextResponse.json({ message: "Unfollowed", followingId })
}
