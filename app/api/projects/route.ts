import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all projects (public)
export async function GET(): Promise<Response> {
  const projects = await prisma.project.findMany()
  return NextResponse.json({ projects })
}

// POST create project (auth required)
export async function POST(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  const project = await prisma.project.create({ data: body })
  return NextResponse.json({ message: "Project created", project }, { status: 201 })
}
