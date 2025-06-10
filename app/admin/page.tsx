"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Users,
  FolderOpen,
  ClipboardCheck,
  AlertCircle,
  TrendingUp,
  Activity,
  Star,
  GitFork,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  GitBranch,
  GitPullRequest,
  Lock,
  Globe,
  Hash,
  Tag,
  MessageSquare,
} from "lucide-react"
import { getAllContributors, getAllProjects } from "@/lib/data"
import { ProtectedRoute } from "@/components/protected-route"

// Comprehensive GitHub API interfaces
interface GitHubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string | null
  blog: string
  location: string | null
  email: string | null
  hireable: boolean | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  plan?: {
    name: string
    space: number
    collaborators: number
    private_repos: number
  }
}

interface GitHubRepoLicense {
  key: string
  name: string
  spdx_id: string
  url: string
  node_id: string
}

interface GitHubRepoOwner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

interface GitHubRepo {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: GitHubRepoOwner
  html_url: string
  description: string | null
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  has_discussions: boolean
  forks_count: number
  mirror_url: string | null
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: GitHubRepoLicense | null
  allow_forking: boolean
  is_template: boolean
  web_commit_signoff_required: boolean
  topics: string[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  temp_clone_token: string | null
  network_count: number
  subscribers_count: number
}

interface GitHubLanguages {
  [key: string]: number
}

interface GitHubContributor {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  contributions: number
}

interface GitHubBranch {
  name: string
  commit: {
    sha: string
    url: string
  }
  protected: boolean
}

interface GitHubRelease {
  url: string
  assets_url: string
  upload_url: string
  html_url: string
  id: number
  author: GitHubRepoOwner
  node_id: string
  tag_name: string
  target_commitish: string
  name: string
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string
  assets: any[]
  tarball_url: string
  zipball_url: string
  body: string
}

function AdminDashboardContent() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)

  const users = getAllContributors()
  const projects = getAllProjects()

  // Calculate stats
  const totalUsers = users.length
  const verifiedUsers = users.filter((u) => u.verifiedGithub).length
  const totalProjects = projects.length
  const approvedProjects = projects.filter((p) => p.approved).length
  const pendingSuggestions = 12
  const flaggedContent = 5

  // Recent activity data
  const recentSignups = users.slice(0, 5)
  const recentProjects = projects.slice(0, 5)

  // Mock GitHub API data for demonstration - comprehensive version
  const mockGitHubUserData: GitHubUser = {
    login: "sarahchen",
    id: 12345,
    node_id: "MDQ6VXNlcjEyMzQ1",
    avatar_url: "https://avatars.githubusercontent.com/u/12345?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/sarahchen",
    html_url: "https://github.com/sarahchen",
    followers_url: "https://api.github.com/users/sarahchen/followers",
    following_url: "https://api.github.com/users/sarahchen/following{/other_user}",
    gists_url: "https://api.github.com/users/sarahchen/gists{/gist_id}",
    starred_url: "https://api.github.com/users/sarahchen/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/sarahchen/subscriptions",
    organizations_url: "https://api.github.com/users/sarahchen/orgs",
    repos_url: "https://api.github.com/users/sarahchen/repos",
    events_url: "https://api.github.com/users/sarahchen/events{/privacy}",
    received_events_url: "https://api.github.com/users/sarahchen/received_events",
    type: "User",
    site_admin: false,
    name: "Sarah Chen",
    company: "@techcorp",
    blog: "https://sarahchen.dev",
    location: "San Francisco, CA",
    email: "sarah@example.com",
    hireable: true,
    bio: "Full-stack developer passionate about open source and machine learning",
    twitter_username: "sarahchen_dev",
    public_repos: 42,
    public_gists: 8,
    followers: 892,
    following: 156,
    created_at: "2019-03-15T10:30:00Z",
    updated_at: "2024-01-15T14:22:00Z",
    plan: {
      name: "pro",
      space: 976562499,
      collaborators: 0,
      private_repos: 9999,
    },
  }

  const mockGitHubRepoOwner: GitHubRepoOwner = {
    login: "sarahchen",
    id: 12345,
    node_id: "MDQ6VXNlcjEyMzQ1",
    avatar_url: "https://avatars.githubusercontent.com/u/12345?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/sarahchen",
    html_url: "https://github.com/sarahchen",
    followers_url: "https://api.github.com/users/sarahchen/followers",
    following_url: "https://api.github.com/users/sarahchen/following{/other_user}",
    gists_url: "https://api.github.com/users/sarahchen/gists{/gist_id}",
    starred_url: "https://api.github.com/users/sarahchen/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/sarahchen/subscriptions",
    organizations_url: "https://api.github.com/users/sarahchen/orgs",
    repos_url: "https://api.github.com/users/sarahchen/repos",
    events_url: "https://api.github.com/users/sarahchen/events{/privacy}",
    received_events_url: "https://api.github.com/users/sarahchen/received_events",
    type: "User",
    site_admin: false,
  }

  const mockGitHubRepoData: GitHubRepo = {
    id: 67890,
    node_id: "MDEwOlJlcG9zaXRvcnk2Nzg5MA==",
    name: "awesome-react-components",
    full_name: "sarahchen/awesome-react-components",
    private: false,
    owner: mockGitHubRepoOwner,
    html_url: "https://github.com/sarahchen/awesome-react-components",
    description: "A curated list of awesome React components and libraries with live examples",
    fork: false,
    url: "https://api.github.com/repos/sarahchen/awesome-react-components",
    forks_url: "https://api.github.com/repos/sarahchen/awesome-react-components/forks",
    keys_url: "https://api.github.com/repos/sarahchen/awesome-react-components/keys{/key_id}",
    collaborators_url: "https://api.github.com/repos/sarahchen/awesome-react-components/collaborators{/collaborator}",
    teams_url: "https://api.github.com/repos/sarahchen/awesome-react-components/teams",
    hooks_url: "https://api.github.com/repos/sarahchen/awesome-react-components/hooks",
    issue_events_url: "https://api.github.com/repos/sarahchen/awesome-react-components/issues/events{/number}",
    events_url: "https://api.github.com/repos/sarahchen/awesome-react-components/events",
    assignees_url: "https://api.github.com/repos/sarahchen/awesome-react-components/assignees{/user}",
    branches_url: "https://api.github.com/repos/sarahchen/awesome-react-components/branches{/branch}",
    tags_url: "https://api.github.com/repos/sarahchen/awesome-react-components/tags",
    blobs_url: "https://api.github.com/repos/sarahchen/awesome-react-components/git/blobs{/sha}",
    git_tags_url: "https://api.github.com/repos/sarahchen/awesome-react-components/git/tags{/sha}",
    git_refs_url: "https://api.github.com/repos/sarahchen/awesome-react-components/git/refs{/sha}",
    trees_url: "https://api.github.com/repos/sarahchen/awesome-react-components/git/trees{/sha}",
    statuses_url: "https://api.github.com/repos/sarahchen/awesome-react-components/statuses/{sha}",
    languages_url: "https://api.github.com/repos/sarahchen/awesome-react-components/languages",
    stargazers_url: "https://api.github.com/repos/sarahchen/awesome-react-components/stargazers",
    contributors_url: "https://api.github.com/repos/sarahchen/awesome-react-components/contributors",
    subscribers_url: "https://api.github.com/repos/sarahchen/awesome-react-components/subscribers",
    subscription_url: "https://api.github.com/repos/sarahchen/awesome-react-components/subscription",
    commits_url: "https://api.github.com/repos/sarahchen/awesome-react-components/commits{/sha}",
    git_commits_url: "https://api.github.com/repos/sarahchen/awesome-react-components/git/commits{/sha}",
    comments_url: "https://api.github.com/repos/sarahchen/awesome-react-components/comments{/number}",
    issue_comment_url: "https://api.github.com/repos/sarahchen/awesome-react-components/issues/comments{/number}",
    contents_url: "https://api.github.com/repos/sarahchen/awesome-react-components/contents/{+path}",
    compare_url: "https://api.github.com/repos/sarahchen/awesome-react-components/compare/{base}...{head}",
    merges_url: "https://api.github.com/repos/sarahchen/awesome-react-components/merges",
    archive_url: "https://api.github.com/repos/sarahchen/awesome-react-components/{archive_format}{/ref}",
    downloads_url: "https://api.github.com/repos/sarahchen/awesome-react-components/downloads",
    issues_url: "https://api.github.com/repos/sarahchen/awesome-react-components/issues{/number}",
    pulls_url: "https://api.github.com/repos/sarahchen/awesome-react-components/pulls{/number}",
    milestones_url: "https://api.github.com/repos/sarahchen/awesome-react-components/milestones{/number}",
    notifications_url: "https://api.github.com/repos/sarahchen/awesome-react-components/notifications{parameters}",
    labels_url: "https://api.github.com/repos/sarahchen/awesome-react-components/labels{/name}",
    releases_url: "https://api.github.com/repos/sarahchen/awesome-react-components/releases{/id}",
    deployments_url: "https://api.github.com/repos/sarahchen/awesome-react-components/deployments",
    created_at: "2023-01-20T08:15:00Z",
    updated_at: "2024-01-10T16:45:00Z",
    pushed_at: "2024-01-10T16:45:00Z",
    git_url: "git://github.com/sarahchen/awesome-react-components.git",
    ssh_url: "git@github.com:sarahchen/awesome-react-components.git",
    clone_url: "https://github.com/sarahchen/awesome-react-components.git",
    svn_url: "https://github.com/sarahchen/awesome-react-components",
    homepage: "https://awesome-react-components.dev",
    size: 2048,
    stargazers_count: 15420,
    watchers_count: 15420,
    language: "TypeScript",
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: true,
    has_discussions: true,
    forks_count: 2340,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 23,
    license: {
      key: "mit",
      name: "MIT License",
      spdx_id: "MIT",
      url: "https://api.github.com/licenses/mit",
      node_id: "MDc6TGljZW5zZW1pdA==",
    },
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: ["react", "components", "ui", "frontend", "javascript", "typescript", "library", "design-system"],
    visibility: "public",
    forks: 2340,
    open_issues: 23,
    watchers: 15420,
    default_branch: "main",
    temp_clone_token: null,
    network_count: 2340,
    subscribers_count: 487,
  }

  // Additional GitHub API data
  const mockGitHubLanguages: GitHubLanguages = {
    TypeScript: 1250348,
    JavaScript: 458976,
    CSS: 187432,
    HTML: 42156,
  }

  const mockGitHubContributors: GitHubContributor[] = [
    {
      login: "sarahchen",
      id: 12345,
      node_id: "MDQ6VXNlcjEyMzQ1",
      avatar_url: "https://avatars.githubusercontent.com/u/12345?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/sarahchen",
      html_url: "https://github.com/sarahchen",
      followers_url: "https://api.github.com/users/sarahchen/followers",
      following_url: "https://api.github.com/users/sarahchen/following{/other_user}",
      gists_url: "https://api.github.com/users/sarahchen/gists{/gist_id}",
      starred_url: "https://api.github.com/users/sarahchen/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/sarahchen/subscriptions",
      organizations_url: "https://api.github.com/users/sarahchen/orgs",
      repos_url: "https://api.github.com/users/sarahchen/repos",
      events_url: "https://api.github.com/users/sarahchen/events{/privacy}",
      received_events_url: "https://api.github.com/users/sarahchen/received_events",
      type: "User",
      site_admin: false,
      contributions: 847,
    },
    {
      login: "contributor1",
      id: 23456,
      node_id: "MDQ6VXNlcjIzNDU2",
      avatar_url: "https://avatars.githubusercontent.com/u/23456?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/contributor1",
      html_url: "https://github.com/contributor1",
      followers_url: "https://api.github.com/users/contributor1/followers",
      following_url: "https://api.github.com/users/contributor1/following{/other_user}",
      gists_url: "https://api.github.com/users/contributor1/gists{/gist_id}",
      starred_url: "https://api.github.com/users/contributor1/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/contributor1/subscriptions",
      organizations_url: "https://api.github.com/users/contributor1/orgs",
      repos_url: "https://api.github.com/users/contributor1/repos",
      events_url: "https://api.github.com/users/contributor1/events{/privacy}",
      received_events_url: "https://api.github.com/users/contributor1/received_events",
      type: "User",
      site_admin: false,
      contributions: 342,
    },
    {
      login: "contributor2",
      id: 34567,
      node_id: "MDQ6VXNlcjM0NTY3",
      avatar_url: "https://avatars.githubusercontent.com/u/34567?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/contributor2",
      html_url: "https://github.com/contributor2",
      followers_url: "https://api.github.com/users/contributor2/followers",
      following_url: "https://api.github.com/users/contributor2/following{/other_user}",
      gists_url: "https://api.github.com/users/contributor2/gists{/gist_id}",
      starred_url: "https://api.github.com/users/contributor2/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/contributor2/subscriptions",
      organizations_url: "https://api.github.com/users/contributor2/orgs",
      repos_url: "https://api.github.com/users/contributor2/repos",
      events_url: "https://api.github.com/users/contributor2/events{/privacy}",
      received_events_url: "https://api.github.com/users/contributor2/received_events",
      type: "User",
      site_admin: false,
      contributions: 156,
    },
  ]

  const mockGitHubBranches: GitHubBranch[] = [
    {
      name: "main",
      commit: {
        sha: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
        url: "https://api.github.com/repos/sarahchen/awesome-react-components/commits/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
      },
      protected: true,
    },
    {
      name: "develop",
      commit: {
        sha: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1",
        url: "https://api.github.com/repos/sarahchen/awesome-react-components/commits/b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1",
      },
      protected: false,
    },
    {
      name: "feature/new-components",
      commit: {
        sha: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2",
        url: "https://api.github.com/repos/sarahchen/awesome-react-components/commits/c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2",
      },
      protected: false,
    },
  ]

  const mockGitHubReleases: GitHubRelease[] = [
    {
      url: "https://api.github.com/repos/sarahchen/awesome-react-components/releases/1",
      assets_url: "https://api.github.com/repos/sarahchen/awesome-react-components/releases/1/assets",
      upload_url: "https://uploads.github.com/repos/sarahchen/awesome-react-components/releases/1/assets{?name,label}",
      html_url: "https://github.com/sarahchen/awesome-react-components/releases/tag/v2.0.0",
      id: 12345,
      author: mockGitHubRepoOwner,
      node_id: "MDc6UmVsZWFzZTEyMzQ1",
      tag_name: "v2.0.0",
      target_commitish: "main",
      name: "Version 2.0.0",
      draft: false,
      prerelease: false,
      created_at: "2023-12-15T10:00:00Z",
      published_at: "2023-12-15T12:00:00Z",
      assets: [],
      tarball_url: "https://api.github.com/repos/sarahchen/awesome-react-components/tarball/v2.0.0",
      zipball_url: "https://api.github.com/repos/sarahchen/awesome-react-components/zipball/v2.0.0",
      body: "Major release with new components and improved performance",
    },
    {
      url: "https://api.github.com/repos/sarahchen/awesome-react-components/releases/2",
      assets_url: "https://api.github.com/repos/sarahchen/awesome-react-components/releases/2/assets",
      upload_url: "https://uploads.github.com/repos/sarahchen/awesome-react-components/releases/2/assets{?name,label}",
      html_url: "https://github.com/sarahchen/awesome-react-components/releases/tag/v1.9.0",
      id: 12346,
      author: mockGitHubRepoOwner,
      node_id: "MDc6UmVsZWFzZTEyMzQ2",
      tag_name: "v1.9.0",
      target_commitish: "main",
      name: "Version 1.9.0",
      draft: false,
      prerelease: false,
      created_at: "2023-10-05T10:00:00Z",
      published_at: "2023-10-05T12:00:00Z",
      assets: [],
      tarball_url: "https://api.github.com/repos/sarahchen/awesome-react-components/tarball/v1.9.0",
      zipball_url: "https://api.github.com/repos/sarahchen/awesome-react-components/zipball/v1.9.0",
      body: "Added new form components and fixed accessibility issues",
    },
  ]

  const handleUserClick = (user: any) => {
    setSelectedUser({
      ...user,
      githubData: mockGitHubUserData,
    })
    setUserDialogOpen(true)
  }

  const handleProjectClick = (project: any) => {
    setSelectedProject({
      ...project,
      githubData: mockGitHubRepoData,
      languages: mockGitHubLanguages,
      contributors: mockGitHubContributors,
      branches: mockGitHubBranches,
      releases: mockGitHubReleases,
    })
    setProjectDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage users, projects, and platform analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            System Healthy
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-700">Total Users</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{totalUsers}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                {verifiedUsers} verified
              </Badge>
              <span className="text-xs text-blue-600">+12 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-green-700">Total Projects</CardTitle>
            <FolderOpen className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{totalProjects}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                {approvedProjects} approved
              </Badge>
              <span className="text-xs text-green-600">+8 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-orange-700">Pending Reviews</CardTitle>
            <ClipboardCheck className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">{pendingSuggestions}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                Requires action
              </Badge>
              <span className="text-xs text-orange-600">2 urgent</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-red-700">Flagged Content</CardTitle>
            <AlertCircle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-900">{flaggedContent}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                Needs review
              </Badge>
              <span className="text-xs text-red-600">1 critical</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="users" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="users">New Users</TabsTrigger>
                <TabsTrigger value="projects">New Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-4">
                {recentSignups.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleUserClick(user)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">@{user.githubUsername}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={user.verifiedGithub ? "default" : "secondary"}>
                        {user.verifiedGithub ? "Verified" : "Pending"}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-gray-500">by {project.owner}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {project.stars.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {project.forks.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={project.approved ? "default" : "secondary"}>
                        {project.approved ? "Approved" : "Pending"}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Platform Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">User Growth</span>
                <span className="text-sm font-medium text-green-600">+23.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Project Submissions</span>
                <span className="text-sm font-medium text-blue-600">+18.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Contributors</span>
                <span className="text-sm font-medium text-purple-600">+31.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "85%" }} />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">94.2%</div>
                <div className="text-sm text-gray-600">Platform Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Details Modal */}
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedUser?.avatarUrl || "/placeholder.svg"} alt={selectedUser?.name} />
                <AvatarFallback>
                  {selectedUser?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xl font-bold">{selectedUser?.name}</div>
                <div className="text-sm text-gray-500">@{selectedUser?.githubUsername}</div>
              </div>
            </DialogTitle>
            <DialogDescription>Detailed user information and GitHub data</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              <Tabs defaultValue="profile" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="github">GitHub Data</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{selectedUser.email}</span>
                        </div>
                        {selectedUser.mobile && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{selectedUser.mobile}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            Joined {new Date(selectedUser.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            {selectedUser.githubData?.location || "Location not specified"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Social Links</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Github className="h-4 w-4 text-gray-500" />
                          <a
                            href={selectedUser.githubProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {selectedUser.githubProfile}
                          </a>
                        </div>
                        {selectedUser.twitterHandle && (
                          <div className="flex items-center gap-2">
                            <Twitter className="h-4 w-4 text-gray-500" />
                            <a
                              href={`https://twitter.com/${selectedUser.twitterHandle.replace("@", "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {selectedUser.twitterHandle}
                            </a>
                          </div>
                        )}
                        {selectedUser.linkedinUrl && (
                          <div className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4 text-gray-500" />
                            <a
                              href={selectedUser.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              LinkedIn Profile
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Bio & Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Bio</h4>
                        <p className="text-sm text-gray-600">{selectedUser.bio}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedUser.skills.map((skill: string) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Top Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedUser.topLanguages.map((lang: string) => (
                            <Badge key={lang} variant="outline">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="github" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">GitHub Statistics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Public Repositories</span>
                          <span className="font-medium">{selectedUser.githubData?.public_repos}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Followers</span>
                          <span className="font-medium">{selectedUser.githubData?.followers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Following</span>
                          <span className="font-medium">{selectedUser.githubData?.following}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Public Gists</span>
                          <span className="font-medium">{selectedUser.githubData?.public_gists}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Platform Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Contribution Score</span>
                          <span className="font-medium">{selectedUser.contributionScore}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Commits</span>
                          <span className="font-medium">{selectedUser.totalCommits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total PRs</span>
                          <span className="font-medium">{selectedUser.totalPRs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Stars</span>
                          <span className="font-medium">{selectedUser.totalStars}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">GitHub Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">GitHub ID</span>
                        <span className="font-medium">{selectedUser.githubData?.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Account Created</span>
                        <span className="font-medium">
                          {new Date(selectedUser.githubData?.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Updated</span>
                        <span className="font-medium">
                          {new Date(selectedUser.githubData?.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Company</span>
                        <span className="font-medium">{selectedUser.githubData?.company || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Node ID</span>
                        <span className="font-medium text-xs">{selectedUser.githubData?.node_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Type</span>
                        <span className="font-medium">{selectedUser.githubData?.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Site Admin</span>
                        <Badge variant={selectedUser.githubData?.site_admin ? "default" : "secondary"}>
                          {selectedUser.githubData?.site_admin ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Hireable</span>
                        <Badge variant={selectedUser.githubData?.hireable ? "default" : "secondary"}>
                          {selectedUser.githubData?.hireable ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Activity className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Pushed to repository</p>
                              <p className="text-sm text-gray-600">awesome-react-components</p>
                              <p className="text-xs text-gray-500">{i + 1} days ago</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Project Details Modal */}
      <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <div className="text-xl font-bold">{selectedProject?.name}</div>
                <div className="text-sm text-gray-500">by {selectedProject?.owner}</div>
              </div>
            </DialogTitle>
            <DialogDescription>Detailed project information and GitHub repository data</DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-6">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="contributors">Contributors</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Project Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm text-gray-600">{selectedProject.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Repository Stats</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Stars</span>
                              <span className="font-medium">{selectedProject.stars.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Forks</span>
                              <span className="font-medium">{selectedProject.forks.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">License</span>
                              <span className="font-medium">{selectedProject.license}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Visibility</span>
                              <Badge variant="outline">
                                {selectedProject.githubData?.private ? "Private" : "Public"}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Platform Stats</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Difficulty</span>
                              <Badge variant="secondary">{selectedProject.difficulty}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Status</span>
                              <Badge variant={selectedProject.approved ? "default" : "secondary"}>
                                {selectedProject.approved ? "Approved" : "Pending"}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Created</span>
                              <span className="font-medium">
                                {new Date(selectedProject.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Last Updated</span>
                              <span className="font-medium">
                                {new Date(selectedProject.githubData?.updated_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech: string) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.githubData?.topics.map((topic: string) => (
                            <Badge key={topic} variant="secondary">
                              <Hash className="h-3 w-3 mr-1" />
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button variant="outline" size="sm" asChild>
                          <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            View on GitHub
                          </a>
                        </Button>
                        {selectedProject.githubData?.homepage && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={selectedProject.githubData.homepage} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-4 w-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="code" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Languages</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(selectedProject.languages || {}).map(([lang, bytes]) => {
                            const total = Object.values(selectedProject.languages || {}).reduce(
                              (a: number, b: number) => a + b,
                              0,
                            )
                            const percentage = (((bytes as number) / total) * 100).toFixed(1)
                            return (
                              <div key={lang} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{lang}</span>
                                  <span>{percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Repository Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Repository ID</span>
                          <span className="font-medium">{selectedProject.githubData?.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Size</span>
                          <span className="font-medium">{selectedProject.githubData?.size} KB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Default Branch</span>
                          <span className="font-medium">{selectedProject.githubData?.default_branch}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Open Issues</span>
                          <span className="font-medium">{selectedProject.githubData?.open_issues_count}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Watchers</span>
                          <span className="font-medium">{selectedProject.githubData?.watchers_count}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Subscribers</span>
                          <span className="font-medium">{selectedProject.githubData?.subscribers_count}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Branches</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedProject.branches?.map((branch: GitHubBranch) => (
                          <div key={branch.name} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <GitBranch className="h-4 w-4 text-gray-500" />
                              <div>
                                <p className="font-medium">{branch.name}</p>
                                <p className="text-xs text-gray-500">{branch.commit.sha.substring(0, 7)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {branch.protected && (
                                <Badge variant="outline" className="text-xs">
                                  <Lock className="h-3 w-3 mr-1" />
                                  Protected
                                </Badge>
                              )}
                              {branch.name === selectedProject.githubData?.default_branch && (
                                <Badge variant="default" className="text-xs">
                                  Default
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Releases</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedProject.releases?.map((release: GitHubRelease) => (
                          <div key={release.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Tag className="h-4 w-4 text-gray-500" />
                              <div>
                                <p className="font-medium">{release.name}</p>
                                <p className="text-sm text-gray-600">{release.tag_name}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(release.published_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {release.prerelease && (
                                <Badge variant="outline" className="text-xs">
                                  Pre-release
                                </Badge>
                              )}
                              {release.draft && (
                                <Badge variant="secondary" className="text-xs">
                                  Draft
                                </Badge>
                              )}
                              <Button variant="outline" size="sm" asChild>
                                <a href={release.html_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contributors" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Top Contributors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedProject.contributors?.map((contributor: GitHubContributor) => (
                          <div key={contributor.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={contributor.avatar_url || "/placeholder.svg"}
                                  alt={contributor.login}
                                />
                                <AvatarFallback>{contributor.login[0].toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{contributor.login}</p>
                                <p className="text-sm text-gray-600">{contributor.contributions} contributions</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{contributor.type}</Badge>
                              <Button variant="outline" size="sm" asChild>
                                <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-3 w-3" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Repository Features</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Issues</span>
                          <Badge variant={selectedProject.githubData?.has_issues ? "default" : "secondary"}>
                            {selectedProject.githubData?.has_issues ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Projects</span>
                          <Badge variant={selectedProject.githubData?.has_projects ? "default" : "secondary"}>
                            {selectedProject.githubData?.has_projects ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Wiki</span>
                          <Badge variant={selectedProject.githubData?.has_wiki ? "default" : "secondary"}>
                            {selectedProject.githubData?.has_wiki ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Pages</span>
                          <Badge variant={selectedProject.githubData?.has_pages ? "default" : "secondary"}>
                            {selectedProject.githubData?.has_pages ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Discussions</span>
                          <Badge variant={selectedProject.githubData?.has_discussions ? "default" : "secondary"}>
                            {selectedProject.githubData?.has_discussions ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Downloads</span>
                          <Badge variant={selectedProject.githubData?.has_downloads ? "default" : "secondary"}>
                            {selectedProject.githubData?.has_downloads ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Repository Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Allow Forking</span>
                          <Badge variant={selectedProject.githubData?.allow_forking ? "default" : "secondary"}>
                            {selectedProject.githubData?.allow_forking ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Is Template</span>
                          <Badge variant={selectedProject.githubData?.is_template ? "default" : "secondary"}>
                            {selectedProject.githubData?.is_template ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Archived</span>
                          <Badge variant={selectedProject.githubData?.archived ? "destructive" : "default"}>
                            {selectedProject.githubData?.archived ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Disabled</span>
                          <Badge variant={selectedProject.githubData?.disabled ? "destructive" : "default"}>
                            {selectedProject.githubData?.disabled ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Fork</span>
                          <Badge variant={selectedProject.githubData?.fork ? "secondary" : "default"}>
                            {selectedProject.githubData?.fork ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Network Count</span>
                          <span className="font-medium">{selectedProject.githubData?.network_count}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Activity Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <GitPullRequest className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Pull request merged</p>
                            <p className="text-sm text-gray-600">Feature: Add new component library</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Issue opened</p>
                            <p className="text-sm text-gray-600">Bug: Component not rendering properly</p>
                            <p className="text-xs text-gray-500">5 hours ago</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Tag className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Release published</p>
                            <p className="text-sm text-gray-600">v2.0.0 - Major update with breaking changes</p>
                            <p className="text-xs text-gray-500">1 day ago</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <Star className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Starred by users</p>
                            <p className="text-sm text-gray-600">+127 new stars this week</p>
                            <p className="text-xs text-gray-500">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}
