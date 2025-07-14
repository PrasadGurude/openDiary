import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all suggestions (admin only, with filtering, sorting, pagination)
export async function GET(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status")
  const page = Number(searchParams.get("page") || "1")
  const pageSize = Number(searchParams.get("pageSize") || "20")
  const sortBy = searchParams.get("sortBy") || "createdAt"
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc"

  const where: any = {}
  if (search) {
    where.OR = [
      { githubUrl: { contains: search, mode: "insensitive" } },
      { notes: { contains: search, mode: "insensitive" } },
    ]
  }
  if (status) {
    where.status = status
  }

  const suggestions = await prisma.projectSuggestion.findMany({
    where,
    orderBy: { [sortBy]: sortOrder },
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: { suggestedTags: true, submittedBy: true },
  })
  const total = await prisma.projectSuggestion.count({ where })
  return NextResponse.json({ suggestions, total, page, pageSize })
}

// POST create suggestion (auth required)
export async function POST(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  const suggestion = await prisma.projectSuggestion.create({
    data: {
      ...body,
      submittedById: user.id,
      status: "PENDING",
    },
  })
  return NextResponse.json({ message: "Suggestion created", suggestion }, { status: 201 })
}
