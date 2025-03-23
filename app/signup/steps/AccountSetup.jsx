import {
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
  } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function AccountSetup({ formData, handleChange }) {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
        <CardDescription>
          Enter your email and password to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
    </>
  )
}