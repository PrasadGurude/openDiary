// Enhanced mock data with comprehensive GitHub API structure
import { TagType } from "./types"
import type { ProjectTag } from "./types"

// --- Additional types for schema relations ---
export interface Bookmark {
  id: string
  userId: string
  projectId: string
  createdAt: string
}

export interface ProjectVote {
  id: string
  userId: string
  projectId: string
  type: "UPVOTE" | "DOWNVOTE"
  createdAt: string
}

export interface UserFollow {
  id: string
  followerId: string
  followingId: string
}

// --- Extend User and Project interfaces for relations ---
export interface User {
  id: string
  name: string
  email: string
  githubUsername: string
  githubProfile?: string | null
  bio?: string | null
  avatarUrl?: string | null
  skills: string[]
  experience?: string | null
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
  twitterHandle?: string | null
  linkedinUrl?: string | null
  mobile?: string | null
  createdAt: string
  updatedAt: string
  bookmarks: Bookmark[]
  suggestions: any[]
  votes: ProjectVote[]
  followers: UserFollow[]
  following: UserFollow[]
}

export interface GitHubRelease {
  id: string
  tagName: string
  name: string
  body: string
  publishedAt: string
  prerelease: boolean
  draft: boolean
  downloadCount: number
  assets: {
    name: string
    downloadCount: number
    size: number
  }[]
}

export interface GitHubContributor {
  login: string
  avatarUrl: string
  contributions: number
  type: "User" | "Bot"
  htmlUrl: string
  name?: string
  company?: string
  location?: string
}

export interface GitHubIssue {
  id: string
  number: number
  title: string
  body: string
  state: "open" | "closed"
  createdAt: string
  updatedAt: string
  closedAt?: string
  user: {
    login: string
    avatarUrl: string
  }
  labels: {
    name: string
    color: string
  }[]
  assignees: {
    login: string
    avatarUrl: string
  }[]
}

export interface GitHubPullRequest {
  id: string
  number: number
  title: string
  body: string
  state: "open" | "closed" | "merged"
  createdAt: string
  updatedAt: string
  closedAt?: string
  mergedAt?: string
  user: {
    login: string
    avatarUrl: string
  }
  additions: number
  deletions: number
  changedFiles: number
}

export interface GitHubCommit {
  sha: string
  message: string
  author: {
    name: string
    email: string
    date: string
  }
  committer: {
    name: string
    email: string
    date: string
  }
  stats: {
    additions: number
    deletions: number
    total: number
  }
}

export interface Project {
  id: string
  name: string
  fullName: string
  githubUrl: string
  liveLink?: string | null
  description?: string | null
  stars: number
  forks: number
  owner?: string | null
  license?: string | null
  topics: string[]
  languages?: Record<string, number> | null
  visibility: boolean
  autoSynced: boolean
  lastSyncedAt?: string | null
  approved: boolean
  upvotes: number
  downvotes: number
  createdAt: string
  updatedAt: string
  tags: ProjectTag[]
  bookmarks: Bookmark[]
  votes: ProjectVote[]
  githubData: any
}

