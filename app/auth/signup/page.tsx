"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Github, Mail, User, Shield, Plus, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

const skillOptions = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Go",
  "Rust",
  "C++",
  "C#",
  "PHP",
  "Ruby",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express",
  "Next.js",
  "Django",
  "Flask",
  "Spring",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Terraform",
  "Ansible",
  "Jenkins",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "REST API",
  "Machine Learning",
  "AI",
  "Data Science",
  "DevOps",
  "Security",
  "Blockchain",
  "Mobile Development",
]

const interestOptions = [
  "Web Development",
  "Mobile Development",
  "Machine Learning",
  "AI Research",
  "Data Science",
  "DevOps",
  "Cloud Computing",
  "Security",
  "Blockchain",
  "Game Development",
  "IoT",
  "Computer Vision",
  "Natural Language Processing",
  "Robotics",
  "AR/VR",
  "Fintech",
  "Healthcare Tech",
  "EdTech",
  "Open Source",
  "Startups",
  "Enterprise Software",
]

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    githubUsername: "",
    bio: "",
    experience: "",
    twitterHandle: "",
    linkedinUrl: "",
    mobile: "",
    publicProfile: true,
    isDiscoverable: true,
    agreeToTerms: false,
  })

  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState("")
  const [customInterest, setCustomInterest] = useState("")

  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    // In a real app, you would submit this data to your API
    const userData = {
      ...formData,
      skills: selectedSkills,
      interests: selectedInterests,
    }

    console.log("Submitting user data:", userData)

    // Create user object for auth context
    const authUser = {
      id: formData.githubUsername || "user1",
      name: formData.name,
      email: formData.email,
      username: formData.githubUsername,
      avatar: "/placeholder.svg?height=32&width=32",
      role: "user" as const,
    }

    login(authUser)

    // Navigate based on role
    window.location.href = "/dashboard"
  }

  const handleGitHubSignUp = () => {
    // Demo: Simulate GitHub OAuth
    alert("GitHub OAuth would be implemented here. This would pre-fill GitHub data...")
    fillDemoUserData()
  }

  const fillDemoUserData = () => {
    setFormData({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      githubUsername: "johndoe",
      bio: "Full-stack developer passionate about open source and modern web technologies.",
      experience: "Intermediate",
      twitterHandle: "@johndoe_dev",
      linkedinUrl: "https://linkedin.com/in/johndoe",
      mobile: "+1234567890",
      publicProfile: true,
      isDiscoverable: true,
      agreeToTerms: true,
    })
    setSelectedSkills(["JavaScript", "TypeScript", "React", "Node.js", "Python"])
    setSelectedInterests(["Web Development", "Open Source", "AI Research"])
  }

  const fillDemoAdminData = () => {
    setFormData({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      githubUsername: "admin",
      bio: "Platform administrator with extensive experience in managing developer communities.",
      experience: "Advanced",
      twitterHandle: "@admin_user",
      linkedinUrl: "https://linkedin.com/in/admin",
      mobile: "+1987654321",
      publicProfile: true,
      isDiscoverable: false,
      agreeToTerms: true,
    })
    setSelectedSkills(["JavaScript", "Python", "DevOps", "AWS", "Docker"])
    setSelectedInterests(["DevOps", "Security", "Enterprise Software"])
  }

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
  }

  const addInterest = (interest: string) => {
    if (interest && !selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const removeInterest = (interest: string) => {
    setSelectedInterests(selectedInterests.filter((i) => i !== interest))
  }

  const addCustomSkill = () => {
    if (customSkill.trim()) {
      addSkill(customSkill.trim())
      setCustomSkill("")
    }
  }

  const addCustomInterest = () => {
    if (customInterest.trim()) {
      addInterest(customInterest.trim())
      setCustomInterest("")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
          <CardDescription>Join the community and start discovering open source talent</CardDescription>
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

          <Button onClick={handleGitHubSignUp} className="w-full" variant="outline" type="button">
            <Github className="mr-2 h-4 w-4" />
            Sign up with GitHub (Auto-fill profile)
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or fill manually</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="githubUsername">GitHub Username *</Label>
                  <Input
                    id="githubUsername"
                    type="text"
                    placeholder="Your GitHub username"
                    value={formData.githubUsername}
                    onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
                    required
                  />
                  <p className="text-xs text-gray-500">We'll sync your GitHub data automatically</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself and your coding journey..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner (0-2 years)</SelectItem>
                    <SelectItem value="Intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="Advanced">Advanced (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Skills & Technologies</h3>

              <div className="space-y-2">
                <Label>Select your skills</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                  {skillOptions.map((skill) => (
                    <Button
                      key={skill}
                      type="button"
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      size="sm"
                      className="justify-start text-xs h-8"
                      onClick={() => {
                        if (selectedSkills.includes(skill)) {
                          removeSkill(skill)
                        } else {
                          addSkill(skill)
                        }
                      }}
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add custom skill"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSkill())}
                />
                <Button type="button" onClick={addCustomSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {selectedSkills.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Skills ({selectedSkills.length})</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interests Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Interests</h3>

              <div className="space-y-2">
                <Label>Select your interests</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                  {interestOptions.map((interest) => (
                    <Button
                      key={interest}
                      type="button"
                      variant={selectedInterests.includes(interest) ? "default" : "outline"}
                      size="sm"
                      className="justify-start text-xs h-8"
                      onClick={() => {
                        if (selectedInterests.includes(interest)) {
                          removeInterest(interest)
                        } else {
                          addInterest(interest)
                        }
                      }}
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add custom interest"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomInterest())}
                />
                <Button type="button" onClick={addCustomInterest} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {selectedInterests.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Interests ({selectedInterests.length})</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedInterests.map((interest) => (
                      <Badge key={interest} variant="outline" className="flex items-center gap-1">
                        {interest}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeInterest(interest)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Social Links (Optional)</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitterHandle">Twitter Handle</Label>
                  <Input
                    id="twitterHandle"
                    type="text"
                    placeholder="@username"
                    value={formData.twitterHandle}
                    onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="+1234567890"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                />
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Privacy Settings</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="publicProfile"
                    checked={formData.publicProfile}
                    onCheckedChange={(checked) => setFormData({ ...formData, publicProfile: checked as boolean })}
                  />
                  <Label htmlFor="publicProfile" className="text-sm">
                    Make my profile public (visible to everyone)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isDiscoverable"
                    checked={formData.isDiscoverable}
                    onCheckedChange={(checked) => setFormData({ ...formData, isDiscoverable: checked as boolean })}
                  />
                  <Label htmlFor="isDiscoverable" className="text-sm">
                    Include me in talent discovery searches
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Create Account
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
