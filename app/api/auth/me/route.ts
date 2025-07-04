import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request): Promise<Response> {
  const userJwt = getUserFromRequest(request)
  if (!userJwt) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const user = await prisma.user.findUnique({ where: { id: userJwt.id } })
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
  return NextResponse.json({ user })
}
