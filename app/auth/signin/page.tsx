"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Mail, User, Shield } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Determine role based on email for demo
    const isAdmin = email.includes("admin")

    const userData = {
      id: isAdmin ? "admin1" : "user1",
      name: isAdmin ? "Admin User" : "John Doe",
      email: email,
      username: isAdmin ? "admin" : "johndoe",
      avatar: "/placeholder.svg?height=32&width=32",
      role: (isAdmin ? "admin" : "user") as "admin" | "user",
    }

    login(userData)
    window.location.href = isAdmin ? "/admin" : "/dashboard"
  }

  const handleGitHubSignIn = () => {
    // Demo: Simulate GitHub OAuth
    alert("GitHub OAuth would be implemented here. Redirecting to dashboard...")
    fillDemoUserData()
  }

  const fillDemoUserData = () => {
    setEmail("john@example.com")
    setPassword("password123")
  }

  const fillDemoAdminData = () => {
    setEmail("admin@example.com")
    setPassword("admin123")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue discovering talent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Demo Buttons */}
          <div className="space-y-3">
            <Button onClick={fillDemoUserData} className="w-full" variant="default" type="button">
              <User className="mr-2 h-4 w-4" />
              Fill Demo User Data
            </Button>
            <Button onClick={fillDemoAdminData} className="w-full" variant="secondary" type="button">
              <Shield className="mr-2 h-4 w-4" />
              Fill Demo Admin Data
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <Button onClick={handleGitHubSignIn} className="w-full" variant="outline" type="button">
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
