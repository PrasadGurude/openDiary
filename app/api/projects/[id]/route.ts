import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface Params {
  params: { id: string }
}

export async function GET(request: Request, { params }: Params): Promise<Response> {
  const project = await prisma.project.findUnique({ where: { id: params.id } })
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json({ project })
}

export async function PATCH(request: Request, { params }: Params): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  const project = await prisma.project.update({ where: { id: params.id }, data: body })
  return NextResponse.json({ message: "Project updated", project })
}

export async function DELETE(request: Request, { params }: Params): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  await prisma.project.delete({ where: { id: params.id } })
  return NextResponse.json({ message: "Project deleted", id: params.id })
}
