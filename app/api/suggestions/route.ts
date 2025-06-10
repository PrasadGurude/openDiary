import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// GET /api/suggestions - Get all project suggestions (admin only)
export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // In a real application, you would fetch suggestions from your database
  // For now, we'll return dummy data
  return NextResponse.json({
    suggestions: [
      // Dummy data would be here
    ],
  })
}

// POST /api/suggestions - Create a new project suggestion
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // In a real application, you would validate and save the suggestion to your database
    // For now, we'll just return the data that was sent
    return NextResponse.json(
      {
        message: "Suggestion submitted successfully",
        suggestion: {
          ...body,
          submittedById: session.user.id,
          status: "PENDING",
        },
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
