"use client"

import { cn } from "@/lib/utils"

import type React from "react"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarState, setSidebarState] = useState<"expanded" | "collapsed" | "hidden">("expanded")

  useEffect(() => {
    // Load initial state
    const savedState = localStorage.getItem("adminSidebarState")
    if (savedState === "expanded" || savedState === "collapsed" || savedState === "hidden") {
      setSidebarState(savedState as "expanded" | "collapsed" | "hidden")
    }

    // Listen for sidebar state change events
    const handleSidebarStateChange = (event: CustomEvent) => {
      setSidebarState(event.detail.state)
    }

    window.addEventListener("sidebarStateChange", handleSidebarStateChange as EventListener)

    return () => {
      window.removeEventListener("sidebarStateChange", handleSidebarStateChange as EventListener)
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <Sidebar />
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarState === "expanded" ? "ml-64" : sidebarState === "collapsed" ? "ml-20" : "ml-0",
        )}
      >
        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  )
}
