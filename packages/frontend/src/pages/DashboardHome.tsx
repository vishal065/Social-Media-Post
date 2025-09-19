import React from "react";

import { MessageSquare, PlusSquare, Share2, TrendingUp, Users } from "lucide-react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const engagementData = [
  { name: "Mon", posts: 4, engagement: 120 },
  { name: "Tue", posts: 6, engagement: 180 },
  { name: "Wed", posts: 8, engagement: 240 },
  { name: "Thu", posts: 5, engagement: 150 },
  { name: "Fri", posts: 7, engagement: 210 },
  { name: "Sat", posts: 3, engagement: 90 },
  { name: "Sun", posts: 4, engagement: 130 },
];

const platformData = [
  { name: "Twitter", value: 35, color: "#1DA1F2" },
  { name: "LinkedIn", value: 30, color: "#0077B5" },
  { name: "Instagram", value: 25, color: "#E4405F" },
  { name: "Facebook", value: 10, color: "#1877F2" },
];

export function DashboardHome() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your content performance overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,347</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+24</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+18%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Chart */}
        <Card className="lg:col-span-2 rounded-2xl">
          <CardHeader>
            <CardTitle>Weekly Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="engagement" fill="hsl(var(--primary))" radius={8} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {platformData.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    />
                    <span className="text-sm">{platform.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{platform.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Published to Twitter, LinkedIn",
                  time: "2 hours ago",
                  status: "success",
                },
                {
                  action: "Generated AI content for tech announcement",
                  time: "4 hours ago",
                  status: "success",
                },
                { action: "Failed to publish to Instagram", time: "6 hours ago", status: "error" },
                { action: "Published to all platforms", time: "1 day ago", status: "success" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-xl"
                >
                  <div>
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge
                    variant={activity.status === "success" ? "default" : "destructive"}
                    className="rounded-full"
                  >
                    {activity.status === "success" ? "Success" : "Failed"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full rounded-2xl justify-start">
              <PlusSquare className="h-4 w-4 mr-2" />
              Create New Post
            </Button>
            <Button variant="outline" className="w-full rounded-2xl justify-start">
              View Analytics
            </Button>
            <Button variant="outline" className="w-full rounded-2xl justify-start">
              Schedule Posts
            </Button>
            <Button variant="outline" className="w-full rounded-2xl justify-start">
              Manage Accounts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
