import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

// GET all users (admin only)
export async function GET(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  // ...fetch users from db...
  return NextResponse.json({ users: [] })
}

// POST create user (admin only)
export async function POST(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  // ...create user in db...
  return NextResponse.json({ message: "User created", user: body }, { status: 201 })
}
