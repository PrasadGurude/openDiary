"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  GitFork,
  ExternalLink,
  Github,
  Calendar,
  TrendingUp,
  Eye,
  Download,
  Users,
  Code,
  Activity,
  BarChart3,
  GitBranch,
  Tag,
  Clock,
  Globe,
  ArrowLeft,
} from "lucide-react"
import { LanguageBar } from "@/components/language-bar"
import { ProjectTags } from "@/components/project-tags"
import { getProjectById, type Project } from "@/lib/data"

const baseUrl = process.env.BASE_URL || "http://localhost:3000"

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const projectId = params.id as string
    const foundProject = getProjectById(projectId)
    setProject(foundProject)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Project Not Found</h1>
          <Button asChild>
            <Link href="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getVoteRatio = () => {
    const total = project.upvotes + project.downvotes
    if (total === 0) return 0
    return (project.upvotes / total) * 100
  }

  // Mock additional data that would come from GitHub API
  const githubData = project.githubData || {
    contributors: [
      { login: "johndoe", avatar_url: "/placeholder.svg?height=40&width=40", contributions: 156 },
      { login: "janedoe", avatar_url: "/placeholder.svg?height=40&width=40", contributions: 89 },
      { login: "bobsmith", avatar_url: "/placeholder.svg?height=40&width=40", contributions: 45 },
      { login: "alicejones", avatar_url: "/placeholder.svg?height=40&width=40", contributions: 23 },
    ],
    releases: [
      {
        tag_name: "v2.1.0",
        name: "Major Update",
        published_at: "2024-01-15",
        body: "Added new features and bug fixes",
      },
      {
        tag_name: "v2.0.0",
        name: "Breaking Changes",
        published_at: "2023-12-01",
        body: "Complete rewrite with new architecture",
      },
      {
        tag_name: "v1.5.2",
        name: "Bug Fixes",
        published_at: "2023-11-15",
        body: "Fixed critical security vulnerabilities",
      },
    ],
    branches: ["main", "develop", "feature/new-ui", "hotfix/security-patch"],
    commits: 1247,
    issues: { open: 23, closed: 156 },
    pullRequests: { open: 8, closed: 89 },
    watchers: 234,
    downloads: 15420,
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>

        {/* Header */}
        <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">{project.name}</h1>
                {project.approved && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    ✓ Approved
                  </Badge>
                )}
              </div>

              <p className="text-lg text-gray-600 dark:text-slate-300 mb-6 leading-relaxed">{project.description}</p>

              {/* Tags */}
              <ProjectTags tags={project.tags} className="mb-6" />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                    {project.stars.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">Stars</div>
                </div>
                <div className="text-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                  <GitFork className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                    {project.forks.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">Forks</div>
                </div>
                <div className="text-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{githubData.watchers}</div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">Watchers</div>
                </div>
                <div className="text-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                  <Download className="h-6 w-6 text-green-500 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                    {(() => {
                      const latestRelease =
                        githubData.releases && githubData.releases.length > 0 ? githubData.releases[0] : null
                      if (latestRelease && typeof latestRelease.downloadCount === "number") {
                        return latestRelease.downloadCount.toLocaleString()
                      }
                      return "-"
                    })()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">Downloads</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 mr-2" />
                    View on GitHub
                  </Link>
                </Button>
                {project.liveLink && (
                  <Button asChild size="lg" variant="outline" className="shadow-lg hover:shadow-xl transition-shadow">
                    <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                )}
                <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl transition-shadow">
                  <Star className="h-5 w-5 mr-2" />
                  Star Project
                </Button>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:w-80">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-slate-400">Owner:</span>
                      <span className="font-medium text-gray-900 dark:text-slate-100">{project.owner}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-slate-400">Created:</span>
                      <span className="font-medium text-gray-900 dark:text-slate-100">
                        {formatDate(project.createdAt)}
                      </span>
                    </div>
                    {project.license && (
                      <div className="flex items-center gap-2 text-sm">
                        <Tag className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-slate-400">License:</span>
                        <span className="font-medium text-gray-900 dark:text-slate-100">{project.license}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-slate-400">Visibility:</span>
                      <span className="font-medium text-gray-900 dark:text-slate-100">
                        {project.visibility ? "Public" : "Private"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Languages */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {project.languages && Object.keys(project.languages).length > 0 ? (
                    <LanguageBar languages={project.languages} height="lg" showPercentages={true} showLabels={true} />
                  ) : (
                    <p className="text-gray-500 dark:text-slate-400">No language data available</p>
                  )}
                </CardContent>
              </Card>

              {/* Topics */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {project.topics && project.topics.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {project.topics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-slate-400">No topics available</p>
                  )}
                </CardContent>
              </Card>

              {/* Recent Releases */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Recent Releases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {githubData.releases && githubData.releases.slice(0, 3).map((release:any) => (
                      <div key={release.tagName} className="border-l-2 border-blue-500 pl-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-slate-100">{release.tagName}</span>
                          <span className="text-sm text-gray-500 dark:text-slate-400">
                            {formatDate(release.publishedAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-slate-300">{release.body}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Stats */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded">
                      <div className="text-xl font-bold text-gray-900 dark:text-slate-100">{githubData.totalCommits}</div>
                      <div className="text-sm text-gray-600 dark:text-slate-400">Commits</div>
                    </div>
                    <div className="text-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded">
                      <div className="text-xl font-bold text-gray-900 dark:text-slate-100">
                        {githubData.branches ? githubData.branches.length : 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-slate-400">Branches</div>
                    </div>
                    <div className="text-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded">
                      <div className="text-xl font-bold text-gray-900 dark:text-slate-100">
                        {githubData.openIssues}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-slate-400">Open Issues</div>
                    </div>
                    <div className="text-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded">
                      <div className="text-xl font-bold text-gray-900 dark:text-slate-100">
                        {githubData.openPRs}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-slate-400">Open PRs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Repository Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-gray-600 dark:text-slate-400">📁 src/</div>
                  <div className="text-gray-600 dark:text-slate-400 ml-4">📁 components/</div>
                  <div className="text-gray-600 dark:text-slate-400 ml-4">📁 pages/</div>
                  <div className="text-gray-600 dark:text-slate-400 ml-4">📁 utils/</div>
                  <div className="text-gray-600 dark:text-slate-400">📄 package.json</div>
                  <div className="text-gray-600 dark:text-slate-400">📄 README.md</div>
                  <div className="text-gray-600 dark:text-slate-400">📄 tsconfig.json</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributors" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {githubData.contributors && githubData.contributors.map((contributor:any) => (
                    <div
                      key={contributor.login}
                      className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={contributor.avatarUrl || "/placeholder.svg"} alt={contributor.login} />
                          <AvatarFallback>{contributor.login[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900 dark:text-slate-100">{contributor.login}</span>
                      </div>
                      <Badge variant="secondary">{contributor.contributions} contributions</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-slate-400">Stars</span>
                      <span className="font-medium">{project.stars}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-slate-400">Forks</span>
                      <span className="font-medium">{project.forks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-slate-400">Watchers</span>
                      <span className="font-medium">{githubData.watchers}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Community Votes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-600">Upvotes</span>
                      <span className="font-medium">{project.upvotes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Downvotes</span>
                      <span className="font-medium">{project.downvotes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-slate-400">Approval Rate</span>
                      <span className="font-medium">{getVoteRatio().toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-slate-400">Created</span>
                      <span className="font-medium text-sm">{formatDate(project.createdAt)}</span>
                    </div>
                    {project.lastSyncedAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-slate-400">Last Sync</span>
                        <span className="font-medium text-sm">{formatDate(project.lastSyncedAt)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
