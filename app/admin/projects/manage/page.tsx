"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, MoreHorizontal, Trash, Eye, Edit, CheckCircle, XCircle, Star, GitFork } from "lucide-react"
import { getAllProjects } from "@/lib/data"
import { ProtectedRoute } from "@/components/protected-route"

// Mock pending suggestions data
const mockPendingSuggestions = [
  {
    id: "1",
    githubUrl: "https://github.com/facebook/react",
    notes: "Popular JavaScript library for building user interfaces",
    submittedById: "3",
    submittedByName: "Emily Watson",
    status: "PENDING",
    createdAt: "2023-05-15T00:00:00Z",
    suggestedTags: [{ id: "1", type: "HACKTOBERFEST", sourceUrl: "https://hacktoberfest.com", verified: false }],
    projectInfo: {
      name: "react",
      fullName: "facebook/react",
      owner: "facebook",
      description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      stars: 218000,
      forks: 45000,
      license: "MIT",
      topics: ["javascript", "react", "frontend", "ui"],
      languages: { JavaScript: 94, TypeScript: 4, CSS: 2 },
    },
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
    projectInfo: {
      name: "tensorflow",
      fullName: "tensorflow/tensorflow",
      owner: "tensorflow",
      description: "An Open Source Machine Learning Framework for Everyone",
      stars: 180000,
      forks: 88000,
      license: "Apache-2.0",
      topics: ["machine-learning", "tensorflow", "python", "ai"],
      languages: { Python: 60, C: 30, JavaScript: 5, Other: 5 },
    },
  },
]

function AdminProjectManageContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("pending")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [editData, setEditData] = useState<any>({})
  const [pendingSuggestions, setPendingSuggestions] = useState(mockPendingSuggestions)

  const allProjects = getAllProjects()

  const filteredProjects = allProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSuggestions = pendingSuggestions.filter(
    (suggestion) =>
      suggestion.projectInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.submittedByName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApproveProject = (suggestion: any) => {
    console.log("Approving project:", suggestion)
    setPendingSuggestions((prev) => prev.map((s) => (s.id === suggestion.id ? { ...s, status: "APPROVED" } : s)))
    // In real app, would create new project in database
  }

  const handleRejectProject = (suggestion: any) => {
    console.log("Rejecting project:", suggestion)
    setPendingSuggestions((prev) => prev.map((s) => (s.id === suggestion.id ? { ...s, status: "REJECTED" } : s)))
  }

  const handleDeleteProject = (project: any) => {
    console.log("Deleting project:", project)
    setDeleteDialogOpen(false)
    // In real app, would delete from database
  }

  const handleEditProject = (project: any) => {
    setSelectedItem(project)
    setEditData({
      name: project.name,
      description: project.description,
      visibility: project.visibility,
      approved: project.approved,
    })
    setEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    console.log("Saving project edit:", editData)
    setEditDialogOpen(false)
    // In real app, would update database
  }

  const handleViewProject = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Project Management</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <Button variant={selectedTab === "pending" ? "default" : "outline"} onClick={() => setSelectedTab("pending")}>
          Pending Suggestions ({pendingSuggestions.filter((s) => s.status === "PENDING").length})
        </Button>
        <Button variant={selectedTab === "approved" ? "default" : "outline"} onClick={() => setSelectedTab("approved")}>
          Approved Projects ({allProjects.length})
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Pending Suggestions Tab */}
      {selectedTab === "pending" && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuggestions.map((suggestion) => (
                <TableRow key={suggestion.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{suggestion.projectInfo.name}</div>
                      <div className="text-sm text-gray-500">{suggestion.projectInfo.owner}</div>
                      <div className="text-xs text-gray-400 line-clamp-1">{suggestion.projectInfo.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{suggestion.submittedByName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {suggestion.projectInfo.stars.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <GitFork className="h-4 w-4 mr-1 text-blue-500" />
                        {suggestion.projectInfo.forks.toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
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
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {suggestion.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleViewProject(suggestion.githubUrl)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-green-600"
                        onClick={() => handleApproveProject(suggestion)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => handleRejectProject(suggestion)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Approved Projects Tab */}
      {selectedTab === "approved" && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {project.stars}
                      </span>
                      <span className="flex items-center">
                        <GitFork className="h-4 w-4 mr-1 text-blue-500" />
                        {project.forks}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag.id} variant="outline" className="text-xs">
                          {tag.type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.approved ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Approved
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewProject(project.githubUrl)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditProject(project)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedItem(project)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the project "{selectedItem?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteProject(selectedItem)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update project information and settings.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Project Name</Label>
              <Input
                id="edit-name"
                value={editData.name || ""}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editData.description || ""}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-visibility"
                checked={editData.visibility || false}
                onChange={(e) => setEditData({ ...editData, visibility: e.target.checked })}
              />
              <Label htmlFor="edit-visibility">Visible to public</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-approved"
                checked={editData.approved || false}
                onChange={(e) => setEditData({ ...editData, approved: e.target.checked })}
              />
              <Label htmlFor="edit-approved">Approved</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function AdminProjectManagePage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminProjectManageContent />
    </ProtectedRoute>
  )
}
