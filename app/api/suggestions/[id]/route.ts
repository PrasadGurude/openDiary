import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

// GET /api/suggestions/[id] - Get a specific suggestion
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // In a real application, you would fetch the suggestion from your database
  // For now, we'll return dummy data
  return NextResponse.json({
    suggestion: {
      id: params.id,
      githubUrl: "https://github.com/user/repo",
      notes: "This is a great project",
      submittedById: "user-id",
      status: "PENDING",
      // Other suggestion data
    },
  })
}

// PATCH /api/suggestions/[id] - Update a specific suggestion (admin only)
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // In a real application, you would update the suggestion in your database
    // For now, we'll just return the data that was sent
    return NextResponse.json({
      message: "Suggestion updated successfully",
      suggestion: {
        id: params.id,
        ...body,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

// DELETE /api/suggestions/[id] - Delete a specific suggestion (admin only)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // In a real application, you would delete the suggestion from your database
  // For now, we'll just return a success message
  return NextResponse.json({
    message: "Suggestion deleted successfully",
    id: params.id,
  })
}
