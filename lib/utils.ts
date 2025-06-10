import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add this function to help with the sidebar
export function getSidebarWidth(state: "expanded" | "collapsed" | "hidden") {
  switch (state) {
    case "expanded":
      return "w-64"
    case "collapsed":
      return "w-20"
    case "hidden":
      return "w-0"
    default:
      return "w-64"
  }
}
