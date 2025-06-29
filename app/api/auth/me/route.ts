import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: Request): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  // In a real app, fetch user from DB by user.id
  return NextResponse.json({ user })
}