// Mock Users Data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    password: "password",
    emailVerified: true,
    githubUsername: "sarahchen",
    githubProfile: "https://github.com/sarahchen",
    bio: "Full-stack developer passionate about open source and machine learning. Contributing to React ecosystem and building developer tools.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    skills: ["React", "TypeScript", "Node.js", "Python", "Machine Learning"],
    experience: "Advanced",
    interests: ["AI", "Web Development", "DevOps"],
    contributionScore: 2847,
    totalCommits: 1250,
    totalPRs: 89,
    totalStars: 3420,
    githubFollowers: 892,
    topLanguages: ["TypeScript", "Python", "JavaScript", "Go"],
    verifiedGithub: true,
    publicProfile: true,
    isDiscoverable: true,
    twitterHandle: "@sarahchen_dev",
    linkedinUrl: "https://linkedin.com/in/sarahchen",
    mobile: null,
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    bookmarks: [],
    suggestions: [],
    votes: [],
    followers: [],
    following: [],
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    email: "marcus@example.com",
    password: "password",
    emailVerified: true,
    githubUsername: "marcusdev",
    githubProfile: "https://github.com/marcusdev",
    bio: "Backend engineer specializing in distributed systems and cloud architecture. Active contributor to Kubernetes and Docker projects.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    skills: ["Go", "Kubernetes", "Docker", "AWS", "Microservices"],
    experience: "Advanced",
    interests: ["Cloud Computing", "DevOps", "Security"],
    contributionScore: 3156,
    totalCommits: 1890,
    totalPRs: 156,
    totalStars: 4230,
    githubFollowers: 1240,
    topLanguages: ["Go", "Python", "Shell", "YAML"],
    verifiedGithub: true,
    publicProfile: true,
    isDiscoverable: true,
    linkedinUrl: "https://linkedin.com/in/marcusrodriguez",
    twitterHandle: "@marcus_devops",
    mobile: null,
    createdAt: "2022-08-20T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    bookmarks: [],
    suggestions: [],
    votes: [],
    followers: [],
    following: [],
  },
  {
    id: "3",
    name: "Emily Watson",
    email: "emily@example.com",
    password: "password",
    emailVerified: true,
    githubUsername: "emilywatson",
    githubProfile: "https://github.com/emilywatson",
    bio: "Frontend developer and UI/UX enthusiast. Creating beautiful and accessible web experiences. Maintainer of several React component libraries.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    skills: ["React", "Vue.js", "CSS", "Design Systems", "Accessibility"],
    experience: "Intermediate",
    interests: ["UI/UX", "Accessibility", "Design"],
    contributionScore: 1923,
    totalCommits: 876,
    totalPRs: 67,
    totalStars: 2180,
    githubFollowers: 543,
    topLanguages: ["JavaScript", "TypeScript", "CSS", "HTML"],
    verifiedGithub: true,
    publicProfile: true,
    isDiscoverable: true,
    twitterHandle: "emily_codes",
    linkedinUrl: null,
    mobile: null,
    createdAt: "2023-03-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    bookmarks: [],
    suggestions: [],
    votes: [],
    followers: [],
    following: [],
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@example.com",
    password: "password",
    emailVerified: true,
    githubUsername: "davidkim",
    githubProfile: "https://github.com/davidkim",
    bio: "Data scientist and ML engineer working on computer vision and NLP projects. Contributing to TensorFlow and PyTorch ecosystems.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
    experience: "Advanced",
    interests: ["Machine Learning", "AI Research", "Computer Vision"],
    contributionScore: 2634,
    totalCommits: 1456,
    totalPRs: 98,
    totalStars: 3890,
    githubFollowers: 756,
    topLanguages: ["Python", "Jupyter Notebook", "R", "C++"],
    verifiedGithub: true,
    publicProfile: true,
    isDiscoverable: true,
    linkedinUrl: "https://linkedin.com/in/davidkim-ml",
    twitterHandle: null,
    mobile: null,
    createdAt: "2022-11-05T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    bookmarks: [],
    suggestions: [],
    votes: [],
    followers: [],
    following: [],
  },
  {
    id: "5",
    name: "Alex Thompson",
    email: "alex@example.com",
    password: "password",
    emailVerified: true,
    githubUsername: "alexthompson",
    githubProfile: "https://github.com/alexthompson",
    bio: "Mobile developer focused on React Native and Flutter. Building cross-platform apps and contributing to mobile development tools.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    skills: ["React Native", "Flutter", "Dart", "Swift", "Kotlin"],
    experience: "Intermediate",
    interests: ["Mobile Development", "Cross-platform", "Performance"],
    contributionScore: 1567,
    totalCommits: 723,
    totalPRs: 45,
    totalStars: 1890,
    githubFollowers: 432,
    topLanguages: ["Dart", "JavaScript", "Swift", "Kotlin"],
    verifiedGithub: true,
    publicProfile: true,
    isDiscoverable: true,
    twitterHandle: "alex_mobile",
    linkedinUrl: null,
    mobile: null,
    createdAt: "2023-05-18T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    bookmarks: [],
    suggestions: [],
    votes: [],
    followers: [],
    following: [],
  },
  {
    id: "6",
    name: "Lisa Zhang",
    email: "lisa@example.com",
    password: "password",
    emailVerified: true,
    githubUsername: "lisazhang",
    githubProfile: "https://github.com/lisazhang",
    bio: "DevOps engineer and infrastructure specialist. Automating deployments and building CI/CD pipelines. Active in the HashiCorp community.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    skills: ["Terraform", "Ansible", "Jenkins", "AWS", "Linux"],
    experience: "Advanced",
    interests: ["Infrastructure", "Automation", "Cloud"],
    contributionScore: 2234,
    totalCommits: 1123,
    totalPRs: 78,
    totalStars: 2567,
    githubFollowers: 634,
    topLanguages: ["HCL", "YAML", "Shell", "Python"],
    verifiedGithub: true,
    publicProfile: true,
    isDiscoverable: true,
    linkedinUrl: "https://linkedin.com/in/lisazhang-devops",
    twitterHandle: null,
    mobile: null,
    createdAt: "2022-09-12T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    bookmarks: [],
    suggestions: [],
    votes: [],
    followers: [],
    following: [],
  },
  {
    id: "7",
    name: "James Wilson",
    email: "james@example.com",
    password: "password",
    emailVerified: true,
    githubUsername: "jameswilson",
    githubProfile: "https://github.com/jameswilson",
    bio: "Blockchain developer and cryptocurrency enthusiast. Building DeFi applications and smart contracts on Ethereum and Solana.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    skills: ["Solidity", "Rust", "Web3", "Smart Contracts", "DeFi"],
    experience: "Advanced",
    interests: ["Blockchain", "Cryptocurrency", "DeFi"],
    contributionScore: 1876,
    totalCommits: 934,
    totalPRs: 56,
    totalStars: 2340,
    githubFollowers: 567,
    topLanguages: ["Solidity", "Rust", "JavaScript", "TypeScript"],
    verifiedGithub: true,
    publicProfile: true,
    isDiscoverable: true,
    twitterHandle: "@james_web3",
    linkedinUrl: null,
    mobile: null,
    createdAt: "2023-02-14T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    bookmarks: [],
    suggestions: [],
    votes: [],
    followers: [],
    following: [],
  },
  {
    id: "8",
    name: "Maria Garcia",
    email: "maria@example.com",
    password: "password",
    emailVerified: true,
    githubUsername: "mariagarcia",
    githubProfile: "https://github.com/mariagarcia",
    bio: "Security researcher and ethical hacker. Specializing in web application security and penetration testing. Bug bounty hunter.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    skills: ["Cybersecurity", "Penetration Testing", "Python", "Bash", "Network Security"],
    experience: "Advanced",
    interests: ["Security", "Ethical Hacking", "Bug Bounty"],
    contributionScore: 1654,
    totalCommits: 789,
    totalPRs: 43,
    totalStars: 1987,
    githubFollowers: 445,
    topLanguages: ["Python", "Shell", "C", "Assembly"],
    verifiedGithub: true,
    publicProfile: true,
    isDiscoverable: true,
    linkedinUrl: "https://linkedin.com/in/mariagarcia-security",
    twitterHandle: null,
    mobile: null,
    createdAt: "2023-04-22T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    bookmarks: [],
    suggestions: [],
    votes: [],
    followers: [],
    following: [],
  },
  {
    id: "9",
    name: "Robert Johnson",
    email: "robert@example.com",
    password: "password",
    emailVerified: true,
    githubUsername: "robertjohnson",
    githubProfile: "https://github.com/robertjohnson",
    bio: "Game developer and graphics programmer. Creating immersive experiences with Unity and Unreal Engine. VR/AR enthusiast.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    skills: ["Unity", "C#", "Unreal Engine", "C++", "VR/AR"],
    experience: "Intermediate",
    interests: ["Game Development", "Graphics Programming", "VR/AR"],
    contributionScore: 1432,
    totalCommits: 678,
    totalPRs: 34,
    totalStars: 1654,
    githubFollowers: 378,
    topLanguages: ["C#", "C++", "HLSL", "JavaScript"],
    verifiedGithub: true,
    publicProfile: true,
    isDiscoverable: true,
    twitterHandle: "@robert_gamedev",
    linkedinUrl: null,
    mobile: null,
    createdAt: "2023-06-08T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    bookmarks: [],
    suggestions: [],
    votes: [],
    followers: [],
    following: [],
  },
  {
    id: "10",
    name: "Anna Kowalski",
    email: "anna@example.com",
    password: "password",
    emailVerified: true,
    githubUsername: "annakowalski",
    githubProfile: "https://github.com/annakowalski",
    bio: "Data engineer and analytics specialist. Building scalable data pipelines and real-time analytics systems. Apache Spark contributor.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    skills: ["Apache Spark", "Scala", "Kafka", "Hadoop", "SQL"],
    experience: "Advanced",
    interests: ["Big Data", "Analytics", "Data Engineering"],
    contributionScore: 2156,
    totalCommits: 1034,
    totalPRs: 67,
    totalStars: 2789,
    githubFollowers: 623,
    topLanguages: ["Scala", "Python", "SQL", "Java"],
    verifiedGithub: true,
    publicProfile: true,
    isDiscoverable: true,
    linkedinUrl: "https://linkedin.com/in/annakowalski-data",
    twitterHandle: null,
    mobile: null,
    createdAt: "2022-12-18T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    bookmarks: [],
    suggestions: [],
    votes: [],
    followers: [],
    following: [],
  },
  // Add 35 more users for a total of 45
  ...Array.from({ length: 35 }, (_, i) => {
    const idx = i + 11
    const name = `Demo User ${idx}`
    const username = `demouser${idx}`
    const skillsList = [
      ["JavaScript", "React", "Node.js"],
      ["Python", "Django", "PostgreSQL"],
      ["Go", "Kubernetes", "Docker"],
      ["Java", "Spring Boot", "MySQL"],
      ["Rust", "WebAssembly", "Actix"],
      ["PHP", "Laravel", "Vue.js"],
      ["C#", ".NET Core", "Azure"],
      ["Ruby", "Rails", "Sidekiq"],
      ["Swift", "iOS", "SwiftUI"],
      ["Kotlin", "Android", "Jetpack Compose"],
    ]
    const skills = skillsList[i % skillsList.length]
    return {
      id: idx.toString(),
      name,
      email: `${username}@example.com`,
      password: "password",
      emailVerified: true,
      githubUsername: username,
      githubProfile: `https://github.com/${username}`,
      bio: `Demo user ${idx} interested in ${skills[0]} and open source.`,
      avatarUrl: `/placeholder.svg?height=100&width=100`,
      skills,
      experience: ["Beginner", "Intermediate", "Advanced"][i % 3],
      interests: ["Web Development", "Cloud", "AI", "Mobile", "Security"].slice(0, 2 + (i % 3)),
      contributionScore: Math.floor(Math.random() * 3000) + 500,
      totalCommits: Math.floor(Math.random() * 2000) + 100,
      totalPRs: Math.floor(Math.random() * 150) + 10,
      totalStars: Math.floor(Math.random() * 5000) + 50,
      githubFollowers: Math.floor(Math.random() * 1000) + 10,
      topLanguages: skills,
      verifiedGithub: Math.random() > 0.2,
      publicProfile: true,
      isDiscoverable: Math.random() > 0.1,
      twitterHandle: Math.random() > 0.5 ? `@${username}_dev` : null,
      linkedinUrl: Math.random() > 0.3 ? `https://linkedin.com/in/${username}` : null,
      mobile: null,
      createdAt: new Date(
        2022 + Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ).toISOString(),
      updatedAt: new Date(
        2023 + Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ).toISOString(),
      bookmarks: [],
      suggestions: [],
      votes: [],
      followers: [],
      following: [],
    }
  }),
]

