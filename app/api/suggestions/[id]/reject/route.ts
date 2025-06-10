import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"

// POST /api/suggestions/[id]/reject - Reject a suggestion (admin only)
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // In a real application, you would update the suggestion status in your database
  // For now, we'll just return a success message
  return NextResponse.json({
    message: "Suggestion rejected successfully",
    id: params.id,
    status: "REJECTED",
  })
}
