"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, Github, ExternalLink, Filter } from "lucide-react"
import { getAllContributors } from "@/lib/data"
import Link from "next/link"

// Efficiently fetch only the contributors for the current page and filters
async function fetchContributors({
  searchTerm,
  selectedSkills,
  experienceLevel,
  sortBy,
  minContributionScore,
  minTotalCommits,
  minTotalPRs,
  minFollowers,
  minTotalStars,
  page,
  pageSize,
}: {
  searchTerm: string
  selectedSkills: string[]
  experienceLevel: string
  sortBy: string
  minContributionScore: string
  minTotalCommits: string
  minTotalPRs: string
  minFollowers: string
  minTotalStars: string
  page: number
  pageSize: number
}) {
  // Instead of importing all, filter and slice as early as possible
  const allContributors = getAllContributors()

  // Filtering helpers
  const matchesSearch = (contributor: any) => {
    if (!searchTerm.trim()) return true
    const lower = searchTerm.toLowerCase()
    return (
      contributor.name.toLowerCase().includes(lower) ||
      contributor.githubUsername.toLowerCase().includes(lower) ||
      contributor.skills.some((skill: string) => skill.toLowerCase().includes(lower))
    )
  }
  const matchesSkills = (contributor: any) =>
    !selectedSkills.length || selectedSkills.every((skill) => contributor.skills.includes(skill))
  const matchesExperience = (contributor: any) =>
    experienceLevel === "all" || contributor.experience === experienceLevel
  const matchesMetrics = (contributor: any) =>
    contributor.contributionScore >= Number.parseInt(minContributionScore) &&
    contributor.totalCommits >= Number.parseInt(minTotalCommits) &&
    contributor.totalPRs >= Number.parseInt(minTotalPRs) &&
    contributor.githubFollowers >= Number.parseInt(minFollowers) &&
    contributor.totalStars >= Number.parseInt(minTotalStars)

  // Filter and sort before slicing for pagination
  let filtered = allContributors.filter(
    (contributor) =>
      matchesSearch(contributor) &&
      matchesSkills(contributor) &&
      matchesExperience(contributor) &&
      matchesMetrics(contributor)
  )

  filtered = filtered.sort((a, b) => {
    switch (sortBy) {
      case "score":
        return b.contributionScore - a.contributionScore
      case "followers":
        return b.githubFollowers - a.githubFollowers
      case "commits":
        return b.totalCommits - a.totalCommits
      case "prs":
        return b.totalPRs - a.totalPRs
      case "stars":
        return b.totalStars - a.totalStars
      default:
        return 0
    }
  })

  const total = filtered.length
  // Only return the contributors for the current page
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)
  // Only return the minimal fields needed for the UI
  const minimalContributors = paginated.map((c) => ({
    id: c.id,
    name: c.name,
    githubUsername: c.githubUsername,
    githubProfile: c.githubProfile,
    avatarUrl: c.avatarUrl,
    bio: c.bio,
    skills: c.skills,
    experience: c.experience,
    interests: c.interests,
    contributionScore: c.contributionScore,
    totalCommits: c.totalCommits,
    totalPRs: c.totalPRs,
    totalStars: c.totalStars,
    githubFollowers: c.githubFollowers,
    topLanguages: c.topLanguages,
    verifiedGithub: c.verifiedGithub,
    twitterHandle: c.twitterHandle,
    linkedinUrl: c.linkedinUrl,
  }))
  return { contributors: minimalContributors, total }
}

