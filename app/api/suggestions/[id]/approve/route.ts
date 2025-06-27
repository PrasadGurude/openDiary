import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

interface Params {
  params: { id: string }
}

export async function POST(request: Request, { params }: Params): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  // ...approve suggestion in db...
  return NextResponse.json({ message: "Suggestion approved", id: params.id, status: "APPROVED" })
}