// Generate additional users
function generateAdditionalUsers(count: number): User[] {
  const names = [
    "Michael Brown",
    "Jessica Davis",
    "Christopher Miller",
    "Ashley Wilson",
    "Matthew Moore",
    "Amanda Taylor",
    "Daniel Anderson",
    "Stephanie Thomas",
    "Joshua Jackson",
    "Melissa White",
    "Andrew Harris",
    "Nicole Martin",
    "Kevin Thompson",
    "Rachel Garcia",
    "Brian Martinez",
    "Laura Robinson",
    "Jason Clark",
    "Jennifer Rodriguez",
    "Ryan Lewis",
    "Michelle Lee",
    "Nicholas Walker",
    "Kimberly Hall",
    "Jonathan Allen",
    "Donna Young",
    "Anthony Hernandez",
    "Carol King",
    "Mark Wright",
    "Lisa Lopez",
    "Steven Hill",
    "Nancy Scott",
  ]

  const skillSets = [
    ["JavaScript", "React", "Node.js", "MongoDB"],
    ["Python", "Django", "PostgreSQL", "Redis"],
    ["Java", "Spring Boot", "MySQL", "Docker"],
    ["Go", "Gin", "PostgreSQL", "Kubernetes"],
    ["Rust", "Actix", "SQLite", "WebAssembly"],
    ["PHP", "Laravel", "MySQL", "Vue.js"],
    ["C#", ".NET Core", "SQL Server", "Azure"],
    ["Ruby", "Rails", "PostgreSQL", "Sidekiq"],
    ["Swift", "iOS", "Core Data", "SwiftUI"],
    ["Kotlin", "Android", "Room", "Jetpack Compose"],
  ]

  const experiences = ["Beginner", "Intermediate", "Advanced"]
  const interests = [
    ["Web Development", "API Design"],
    ["Mobile Development", "UI/UX"],
    ["DevOps", "Cloud Computing"],
    ["Machine Learning", "Data Science"],
    ["Cybersecurity", "Network Security"],
    ["Game Development", "Graphics"],
    ["Blockchain", "Cryptocurrency"],
    ["IoT", "Embedded Systems"],
  ]

  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length]
    const username = name.toLowerCase().replace(/\s+/g, "") + (i + 11)
    const skillSet = skillSets[i % skillSets.length]
    const interestSet = interests[i % interests.length]

    return {
      id: (i + 11).toString(),
      name: `${name}`,
      email: `${username}@example.com`,
      githubUsername: username,
      githubProfile: `https://github.com/${username}`,
      bio: `Software developer with ${Math.floor(Math.random() * 8) + 1} years of experience. Passionate about ${skillSet[0]} and open source development.`,
      avatarUrl: `/placeholder.svg?height=100&width=100`,
      skills: skillSet,
      experience: experiences[Math.floor(Math.random() * experiences.length)],
      interests: interestSet,
      contributionScore: Math.floor(Math.random() * 3000) + 500,
      totalCommits: Math.floor(Math.random() * 2000) + 200,
      totalPRs: Math.floor(Math.random() * 150) + 20,
      totalStars: Math.floor(Math.random() * 5000) + 100,
      githubFollowers: Math.floor(Math.random() * 1000) + 50,
      topLanguages: skillSet,
      verifiedGithub: Math.random() > 0.2,
      publicProfile: true,
      isDiscoverable: Math.random() > 0.1,
      twitterHandle: Math.random() > 0.5 ? `@${username}_dev` : undefined,
      linkedinUrl: Math.random() > 0.3 ? `https://linkedin.com/in/${username}` : undefined,
      createdAt: new Date(
        2022 + Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ).toISOString(),
      updatedAt: new Date(
        2022 + Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ).toISOString(),
      bookmarks: [],
      suggestions: [],
      votes: [],
      followers: [],
      following: [],
    }
  })
}

// --- Enhanced mock projects with comprehensive GitHub API data ---
// Declare mockProjects as an empty array first to allow referencing it in generateAdditionalProjects
let mockProjects: Project[] = []

