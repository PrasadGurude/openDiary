import { NextResponse } from "next/server"

// GET /api/github/[username] - Get GitHub data for a specific user
export async function GET(request: Request, { params }: { params: { username: string } }) {
  // In a real application, you would fetch data from the GitHub API
  // For now, we'll return dummy data
  return NextResponse.json({
    user: {
      login: params.username,
      name: "User Name",
      avatar_url: `https://github.com/${params.username}.png`,
      bio: "User bio",
      public_repos: 20,
      followers: 100,
      following: 50,
      // Other GitHub user data
    },
  })
}
