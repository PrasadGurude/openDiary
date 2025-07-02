import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { mockProjects } from "@/lib/data"

// GET all projects (public)
export async function GET(request: Request): Promise<Response> {
  // Return all projects from mock data
  return NextResponse.json({ projects: mockProjects })
}

// POST create project (auth required)
export async function POST(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  // Here you would insert into your DB; for demo, just echo back
  return NextResponse.json({ message: "Project created", project: body }, { status: 201 })
}