// Now assign mockProjects with initial projects and generated projects
mockProjects = [
  {
    id: "1",
    name: "awesome-react-components",
    fullName: "sarahchen/awesome-react-components",
    githubUrl: "https://github.com/sarahchen/awesome-react-components",
    liveLink: "https://awesome-react-components.dev",
    description:
      "A curated list of awesome React components and libraries with live examples and comprehensive documentation. Features over 500+ components with TypeScript support.",
    stars: 15420,
    forks: 2340,
    owner: "sarahchen",
    license: "MIT",
    topics: ["react", "components", "ui", "frontend", "javascript", "typescript", "storybook"],
    languages: {
      TypeScript: 65.4,
      JavaScript: 22.1,
      CSS: 8.3,
      HTML: 3.2,
      SCSS: 1.0,
    },
    visibility: true,
    autoSynced: true,
    approved: true,
    upvotes: 234,
    downvotes: 12,
    createdAt: "2023-01-20T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    tags: [
      { id: "1", projectId: "1", type: TagType.HACKTOBERFEST, sourceUrl: "https://hacktoberfest.com", verified: true },
      { id: "2", projectId: "1", type: TagType.DEVFOLIO, sourceUrl: "https://devfolio.co", verified: true },
    ],
    bookmarks: [],
    votes: [],
    githubData: {
      watchers: 892,
      openIssues: 23,
      closedIssues: 156,
      openPRs: 8,
      closedPRs: 89,
      totalCommits: 1247,
      branches: ["main", "develop", "feature/new-components", "docs/update"],
      releases: [
        {
          id: "rel_1",
          tagName: "v3.2.0",
          name: "Major Component Update",
          body: "Added 50+ new components with improved TypeScript support and accessibility features.",
          publishedAt: "2024-01-10T00:00:00Z",
          prerelease: false,
          draft: false,
          downloadCount: 5420,
          assets: [
            { name: "components-v3.2.0.tar.gz", downloadCount: 3210, size: 15420 },
            { name: "components-v3.2.0.zip", downloadCount: 2210, size: 16890 },
          ],
        },
        {
          id: "rel_2",
          tagName: "v3.1.5",
          name: "Bug Fixes & Performance",
          body: "Fixed critical rendering issues and improved performance by 40%.",
          publishedAt: "2023-12-15T00:00:00Z",
          prerelease: false,
          draft: false,
          downloadCount: 3210,
          assets: [{ name: "components-v3.1.5.tar.gz", downloadCount: 1890, size: 14230 }],
        },
      ],
      contributors: [
        {
          login: "sarahchen",
          avatarUrl: "/placeholder.svg?height=40&width=40",
          contributions: 456,
          type: "User",
          htmlUrl: "https://github.com/sarahchen",
          name: "Sarah Chen",
          company: "TechCorp",
          location: "San Francisco, CA",
        },
        {
          login: "mikejohnson",
          avatarUrl: "/placeholder.svg?height=40&width=40",
          contributions: 123,
          type: "User",
          htmlUrl: "https://github.com/mikejohnson",
          name: "Mike Johnson",
          company: "DevStudio",
          location: "New York, NY",
        },
        {
          login: "alexdev",
          avatarUrl: "/placeholder.svg?height=40&width=40",
          contributions: 89,
          type: "User",
          htmlUrl: "https://github.com/alexdev",
          name: "Alex Developer",
          location: "Austin, TX",
        },
      ],
      recentCommits: [
        {
          sha: "abc123def456",
          message: "feat: add new button component with variants",
          author: {
            name: "Sarah Chen",
            email: "sarah@example.com",
            date: "2024-01-14T15:30:00Z",
          },
          committer: {
            name: "Sarah Chen",
            email: "sarah@example.com",
            date: "2024-01-14T15:30:00Z",
          },
          stats: {
            additions: 156,
            deletions: 23,
            total: 179,
          },
        },
        {
          sha: "def456ghi789",
          message: "fix: resolve accessibility issues in modal component",
          author: {
            name: "Mike Johnson",
            email: "mike@example.com",
            date: "2024-01-13T10:15:00Z",
          },
          committer: {
            name: "Mike Johnson",
            email: "mike@example.com",
            date: "2024-01-13T10:15:00Z",
          },
          stats: {
            additions: 45,
            deletions: 12,
            total: 57,
          },
        },
      ],
      issues: [
        {
          id: "issue_1",
          number: 234,
          title: "Add dark mode support for all components",
          body: "We need to implement dark mode support across all components to improve user experience.",
          state: "open",
          createdAt: "2024-01-10T00:00:00Z",
          updatedAt: "2024-01-14T00:00:00Z",
          user: {
            login: "userdev",
            avatarUrl: "/placeholder.svg?height=32&width=32",
          },
          labels: [
            { name: "enhancement", color: "a2eeef" },
            { name: "good first issue", color: "7057ff" },
          ],
          assignees: [
            {
              login: "sarahchen",
              avatarUrl: "/placeholder.svg?height=32&width=32",
            },
          ],
        },
        {
          id: "issue_2",
          number: 233,
          title: "Button component not working with custom themes",
          body: "The button component doesn't properly inherit custom theme colors.",
          state: "closed",
          createdAt: "2024-01-08T00:00:00Z",
          updatedAt: "2024-01-12T00:00:00Z",
          closedAt: "2024-01-12T00:00:00Z",
          user: {
            login: "developer123",
            avatarUrl: "/placeholder.svg?height=32&width=32",
          },
          labels: [{ name: "bug", color: "d73a49" }],
          assignees: [],
        },
      ],
      pullRequests: [
        {
          id: "pr_1",
          number: 45,
          title: "Add TypeScript definitions for new components",
          body: "This PR adds comprehensive TypeScript definitions for all new components added in v3.2.0.",
          state: "open",
          createdAt: "2024-01-12T00:00:00Z",
          updatedAt: "2024-01-14T00:00:00Z",
          user: {
            login: "typescriptdev",
            avatarUrl: "/placeholder.svg?height=32&width=32",
          },
          additions: 234,
          deletions: 12,
          changedFiles: 15,
        },
        {
          id: "pr_2",
          number: 44,
          title: "Fix responsive design issues",
          body: "Fixes responsive design issues in grid and layout components.",
          state: "merged",
          createdAt: "2024-01-08T00:00:00Z",
          updatedAt: "2024-01-10T00:00:00Z",
          mergedAt: "2024-01-10T00:00:00Z",
          user: {
            login: "cssmaster",
            avatarUrl: "/placeholder.svg?height=32&width=32",
          },
          additions: 89,
          deletions: 45,
          changedFiles: 8,
        },
      ],
      codeFrequency: [120, 89, 156, 203, 178, 145, 167],
      commitActivity: [23, 45, 67, 34, 56, 78, 45, 23, 67, 89, 45, 34],
      lastCommit: "2024-01-14T15:30:00Z",
      defaultBranch: "main",
      size: 15420,
      hasWiki: true,
      hasPages: true,
      hasProjects: true,
      archived: false,
      disabled: false,
      pushedAt: "2024-01-14T15:30:00Z",
      updatedAt: "2024-01-14T15:30:00Z",
      cloneUrl: "https://github.com/sarahchen/awesome-react-components.git",
      sshUrl: "git@github.com:sarahchen/awesome-react-components.git",
      homepage: "https://awesome-react-components.dev",
      networkCount: 2340,
      subscribersCount: 892,
    },
  },
  {
    id: "2",
    name: "kubernetes-operator-toolkit",
    fullName: "marcusdev/kubernetes-operator-toolkit",
    githubUrl: "https://github.com/marcusdev/kubernetes-operator-toolkit",
    description:
      "A comprehensive toolkit for building Kubernetes operators with Go. Includes templates, utilities, best practices, and extensive documentation for cloud-native development.",
    stars: 8930,
    forks: 1240,
    owner: "marcusdev",
    license: "Apache-2.0",
    topics: ["kubernetes", "operator", "go", "devops", "cloud-native", "cncf", "helm"],
    languages: {
      Go: 78.5,
      YAML: 12.3,
      Shell: 5.2,
      Dockerfile: 2.8,
      Makefile: 1.2,
    },
    visibility: true,
    autoSynced: true,
    approved: true,
    upvotes: 156,
    downvotes: 8,
    createdAt: "2022-11-15T00:00:00Z",
    updatedAt: "2024-01-14T08:15:00Z",
    tags: [
      { id: "3", projectId: "2", type: TagType.GSOC, sourceUrl: "https://summerofcode.withgoogle.com", verified: true },
      { id: "4", projectId: "2", type: TagType.YCOMBINATOR, sourceUrl: "https://ycombinator.com", verified: false },
    ],
    bookmarks: [],
    votes: [],
    githubData: {
      watchers: 634,
      openIssues: 45,
      closedIssues: 234,
      openPRs: 12,
      closedPRs: 156,
      totalCommits: 1890,
      branches: ["main", "develop", "feature/helm-integration", "release/v2.0"],
      releases: [
        {
          id: "rel_3",
          tagName: "v2.0.0",
          name: "Major Release - Helm Integration",
          body: "Complete rewrite with Helm chart support and improved operator lifecycle management.",
          publishedAt: "2024-01-05T00:00:00Z",
          prerelease: false,
          draft: false,
          downloadCount: 8930,
          assets: [
            { name: "operator-toolkit-v2.0.0-linux-amd64.tar.gz", downloadCount: 4560, size: 25600 },
            { name: "operator-toolkit-v2.0.0-darwin-amd64.tar.gz", downloadCount: 2340, size: 24800 },
            { name: "operator-toolkit-v2.0.0-windows-amd64.zip", downloadCount: 2030, size: 26400 },
          ],
        },
      ],
      contributors: [
        {
          login: "marcusdev",
          avatarUrl: "/placeholder.svg?height=40&width=40",
          contributions: 1234,
          type: "User",
          htmlUrl: "https://github.com/marcusdev",
          name: "Marcus Rodriguez",
          company: "CloudNative Inc",
          location: "Seattle, WA",
        },
        {
          login: "k8s-contributor",
          avatarUrl: "/placeholder.svg?height=40&width=40",
          contributions: 345,
          type: "User",
          htmlUrl: "https://github.com/k8s-contributor",
          name: "K8s Contributor",
          company: "CNCF",
          location: "Remote",
        },
      ],
      recentCommits: [
        {
          sha: "ghi789jkl012",
          message: "feat: add Helm chart generation support",
          author: {
            name: "Marcus Rodriguez",
            email: "marcus@example.com",
            date: "2024-01-13T12:45:00Z",
          },
          committer: {
            name: "Marcus Rodriguez",
            email: "marcus@example.com",
            date: "2024-01-13T12:45:00Z",
          },
          stats: {
            additions: 289,
            deletions: 45,
            total: 334,
          },
        },
      ],
      issues: [
        {
          id: "issue_3",
          number: 89,
          title: "Add support for custom resource validation",
          body: "Need to implement OpenAPI schema validation for custom resources.",
          state: "open",
          createdAt: "2024-01-11T00:00:00Z",
          updatedAt: "2024-01-13T00:00:00Z",
          user: {
            login: "k8suser",
            avatarUrl: "/placeholder.svg?height=32&width=32",
          },
          labels: [
            { name: "enhancement", color: "a2eeef" },
            { name: "kubernetes", color: "0052cc" },
          ],
          assignees: [
            {
              login: "marcusdev",
              avatarUrl: "/placeholder.svg?height=32&width=32",
            },
          ],
        },
      ],
      pullRequests: [
        {
          id: "pr_3",
          number: 23,
          title: "Implement operator lifecycle management",
          body: "This PR implements comprehensive operator lifecycle management features.",
          state: "open",
          createdAt: "2024-01-10T00:00:00Z",
          updatedAt: "2024-01-13T00:00:00Z",
          user: {
            login: "lifecycledev",
            avatarUrl: "/placeholder.svg?height=32&width=32",
          },
          additions: 567,
          deletions: 89,
          changedFiles: 25,
        },
      ],
      codeFrequency: [89, 156, 203, 178, 145, 167, 134],
      commitActivity: [45, 67, 34, 56, 78, 45, 23, 67, 89, 45, 34, 56],
      lastCommit: "2024-01-13T12:45:00Z",
      defaultBranch: "main",
      size: 8930,
      hasWiki: true,
      hasPages: false,
      hasProjects: true,
      archived: false,
      disabled: false,
      pushedAt: "2024-01-13T12:45:00Z",
      updatedAt: "2024-01-13T12:45:00Z",
      cloneUrl: "https://github.com/marcusdev/kubernetes-operator-toolkit.git",
      sshUrl: "git@github.com:marcusdev/kubernetes-operator-toolkit.git",
      networkCount: 1240,
      subscribersCount: 634,
    },
  },
  {
    id: "3",
    name: "design-system-builder",
    fullName: "emilywatson/design-system-builder",
    githubUrl: "https://github.com/emilywatson/design-system-builder",
    liveLink: "https://design-system-builder.dev",
    description: "Visual tool for creating and maintaining design systems with React components.",
    stars: 4200,
    forks: 650,
    owner: "emilywatson",
    license: "MIT",
    topics: ["design-system", "react", "storybook", "ui"],
    languages: { TypeScript: 70, JavaScript: 20, CSS: 10 },
    visibility: true,
    autoSynced: true,
    lastSyncedAt: "2024-01-10T10:00:00Z",
    approved: true,
    upvotes: 120,
    downvotes: 3,
    createdAt: "2023-03-15T00:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
    tags: [
      { id: "5", projectId: "3", type: TagType.MLH, sourceUrl: "https://mlh.io", verified: true },
    ],
    bookmarks: [],
    votes: [],
    githubData: {},
  },
  {
    id: "4",
    name: "ml-model-deployment",
    fullName: "davidkim/ml-model-deployment",
    githubUrl: "https://github.com/davidkim/ml-model-deployment",
    liveLink: null,
    description: "Production-ready ML model deployment platform with auto-scaling and monitoring.",
    stars: 3100,
    forks: 410,
    owner: "davidkim",
    license: "Apache-2.0",
    topics: ["ml", "deployment", "python", "cloud"],
    languages: { Python: 80, YAML: 15, Shell: 5 },
    visibility: true,
    autoSynced: false,
    lastSyncedAt: null,
    approved: true,
    upvotes: 98,
    downvotes: 2,
    createdAt: "2023-04-10T00:00:00Z",
    updatedAt: "2024-01-11T10:00:00Z",
    tags: [
      { id: "6", projectId: "4", type: TagType.GSOC, sourceUrl: "https://summerofcode.withgoogle.com", verified: true },
    ],
    bookmarks: [],
    votes: [],
    githubData: {},
  },
  {
    id: "5",
    name: "security-scanner",
    fullName: "mariagarcia/security-scanner",
    githubUrl: "https://github.com/mariagarcia/security-scanner",
    liveLink: null,
    description: "Comprehensive security scanner for web applications and APIs.",
    stars: 2100,
    forks: 320,
    owner: "mariagarcia",
    license: "GPL-3.0",
    topics: ["security", "scanner", "python", "web"],
    languages: { Python: 90, Shell: 10 },
    visibility: true,
    autoSynced: false,
    lastSyncedAt: null,
    approved: false,
    upvotes: 45,
    downvotes: 7,
    createdAt: "2023-05-01T00:00:00Z",
    updatedAt: "2024-01-12T10:00:00Z",
    tags: [
      { id: "7", projectId: "5", type: TagType.WTFUND, sourceUrl: "https://wtfund.com", verified: false },
    ],
    bookmarks: [],
    votes: [],
    githubData: {},
  },
  // Add more projects to reach at least 50
  ...Array.from({ length: 50 - 5 }, (_, i) => {
    const idx = i + 6
    const ownerIdx = (idx - 1) % mockUsers.length
    const owner = mockUsers[ownerIdx].githubUsername
    const name = `demo-project-${idx}`
    const topicsList = [
      ["javascript", "react", "frontend"],
      ["python", "api", "backend"],
      ["go", "cloud", "kubernetes"],
      ["typescript", "node", "express"],
      ["rust", "cli", "performance"],
      ["java", "spring", "enterprise"],
      ["swift", "ios", "mobile"],
      ["kotlin", "android", "mobile"],
      ["php", "laravel", "web"],
      ["ruby", "rails", "web"],
    ]
    const topics = topicsList[i % topicsList.length]
    const languageSets: Record<string, number>[] = [
      { TypeScript: 60, JavaScript: 30, CSS: 10 },
      { Python: 75, YAML: 15, Shell: 10 },
      { Go: 80, YAML: 12, Dockerfile: 8 },
      { JavaScript: 55, TypeScript: 35, CSS: 10 },
      { Rust: 85, TOML: 10, Shell: 5 },
      { Java: 70, XML: 20, Properties: 10 },
      { Swift: 90, Objective: 10 },
      { Kotlin: 85, XML: 15 },
      { PHP: 70, JavaScript: 20, CSS: 10 },
      { Ruby: 80, ERB: 15, SCSS: 5 },
    ]
    const languages = languageSets[i % languageSets.length]
    return {
      id: idx.toString(),
      name: `Demo Project ${idx}`,
      fullName: `${owner}/demo-project-${idx}`,
      githubUrl: `https://github.com/${owner}/demo-project-${idx}`,
      liveLink: Math.random() > 0.5 ? `https://demo-project-${idx}.dev` : null,
      description: `Demo project ${idx} for testing and development purposes.`,
      stars: Math.floor(Math.random() * 10000) + 100,
      forks: Math.floor(Math.random() * 2000) + 10,
      owner,
      license: ["MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause", "ISC"][i % 5],
      topics,
      languages,
      visibility: true,
      autoSynced: Math.random() > 0.2,
      lastSyncedAt: Math.random() > 0.3 ? new Date().toISOString() : null,
      approved: Math.random() > 0.1,
      upvotes: Math.floor(Math.random() * 200) + 10,
      downvotes: Math.floor(Math.random() * 20),
      createdAt: new Date(
        2022 + Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ).toISOString(),
      updatedAt: new Date(
        2022 + Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ).toISOString(),
      tags: [
        {
          id: `tag${idx}`,
          projectId: idx.toString(),
          type: ["HACKTOBERFEST", "GSOC", "MLH", "DEVFOLIO", "YCOMBINATOR", "WTFUND"][i % 6] as any,
          sourceUrl: "https://example.com",
          verified: Math.random() > 0.3,
        },
      ],
      bookmarks: [],
      votes: [],
      githubData: {},
    }
  }),
]