export default function TalentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [showSkillDropdown, setShowSkillDropdown] = useState(false)
  const [sortBy, setSortBy] = useState("score")
  const [experienceLevel, setExperienceLevel] = useState("all")
  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)

  // Metric filters
  const [minContributionScore, setMinContributionScore] = useState("0")
  const [minTotalCommits, setMinTotalCommits] = useState("0")
  const [minTotalPRs, setMinTotalPRs] = useState("0")
  const [minFollowers, setMinFollowers] = useState("0")
  const [minTotalStars, setMinTotalStars] = useState("0")

  // Follow state
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())

  // Data state
  const [contributors, setContributors] = useState<any[]>([])
  const [totalContributors, setTotalContributors] = useState(0)
  const [loading, setLoading] = useState(false)

  // Unique skills for dropdown
  const allContributorsForMeta = getAllContributors()
  const uniqueSkills = Array.from(new Set(allContributorsForMeta.flatMap((c) => c.skills)))

  // Fetch contributors when filters/page change
  useEffect(() => {
    setLoading(true)
    fetchContributors({
      searchTerm,
      selectedSkills,
      experienceLevel,
      sortBy,
      minContributionScore,
      minTotalCommits,
      minTotalPRs,
      minFollowers,
      minTotalStars,
      page,
      pageSize,
    }).then(({ contributors, total }) => {
      setContributors(contributors)
      setTotalContributors(total)
      setLoading(false)
    })
  }, [
    searchTerm,
    selectedSkills,
    experienceLevel,
    sortBy,
    minContributionScore,
    minTotalCommits,
    minTotalPRs,
    minFollowers,
    minTotalStars,
    page,
    pageSize,
  ])

  const totalPages = Math.ceil(totalContributors / pageSize)

  // Dropdown click outside handler
  const skillDropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        skillDropdownRef.current &&
        !skillDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSkillDropdown(false)
      }
    }
    if (showSkillDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showSkillDropdown])

  // Follow/unfollow
  const handleFollow = (userId: string) => {
    setFollowedUsers((prev) => new Set([...prev, userId]))
  }
  const handleUnfollow = (userId: string) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev)
      newSet.delete(userId)
      return newSet
    })
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setSelectedSkills([])
    setExperienceLevel("all")
    setMinContributionScore("0")
    setMinTotalCommits("0")
    setMinTotalPRs("0")
    setMinFollowers("0")
    setMinTotalStars("0")
    setSortBy("score")
    setPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Discover Talent</h1>
        <p className="text-gray-600 text-center">Find skilled developers based on their open-source contributions</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </h3>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>

        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-end">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search developers..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1) }}
              className="pl-10"
            />
          </div>

          {/* Multi-select dropdown for skills */}
          <div ref={skillDropdownRef} className="relative">
            <label className="block text-xs font-medium text-gray-600 mb-1">Skills</label>
            <button
              type="button"
              className="w-full border rounded px-3 py-2 text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowSkillDropdown((v) => !v)}
            >
              {selectedSkills.length === 0
                ? "All Skills"
                : selectedSkills.join(", ")}
            </button>
            {showSkillDropdown && (
              <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
                <div className="p-2">
                  {uniqueSkills.map((skill) => (
                    <label key={skill} className="flex items-center gap-2 py-1 cursor-pointer">
                      <input
                        type="checkbox"
                        value={skill}
                        checked={selectedSkills.includes(skill)}
                        onChange={(e) => {
                          setSelectedSkills((prev) =>
                            e.target.checked
                              ? [...prev, skill]
                              : prev.filter((s) => s !== skill)
                          )
                          setPage(1)
                        }}
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
                {selectedSkills.length > 0 && (
                  <div className="p-2 border-t flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        setSelectedSkills([])
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
            <label className="block text-xs font-medium text-gray-600 mb-1">Experience</label>
            <Select value={experienceLevel} onValueChange={(v) => { setExperienceLevel(v); setPage(1) }}>
              <SelectTrigger>
                <SelectValue placeholder="Experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
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
                <SelectItem value="score">Contribution Score</SelectItem>
                <SelectItem value="followers">Followers</SelectItem>
                <SelectItem value="commits">Total Commits</SelectItem>
                <SelectItem value="prs">Total PRs</SelectItem>
                <SelectItem value="stars">Total Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Metric Filters */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Minimum Requirements</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Contribution Score</label>
              <Select value={minContributionScore} onValueChange={(v) => { setMinContributionScore(v); setPage(1) }}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="500">500+</SelectItem>
                  <SelectItem value="1000">1,000+</SelectItem>
                  <SelectItem value="2000">2,000+</SelectItem>
                  <SelectItem value="3000">3,000+</SelectItem>
                  <SelectItem value="5000">5,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Total Commits</label>
              <Select value={minTotalCommits} onValueChange={(v) => { setMinTotalCommits(v); setPage(1) }}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="100">100+</SelectItem>
                  <SelectItem value="500">500+</SelectItem>
                  <SelectItem value="1000">1,000+</SelectItem>
                  <SelectItem value="2000">2,000+</SelectItem>
                  <SelectItem value="5000">5,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Total PRs</label>
              <Select value={minTotalPRs} onValueChange={(v) => { setMinTotalPRs(v); setPage(1) }}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="10">10+</SelectItem>
                  <SelectItem value="25">25+</SelectItem>
                  <SelectItem value="50">50+</SelectItem>
                  <SelectItem value="100">100+</SelectItem>
                  <SelectItem value="200">200+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">GitHub Followers</label>
              <Select value={minFollowers} onValueChange={(v) => { setMinFollowers(v); setPage(1) }}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="10">10+</SelectItem>
                  <SelectItem value="50">50+</SelectItem>
                  <SelectItem value="100">100+</SelectItem>
                  <SelectItem value="500">500+</SelectItem>
                  <SelectItem value="1000">1,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Total Stars</label>
              <Select value={minTotalStars} onValueChange={(v) => { setMinTotalStars(v); setPage(1) }}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="100">100+</SelectItem>
                  <SelectItem value="500">500+</SelectItem>
                  <SelectItem value="1000">1,000+</SelectItem>
                  <SelectItem value="5000">5,000+</SelectItem>
                  <SelectItem value="10000">10,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-500" />
          <span className="text-gray-600">{totalContributors} developers found</span>
          {(minContributionScore !== "0" ||
            minTotalCommits !== "0" ||
            minTotalPRs !== "0" ||
            minFollowers !== "0" ||
            minTotalStars !== "0" ||
            selectedSkills.length > 0 ||
            searchTerm.trim() !== "" ||
            experienceLevel !== "all") && (
            <Badge variant="secondary" className="ml-2">
              Filtered
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-stretch">
        {loading ? (
          <div className="col-span-full text-center py-12">Loading...</div>
        ) : contributors.length > 0 ? (
          contributors.map((contributor) => (
            <div key={contributor.id} className="flex justify-center">
              <Card
                className="group transition-all duration-300 shadow-lg hover:-translate-y-1 dark:shadow-slate-900/30 dark:hover:shadow-slate-900/50 border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 hover:border-blue-300 dark:hover:border-blue-600 w-full h-full flex flex-col cursor-pointer"
                onClick={(e) => {
                  // Only navigate if not clicking a button or link
                  if (
                    (e.target as HTMLElement).tagName !== "BUTTON" &&
                    !(e.target as HTMLElement).closest("button") &&
                    (e.target as HTMLElement).tagName !== "A" &&
                    !(e.target as HTMLElement).closest("a")
                  ) {
                    window.location.href = `/profile/${contributor.githubUsername}`
                  }
                }}
              >
                <CardHeader className="pb-4 flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <Avatar className="h-16 w-16 border-2 border-blue-200 dark:border-blue-700 shadow-sm">
                      <AvatarImage src={contributor.avatarUrl || "/placeholder.svg"} alt={contributor.name} />
                      <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <a
                          href={contributor.githubProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate group-hover:text-blue-600 dark:group-hover:text-blue-400"
                          onClick={e => e.stopPropagation()}
                        >
                          {contributor.name}
                        </a>
                        {contributor.verifiedGithub && (
                          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-medium ml-1">Verified</Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-1">
                        {contributor.topLanguages.slice(0, 3).map((lang) => (
                          <Badge key={lang} className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-medium">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">@{contributor.githubUsername}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 line-clamp-3 leading-relaxed">{contributor.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {contributor.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 text-xs font-medium">
                        {skill}
                      </Badge>
                    ))}
                    {contributor.skills.length > 4 && (
                      <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-600 text-xs font-medium">
                        +{contributor.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {contributor.interests.slice(0, 3).map((interest) => (
                      <Badge key={interest} className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-medium">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col justify-end">
                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{contributor.contributionScore}</span>
                      <span className="text-slate-600 dark:text-slate-400">Score</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{contributor.githubFollowers}</span>
                      <span className="text-slate-600 dark:text-slate-400">Followers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{contributor.totalCommits}</span>
                      <span className="text-slate-600 dark:text-slate-400">Commits</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{contributor.totalPRs}</span>
                      <span className="text-slate-600 dark:text-slate-400">PRs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm col-span-2">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{contributor.totalStars}</span>
                      <span className="text-slate-600 dark:text-slate-400">Stars</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                      <Button asChild size="sm" variant="outline" className="shadow-sm hover:shadow-md transition-all border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 w-full sm:w-auto">
                        <a href={contributor.githubProfile} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                          <Github className="h-4 w-4 mr-1" />
                          GitHub
                        </a>
                      </Button>
                      {contributor.linkedinUrl && (
                        <Button asChild size="sm" variant="outline" className="shadow-sm hover:shadow-md transition-all border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 w-full sm:w-auto">
                          <a href={contributor.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                      {contributor.twitterHandle && (
                        <Button asChild size="sm" variant="outline" className="shadow-sm hover:shadow-md transition-all border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 w-full sm:w-auto">
                          <a href={`https://twitter.com/${contributor.twitterHandle.replace(/^@/, "")}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 mr-1 text-sky-500" aria-hidden="true"><path d="M22.46 5.924c-.793.352-1.646.59-2.542.697a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.48 0-4.49 2.014-4.49 4.495 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.6 1.67 4.98c-.387.664-.61 1.437-.61 2.26 0 1.56.793 2.94 2.003 3.75-.736-.023-1.428-.226-2.034-.563v.057c0 2.18 1.55 4.002 3.604 4.418-.377.104-.775.16-1.186.16-.29 0-.568-.028-.84-.08.57 1.77 2.22 3.06 4.18 3.09A8.98 8.98 0 0 1 2 19.54a12.67 12.67 0 0 0 6.86 2.01c8.23 0 12.74-6.82 12.74-12.74 0-.195-.004-.39-.013-.583.875-.63 1.64-1.42 2.24-2.31z"/></svg>
                            <span>Twitter</span>
                          </a>
                        </Button>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        className={`shadow-sm hover:shadow-md transition-all w-full ${followedUsers.has(contributor.id) ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}
                        onClick={(e) => {
                          e.preventDefault()
                          followedUsers.has(contributor.id)
                            ? handleUnfollow(contributor.id)
                            : handleFollow(contributor.id)
                        }}
                      >
                        {followedUsers.has(contributor.id) ? 'Unfollow' : 'Follow'}
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/profile/${contributor.githubUsername}`} onClick={e => { e.stopPropagation(); }}>
                          View
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No developers found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button variant="outline" onClick={resetFilters}>
              Reset All Filters
            </Button>
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
