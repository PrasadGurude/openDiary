import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

// GET /api/users/[id] - Get a specific user
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and is either the requested user or an admin
  if (!session || (session.user.id !== params.id && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // In a real application, you would fetch the user from your database
  // For now, we'll return dummy data
  return NextResponse.json({
    user: {
      id: params.id,
      name: "User Name",
      email: "user@example.com",
      // Other user data
    },
  })
}

// PATCH /api/users/[id] - Update a specific user
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and is either the requested user or an admin
  if (!session || (session.user.id !== params.id && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // In a real application, you would update the user in your database
    // For now, we'll just return the data that was sent
    return NextResponse.json({
      message: "User updated successfully",
      user: {
        id: params.id,
        ...body,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

// DELETE /api/users/[id] - Delete a specific user
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // In a real application, you would delete the user from your database
  // For now, we'll just return a success message
  return NextResponse.json({
    message: "User deleted successfully",
    id: params.id,
  })
}