// Generate additional projects
function generateAdditionalProjects(count: number): Project[] {
  const projectNames = [
    "ml-model-deployment",
    "design-system-builder",
    "cross-platform-ui-kit",
    "infrastructure-as-code-templates",
    "blockchain-wallet",
    "security-scanner",
    "game-engine",
    "data-pipeline",
    "api-gateway",
    "monitoring-dashboard",
    "chat-application",
    "e-commerce-platform",
    "social-media-app",
    "video-streaming",
    "file-storage-system",
    "task-management",
    "code-editor",
    "database-orm",
    "testing-framework",
    "deployment-tool",
  ]

  const descriptions = [
    "Production-ready ML model deployment platform with auto-scaling and monitoring",
    "Visual tool for creating and maintaining design systems with React components",
    "Universal UI components that work across React Native, Flutter, and web",
    "Production-ready Terraform and Ansible templates for cloud infrastructure",
    "Secure blockchain wallet with multi-currency support and DeFi integration",
    "Comprehensive security scanner for web applications and APIs",
    "High-performance game engine with modern rendering pipeline",
    "Scalable data processing pipeline with real-time analytics",
    "High-performance API gateway with routing and load balancing",
    "Real-time monitoring dashboard with customizable metrics",
  ]

  const licenses = ["MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause", "ISC"]
  const topicSets = [
    ["javascript", "react", "frontend", "ui"],
    ["python", "api", "backend", "fastapi"],
    ["go", "microservices", "cloud", "kubernetes"],
    ["typescript", "node", "express", "api"],
    ["rust", "systems", "performance", "cli"],
    ["java", "spring", "enterprise", "backend"],
    ["swift", "ios", "mobile", "app"],
    ["kotlin", "android", "mobile", "jetpack"],
    ["php", "laravel", "web", "mvc"],
    ["ruby", "rails", "web", "mvc"],
  ]

  const languageSets: Record<string, number>[] = [
    { TypeScript: 60, JavaScript: 30, CSS: 10 },
    { Python: 75, YAML: 15, Shell: 10 },
    { Go: 80, YAML: 12, Dockerfile: 8 },
    { JavaScript: 55, TypeScript: 35, CSS: 10 },
    { Rust: 85, TOML: 10, Shell: 5 },
    { Java: 70, XML: 20, Properties: 10 },
    { Swift: 90, Objective: 10 },
    { Kotlin: 85, XML: 15 },
    { PHP: 70, JavaScript: 20, CSS: 10 },
    { Ruby: 80, ERB: 15, SCSS: 5 },
  ]

  return Array.from({ length: count }, (_, i) => {
    const name =
      projectNames[i % projectNames.length] +
      (i > projectNames.length - 1 ? `-${Math.floor(i / projectNames.length) + 1}` : "")
    const owner = mockUsers[i % mockUsers.length].githubUsername
    const topicSet = topicSets[i % topicSets.length]
    const languageSet = languageSets[i % languageSets.length]

    return {
      id: (i + 3).toString(),
      name,
      fullName: `${owner}/${name}`,
      githubUrl: `https://github.com/${owner}/${name}`,
      liveLink: Math.random() > 0.5 ? `https://${name}.dev` : undefined,
      description: descriptions[i % descriptions.length],
      stars: Math.floor(Math.random() * 10000) + 100,
      forks: Math.floor(Math.random() * 2000) + 50,
      owner,
      license: licenses[Math.floor(Math.random() * licenses.length)],
      topics: topicSet,
      languages: languageSet,
      visibility: true,
      autoSynced: Math.random() > 0.2,
      approved: Math.random() > 0.1,
      upvotes: Math.floor(Math.random() * 200) + 10,
      downvotes: Math.floor(Math.random() * 20),
      createdAt: new Date(
        2022 + Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ).toISOString(),
      updatedAt: new Date(
        2022 + Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ).toISOString(),
      tags: [
        {
          id: (i + 5).toString(),
          projectId: (i + 3).toString(),
          type: ["HACKTOBERFEST", "GSOC", "MLH", "DEVFOLIO", "YCOMBINATOR", "WTFUND"][
            Math.floor(Math.random() * 6)
          ] as any,
          sourceUrl: "https://example.com",
          verified: Math.random() > 0.3,
        },
      ],
      bookmarks: [],
      votes: [],
      githubData: {
        watchers: Math.floor(Math.random() * 1000) + 50,
        openIssues: Math.floor(Math.random() * 50) + 5,
        closedIssues: Math.floor(Math.random() * 200) + 20,
        openPRs: Math.floor(Math.random() * 20) + 2,
        closedPRs: Math.floor(Math.random() * 100) + 10,
        totalCommits: Math.floor(Math.random() * 2000) + 100,
        branches: ["main", "develop", `feature/${name}-update`],
        releases: [
          {
            id: `rel_${i + 3}`,
            tagName: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
            name: "Latest Release",
            body: "Bug fixes and improvements",
            publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            prerelease: false,
            draft: false,
            downloadCount: Math.floor(Math.random() * 5000) + 100,
            assets: [
              {
                name: `${name}-latest.tar.gz`,
                downloadCount: Math.floor(Math.random() * 3000) + 50,
                size: Math.floor(Math.random() * 50000) + 1000,
              },
            ],
          },
        ],
        contributors: [
          {
            login: owner,
            avatarUrl: "/placeholder.svg?height=40&width=40",
            contributions: Math.floor(Math.random() * 500) + 100,
            type: "User",
            htmlUrl: `https://github.com/${owner}`,
            name: mockUsers.find((u) => u.githubUsername === owner)?.name || owner,
            company: "Tech Company",
            location: "Remote",
          },
        ],
        recentCommits: [
          {
            sha: Math.random().toString(36).substring(2, 15),
            message: "feat: add new functionality",
            author: {
              name: mockUsers.find((u) => u.githubUsername === owner)?.name || owner,
              email: `${owner}@example.com`,
              date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            },
            committer: {
              name: mockUsers.find((u) => u.githubUsername === owner)?.name || owner,
              email: `${owner}@example.com`,
              date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            },
            stats: {
              additions: Math.floor(Math.random() * 200) + 10,
              deletions: Math.floor(Math.random() * 50) + 5,
              total: Math.floor(Math.random() * 250) + 15,
            },
          },
        ],
        issues: [
          {
            id: `issue_${i + 3}`,
            number: Math.floor(Math.random() * 100) + 1,
            title: "Feature request: improve performance",
            body: "We need to optimize the performance of this component.",
            state: Math.random() > 0.5 ? "open" : "closed",
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            user: {
              login: "contributor",
              avatarUrl: "/placeholder.svg?height=32&width=32",
            },
            labels: [{ name: "enhancement", color: "a2eeef" }],
            assignees: [],
          },
        ],
        pullRequests: [
          {
            id: `pr_${i + 3}`,
            number: Math.floor(Math.random() * 50) + 1,
            title: "Fix: resolve critical bug",
            body: "This PR fixes a critical bug in the main functionality.",
            state: Math.random() > 0.7 ? "open" : "merged",
            createdAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
            user: {
              login: "contributor",
              avatarUrl: "/placeholder.svg?height=32&width=32",
            },
            additions: Math.floor(Math.random() * 100) + 10,
            deletions: Math.floor(Math.random() * 30) + 5,
            changedFiles: Math.floor(Math.random() * 10) + 1,
          },
        ],
        codeFrequency: Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 50),
        commitActivity: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 20),
        lastCommit: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        defaultBranch: "main",
        size: Math.floor(Math.random() * 50000) + 1000,
        hasWiki: Math.random() > 0.5,
        hasPages: Math.random() > 0.7,
        hasProjects: Math.random() > 0.6,
        archived: false,
        disabled: false,
        pushedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        cloneUrl: `https://github.com/${owner}/${name}.git`,
        sshUrl: `git@github.com:${owner}/${name}.git`,
        homepage: Math.random() > 0.5 ? `https://${name}.dev` : undefined,
        networkCount: Math.floor(Math.random() * 2000) + 50,
        subscribersCount: Math.floor(Math.random() * 1000) + 50,
      },
    }
  })
}

