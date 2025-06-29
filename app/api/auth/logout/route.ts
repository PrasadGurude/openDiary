import { NextResponse } from "next/server"

export async function POST(): Promise<Response> {
  // For JWT, logout is handled client-side (remove token)
  return NextResponse.json({ message: "Logged out" })
}
