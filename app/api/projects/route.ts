import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all projects (public) with filtering, sorting, pagination
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search") || ""
  const page = Number(searchParams.get("page") || "1")
  const pageSize = Number(searchParams.get("pageSize") || "20")
  const sortBy = searchParams.get("sortBy") || "createdAt"
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc"
  const approved = searchParams.get("approved")

  const where: any = {}
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { owner: { contains: search, mode: "insensitive" } },
      { topics: { has: search } },
    ]
  }
  if (approved !== null) {
    where.approved = approved === "true"
  }

  const projects = await prisma.project.findMany({
    where,
    orderBy: { [sortBy]: sortOrder },
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: { tags: true, bookmarks: true, votes: true },
  })
  const total = await prisma.project.count({ where })
  return NextResponse.json({ projects, total, page, pageSize })
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
