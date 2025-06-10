"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Github, ExternalLink } from "lucide-react"
import { TagType } from "@/lib/types"

export default function AddProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    githubUrl: "",
    liveLink: "",
    description: "",
    owner: "",
    license: "",
    visibility: true,
    approved: false,
    autoSynced: false,
  })
  const [topics, setTopics] = useState<string[]>([])
  const [newTopic, setNewTopic] = useState("")
  const [tags, setTags] = useState<{ type: TagType; sourceUrl: string }[]>([])
  const [newTag, setNewTag] = useState({ type: TagType.HACKTOBERFEST, sourceUrl: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would normally make an API call to create the project
      console.log("Creating project:", { ...formData, topics, tags })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/admin/projects")
    } catch (error) {
      console.error("Error creating project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTopic = () => {
    if (newTopic.trim() && !topics.includes(newTopic.trim())) {
      setTopics([...topics, newTopic.trim()])
      setNewTopic("")
    }
  }

  const removeTopic = (topic: string) => {
    setTopics(topics.filter((t) => t !== topic))
  }

  const addTag = () => {
    if (newTag.sourceUrl.trim()) {
      setTags([...tags, { ...newTag }])
      setNewTag({ type: TagType.HACKTOBERFEST, sourceUrl: "" })
    }
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Add New Project</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-2">
            Add a new project to the platform manually or import from GitHub.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="awesome-project"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="username/awesome-project"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A brief description of the project..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="owner">Owner</Label>
                  <Input
                    id="owner"
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    placeholder="username"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="license">License</Label>
                  <Select
                    value={formData.license}
                    onValueChange={(value) => setFormData({ ...formData, license: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select license" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MIT">MIT</SelectItem>
                      <SelectItem value="Apache-2.0">Apache 2.0</SelectItem>
                      <SelectItem value="GPL-3.0">GPL 3.0</SelectItem>
                      <SelectItem value="BSD-3-Clause">BSD 3-Clause</SelectItem>
                      <SelectItem value="ISC">ISC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/username/project"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="liveLink">Live Demo URL (Optional)</Label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="liveLink"
                    value={formData.liveLink}
                    onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                    placeholder="https://project-demo.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Add a topic..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTopic())}
                />
                <Button type="button" onClick={addTopic} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="flex items-center gap-1">
                      {topic}
                      <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeTopic(topic)} />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={newTag.type} onValueChange={(value: TagType) => setNewTag({ ...newTag, type: value })}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(TagType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={newTag.sourceUrl}
                  onChange={(e) => setNewTag({ ...newTag, sourceUrl: e.target.value })}
                  placeholder="Source URL..."
                  className="flex-1"
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {tags.length > 0 && (
                <div className="space-y-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-slate-700 rounded"
                    >
                      <div>
                        <Badge variant="outline">{tag.type}</Badge>
                        <span className="ml-2 text-sm text-gray-600 dark:text-slate-400">{tag.sourceUrl}</span>
                      </div>
                      <X className="h-4 w-4 cursor-pointer hover:text-red-500" onClick={() => removeTag(index)} />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="visibility">Public Visibility</Label>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Make this project visible to all users</p>
                </div>
                <Switch
                  id="visibility"
                  checked={formData.visibility}
                  onCheckedChange={(checked) => setFormData({ ...formData, visibility: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="approved">Approved</Label>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Mark this project as approved</p>
                </div>
                <Switch
                  id="approved"
                  checked={formData.approved}
                  onCheckedChange={(checked) => setFormData({ ...formData, approved: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoSynced">Auto Sync</Label>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Automatically sync with GitHub</p>
                </div>
                <Switch
                  id="autoSynced"
                  checked={formData.autoSynced}
                  onCheckedChange={(checked) => setFormData({ ...formData, autoSynced: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
