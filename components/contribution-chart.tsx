"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", commits: 45 },
  { month: "Feb", commits: 52 },
  { month: "Mar", commits: 38 },
  { month: "Apr", commits: 67 },
  { month: "May", commits: 73 },
  { month: "Jun", commits: 89 },
  { month: "Jul", commits: 95 },
  { month: "Aug", commits: 78 },
  { month: "Sep", commits: 82 },
  { month: "Oct", commits: 91 },
  { month: "Nov", commits: 87 },
  { month: "Dec", commits: 94 },
]

export function ContributionChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="commits" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
