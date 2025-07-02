/**
 * Script to seed dummy users, projects, bookmarks, follows, votes, and suggestions into the database using Prisma.
 * Usage: `npx ts-node --loader ts-node/esm scripts/seed-dummy-data.ts`
 */

import { PrismaClient, TagType, VoteType, SuggestionStatus } from "@prisma/client"
import {
  mockUsers,
  mockProjects,
  mockBookmarks,
  mockVotes,
  mockUserFollows,
  mockSuggestions,
} from "../lib/data"

const prisma = new PrismaClient()

async function main() {
  // Seed Users
  for (const user of mockUsers) {
    try {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          id: user.id,
          name: user.name,
          email: user.email,
          githubUsername: user.githubUsername,
          githubProfile: user.githubProfile ?? undefined,
          bio: user.bio ?? undefined,
          avatarUrl: user.avatarUrl ?? undefined,
          skills: user.skills,
          experience: user.experience ?? undefined,
          interests: user.interests,
          contributionScore: user.contributionScore,
          totalCommits: user.totalCommits,
          totalPRs: user.totalPRs,
          totalStars: user.totalStars,
          githubFollowers: user.githubFollowers,
          topLanguages: user.topLanguages,
          verifiedGithub: user.verifiedGithub,
          publicProfile: user.publicProfile,
          isDiscoverable: user.isDiscoverable,
          twitterHandle: user.twitterHandle ?? undefined,
          linkedinUrl: user.linkedinUrl ?? undefined,
          mobile: user.mobile ?? undefined,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        },
      })
      console.log(`Seeded user: ${user.email}`)
    } catch (e) {
      console.error(`Failed to seed user: ${user.email}`, e)
    }
  }

  // Seed Projects
  for (const project of mockProjects) {
    try {
      await prisma.project.upsert({
        where: { githubUrl: project.githubUrl },
        update: {},
        create: {
          id: project.id,
          name: project.name,
          fullName: project.fullName,
          githubUrl: project.githubUrl,
          liveLink: project.liveLink ?? undefined,
          description: project.description ?? undefined,
          stars: project.stars,
          forks: project.forks,
          owner: project.owner ?? undefined,
          license: project.license ?? undefined,
          topics: project.topics,
          languages: project.languages ?? undefined,
          visibility: project.visibility,
          autoSynced: project.autoSynced,
          lastSyncedAt: project.lastSyncedAt ? new Date(project.lastSyncedAt) : undefined,
          approved: project.approved,
          upvotes: project.upvotes,
          downvotes: project.downvotes,
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt),
        },
      })
      // Seed Project Tags
      if (project.tags && project.tags.length > 0) {
        for (const tag of project.tags) {
          await prisma.projectTag.upsert({
            where: {
              projectId_type: {
                projectId: project.id,
                type: tag.type as TagType,
              },
            },
            update: {},
            create: {
              id: tag.id,
              projectId: project.id,
              type: tag.type as TagType,
              sourceUrl: tag.sourceUrl,
              verified: tag.verified,
            },
          })
        }
      }
      console.log(`Seeded project: ${project.name}`)
    } catch (e) {
      console.error(`Failed to seed project: ${project.name}`, e)
    }
  }

  // Seed Bookmarks
  for (const bookmark of mockBookmarks) {
    try {
      await prisma.bookmark.upsert({
        where: { userId_projectId: { userId: bookmark.userId, projectId: bookmark.projectId } },
        update: {},
        create: {
          id: bookmark.id,
          userId: bookmark.userId,
          projectId: bookmark.projectId,
          createdAt: new Date(bookmark.createdAt),
          updatedAt: new Date(bookmark.createdAt),
        },
      })
      console.log(`Seeded bookmark: user ${bookmark.userId} -> project ${bookmark.projectId}`)
    } catch (e) {
      console.error(`Failed to seed bookmark: user ${bookmark.userId} -> project ${bookmark.projectId}`, e)
    }
  }

  // Seed Votes
  for (const vote of mockVotes) {
    try {
      await prisma.projectVote.upsert({
        where: { userId_projectId: { userId: vote.userId, projectId: vote.projectId } },
        update: {},
        create: {
          id: vote.id,
          userId: vote.userId,
          projectId: vote.projectId,
          type: vote.type as VoteType,
          createdAt: new Date(vote.createdAt),
          updatedAt: new Date(vote.createdAt),
        },
      })
      console.log(`Seeded vote: user ${vote.userId} -> project ${vote.projectId}`)
    } catch (e) {
      console.error(`Failed to seed vote: user ${vote.userId} -> project ${vote.projectId}`, e)
    }
  }

  // Seed User Follows
  for (const follow of mockUserFollows) {
    try {
      await prisma.userFollow.upsert({
        where: { followerId_followingId: { followerId: follow.followerId, followingId: follow.followingId } },
        update: {},
        create: {
          id: follow.id,
          followerId: follow.followerId,
          followingId: follow.followingId,
        },
      })
      console.log(`Seeded follow: ${follow.followerId} -> ${follow.followingId}`)
    } catch (e) {
      console.error(`Failed to seed follow: ${follow.followerId} -> ${follow.followingId}`, e)
    }
  }

  // Seed Project Suggestions and SuggestedTags
  for (const suggestion of mockSuggestions) {
    try {
      await prisma.projectSuggestion.upsert({
        where: { id: suggestion.id },
        update: {},
        create: {
          id: suggestion.id,
          githubUrl: suggestion.githubUrl,
          notes: suggestion.notes ?? undefined,
          submittedById: suggestion.submittedById,
          status: suggestion.status as SuggestionStatus,
          createdAt: new Date(suggestion.createdAt),
          updatedAt: new Date(suggestion.updatedAt),
        },
      })
      // Seed SuggestedTags for this suggestion
      if (suggestion.suggestedTags && suggestion.suggestedTags.length > 0) {
        for (const tag of suggestion.suggestedTags) {
          await prisma.suggestedTag.upsert({
            where: {
              id: tag.id,
            },
            update: {},
            create: {
              id: tag.id,
              suggestionId: suggestion.id,
              type: tag.type as TagType,
              sourceUrl: tag.sourceUrl,
              verified: tag.verified,
            },
          })
        }
      }
      console.log(`Seeded suggestion: ${suggestion.id}`)
    } catch (e) {
      console.error(`Failed to seed suggestion: ${suggestion.id}`, e)
    }
  }
}

main()
  .then(() => {
    console.log("Seeding complete.")
    return prisma.$disconnect()
  })
  .catch((err) => {
    console.error("Seeding failed:", err)
    return prisma.$disconnect().then(() => process.exit(1))
  })
