// Seed script without using faker

import { PrismaClient, TagType, VoteType, SuggestionStatus } from "@prisma/client"

const prisma = new PrismaClient()

const ALL_SKILLS = ["React", "Vue", "Svelte", "Go", "Rust", "TypeScript", "Python", "Node.js", "Java", "C++"]
const ALL_INTERESTS = ["frontend", "backend", "devops", "ml", "blockchain", "ai", "design", "testing"]
const ALL_LANGUAGES = ["Go", "Rust", "TypeScript", "JavaScript", "Python", "Java", "C#", "Ruby"]
const ALL_TOPICS = ["web", "cli", "api", "data", "tooling", "cloud", "auth", "ci/cd", "graphql", "db"]
const TAGS = Object.values(TagType)

function getRandomElements<T>(arr: T[], min = 2, max = 4): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.floor(Math.random() * (max - min + 1)) + min)
}

function getUniqueLanguages() {
  const langs = getRandomElements(ALL_LANGUAGES, 2, 2)
  return Object.fromEntries(langs.map(lang => [lang, Math.floor(Math.random() * 50 + 10)]))
}

function getRandomDatePast(): Date {
  const start = new Date("2022-01-01")
  const end = new Date("2023-12-31")
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function getRandomDateRecent(after: Date): Date {
  const now = new Date()
  return new Date(after.getTime() + Math.random() * (now.getTime() - after.getTime()))
}

async function main() {
  const users = []
  for (let i = 0; i < 45; i++) {
    const username = `user${i}`
    const createdAt = getRandomDatePast()
    const updatedAt = getRandomDateRecent(createdAt)
    const user = await prisma.user.upsert({
      where: { email: `user${i}@example.com` },
      update: {},
      create: {
        id: `usr-${i}`,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        emailVerified: true,
        githubUsername: `user${i}`,
        githubProfile: `https://github.com/user${i}`,
        bio: `Bio of user ${i}`,
        avatarUrl: `https://api.multiavatar.com/user${i}.svg`,
        skills: getRandomElements(ALL_SKILLS),
        experience: `${Math.floor(Math.random() * 10 + 1)} years`,
        interests: getRandomElements(ALL_INTERESTS),
        contributionScore: Math.floor(Math.random() * 1000),
        totalCommits: Math.floor(Math.random() * 9950 + 50),
        totalPRs: Math.floor(Math.random() * 300 + 1),
        totalStars: Math.floor(Math.random() * 5000),
        githubFollowers: Math.floor(Math.random() * 2000),
        topLanguages: getRandomElements(ALL_LANGUAGES),
        verifiedGithub: true,
        publicProfile: true,
        isDiscoverable: true,
        twitterHandle: `@user${i}`,
        linkedinUrl: `https://linkedin.com/in/user${i}`,
        mobile: `9${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
        createdAt,
        updatedAt,
      },
    })
    users.push(user)
  }

  const suggestions = []
  for (let i = 0; i < 65; i++) {
    const status = i % 3 === 0 ? SuggestionStatus.REJECTED : i % 2 === 0 ? SuggestionStatus.PENDING : SuggestionStatus.APPROVED
    const user = users[i % users.length]
    const createdAt = getRandomDatePast()
    const updatedAt = getRandomDateRecent(createdAt)
    const suggestion = await prisma.projectSuggestion.upsert({
      where: { id: `sugg-${i}` },
      update: {},
      create: {
        id: `sugg-${i}`,
        githubUrl: `https://github.com/example/project-${i}`,
        notes: `Suggestion notes ${i}`,
        submittedById: user.id,
        status,
        createdAt,
        updatedAt,
        suggestedTags: {
          create: getRandomElements(TAGS, 2, 2).map(type => ({
            type,
            sourceUrl: `https://source.com/${type.toLowerCase()}`,
            verified: Math.random() > 0.5,
          }))
        },
      }
    })
    suggestions.push(suggestion)
  }

  const approvedSuggestions = suggestions.filter(s => s.status === SuggestionStatus.APPROVED)
  const projects = []
  for (let i = 0; i < 55; i++) {
    const sug = approvedSuggestions[i % approvedSuggestions.length]
    const createdAt = getRandomDatePast()
    const updatedAt = getRandomDateRecent(createdAt)

    const existing = await prisma.project.findUnique({ where: { githubUrl: sug.githubUrl } })
    if (existing) continue

    const project = await prisma.project.create({
      data: {
        id: `prj-${i}`,
        name: `Project ${i}`,
        fullName: `example/project-${i}`,
        githubUrl: sug.githubUrl,
        liveLink: `https://live.com/project-${i}`,
        description: `This is the project ${i} description.`,
        stars: Math.floor(Math.random() * 5000),
        forks: Math.floor(Math.random() * 500 + 1),
        owner: users[i % users.length].githubUsername,
        license: ["MIT", "Apache-2.0", "GPL-3.0", "ISC"][i % 4],
        topics: getRandomElements(ALL_TOPICS),
        languages: getUniqueLanguages(),
        visibility: true,
        autoSynced: Math.random() > 0.5,
        lastSyncedAt: getRandomDateRecent(createdAt),
        approved: true,
        upvotes: Math.floor(Math.random() * 300),
        downvotes: Math.floor(Math.random() * 50),
        createdAt,
        updatedAt,
        suggestionId: sug.id,
        tags: {
          create: getRandomElements(TAGS, 2, 2).map(type => ({
            type,
            sourceUrl: `https://source.com/${type.toLowerCase()}`,
            verified: true,
          }))
        }
      },
    })
    projects.push(project)
  }

  const usedBookmarks = new Set<string>()
  const usedVotes = new Set<string>()

  for (const user of users) {
    const chosen = getRandomElements(projects, 4, 7)
    for (const project of chosen) {
      const key = `${user.id}-${project.id}`
      const createdAt = getRandomDatePast()

      if (!usedBookmarks.has(key)) {
        await prisma.bookmark.create({
          data: {
            userId: user.id,
            projectId: project.id,
            createdAt,
            updatedAt: getRandomDateRecent(createdAt),
          },
        })
        usedBookmarks.add(key)
      }

      if (!usedVotes.has(key)) {
        await prisma.projectVote.create({
          data: {
            userId: user.id,
            projectId: project.id,
            type: Math.random() > 0.5 ? VoteType.UPVOTE : VoteType.DOWNVOTE,
            createdAt,
            updatedAt: getRandomDateRecent(createdAt),
          },
        })
        usedVotes.add(key)
      }
    }
  }

  for (let i = 0; i < users.length; i++) {
    const follower = users[i]
    const followees = getRandomElements(users.filter((_, j) => j !== i), 2, 5)
    for (const followee of followees) {
      await prisma.userFollow.upsert({
        where: { followerId_followingId: { followerId: follower.id, followingId: followee.id } },
        update: {},
        create: {
          id: `follow-${follower.id}-${followee.id}`,
          followerId: follower.id,
          followingId: followee.id,
        },
      })
    }
  }

  console.log("✅ Seeding complete.")
}

main().catch(console.error).finally(() => prisma.$disconnect())
