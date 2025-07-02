"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Star, GitFork, ExternalLink, Github, Bookmark } from "lucide-react"
import { getAllProjects } from "@/lib/data"
import Link from "next/link"
import { ProjectCard } from "@/components/project-card"

async function fetchProjects({
  searchTerm,
  selectedLanguages,
  selectedTag,
  minStars,
  sortBy,
  page,
  pageSize,
}: {
  searchTerm: string
  selectedLanguages: string[]
  selectedTag: string
  minStars: string
  sortBy: string
  page: number
  pageSize: number
}) {
  const allProjects = getAllProjects().filter((project) => project.approved)

  function matchesSearch(project: any, term: string) {
    if (!term.trim()) return true
    const lower = term.toLowerCase()
    return (
      project.name.toLowerCase().includes(lower) ||
      (project.description && project.description.toLowerCase().includes(lower)) ||
      project.topics.some((topic: string) => topic.toLowerCase().includes(lower))
    )
  }
  function matchesLanguages(project: any, langs: string[]) {
    if (!langs.length) return true
    if (!project.languages) return false
    const projectLangs = Object.keys(project.languages)
    return langs.every((lang) => projectLangs.includes(lang))
  }
  function matchesTag(project: any, tag: string) {
    if (tag === "all") return true
    return project.tags && project.tags.some((t: any) => t.type === tag)
  }
  function matchesStars(project: any, min: string) {
    return project.stars >= Number.parseInt(min)
  }

  const filtered = allProjects.filter(
    (project) =>
      matchesSearch(project, searchTerm) &&
      matchesLanguages(project, selectedLanguages) &&
      matchesTag(project, selectedTag) &&
      matchesStars(project, minStars)
  )

  const sorted = [...filtered].sort((a, b) => {
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

  const total = sorted.length
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize)
  return { projects: paginated, total }
}

export default function ProjectsPage() {
  // --- State ---
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [selectedTag, setSelectedTag] = useState("all")
  const [sortBy, setSortBy] = useState("stars")
  const [minStars, setMinStars] = useState("0")
  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)

  // For uniqueLanguages and uniqueTags, fetch from all projects (could be cached)
  const allProjectsForMeta = getAllProjects().filter((project) => project.approved)
  const uniqueLanguages = Array.from(
    new Set(allProjectsForMeta.flatMap((p) => (p.languages ? Object.keys(p.languages as any) : []))),
  )
  const uniqueTags = Array.from(new Set(allProjectsForMeta.flatMap((p) => p.tags.map((t) => t.type))))

  // --- Data fetching ---
  const [projects, setProjects] = useState<any[]>([])
  const [totalProjects, setTotalProjects] = useState(0)
  const [loading, setLoading] = useState(false)

  // Fetch projects when filters/page change
  useEffect(() => {
    setLoading(true)
    fetchProjects({
      searchTerm,
      selectedLanguages,
      selectedTag,
      minStars,
      sortBy,
      page,
      pageSize: 15, // always fetch 15 per page
    }).then(({ projects, total }) => {
      setProjects(projects)
      setTotalProjects(total)
      setLoading(false)
    })
  }, [searchTerm, selectedLanguages, selectedTag, minStars, sortBy, page])

  const totalPages = Math.ceil(totalProjects / 15)

  // --- Dropdown click outside handler ---
  const langDropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLangDropdown(false)
      }
    }
    if (showLangDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showLangDropdown])

  // --- UI ---
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Discover Projects</h1>
        <p className="text-gray-600 text-center">Explore open-source projects and find opportunities to contribute</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1) }}
              className="pl-10"
            />
          </div>

          {/* Multi-select dropdown for languages */}
          <div ref={langDropdownRef} className="relative">
            <label className="block text-xs font-medium text-gray-600 mb-1">Languages</label>
            <button
              type="button"
              className="w-full border rounded px-3 py-2 text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowLangDropdown((v) => !v)}
            >
              {selectedLanguages.length === 0
                ? "All Languages"
                : selectedLanguages.join(", ")}
            </button>
            {showLangDropdown && (
              <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
                <div className="p-2">
                  {uniqueLanguages.map((lang) => (
                    <label key={lang} className="flex items-center gap-2 py-1 cursor-pointer">
                      <input
                        type="checkbox"
                        value={lang}
                        checked={selectedLanguages.includes(lang)}
                        onChange={(e) => {
                          setSelectedLanguages((prev) =>
                            e.target.checked
                              ? [...prev, lang]
                              : prev.filter((l) => l !== lang)
                          )
                          setPage(1)
                        }}
                      />
                      <span>{lang}</span>
                    </label>
                  ))}
                </div>
                {selectedLanguages.length > 0 && (
                  <div className="p-2 border-t flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        setSelectedLanguages([])
                        setPage(1)
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Program</label>
            <Select value={selectedTag} onValueChange={(v) => { setSelectedTag(v); setPage(1) }}>
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
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Min Stars</label>
            <Select value={minStars} onValueChange={(v) => { setMinStars(v); setPage(1) }}>
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
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Sort by</label>
            <Select value={sortBy} onValueChange={(v) => { setSortBy(v); setPage(1) }}>
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
      </div>

      {/* Results Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5 text-gray-500" />
          <span className="text-gray-600">{totalProjects} projects found</span>
          {(selectedLanguages.length > 0 || selectedTag !== "all" || minStars !== "0" || searchTerm.trim() !== "") && (
            <Badge variant="secondary" className="ml-2">
              Filtered
            </Badge>
          )}
        </div>
        <Button asChild>
          <Link href="/projects/suggest">Suggest Project</Link>
        </Button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-stretch">
        {loading ? (
          <div className="col-span-full text-center py-12">Loading...</div>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="flex justify-center">
              <ProjectCard project={project} showActions={true} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Github className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

