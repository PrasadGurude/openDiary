"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Github,
  Users,
  FolderOpen,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Sun,
  Moon,
  Plus,
  Lightbulb,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isLoggedIn, logout, isAdmin } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-600 fixed w-full top-0 z-50 transition-colors left-0 ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Github className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-slate-50">TalentHub</span>
          </Link>

          {/* Desktop Navigation - Only show if logged in */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/projects"
                className="flex items-center space-x-1 text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FolderOpen className="h-4 w-4" />
                <span>Projects</span>
              </Link>
              <Link
                href="/talent"
                className="flex items-center space-x-1 text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>Talent</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center space-x-1 text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center space-x-1 text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}
            </div>
          )}

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Project Action Button - Only show if logged in */}
            {isLoggedIn && (
              <>
                {isAdmin ? (
                  <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Link href="/admin/projects/add" className="flex items-center space-x-1">
                      <Plus className="h-4 w-4" />
                      <span>Add Project</span>
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/projects/suggest" className="flex items-center space-x-1">
                      <Lightbulb className="h-4 w-4" />
                      <span>Suggest Project</span>
                    </Link>
                  </Button>
                )}
              </>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-9 w-9 p-0"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* User Menu / Auth Buttons */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">@{user?.username}</p>
                      {isAdmin && <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Admin</p>}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${user?.username}`}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-8 w-8 p-0">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-slate-600 py-4">
            <div className="space-y-4">
              {/* Mobile Project Action Button - Only show if logged in */}
              {isLoggedIn && (
                <div className="px-2">
                  {isAdmin ? (
                    <Button asChild size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Link href="/admin/projects/add" className="flex items-center justify-center space-x-1">
                        <Plus className="h-4 w-4" />
                        <span>Add Project</span>
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/projects/suggest" className="flex items-center justify-center space-x-1">
                        <Lightbulb className="h-4 w-4" />
                        <span>Suggest Project</span>
                      </Link>
                    </Button>
                  )}
                </div>
              )}

              {/* Mobile Navigation Links - Only show if logged in */}
              {isLoggedIn && (
                <div className="space-y-2">
                  <Link
                    href="/projects"
                    className="flex items-center space-x-2 text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FolderOpen className="h-4 w-4" />
                    <span>Projects</span>
                  </Link>
                  <Link
                    href="/talent"
                    className="flex items-center space-x-2 text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="h-4 w-4" />
                    <span>Talent</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center space-x-2 text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                </div>
              )}

              {/* Mobile Auth/User Menu */}
              {isLoggedIn ? (
                <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-slate-600">
                  <div className="flex items-center space-x-3 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">@{user?.username}</p>
                      {isAdmin && <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Admin</p>}
                    </div>
                  </div>
                  <Link
                    href={`/profile/${user?.username}`}
                    className="flex items-center space-x-2 text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <Button
                    className="flex items-center space-x-2 text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 w-full text-left"
                    onClick={() => {
                      setIsMenuOpen(false)
                      logout()
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-slate-600">
                  <Button variant="ghost" className="w-full justify-center" asChild>
                    <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
