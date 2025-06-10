"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Check, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ProtectedRoute } from "@/components/protected-route"

interface SuggestedTag {
  type: string
  sourceUrl: string
  verified: boolean
}

export default function SuggestProjectPage() {
  return (
    <ProtectedRoute>
      <SuggestProjectContent />
    </ProtectedRoute>
  )
}

function SuggestProjectContent() {
  const [formData, setFormData] = useState({
    githubUrl: "",
    notes: "",
  })
  const [suggestedTags, setSuggestedTags] = useState<SuggestedTag[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isValidating, setIsValidating] = useState(false)

  const tagOptions = [
    { type: "YCOMBINATOR", label: "Y Combinator" },
    { type: "GSOC", label: "Google Summer of Code" },
    { type: "WTFUND", label: "WTFund" },
    { type: "HACKTOBERFEST", label: "Hacktoberfest" },
    { type: "DEVFOLIO", label: "Devfolio" },
    { type: "MLH", label: "Major League Hacking" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.githubUrl) {
      setError("GitHub URL is required")
      return
    }

    if (!formData.githubUrl.includes("github.com")) {
      setError("Please enter a valid GitHub URL")
      return
    }

    // Validate tag URLs
    for (const tag of suggestedTags) {
      if (!tag.sourceUrl) {
        setError(`Please provide a source URL for ${tag.type}`)
        return
      }
    }

    // Prepare submission data according to schema
    const submissionData = {
      githubUrl: formData.githubUrl,
      notes: formData.notes,
      suggestedTags: suggestedTags.map((tag) => ({
        type: tag.type,
        sourceUrl: tag.sourceUrl,
        verified: false, // Will be verified by admin
      })),
      // This would be populated from auth context in real app
      submittedById: "current-user-id",
    }

    console.log("Submitting project suggestion:", submissionData)

    // Simulate successful submission
    setTimeout(() => {
      setSubmitted(true)
      setError("")
    }, 1000)
  }

  const addTag = (tagType: string) => {
    if (!suggestedTags.find((tag) => tag.type === tagType)) {
      setSuggestedTags([...suggestedTags, { type: tagType, sourceUrl: "", verified: false }])
    }
  }

  const removeTag = (tagType: string) => {
    setSuggestedTags(suggestedTags.filter((tag) => tag.type !== tagType))
  }

  const updateTagUrl = (tagType: string, url: string) => {
    setSuggestedTags(suggestedTags.map((tag) => (tag.type === tagType ? { ...tag, sourceUrl: url } : tag)))
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Project Submitted Successfully</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your suggestion! Our team will review the project and add it to the platform if approved.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/projects">Browse Projects</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/projects/suggest">Suggest Another</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center flex-col">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Suggest a Project</h1>
        <p className="text-gray-600">
          Help us grow our database by suggesting open-source projects that should be featured on the platform
        </p>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Please provide information about the open-source project you'd like to suggest
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* GitHub Repository URL */}
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub Repository URL *</Label>
              <Input
                id="githubUrl"
                placeholder="https://github.com/username/repository"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                required
              />
              <p className="text-sm text-gray-500">Please enter the GitHub repository URL for the project.</p>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Why should this project be featured? What makes it special? Any additional context..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
              />
            </div>

            {/* Project Tags & Source URLs */}
            <div className="space-y-4">
              <div>
                <Label>Project Tags & Verification</Label>
                <p className="text-sm text-gray-500">
                  Select the programs this project participates in and provide verification URLs
                </p>
              </div>

              {/* Available Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tagOptions.map((option) => (
                  <Button
                    key={option.type}
                    type="button"
                    variant={suggestedTags.find((tag) => tag.type === option.type) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (suggestedTags.find((tag) => tag.type === option.type)) {
                        removeTag(option.type)
                      } else {
                        addTag(option.type)
                      }
                    }}
                  >
                    {suggestedTags.find((tag) => tag.type === option.type) ? (
                      <>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove {option.label}
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-1" />
                        Add {option.label}
                      </>
                    )}
                  </Button>
                ))}
              </div>

              {/* Selected Tags with URL inputs */}
              {suggestedTags.length > 0 && (
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-medium">Provide Verification URLs for Selected Tags:</h4>
                  {suggestedTags.map((tag) => (
                    <div key={tag.type} className="space-y-2 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`url-${tag.type}`} className="font-medium">
                          {tagOptions.find((opt) => opt.type === tag.type)?.label} Source URL *
                        </Label>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeTag(tag.type)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        id={`url-${tag.type}`}
                        placeholder={getPlaceholderUrl(tag.type)}
                        value={tag.sourceUrl}
                        onChange={(e) => updateTagUrl(tag.type, e.target.value)}
                        required
                      />
                      <p className="text-xs text-gray-500">{getTagDescription(tag.type)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isValidating}>
              {isValidating ? "Validating..." : "Submit Project Suggestion"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function getPlaceholderUrl(tagType: string): string {
  switch (tagType) {
    case "YCOMBINATOR":
      return "https://www.ycombinator.com/companies/company-name"
    case "GSOC":
      return "https://summerofcode.withgoogle.com/programs/2023/projects/project-id"
    case "WTFUND":
      return "https://wtfund.org/project/project-name"
    case "HACKTOBERFEST":
      return "https://hacktoberfest.com or project README with Hacktoberfest label"
    case "DEVFOLIO":
      return "https://devfolio.co/projects/project-name"
    case "MLH":
      return "https://mlh.io/seasons/2023/events or hackathon submission link"
    default:
      return "https://example.com/verification-link"
  }
}

function getTagDescription(tagType: string): string {
  switch (tagType) {
    case "YCOMBINATOR":
      return "Link to the Y Combinator company page or announcement"
    case "GSOC":
      return "Link to the Google Summer of Code project page"
    case "WTFUND":
      return "Link to the WTFund project page or funding announcement"
    case "HACKTOBERFEST":
      return "Link to Hacktoberfest participation or project with hacktoberfest label"
    case "DEVFOLIO":
      return "Link to the Devfolio project submission"
    case "MLH":
      return "Link to MLH event page or hackathon submission"
    default:
      return "Verification link for this program"
  }
}
