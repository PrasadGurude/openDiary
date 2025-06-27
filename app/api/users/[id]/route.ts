import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

interface Params {
  params: { id: string }
}

// GET user by id (self or admin)
export async function GET(request: Request, { params }: Params): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user || (user.id !== params.id && user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  // ...fetch user from db...
  return NextResponse.json({ user: { id: params.id } })
}

// PATCH update user (self or admin)
export async function PATCH(request: Request, { params }: Params): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user || (user.id !== params.id && user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  // ...update user in db...
  return NextResponse.json({ message: "User updated", user: { id: params.id, ...body } })
}

// DELETE user (admin only)
export async function DELETE(request: Request, { params }: Params): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  // ...delete user from db...
  return NextResponse.json({ message: "User deleted", id: params.id })
}
