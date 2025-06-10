import { NextResponse } from "next/server"

// GET /api/github/repos/[owner]/[repo]/commits - Get GitHub repo commits
export async function GET(request: Request, { params }: { params: { owner: string; repo: string } }) {
  // In a real application, you would fetch data from the GitHub API
  // For now, we'll return dummy data
  return NextResponse.json([
    {
      sha: "abc123",
      commit: {
        message: "Fix bug in authentication",
        author: {
          name: "User Name",
          date: "2023-06-01T12:00:00Z",
        },
      },
      author: {
        login: "username",
        avatar_url: "https://github.com/username.png",
      },
    },
    // More commits
  ])
}
