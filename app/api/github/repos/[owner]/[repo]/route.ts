import { NextResponse } from "next/server"

// GET /api/github/repos/[owner]/[repo] - Get GitHub repo data
export async function GET(request: Request, { params }: { params: { owner: string; repo: string } }) {
  // In a real application, you would fetch data from the GitHub API
  // For now, we'll return dummy data
  return NextResponse.json({
    repo: {
      name: params.repo,
      full_name: `${params.owner}/${params.repo}`,
      description: "Repository description",
      stargazers_count: 100,
      forks_count: 20,
      open_issues_count: 5,
      language: "TypeScript",
      topics: ["nextjs", "react", "typescript"],
      // Other GitHub repo data
    },
  })
}