// Combine all data
const allUsers = [...mockUsers, ...generateAdditionalUsers(40)]
const allProjects = [...mockProjects, ...generateAdditionalProjects(47)]

// --- Mock Data for Bookmarks, Votes, Follows ---
const mockBookmarks: Bookmark[] = [
  { id: "b1", userId: "1", projectId: "1", createdAt: "2024-01-15T10:00:00Z" },
  { id: "b2", userId: "2", projectId: "2", createdAt: "2024-01-15T10:05:00Z" },
  { id: "b3", userId: "3", projectId: "3", createdAt: "2024-01-16T09:00:00Z" },
  { id: "b4", userId: "1", projectId: "3", createdAt: "2024-01-16T10:00:00Z" },
  { id: "b5", userId: "2", projectId: "4", createdAt: "2024-01-17T11:00:00Z" },
  { id: "b6", userId: "4", projectId: "1", createdAt: "2024-01-18T12:00:00Z" },
  // More bookmarks for better coverage
  { id: "b7", userId: "1", projectId: "2", createdAt: "2024-01-19T09:00:00Z" },
  { id: "b8", userId: "2", projectId: "1", createdAt: "2024-01-19T10:00:00Z" },
  { id: "b9", userId: "3", projectId: "2", createdAt: "2024-01-19T11:00:00Z" },
  { id: "b10", userId: "4", projectId: "3", createdAt: "2024-01-19T12:00:00Z" },
  { id: "b11", userId: "5", projectId: "1", createdAt: "2024-01-20T09:00:00Z" },
  { id: "b12", userId: "5", projectId: "2", createdAt: "2024-01-20T10:00:00Z" },
  { id: "b13", userId: "6", projectId: "4", createdAt: "2024-01-20T11:00:00Z" },
  { id: "b14", userId: "7", projectId: "1", createdAt: "2024-01-20T12:00:00Z" },
  { id: "b15", userId: "8", projectId: "2", createdAt: "2024-01-21T09:00:00Z" },
  { id: "b16", userId: "9", projectId: "3", createdAt: "2024-01-21T10:00:00Z" },
  { id: "b17", userId: "10", projectId: "4", createdAt: "2024-01-21T11:00:00Z" },
  { id: "b18", userId: "3", projectId: "4", createdAt: "2024-01-21T12:00:00Z" },
  { id: "b19", userId: "2", projectId: "3", createdAt: "2024-01-22T09:00:00Z" },
  { id: "b20", userId: "1", projectId: "4", createdAt: "2024-01-22T10:00:00Z" },
]

