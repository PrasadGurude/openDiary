import { NextResponse } from "next/server"
import { signJwt } from "@/lib/auth"

// In-memory users for demo (replace with DB in production)
const users: any[] = [
  { id: "1", email: "admin@example.com", password: "password", role: "ADMIN" },
  { id: "2", email: "user@example.com", password: "password", role: "USER" },
]

export async function POST(request: Request): Promise<Response> {
  const body = await request.json()
  const { email, password, name, githubUsername, ...rest } = body

  if (!email || !password || !name || !githubUsername) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Check if user exists
  if (users.find((u) => u.email === email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 })
  }

  // Create user (in-memory for demo)
  const newUser = {
    id: (users.length + 1).toString(),
    email,
    password,
    name,
    githubUsername,
    role: "USER",
    ...rest,
  }
  users.push(newUser)

  const token = signJwt({ id: newUser.id, email: newUser.email, role: newUser.role })
  return NextResponse.json({
    token,
    user: { id: newUser.id, email: newUser.email, name: newUser.name, githubUsername: newUser.githubUsername, role: newUser.role },
  })
}
