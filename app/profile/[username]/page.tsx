import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink, Star, GitFork, Users, Activity } from "lucide-react"
import Link from "next/link"
import { getContributorByUsername, getContributorProjects } from "@/lib/data"
import { ContributionChart } from "@/components/contribution-chart"
import { SkillsRadar } from "@/components/skills-radar"
import { notFound } from "next/navigation"

interface ProfilePageProps {
  params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params
  const contributor = getContributorByUsername(username)

  if (!contributor) {
    notFound()
  }

  const projects = getContributorProjects(contributor.id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={contributor.avatarUrl || "/placeholder.svg"} alt={contributor.name} />
              <AvatarFallback className="text-2xl">
                {contributor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Button asChild>
                <Link href={contributor.githubProfile || "#"} target="_blank">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Follow
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{contributor.name}</h1>
              <p className="text-gray-600 mb-2">@{contributor.githubUsername}</p>
              {contributor.bio && <p className="text-gray-700 mb-4">{contributor.bio}</p>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{contributor.contributionScore}</div>
                <div className="text-sm text-gray-500">Contribution Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{contributor.totalCommits}</div>
                <div className="text-sm text-gray-500">Total Commits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{contributor.totalPRs}</div>
                <div className="text-sm text-gray-500">Pull Requests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{contributor.githubFollowers}</div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Top Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {contributor.topLanguages.map((lang) => (
                    <Badge key={lang} variant="secondary">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {contributor.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {contributor.interests.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {contributor.interests.map((interest) => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Overview</CardTitle>
                <CardDescription>Technical skills and proficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <SkillsRadar skills={contributor.topLanguages} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contribution Activity</CardTitle>
                <CardDescription>Commits over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ContributionChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Latest contributions and projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.githubUrl} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription>{project.owner}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      {project.tags.slice(0, 1).map((tag) => (
                        <Badge key={tag.type} variant="outline" className="text-xs">
                          {tag.type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        {project.forks}
                      </span>
                    </div>
                    <span>{project.license}</span>
                  </div>

                  <Button size="sm" className="w-full" asChild>
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="h-4 w-4 mr-2" />
                      View Project
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contribution Timeline</CardTitle>
              <CardDescription>Recent activity and contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Merged pull request in awesome-project</p>
                      <p className="text-sm text-gray-600">Added new feature for user authentication</p>
                      <p className="text-xs text-gray-500">{i + 1} days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contribution Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Commits</span>
                    <span className="font-medium">{contributor.totalCommits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pull Requests</span>
                    <span className="font-medium">{contributor.totalPRs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issues Opened</span>
                    <span className="font-medium">{Math.floor(contributor.totalPRs * 0.7)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Code Reviews</span>
                    <span className="font-medium">{Math.floor(contributor.totalPRs * 1.2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contributor.topLanguages.slice(0, 5).map((lang, index) => {
                    const percentage = Math.max(20, 80 - index * 15)
                    return (
                      <div key={lang}>
                        <div className="flex justify-between text-sm mb-1">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
