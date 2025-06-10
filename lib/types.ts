// Enums matching Prisma schema
export enum TagType {
  YCOMBINATOR = "YCOMBINATOR",
  GSOC = "GSOC",
  WTFUND = "WTFUND",
  HACKTOBERFEST = "HACKTOBERFEST",
  DEVFOLIO = "DEVFOLIO",
  MLH = "MLH",
}

export enum SuggestionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum VoteType {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
}

// User interface matching Prisma model
export interface User {
  id: string
  name: string
  email: string
  githubUsername: string
  githubProfile?: string
  bio?: string
  avatarUrl?: string
  skills: string[]
  experience?: string
  interests: string[]
  contributionScore: number
  totalCommits: number
  totalPRs: number
  totalStars: number
  githubFollowers: number
  topLanguages: string[]
  verifiedGithub: boolean
  publicProfile: boolean
  isDiscoverable: boolean
  twitterHandle?: string
  linkedinUrl?: string
  mobile?: string
  createdAt: Date
}

// Project interface matching Prisma model
export interface Project {
  id: string
  name: string
  fullName: string
  githubUrl: string
  liveLink?: string
  description?: string
  stars: number
  forks: number
  owner?: string
  license?: string
  topics: string[]
  languages?: Record<string, number>
  visibility: boolean
  autoSynced: boolean
  lastSyncedAt?: Date
  approved: boolean
  upvotes: number
  downvotes: number
  createdAt: Date
  tags: ProjectTag[]
}

// ProjectTag interface matching Prisma model
export interface ProjectTag {
  id: string
  projectId: string
  type: TagType
  sourceUrl: string
  verified: boolean
}

// ProjectSuggestion interface matching Prisma model
export interface ProjectSuggestion {
  id: string
  githubUrl: string
  notes?: string
  submittedById: string
  status: SuggestionStatus
  createdAt: Date
  suggestedTags: SuggestedTag[]
}

// SuggestedTag interface matching Prisma model
export interface SuggestedTag {
  id: string
  suggestionId: string
  type: TagType
  sourceUrl: string
  verified: boolean
}

// Form data interfaces for components
export interface UserSignupData {
  name: string
  email: string
  password: string
  githubUsername: string
  bio?: string
  experience?: string
  skills: string[]
  interests: string[]
  twitterHandle?: string
  linkedinUrl?: string
  mobile?: string
  publicProfile: boolean
  isDiscoverable: boolean
}

export interface ProjectSuggestionData {
  githubUrl: string
  notes?: string
  suggestedTags: {
    type: TagType
    sourceUrl: string
  }[]
}
