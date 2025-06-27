import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

interface Params {
  params: { id: string }
}

// GET project by id (public)
export async function GET(request: Request, { params }: Params): Promise<Response> {
  // ...fetch project from db...
  return NextResponse.json({ project: { id: params.id } })
}

// PATCH update project (admin only)
export async function PATCH(request: Request, { params }: Params): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  // ...update project in db...
  return NextResponse.json({ message: "Project updated", project: { id: params.id, ...body } })
}

// DELETE project (admin only)
export async function DELETE(request: Request, { params }: Params): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  // ...delete project from db...
  return NextResponse.json({ message: "Project deleted", id: params.id })
}
