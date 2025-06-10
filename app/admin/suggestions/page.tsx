"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, XCircle, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock project suggestions data
const mockSuggestions = [
  {
    id: "1",
    githubUrl: "https://github.com/facebook/react",
    notes: "Popular JavaScript library for building user interfaces",
    submittedById: "3",
    submittedByName: "Emily Watson",
    status: "PENDING",
    createdAt: "2023-05-15T00:00:00Z",
    suggestedTags: [{ id: "1", type: "HACKTOBERFEST", sourceUrl: "https://hacktoberfest.com", verified: false }],
  },
  {
    id: "2",
    githubUrl: "https://github.com/tensorflow/tensorflow",
    notes: "Open-source machine learning framework",
    submittedById: "4",
    submittedByName: "David Kim",
    status: "PENDING",
    createdAt: "2023-05-18T00:00:00Z",
    suggestedTags: [{ id: "2", type: "GSOC", sourceUrl: "https://summerofcode.withgoogle.com", verified: false }],
  },
  {
    id: "3",
    githubUrl: "https://github.com/vercel/next.js",
    notes: "React framework for production",
    submittedById: "1",
    submittedByName: "Sarah Chen",
    status: "APPROVED",
    createdAt: "2023-05-10T00:00:00Z",
    suggestedTags: [{ id: "3", type: "HACKTOBERFEST", sourceUrl: "https://hacktoberfest.com", verified: true }],
  },
  {
    id: "4",
    githubUrl: "https://github.com/kubernetes/kubernetes",
    notes: "Container orchestration system",
    submittedById: "2",
    submittedByName: "Marcus Rodriguez",
    status: "REJECTED",
    createdAt: "2023-05-05T00:00:00Z",
    suggestedTags: [{ id: "4", type: "GSOC", sourceUrl: "https://summerofcode.withgoogle.com", verified: false }],
  },
  {
    id: "5",
    githubUrl: "https://github.com/flutter/flutter",
    notes: "UI toolkit for building natively compiled applications",
    submittedById: "5",
    submittedByName: "Alex Thompson",
    status: "PENDING",
    createdAt: "2023-05-20T00:00:00Z",
    suggestedTags: [{ id: "5", type: "MLH", sourceUrl: "https://mlh.io", verified: false }],
  },
]

export default function AdminSuggestionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [suggestions, setSuggestions] = useState(mockSuggestions)
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null)

  const filteredSuggestions = suggestions.filter((suggestion) => {
    const matchesSearch =
      suggestion.githubUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.submittedByName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || suggestion.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const handleApprove = (suggestion: any) => {
    // In a real app, you would call an API to approve the suggestion
    console.log("Approving suggestion:", suggestion)

    // Update local state for demo
    setSuggestions((prev) => prev.map((s) => (s.id === suggestion.id ? { ...s, status: "APPROVED" } : s)))
  }

  const handleReject = (suggestion: any) => {
    // In a real app, you would call an API to reject the suggestion
    console.log("Rejecting suggestion:", suggestion)

    // Update local state for demo
    setSuggestions((prev) => prev.map((s) => (s.id === suggestion.id ? { ...s, status: "REJECTED" } : s)))
  }

  const handleViewDetails = (suggestion: any) => {
    setSelectedSuggestion(suggestion)
  }

  const handleViewGithub = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Project Suggestions</h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search suggestions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button variant={selectedStatus === "all" ? "default" : "outline"} onClick={() => setSelectedStatus("all")}>
            All
          </Button>
          <Button
            variant={selectedStatus === "PENDING" ? "default" : "outline"}
            onClick={() => setSelectedStatus("PENDING")}
          >
            Pending
          </Button>
          <Button
            variant={selectedStatus === "APPROVED" ? "default" : "outline"}
            onClick={() => setSelectedStatus("APPROVED")}
          >
            Approved
          </Button>
          <Button
            variant={selectedStatus === "REJECTED" ? "default" : "outline"}
            onClick={() => setSelectedStatus("REJECTED")}
          >
            Rejected
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Repository</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuggestions.map((suggestion) => (
                  <TableRow key={suggestion.id}>
                    <TableCell className="font-medium">{suggestion.githubUrl.split("/").slice(-2).join("/")}</TableCell>
                    <TableCell>{suggestion.submittedByName}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {suggestion.suggestedTags.map((tag) => (
                          <Badge key={tag.id} variant="outline" className="text-xs">
                            {tag.type}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {suggestion.status === "PENDING" && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Pending
                        </Badge>
                      )}
                      {suggestion.status === "APPROVED" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Approved
                        </Badge>
                      )}
                      {suggestion.status === "REJECTED" && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          Rejected
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleViewDetails(suggestion)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {suggestion.status === "PENDING" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-green-600"
                              onClick={() => handleApprove(suggestion)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600"
                              onClick={() => handleReject(suggestion)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          {selectedSuggestion ? (
            <Card>
              <CardHeader>
                <CardTitle>Suggestion Details</CardTitle>
                <CardDescription>
                  Submitted on {new Date(selectedSuggestion.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">GitHub Repository</h3>
                  <p className="mt-1">{selectedSuggestion.githubUrl}</p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600"
                    onClick={() => handleViewGithub(selectedSuggestion.githubUrl)}
                  >
                    View on GitHub
                  </Button>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Submitted By</h3>
                  <p className="mt-1">{selectedSuggestion.submittedByName}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p className="mt-1">{selectedSuggestion.notes}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Suggested Tags</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedSuggestion.suggestedTags.map((tag: any) => (
                      <div key={tag.id}>
                        <Badge variant="secondary">{tag.type}</Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          Source:{" "}
                          <a href={tag.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                            {tag.sourceUrl}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div className="mt-1">
                    {selectedSuggestion.status === "PENDING" && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Pending
                      </Badge>
                    )}
                    {selectedSuggestion.status === "APPROVED" && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Approved
                      </Badge>
                    )}
                    {selectedSuggestion.status === "REJECTED" && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Rejected
                      </Badge>
                    )}
                  </div>
                </div>

                {selectedSuggestion.status === "PENDING" && (
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1" onClick={() => handleApprove(selectedSuggestion)}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => handleReject(selectedSuggestion)}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <p>Select a suggestion to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
