"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function SecuritySettings() {
  const { toast } = useToast()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    })
  }

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled)
    toast({
      title: twoFactorEnabled ? "Two-factor authentication disabled" : "Two-factor authentication enabled",
      description: twoFactorEnabled
        ? "Two-factor authentication has been disabled for your account."
        : "Two-factor authentication has been enabled for your account.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" placeholder="••••••••" />
          </div>
          <Button type="submit">Update Password</Button>
        </form>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Enhance your account security</p>
            <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
          </div>
          <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Login Sessions</h3>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Current Session</p>
                <p className="text-sm text-muted-foreground">Windows 11 • Chrome • New York, USA</p>
                <p className="text-xs text-muted-foreground mt-1">Started 2 hours ago</p>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Active
              </Badge>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Mobile App</p>
                <p className="text-sm text-muted-foreground">iOS 16 • iPhone • New York, USA</p>
                <p className="text-xs text-muted-foreground mt-1">Last active 1 day ago</p>
              </div>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                Revoke
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Account Security</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Email Verification</p>
              <p className="text-sm text-muted-foreground">Verify your email address for account recovery</p>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              Verified
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Phone Verification</p>
              <p className="text-sm text-muted-foreground">Verify your phone number for account recovery</p>
            </div>
            <Button variant="outline" size="sm">
              Verify
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

