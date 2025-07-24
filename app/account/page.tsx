"use client"

import { useState } from "react"
import { ArrowLeft, Crown, Star, Clock, Calendar, Heart, CreditCard, Bell, User, Check, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const subscriptionPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for casual viewers",
    features: [
      "Limited film selection",
      "Standard definition streaming",
      "Ads between films",
      "Basic recommendations",
      "Community reviews",
    ],
    current: true,
    popular: false,
    buttonText: "Current Plan",
    buttonVariant: "outline" as const,
  },
  {
    name: "FilmSlate Pro",
    price: "$9.99",
    period: "month",
    description: "For serious indie film enthusiasts",
    features: [
      "Full film library access",
      "HD streaming quality",
      "Ad-free experience",
      "Advanced recommendations",
      "Early access to new releases",
      "Download for offline viewing",
      "Priority customer support",
    ],
    current: false,
    popular: true,
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
  },
  {
    name: "FilmSlate Premium",
    price: "$19.99",
    period: "month",
    description: "The ultimate indie film experience",
    features: [
      "Everything in Pro",
      "4K Ultra HD streaming",
      "Director's commentary tracks",
      "Behind-the-scenes content",
      "Exclusive filmmaker interviews",
      "Film festival live streams",
      "Curator's personal picks",
      "Advanced analytics dashboard",
    ],
    current: false,
    popular: false,
    buttonText: "Upgrade to Premium",
    buttonVariant: "default" as const,
  },
]

const userStats = {
  filmsWatched: 127,
  reviewsWritten: 23,
  watchTime: "156 hours",
  memberSince: "March 2023",
  favoriteGenres: ["Drama", "Documentary", "Art House"],
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [notifications, setNotifications] = useState({
    newReleases: true,
    recommendations: true,
    reviews: false,
    newsletter: true,
  })

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to FilmSlate</span>
            </Link>
          </div>
          <Link href="/" className="text-2xl font-bold text-purple-800 flex items-center gap-2">
            <Image src="/film-reel-icon.png" alt="FilmSlate Logo" width={32} height={32} className="rounded-md" />
            FilmSlate
          </Link>
          <div className="w-32" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Account</h1>
          <p className="text-gray-400">Manage your FilmSlate experience</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-800">
              Overview
            </TabsTrigger>
            <TabsTrigger value="subscription" className="data-[state=active]:bg-purple-800">
              Subscription
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-800">
              Settings
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-purple-800">
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>john.doe@email.com</CardDescription>
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 mt-2">
                    Free Member
                  </Badge>
                </CardHeader>
              </Card>

              {/* Stats Cards */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-800/20 rounded-lg">
                        <Star className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{userStats.filmsWatched}</p>
                        <p className="text-sm text-gray-400">Films Watched</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-600/20 rounded-lg">
                        <Heart className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{userStats.reviewsWritten}</p>
                        <p className="text-sm text-gray-400">Reviews Written</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-600/20 rounded-lg">
                        <Clock className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{userStats.watchTime}</p>
                        <p className="text-sm text-gray-400">Watch Time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-600/20 rounded-lg">
                        <Calendar className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">Mar 2023</p>
                        <p className="text-sm text-gray-400">Member Since</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Favorite Genres */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Favorite Genres</CardTitle>
                <CardDescription>Based on your viewing history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userStats.favoriteGenres.map((genre) => (
                    <Badge
                      key={genre}
                      variant="secondary"
                      className="bg-purple-800/20 text-purple-300 border-purple-800/30"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Unlock Premium Features</h3>
                    <p className="text-gray-300">
                      Get access to our full library, HD streaming, and exclusive content.
                    </p>
                  </div>
                  <Button onClick={() => setActiveTab("subscription")} className="bg-purple-800 hover:bg-purple-900">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-gray-400 mb-8">Select the perfect plan for your indie film journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative bg-gray-900 border-gray-800 ${plan.popular ? "ring-2 ring-purple-800" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-800 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-400">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.buttonVariant}
                      className={`w-full mt-6 ${plan.current ? "cursor-not-allowed" : ""} ${plan.buttonVariant === "default" ? "bg-purple-800 hover:bg-purple-900" : ""}`}
                      disabled={plan.current}
                    >
                      {plan.current && <Check className="w-4 h-4 mr-2" />}
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Information */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@email.com"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      placeholder="Tell us about your film preferences..."
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <Button className="bg-purple-800 hover:bg-purple-900">Save Changes</Button>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Releases</p>
                      <p className="text-sm text-gray-400">Get notified about new indie films</p>
                    </div>
                    <Switch
                      checked={notifications.newReleases}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newReleases: checked }))}
                    />
                  </div>
                  <Separator className="bg-gray-800" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Recommendations</p>
                      <p className="text-sm text-gray-400">Personalized film suggestions</p>
                    </div>
                    <Switch
                      checked={notifications.recommendations}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, recommendations: checked }))}
                    />
                  </div>
                  <Separator className="bg-gray-800" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Review Responses</p>
                      <p className="text-sm text-gray-400">When someone responds to your reviews</p>
                    </div>
                    <Switch
                      checked={notifications.reviews}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, reviews: checked }))}
                    />
                  </div>
                  <Separator className="bg-gray-800" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-gray-400">Weekly indie film newsletter</p>
                    </div>
                    <Switch
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newsletter: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Subscription */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="w-5 h-5" />
                    <span>Current Subscription</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Plan</span>
                    <Badge variant="secondary" className="bg-gray-800">
                      Free
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next Billing</span>
                    <span className="text-gray-400">N/A</span>
                  </div>
                  <Separator className="bg-gray-800" />
                  <Button
                    onClick={() => setActiveTab("subscription")}
                    className="w-full bg-purple-800 hover:bg-purple-900"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Payment Method</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No payment method on file</p>
                    <p className="text-sm text-gray-500 mt-2">Add a payment method to upgrade your plan</p>
                  </div>
                  <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800 bg-transparent">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Billing History */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Your payment history and invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-400">No billing history available</p>
                  <p className="text-sm text-gray-500 mt-2">Your payment history will appear here once you upgrade</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
