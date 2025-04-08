"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function StockpilesPage() {
  const [activeTab, setActiveTab] = useState("map")

  // Data for nuclear warhead counts (approximate 2023 figures)
  const stockpilesData = [
    { country: "Russia", warheads: 5977, color: "#ef4444" },
    { country: "United States", warheads: 5428, color: "#3b82f6" },
    { country: "China", warheads: 350, color: "#f59e0b" },
    { country: "France", warheads: 290, color: "#0ea5e9" },
    { country: "United Kingdom", warheads: 225, color: "#10b981" },
    { country: "Pakistan", warheads: 165, color: "#8b5cf6" },
    { country: "India", warheads: 160, color: "#f43f5e" },
    { country: "Israel", warheads: 90, color: "#14b8a6" },
    { country: "North Korea", warheads: 30, color: "#ec4899" },
  ]

  // Data for historical trends
  const historicalData = [
    { year: 1985, warheads: 70300 },
    { year: 1990, warheads: 59100 },
    { year: 1995, warheads: 39700 },
    { year: 2000, warheads: 31400 },
    { year: 2005, warheads: 26100 },
    { year: 2010, warheads: 22600 },
    { year: 2015, warheads: 15850 },
    { year: 2020, warheads: 13400 },
    { year: 2023, warheads: 12700 },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Global Nuclear Stockpiles"
        description="Tracking the world's nuclear arsenals and the countries that possess them."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-12">
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="map">World Map</TabsTrigger>
          <TabsTrigger value="data">Current Data</TabsTrigger>
          <TabsTrigger value="trends">Historical Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Nuclear Weapons by Country</CardTitle>
              <CardDescription>Interactive map showing nuclear weapon stockpiles worldwide</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px]">
              <div className="relative h-full w-full rounded-lg border border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">
                    [Interactive map would be implemented here with a mapping library like Mapbox or Leaflet]
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Current Nuclear Arsenals</CardTitle>
                <CardDescription>Estimated number of nuclear warheads by country (2023)</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stockpilesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="warheads" name="Nuclear Warheads">
                      {stockpilesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribution of Nuclear Weapons</CardTitle>
                <CardDescription>Percentage of global nuclear arsenal by country</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stockpilesData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="warheads"
                      nameKey="country"
                      label={({ country, percent }) => `${country}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {stockpilesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Nuclear Weapons Trends</CardTitle>
              <CardDescription>Global nuclear arsenal size from 1985 to present</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={historicalData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="warheads" name="Global Nuclear Warheads" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
