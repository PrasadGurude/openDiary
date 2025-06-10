"use client"

import { useMemo } from "react"

interface LanguageBarProps {
  languages: Record<string, number>
  className?: string
  showLabels?: boolean
  height?: "sm" | "md" | "lg"
  showPercentages?: boolean
}

// Language colors mapping (GitHub's actual language colors)
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#239120",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#fa7343",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#1572B6",
  SCSS: "#c6538c",
  Vue: "#4FC08D",
  React: "#61DAFB",
  Angular: "#DD0031",
  Shell: "#89e051",
  PowerShell: "#012456",
  Dockerfile: "#384d54",
  YAML: "#cb171e",
  JSON: "#292929",
  Markdown: "#083fa1",
  SQL: "#e38c00",
  R: "#198CE7",
  MATLAB: "#e16737",
  "Jupyter Notebook": "#DA5B0B",
  HCL: "#844FBA",
  Terraform: "#623CE4",
  Other: "#8b949e",
}

export function LanguageBar({
  languages,
  className = "",
  showLabels = false,
  height = "md",
  showPercentages = true,
}: LanguageBarProps) {
  const processedLanguages = useMemo(() => {
    const total = Object.values(languages).reduce((sum, value) => sum + value, 0)
    if (total === 0) return []

    return Object.entries(languages)
      .map(([name, value]) => ({
        name,
        percentage: (value / total) * 100,
        color: languageColors[name] || languageColors.Other,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .filter((lang) => lang.percentage >= 0.1) // Only show languages with >= 0.1%
  }, [languages])

  const heightClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }

  if (processedLanguages.length === 0) {
    return (
      <div className={`${heightClasses[height]} bg-slate-100 dark:bg-slate-700 rounded-full ${className}`}>
        <div className="h-full bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
          <span className="text-xs text-slate-500 dark:text-slate-400">No language data</span>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Language Bar */}
      <div
        className={`${heightClasses[height]} bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden flex border border-slate-200 dark:border-slate-600`}
      >
        {processedLanguages.map((lang, index) => (
          <div
            key={lang.name}
            className="group relative first:rounded-l-full last:rounded-r-full hover:opacity-80 transition-opacity"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color,
            }}
            title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
          >
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 shadow-lg border border-slate-700">
              <div className="font-medium">{lang.name}</div>
              <div className="text-slate-300">{lang.percentage.toFixed(1)}%</div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Language Percentages - GitHub Style */}
      {showPercentages && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {processedLanguages.map((lang, index) => (
            <div key={lang.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">{lang.name}</span>
              <span className="text-slate-500 dark:text-slate-400">{lang.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
