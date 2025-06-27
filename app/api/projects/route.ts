import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

// GET all projects (public)
export async function GET(request: Request): Promise<Response> {
  // ...fetch projects from db...
  return NextResponse.json({ projects: [] })
}

// POST create project (auth required)
export async function POST(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  // ...create project in db...
  return NextResponse.json({ message: "Project created", project: body }, { status: 201 })
}
