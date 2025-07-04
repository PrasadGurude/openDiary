import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all users (admin only)
export async function GET(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const users = await prisma.user.findMany()
  return NextResponse.json({ users })
}

// POST create user (admin only)
export async function POST(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  const newUser = await prisma.user.create({ data: body })
  return NextResponse.json({ message: "User created", user: newUser }, { status: 201 })
}
