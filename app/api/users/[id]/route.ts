import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface Params {
  params: { id: string }
}

// GET user by id (self)
export async function GET(request: Request, { params }: Params): Promise<Response> {
  const userJwt = getUserFromRequest(request)
  if (!userJwt || (userJwt.id !== params.id)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const user = await prisma.user.findUnique({ where: { id: params.id } })
  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json({ user })
}

// PATCH update user (self)
export async function PATCH(request: Request, { params }: Params): Promise<Response> {
  const userJwt = getUserFromRequest(request)
  if (!userJwt || (userJwt.id !== params.id)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  const user = await prisma.user.update({ where: { id: params.id }, data: body })
  return NextResponse.json({ message: "User updated", user })
}

// DELETE user (self)
export async function DELETE(request: Request, { params }: Params): Promise<Response> {
  const userJwt = getUserFromRequest(request)
  if (!userJwt) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  await prisma.user.delete({ where: { id: params.id } })
  return NextResponse.json({ message: "User deleted", id: params.id })
}
