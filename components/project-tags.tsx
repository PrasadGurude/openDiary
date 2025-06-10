"use client"

import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import type { ProjectTag, TagType } from "@/lib/types"

interface ProjectTagsProps {
  tags: ProjectTag[]
  className?: string
  showIcons?: boolean
}

// Tag colors mapping
const tagColors: Record<TagType, { bg: string; text: string; border: string }> = {
  YCOMBINATOR: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-800 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-700",
  },
  GSOC: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-300",
    border: "border-green-200 dark:border-green-700",
  },
  WTFUND: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-700",
  },
  HACKTOBERFEST: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-800 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-700",
  },
  DEVFOLIO: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-800 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-700",
  },
  MLH: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-800 dark:text-pink-300",
    border: "border-pink-200 dark:border-pink-700",
  },
}

// Tag display names
const tagDisplayNames: Record<TagType, string> = {
  YCOMBINATOR: "Y Combinator",
  GSOC: "Google Summer of Code",
  WTFUND: "WTFund",
  HACKTOBERFEST: "Hacktoberfest",
  DEVFOLIO: "Devfolio",
  MLH: "Major League Hacking",
}

export function ProjectTags({ tags, className = "", showIcons = true }: ProjectTagsProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => {
        const colors = tagColors[tag.type]
        const displayName = tagDisplayNames[tag.type]

        return (
          <Badge
            key={tag.id}
            variant="outline"
            className={`
              ${colors.bg} ${colors.text} ${colors.border}
              shadow-sm hover:shadow-md transition-shadow duration-200
              border font-medium px-2 py-1
            `}
          >
            <div className="flex items-center gap-1">
              {showIcons && tag.verified && <Check className="h-3 w-3" />}
              <span>{displayName}</span>
            </div>
          </Badge>
        )
      })}
    </div>
  )
}
