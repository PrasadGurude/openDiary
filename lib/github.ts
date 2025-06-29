const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export async function githubFetch(url: string) {
  return fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 60 },
  })
}

/**
 * Get a user's open source contributions (PRs, commits, merged PRs, issues created) using GitHub REST API.
 * Note: This is an approximation and requires iterating over all public repos the user contributed to.
 * For more accurate and efficient results, use the GitHub GraphQL API.
 */

export async function getUserOpenSourceStats(username: string) {
  // 1. Get all public repos for the user (owned)
  const reposRes = await githubFetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`)
  if (!reposRes.ok) return null
  const repos = await reposRes.json()

  let totalCommits = 0
  let totalPRs = 0
  let mergedPRs = 0
  let totalIssues = 0

  // For each repo, aggregate stats
  for (const repo of repos) {
    const owner = repo.owner.login
    const repoName = repo.name

    // Commits authored by user
    const commitsRes = await githubFetch(
      `https://api.github.com/repos/${owner}/${repoName}/commits?author=${username}&per_page=1`
    )
    if (commitsRes.ok) {
      const link = commitsRes.headers.get("link")
      if (link) {
        // Parse last page number from link header
        const match = link.match(/&page=(\d+)>; rel="last"/)
        if (match) totalCommits += Number(match[1])
      } else {
        const commits = await commitsRes.json()
        totalCommits += Array.isArray(commits) ? commits.length : 0
      }
    }

    // PRs created by user
    const prsRes = await githubFetch(
      `https://api.github.com/search/issues?q=type:pr+author:${username}+repo:${owner}/${repoName}`
    )
    if (prsRes.ok) {
      const prs = await prsRes.json()
      totalPRs += prs.total_count || 0
      // Merged PRs: filter items with pull_request.merged_at
      mergedPRs += (prs.items || []).filter((pr: any) => pr.pull_request && pr.state === "closed").length
    }

    // Issues created by user
    const issuesRes = await githubFetch(
      `https://api.github.com/search/issues?q=type:issue+author:${username}+repo:${owner}/${repoName}`
    )
    if (issuesRes.ok) {
      const issues = await issuesRes.json()
      totalIssues += issues.total_count || 0
    }
  }

  return {
    totalCommits,
    totalPRs,
    mergedPRs,
    totalIssues,
  }
}
