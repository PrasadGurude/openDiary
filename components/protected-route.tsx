"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isLoggedIn, isAdmin } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/auth/signin"
      return
    }

    if (requireAdmin && !isAdmin) {
      window.location.href = "/dashboard"
      return
    }
  }, [isLoggedIn, isAdmin, requireAdmin])

  if (!isLoggedIn) {
    return null
  }

  if (requireAdmin && !isAdmin) {
    return null
  }

  return <>{children}</>
}
