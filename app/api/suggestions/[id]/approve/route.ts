import { NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { PrismaClient, SuggestionStatus } from "@prisma/client"

const prisma = new PrismaClient()

interface Params {
  params: { id: string }
}

export async function POST(request: Request, { params }: Params): Promise<Response> {
  const user = getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const suggestion = await prisma.projectSuggestion.update({
    where: { id: params.id },
    data: { status: SuggestionStatus.APPROVED },
  })
  return NextResponse.json({ message: "Suggestion approved", id: params.id, status: suggestion.status })
}
