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
  // ...reject suggestion in db...
  return NextResponse.json({ message: "Suggestion rejected", id: params.id, status: "REJECTED" })
}
