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
