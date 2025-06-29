import { NextResponse } from "next/server"

export async function GET(): Promise<Response> {
  // In a real app, redirect to GitHub OAuth
  return NextResponse.json({ message: "GitHub OAuth not implemented in demo" })
}