// --- Mock Data for Votes ---
const mockVotes: ProjectVote[] = [
  { id: "v1", userId: "1", projectId: "1", type: "UPVOTE", createdAt: "2024-01-15T10:10:00Z" },
  { id: "v2", userId: "2", projectId: "2", type: "UPVOTE", createdAt: "2024-01-15T10:12:00Z" },
  { id: "v3", userId: "3", projectId: "3", type: "DOWNVOTE", createdAt: "2024-01-16T09:10:00Z" },
  { id: "v4", userId: "4", projectId: "1", type: "UPVOTE", createdAt: "2024-01-18T12:10:00Z" },
  { id: "v5", userId: "5", projectId: "2", type: "UPVOTE", createdAt: "2024-01-20T10:10:00Z" },
  { id: "v6", userId: "6", projectId: "4", type: "DOWNVOTE", createdAt: "2024-01-20T11:10:00Z" },
]

// --- Mock Data for User Follows ---
const mockUserFollows: UserFollow[] = [
  { id: "f1", followerId: "1", followingId: "2" },
  { id: "f2", followerId: "2", followingId: "1" },
  { id: "f3", followerId: "3", followingId: "1" },
  { id: "f4", followerId: "4", followingId: "2" },
  { id: "f5", followerId: "5", followingId: "3" },
  { id: "f6", followerId: "6", followingId: "4" },
  { id: "f7", followerId: "7", followingId: "5" },
  { id: "f8", followerId: "8", followingId: "6" },
  { id: "f9", followerId: "9", followingId: "7" },
  { id: "f10", followerId: "10", followingId: "8" },
]

