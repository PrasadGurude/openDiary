"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

interface SkillsRadarProps {
  skills: string[]
}

export function SkillsRadar({ skills }: SkillsRadarProps) {
  const data = skills.slice(0, 6).map((skill, index) => ({
    skill,
    value: Math.max(60, 100 - index * 10), // Demo values
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar name="Skills" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
