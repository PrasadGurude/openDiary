import { NextResponse } from "next/server"

// GET /api/github/repos/[owner]/[repo]/languages - Get GitHub repo languages
export async function GET(request: Request, { params }: { params: { owner: string; repo: string } }) {
  // In a real application, you would fetch data from the GitHub API
  // For now, we'll return dummy data
  return NextResponse.json({
    TypeScript: 10000,
    JavaScript: 5000,
    CSS: 2000,
    HTML: 1000,
  })
}
