import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient, VoteType } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { projectId, type } = await request.json()
  if (!projectId || !type) return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  const vote = await prisma.projectVote.upsert({
    where: { userId_projectId: { userId: user.id, projectId } },
    update: { type },
    create: { userId: user.id, projectId, type },
  })
  return NextResponse.json({ message: "Vote recorded", vote })
}
