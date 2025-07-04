import { NextResponse } from "next/server"
import { signJwt } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request): Promise<Response> {
  const body = await request.json()
  const { email, password, name, githubUsername } = body
  if (!email || !password || !name || !githubUsername) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 })
  }
  const user = await prisma.user.create({
    data: { email, password, name, githubUsername },
  })
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
    ...rest,
  }
  users.push(newUser)

  const token = signJwt({ id: newUser.id, email: newUser.email, role: newUser.role })
  return NextResponse.json({
    token,
    user: { id: newUser.id, email: newUser.email, name: newUser.name, githubUsername: newUser.githubUsername, role: newUser.role },
  })
}
