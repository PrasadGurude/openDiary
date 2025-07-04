import { NextResponse } from "next/server"
import { signJwt } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request): Promise<Response> {
  const { email, password } = await request.json()
  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
  }
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
  const token = signJwt({ id: user.id, email: user.email })
  return NextResponse.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      githubUsername: user.githubUsername,
    },
  })
}
