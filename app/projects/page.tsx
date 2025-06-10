"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Star, GitFork, ExternalLink, Github, Bookmark } from "lucide-react"
import { getAllProjects } from "@/lib/data"
import Link from "next/link"
import { ProjectCard } from "@/components/project-card"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedTag, setSelectedTag] = useState("all")
  const [sortBy, setSortBy] = useState("stars")
  const [minStars, setMinStars] = useState("0")

  // Sort projects on the server, not in the component, to avoid hydration mismatch
  const allProjects = getAllProjects()
    .filter((project) => project.approved) // Only show approved projects
    .sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stars - a.stars
        case "forks":
          return b.forks - a.forks
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

  // Only show approved projects
  const filteredProjects = allProjects
    .filter((project) => project.approved)
    .filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesLanguage =
        selectedLanguage === "all" ||
        (project.languages && Object.keys(project.languages as any).includes(selectedLanguage))

      const matchesTag = selectedTag === "all" || project.tags.some((tag) => tag.type === selectedTag)

      const matchesStars = project.stars >= Number.parseInt(minStars)

      return matchesSearch && matchesLanguage && matchesTag && matchesStars
    })

  const uniqueLanguages = Array.from(
    new Set(allProjects.flatMap((p) => (p.languages ? Object.keys(p.languages as any) : []))),
  )

  const uniqueTags = Array.from(new Set(allProjects.flatMap((p) => p.tags.map((t) => t.type))))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Projects</h1>
        <p className="text-gray-600">Explore open-source projects and find opportunities to contribute</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {uniqueLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger>
              <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              {uniqueTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={minStars} onValueChange={setMinStars}>
            <SelectTrigger>
              <SelectValue placeholder="Min Stars" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any</SelectItem>
              <SelectItem value="10">10+ stars</SelectItem>
              <SelectItem value="100">100+ stars</SelectItem>
              <SelectItem value="1000">1K+ stars</SelectItem>
              <SelectItem value="10000">10K+ stars</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stars">Most Stars</SelectItem>
              <SelectItem value="forks">Most Forks</SelectItem>
              <SelectItem value="recent">Recently Added</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="ml-4" asChild>
          <Link href="/projects/suggest">Suggest Project</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} showActions={true} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Github className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}
