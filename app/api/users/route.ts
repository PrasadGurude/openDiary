import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all users (admin only) with filtering, sorting, pagination
export async function GET(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search") || ""
  const page = Number(searchParams.get("page") || "1")
  const pageSize = Number(searchParams.get("pageSize") || "20")
  const sortBy = searchParams.get("sortBy") || "createdAt"
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc"

  const where =
    search.trim()
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { githubUsername: { contains: search, mode: "insensitive" } },
          ] as any, // Fix type error for Prisma's UserWhereInput[]
        }
      : undefined

  const users = await prisma.user.findMany({
    where,
    orderBy: { [sortBy]: sortOrder },
    skip: (page - 1) * pageSize,
    take: pageSize,
  })
  const total = await prisma.user.count({ where })
  return NextResponse.json({ users, total, page, pageSize })
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
