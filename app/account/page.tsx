"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Film, MessageSquare, Clock, Calendar, CheckCircle, XCircle } from "lucide-react"

export default function AccountPage() {
  const [currentPlan, setCurrentPlan] = useState("free") // 'free', 'pro', 'premium'

  const handleUpgrade = (plan: string) => {
    setCurrentPlan(plan)
    alert(`You have successfully upgraded to ${plan.toUpperCase()}!`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header for Account Page */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-purple-800 flex items-center gap-2">
              <Image src="/film-reel-icon.png" alt="FilmSlate Logo" width={32} height={32} className="rounded-md" />
              FilmSlate
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                Back to Home
              </Button>
            </Link>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/user-profile-illustration.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Account</h1>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-800 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="data-[state=active]:bg-purple-800 data-[state=active]:text-white"
            >
              Subscription
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-800 data-[state=active]:text-white">
              Settings
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-purple-800 data-[state=active]:text-white">
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card className="bg-gray-900 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome, FilmFanatic!</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your profile and subscription details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/user-profile-illustration.png" />
                    <AvatarFallback>FF</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl font-semibold">FilmFanatic</p>
                    <p className="text-gray-400">filmfanatic@example.com</p>
                    <Badge variant="secondary" className="mt-2 bg-purple-800/20 text-purple-300 border-purple-800/30">
                      {currentPlan === "free"
                        ? "Free Plan"
                        : currentPlan === "pro"
                          ? "FilmSlate Pro"
                          : "FilmSlate Premium"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <Film className="w-6 h-6 text-purple-400" />
                      <div>
                        <p className="text-lg font-semibold">120</p>
                        <p className="text-sm text-gray-400">Films Watched</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <MessageSquare className="w-6 h-6 text-purple-400" />
                      <div>
                        <p className="text-lg font-semibold">45</p>
                        <p className="text-sm text-gray-400">Reviews Written</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-purple-400" />
                      <div>
                        <p className="text-lg font-semibold">250 hrs</p>
                        <p className="text-sm text-gray-400">Total Watch Time</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center space-x-3 text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <p className="text-sm">Member since: January 2023</p>
                </div>

                {currentPlan === "free" && (
                  <Card className="bg-gray-800 border-purple-800 border-2">
                    <CardHeader>
                      <CardTitle className="text-xl text-purple-300">Upgrade Your Experience!</CardTitle>
                      <CardDescription className="text-gray-400">
                        Unlock exclusive features like 4K streaming, offline downloads, and early access to indie
                        premieres.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => setCurrentPlan("subscription")}
                        className="w-full bg-purple-800 hover:bg-purple-900"
                      >
                        Explore Plans
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="mt-6">
            <Card className="bg-gray-900 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Subscription Plans</CardTitle>
                <CardDescription className="text-gray-400">Choose the plan that's right for you.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Free Plan */}
                <Card
                  className={`bg-gray-800 border-gray-700 ${currentPlan === "free" ? "border-2 border-purple-800" : ""}`}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">Free</CardTitle>
                    <CardDescription className="text-gray-400">Basic access to FilmSlate</CardDescription>
                    <p className="text-4xl font-bold mt-4">
                      14 <span className="text-lg text-gray-400">days remaining</span>
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        30 Day free trial
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        SD Streaming
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Limited Catalog
                      </li>
                      <li className="flex items-center">
                        <XCircle className="w-4 h-4 mr-2 text-red-500" />
                        No Offline Downloads
                      </li>
                    </ul>
                    <Button
                      className="w-full mt-4"
                      variant={currentPlan === "free" ? "secondary" : "default"}
                      disabled={currentPlan === "free"}
                      onClick={() => handleUpgrade("free")}
                    >
                      {currentPlan === "free" ? "Current Plan" : "Select Plan"}
                    </Button>
                  </CardContent>
                </Card>

                {/* FilmSlate Pro Plan */}
                <Card className={`bg-gray-800 border-purple-800 border-2 relative`}>
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </Badge>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-purple-300">FilmSlate Pro</CardTitle>
                    <CardDescription className="text-gray-400">Enhanced streaming experience</CardDescription>
                    <p className="text-4xl font-bold mt-4">
                      $9.99<span className="text-lg text-gray-400">/month</span>
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        HD Streaming
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Full Catalog Access
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Offline Downloads
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Ad-Free Viewing
                      </li>
                    </ul>
                    <Button
                      className="w-full mt-4 bg-purple-800 hover:bg-purple-900"
                      disabled={currentPlan === "pro"}
                      onClick={() => handleUpgrade("pro")}
                    >
                      {currentPlan === "pro" ? "Current Plan" : "Upgrade to Pro"}
                    </Button>
                  </CardContent>
                </Card>

                {/* FilmSlate Premium Plan */}
                <Card
                  className={`bg-gray-800 border-gray-700 ${currentPlan === "premium" ? "border-2 border-purple-800" : ""}`}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">FilmSlate Premium</CardTitle>
                    <CardDescription className="text-gray-400">Ultimate cinematic experience</CardDescription>
                    <p className="text-4xl font-bold mt-4">
                      $14.99<span className="text-lg text-gray-400">/month</span>
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        4K UHD Streaming
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Full Catalog Access
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Offline Downloads
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Ad-Free Viewing
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Early Access to Premieres
                      </li>
                    </ul>
                    <Button
                      className="w-full mt-4"
                      variant={currentPlan === "premium" ? "secondary" : "default"}
                      disabled={currentPlan === "premium"}
                      onClick={() => handleUpgrade("premium")}
                    >
                      {currentPlan === "premium" ? "Current Plan" : "Upgrade to Premium"}
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="bg-gray-900 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Account Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your personal information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">
                    Username
                  </Label>
                  <Input id="username" defaultValue="FilmFanatic" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="filmfanatic@example.com"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    defaultValue="********"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Button variant="link" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                    Change Password
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Preferences</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="text-gray-300">
                      Email Notifications
                    </Label>
                    <Switch id="email-notifications" defaultChecked className="data-[state=checked]:bg-purple-800" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications" className="text-gray-300">
                      Push Notifications
                    </Label>
                    <Switch id="push-notifications" className="data-[state=checked]:bg-purple-800" />
                  </div>
                </div>

                <Button className="bg-purple-800 hover:bg-purple-900">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <Card className="bg-gray-900 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Billing Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your payment methods and view billing history.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Current Plan</h3>
                  <p className="text-gray-300">
                    You are currently on the{" "}
                    <span className="font-bold text-purple-300">
                      {currentPlan === "free"
                        ? "Free Plan"
                        : currentPlan === "pro"
                          ? "FilmSlate Pro"
                          : "FilmSlate Premium"}
                    </span>
                    .
                  </p>
                  {currentPlan !== "free" && (
                    <p className="text-gray-400 text-sm">Next billing date: August 15, 2024</p>
                  )}
                  <Button
                    variant="outline"
                    className="border-purple-800 text-purple-300 hover:bg-purple-800/20 bg-transparent"
                  >
                    {currentPlan === "free" ? "Upgrade Now" : "Manage Subscription"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Payment Method</h3>
                  <Card className="bg-gray-800 border-gray-700 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image src="/placeholder.svg?height=24&width=32&text=Visa" alt="Visa" width={32} height={24} />
                      <p className="text-gray-300">Visa ending in **** 1234</p>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                      Edit
                    </Button>
                  </Card>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                  >
                    Add New Payment Method
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Billing History</h3>
                  <p className="text-gray-400">No billing history available for the Free Plan.</p>
                  {currentPlan !== "free" && (
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex justify-between items-center">
                        <span>July 15, 2024 - FilmSlate Pro</span>
                        <Button variant="link" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                          Download Invoice
                        </Button>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>June 15, 2024 - FilmSlate Pro</span>
                        <Button variant="link" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                          Download Invoice
                        </Button>
                      </li>
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
