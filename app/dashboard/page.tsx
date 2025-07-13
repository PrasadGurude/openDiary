"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, GitFork, Bookmark, Users, TrendingUp, Activity, Github } from "lucide-react"
import { getFeaturedProjects, getFeaturedContributors } from "@/lib/data"
import { ProtectedRoute } from "@/components/protected-route"
import Link from "next/link"
import { useRouter } from "next/navigation"

function DashboardContent() {
  const router = useRouter()
  const baseUrl = process.env.BASE_URL || "http://localhost:3000"
  const suggestedProjects = getFeaturedProjects(6)
  const followedContributors = getFeaturedContributors(4)
  const bookmarkedProjects = getFeaturedProjects(4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Your personalized open-source discovery hub</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bookmarked Projects</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Bookmark className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Following</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contribution Score</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold">42</p>
                <p className="text-xs text-gray-500">commits</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suggested" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="suggested" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Projects</CardTitle>
              <CardDescription>Projects that match your interests and skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`${baseUrl}/projects/${project.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-gray-600">{project.owner}</p>
                      </div>
                      <div className="flex gap-1">
                        {project.tags.slice(0, 1).map((tag) => (
                          <Badge key={tag.type} variant="outline" className="text-xs">
                            {tag.type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          {project.forks}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={e => e.stopPropagation()}>
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button size="sm" asChild onClick={e => { e.stopPropagation(); }}>
                          <Link href={`${baseUrl}/projects/${project.id}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Projects</CardTitle>
              <CardDescription>Projects you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookmarkedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`${baseUrl}/projects/${project.id}`)}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-gray-600 line-clamp-1">{project.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          {project.forks}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={e => {e.preventDefault(); e.stopPropagation(); /* handle remove */}}>
                        Remove
                      </Button>
                      <Button size="sm" asChild onClick={e => { e.stopPropagation(); }}>
                        <Link href={`${baseUrl}/projects/${project.id}`}>
                          <Github className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="following" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Following</CardTitle>
              <CardDescription>Developers you're following</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {followedContributors.map((contributor) => (
                  <div key={contributor.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contributor.avatarUrl || "/placeholder.svg"} alt={contributor.name} />
                      <AvatarFallback>
                        {contributor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{contributor.name}</h4>
                      <p className="text-sm text-gray-600">@{contributor.githubUsername}</p>
                      <div className="flex gap-2 mt-1">
                        {contributor.topLanguages.slice(0, 2).map((lang) => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/profile/${contributor.githubUsername}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {i % 3 === 0 ? "Bookmarked" : i % 3 === 1 ? "Followed" : "Viewed"}{" "}
                        {i % 3 === 0 ? "awesome-react-project" : i % 3 === 1 ? "john-doe" : "vue-components"}
                      </p>
                      <p className="text-xs text-gray-500">{i + 1} hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
