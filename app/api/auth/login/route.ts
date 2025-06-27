import { NextResponse } from "next/server"
import { signJwt } from "@/lib/auth"

const users = [
  { id: "1", email: "admin@example.com", password: "password", role: "ADMIN" },
  { id: "2", email: "user@example.com", password: "password", role: "USER" },
]

export async function POST(request: Request): Promise<Response> {
  const { email, password } = await request.json()
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
  const token = signJwt({ id: user.id, email: user.email, role: user.role })
  return NextResponse.json({ token, user: { id: user.id, email: user.email, role: user.role } })
}
