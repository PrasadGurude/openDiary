"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, GitFork, ExternalLink, Github, Calendar, TrendingUp, TrendingDown, Eye } from "lucide-react"
import { LanguageBar } from "./language-bar"
import { ProjectTags } from "./project-tags"
import type { Project } from "@/lib/data"

interface ProjectCardProps {
  project: Project
  showActions?: boolean
  className?: string
}

export function ProjectCard({ project, showActions = true, className = "" }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    // Use a deterministic format to avoid hydration mismatch
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getVoteRatio = () => {
    const total = project.upvotes + project.downvotes
    if (total === 0) return 0
    return (project.upvotes / total) * 100
  }

  return (
    <Card
      className={`
      group transition-all duration-300
      shadow-lg hover:-translate-y-1
      dark:shadow-slate-900/30 dark:hover:shadow-slate-900/50
      border border-slate-200 dark:border-slate-700
      bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900
      hover:border-blue-300 dark:hover:border-blue-600
      w-full h-full flex flex-col
      ${className}
    `}
    >
      <CardHeader className="pb-4 flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <Link
                href={`/projects/${project.id}`}
                className="text-xl font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate group-hover:text-blue-600 dark:group-hover:text-blue-400"
              >
                {project.name}
              </Link>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Project Tags */}
        <ProjectTags tags={project.tags as any} className="mb-4" />

        {/* Language Bar with Percentages */}
        {project.languages && Object.keys(project.languages).length > 0 && (
          <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <LanguageBar languages={project.languages} height="md" showPercentages={true} />
          </div>
        )}

        {/* Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 4).map((topic) => (
              <Badge
                key={topic}
                variant="secondary"
                className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors border border-blue-200 dark:border-blue-800"
              >
                {topic}
              </Badge>
            ))}
            {project.topics.length > 4 && (
              <Badge
                variant="secondary"
                className="text-xs bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-600"
              >
                +{project.topics.length - 4} more
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0 flex flex-col justify-end">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-amber-500" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">{project.stars.toLocaleString()}</span>
            <span className="text-slate-600 dark:text-slate-400">stars</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GitFork className="h-4 w-4 text-blue-500" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">{project.forks.toLocaleString()}</span>
            <span className="text-slate-600 dark:text-slate-400">forks</span>
          </div>
          {(project.upvotes > 0 || project.downvotes > 0) && (
            <div className="flex items-center gap-2 text-sm">
              {getVoteRatio() >= 70 ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {project.upvotes - project.downvotes}
              </span>
              <span className="text-slate-600 dark:text-slate-400">votes</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-purple-500" />
            <span className="text-slate-600 dark:text-slate-400">{formatDate(project.createdAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="shadow-sm hover:shadow-md transition-all border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 w-full sm:w-auto"
            >
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                GitHub
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="shadow-sm hover:shadow-md transition-all border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 w-full sm:w-auto"
            >
              <Link href={project.liveLink || '#'} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Live Demo
              </Link>
            </Button>
          </div>

          {/* Upvote/Downvote Controls */}
          <div className="flex items-center justify-center gap-2 w-full py-1">
            <Button
              size="icon"
              variant="ghost"
              className="bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/60 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 rounded-full shadow-sm transition-all"
              aria-label="Upvote"
              // onClick handler can be added for upvote logic
            >
              <TrendingUp className="h-5 w-5" />
            </Button>
            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm min-w-[2ch] text-center">{project.upvotes}</span>
            <Button
              size="icon"
              variant="ghost"
              className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/60 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 rounded-full shadow-sm transition-all"
              aria-label="Downvote"
              // onClick handler can be added for downvote logic
            >
              <TrendingDown className="h-5 w-5" />
            </Button>
            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm min-w-[2ch] text-center">{project.downvotes}</span>
          </div>

          <Button
            asChild
            size="sm"
            className="shadow-sm hover:shadow-md transition-all bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 w-full"
          >
            <Link href={`/projects/${project.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Link>
          </Button>
        </div>

        {/* Owner & License */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">by {project.owner}</span>
            {project.license && (
              <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded border border-slate-200 dark:border-slate-600">
                {project.license}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
