import { NextResponse } from "next/server"

// GET /api/github/repos/[owner]/[repo]/contributors - Get GitHub repo contributors
export async function GET(request: Request, { params }: { params: { owner: string; repo: string } }) {
  // In a real application, you would fetch data from the GitHub API
  // For now, we'll return dummy data
  return NextResponse.json([
    {
      login: "user1",
      avatar_url: "https://github.com/user1.png",
      contributions: 100,
    },
    {
      login: "user2",
      avatar_url: "https://github.com/user2.png",
      contributions: 50,
    },
    // More contributors
  ])
}
