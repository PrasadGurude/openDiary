"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Users,
  FolderOpen,
  ClipboardCheck,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightOpen,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "@/lib/theme-context"

const routes = [
  {
    label: "Dashboard",
    icon: BarChart3,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
    color: "text-violet-500",
  },
  {
    label: "Projects",
    icon: FolderOpen,
    href: "/admin/projects",
    color: "text-pink-700",
  },
  {
    label: "Project Management",
    icon: ClipboardCheck,
    href: "/admin/projects/manage",
    color: "text-orange-500",
  },
  {
    label: "Project Suggestions",
    icon: ClipboardCheck,
    href: "/admin/suggestions",
    color: "text-green-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
    color: "text-gray-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [sidebarState, setSidebarState] = useState<"expanded" | "collapsed" | "hidden">("expanded")
  const { theme, toggleTheme } = useTheme()

  // Load sidebar state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarState")
    if (savedState === "expanded" || savedState === "collapsed" || savedState === "hidden") {
      setSidebarState(savedState as "expanded" | "collapsed" | "hidden")
    }
  }, [])

  // Save sidebar state to localStorage when it changes
  const updateSidebarState = (newState: "expanded" | "collapsed" | "hidden") => {
    setSidebarState(newState)
    localStorage.setItem("adminSidebarState", newState)

    // Dispatch custom event to update layout
    window.dispatchEvent(
      new CustomEvent("sidebarStateChange", {
        detail: { state: newState },
      }),
    )
  }

  const toggleSidebar = () => {
    const newState = sidebarState === "expanded" ? "collapsed" : "expanded"
    updateSidebarState(newState)
  }

  const hideSidebar = () => {
    updateSidebarState("hidden")
  }

  const showSidebar = () => {
    updateSidebarState("collapsed")
  }

  const isCollapsed = sidebarState === "collapsed"
  const isHidden = sidebarState === "hidden"

  return (
    <>
      {/* Main Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-screen bg-gray-900 dark:bg-slate-900 text-white transition-all duration-300 z-40 border-r border-gray-800 dark:border-slate-700",
          isCollapsed ? "w-20" : "w-64",
          isHidden ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={cn(
              "flex items-center p-4 border-b border-gray-800 dark:border-slate-700 min-h-[73px]",
              isCollapsed ? "justify-center" : "justify-between",
            )}
          >
            {!isCollapsed && (
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-blue-400" />
                <h1 className="text-xl font-bold ml-2">Admin Panel</h1>
              </div>
            )}
            {isCollapsed && <Shield className="h-8 w-8 text-blue-400" />}

            {/* Toggle and Hide Buttons */}
            <div className="flex space-x-1">
              {/* Toggle Button */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 w-9 rounded-lg hover:bg-gray-800 dark:hover:bg-slate-700 transition-all duration-200",
                  "border border-gray-700 dark:border-gray-600 hover:border-gray-600 dark:hover:border-gray-500",
                  isCollapsed && "ml-0",
                )}
                onClick={toggleSidebar}
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="h-5 w-5 text-gray-300" />
                ) : (
                  <PanelLeftClose className="h-5 w-5 text-gray-300" />
                )}
              </Button>

              {/* Hide Button (only visible when not collapsed) */}
              {!isCollapsed && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 w-9 rounded-lg hover:bg-gray-800 dark:hover:bg-slate-700 transition-all duration-200",
                    "border border-gray-700 dark:border-gray-600 hover:border-gray-600 dark:hover:border-gray-500",
                  )}
                  onClick={hideSidebar}
                  title="Hide sidebar"
                >
                  <PanelLeftClose className="h-5 w-5 text-gray-300" />
                </Button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-4 overflow-y-auto scrollbar-hide">
            <div className="space-y-1 px-3">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center p-3 rounded-lg transition-all duration-200 group",
                    pathname === route.href
                      ? "bg-gray-800 dark:bg-slate-700 text-white shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-gray-800 dark:hover:bg-slate-700",
                    isCollapsed ? "justify-center" : "justify-start",
                  )}
                  title={isCollapsed ? route.label : undefined}
                >
                  <route.icon
                    className={cn(
                      "h-5 w-5 transition-colors duration-200",
                      route.color,
                      pathname === route.href && "text-white",
                    )}
                  />
                  {!isCollapsed && (
                    <span className="ml-3 text-sm font-medium transition-all duration-200">{route.label}</span>
                  )}

                  {/* Active indicator */}
                  {pathname === route.href && (
                    <div
                      className={cn(
                        "absolute right-0 w-1 h-8 bg-blue-400 rounded-l-full",
                        isCollapsed ? "right-0" : "right-0",
                      )}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer with theme toggle and logout */}
          <div className="p-4 border-t border-gray-800 dark:border-slate-700 space-y-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              className={cn(
                "w-full text-gray-400 hover:text-white hover:bg-gray-800 dark:hover:bg-slate-700 transition-colors",
                isCollapsed ? "justify-center p-3" : "justify-start text-sm font-medium",
              )}
              onClick={toggleTheme}
              title={isCollapsed ? `Switch to ${theme === "light" ? "dark" : "light"} mode` : undefined}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              {!isCollapsed && <span className="ml-3">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
            </Button>

            {/* Logout Button */}
            <Button
              variant="ghost"
              className={cn(
                "w-full text-gray-400 hover:text-white hover:bg-gray-800 dark:hover:bg-slate-700 transition-colors",
                isCollapsed ? "justify-center p-3" : "justify-start text-sm font-medium",
              )}
              onClick={() => (window.location.href = "/")}
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Show Sidebar Button (only visible when sidebar is hidden) */}
      {isHidden && (
        <button
          onClick={showSidebar}
          className={cn(
            "fixed top-4 left-4 z-50 flex items-center justify-center",
            "h-10 w-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white",
            "shadow-lg border border-blue-700 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          )}
          title="Show sidebar"
        >
          <PanelRightOpen className="h-5 w-5" />
        </button>
      )}
    </>
  )
}
