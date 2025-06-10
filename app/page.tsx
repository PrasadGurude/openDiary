import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, GitFork, Users, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getFeaturedContributors, getFeaturedProjects } from "@/lib/data"

export default function HomePage() {
  const featuredContributors = getFeaturedContributors(6)
  const featuredProjects = getFeaturedProjects(6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Discover Open Source Talent</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with talented developers through their open-source contributions. Find the perfect match for your
            team based on real code, not just resumes.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/talent">
                <Users className="mr-2 h-5 w-5" />
                Discover Talent
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">
                <Github className="mr-2 h-5 w-5" />
                Explore Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Active Contributors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">5,000+</div>
              <div className="text-gray-600">Open Source Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
              <div className="text-gray-600">Lines of Code</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Companies Hiring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Contributors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Contributors</h2>
              <p className="text-gray-600">Top developers making an impact in open source</p>
            </div>
            {/* <Button variant="outline" asChild>
              <Link href="/talent">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredContributors.map((contributor) => (
              <Card key={contributor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contributor.avatarUrl || "/placeholder.svg"} alt={contributor.name} />
                      <AvatarFallback>
                        {contributor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{contributor.name}</CardTitle>
                      <CardDescription>@{contributor.githubUsername}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{contributor.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {contributor.topLanguages.slice(0, 3).map((lang) => (
                      <Badge key={lang} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Score: {contributor.contributionScore}</span>
                    <span>{contributor.githubFollowers} followers</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Projects</h2>
              <p className="text-gray-600">Popular open source projects looking for contributors</p>
            </div>
            {/* <Button variant="outline" asChild>
              <Link href="/projects">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <div className="flex gap-2">
                      {project.tags.slice(0, 1).map((tag) => (
                        <Badge key={tag.type} variant="outline" className="text-xs">
                          {tag.type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {project.stars.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        {project.forks.toLocaleString()}
                      </span>
                    </div>
                    <span>{project.license}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Team Member?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of companies discovering talent through open source contributions
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Hiring
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
