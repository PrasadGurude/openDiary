import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { mockUsers } from "@/lib/data"

// GET all users (admin only)
export async function GET(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  // Return all users from mock data
  return NextResponse.json({ users: mockUsers })
}

// POST create user (admin only)
export async function POST(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  // Here you would insert into your DB; for demo, just echo back
  return NextResponse.json({ message: "User created", user: body }, { status: 201 })
}