// --- Mock Data for Project Suggestions ---
const mockSuggestions = [
  {
    id: "s1",
    githubUrl: "https://github.com/sarahchen/awesome-react-components",
    notes: "Great for frontend devs",
    submittedById: "1",
    status: "APPROVED",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-11T10:00:00Z",
    suggestedTags: [
      {
        id: "st1",
        suggestionId: "s1",
        type: "HACKTOBERFEST",
        sourceUrl: "https://hacktoberfest.com",
        verified: true,
      },
    ],
  },
  {
    id: "s2",
    githubUrl: "https://github.com/marcusdev/kubernetes-operator-toolkit",
    notes: "Cloud native operator toolkit",
    submittedById: "2",
    status: "PENDING",
    createdAt: "2024-01-12T10:00:00Z",
    updatedAt: "2024-01-12T12:00:00Z",
    suggestedTags: [
      {
        id: "st2",
        suggestionId: "s2",
        type: "GSOC",
        sourceUrl: "https://summerofcode.withgoogle.com",
        verified: false,
      },
    ],
  },
]

// --- Enhance mockUsers and mockProjects with relations ---
const enhancedMockUsers: User[] = mockUsers.map((user) => ({
  ...user,
  bookmarks: mockBookmarks.filter((b) => b.userId === user.id),
  votes: mockVotes.filter((v) => v.userId === user.id),
  followers: mockUserFollows.filter((f) => f.followingId === user.id),
  following: mockUserFollows.filter((f) => f.followerId === user.id),
  suggestions: mockSuggestions.filter((s) => s.submittedById === user.id),
  twitterHandle: user.twitterHandle ?? null,
  linkedinUrl: user.linkedinUrl ?? null,
  mobile: user.mobile ?? null,
}))

const enhancedMockProjects: Project[] = mockProjects.map((project) => ({
  ...project,
  bookmarks: mockBookmarks.filter((b) => b.projectId === project.id),
  votes: mockVotes.filter((v) => v.projectId === project.id),
  tags: project.tags || [],
  liveLink: project.liveLink ?? null,
  description: project.description ?? null,
  license: project.license ?? null,
  owner: project.owner ?? null,
  languages: project.languages ?? null,
  lastSyncedAt: project.lastSyncedAt ?? null,
}))

// --- Export functions using enhanced data ---
export function getAllContributors(): User[] {
  return enhancedMockUsers
}

export function getFeaturedContributors(limit = 6): User[] {
  return enhancedMockUsers.sort((a, b) => b.contributionScore - a.contributionScore).slice(0, limit)
}

export function getContributorByUsername(username: string): User | null {
  return enhancedMockUsers.find((user) => user.githubUsername === username) || null
}

export function getAllProjects(): Project[] {
  return enhancedMockProjects
}

export function getFeaturedProjects(limit = 6): Project[] {
  return enhancedMockProjects.sort((a, b) => b.stars - a.stars).slice(0, limit)
}

export function getProjectById(id: string): Project | null {
  return enhancedMockProjects.find((project) => project.id === id) || null
}

export function getContributorProjects(userId: string): Project[] {
  const user = enhancedMockUsers.find((u) => u.id === userId)
  if (!user) return []
  return enhancedMockProjects.filter((project) => project.owner === user.githubUsername)
}

// Export the mock data for direct access
export {
  enhancedMockUsers as mockUsers,
  enhancedMockProjects as mockProjects,
  mockBookmarks,
  mockVotes,
  mockUserFollows,
  mockSuggestions,
}
