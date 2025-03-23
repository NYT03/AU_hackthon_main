"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { BarChart3, Home, Menu, MessageSquare, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Portfolio Analysis",
    href: "/portfolio-analysis",
    icon: BarChart3,
  },
  {
    name: "Chatbot",
    href: "/chatbot",
    icon: MessageSquare,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null) // Placeholder for profile picture

  useEffect(() => {
    const sessionKey = localStorage.getItem('sessionKey')
    if (sessionKey) {
      setIsLoggedIn(true)
      // Optionally, fetch user profile data to get the profile picture
      // Example: setProfilePicture(fetchedProfilePicture)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-4 py-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-xl text-primary"
                  onClick={() => setOpen(false)}
                >
                  <BarChart3 className="h-6 w-6" />
                  <span>PortfolioMaster</span>
                </Link>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                        pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <BarChart3 className="h-6 w-6" />
            <span className="hidden md:inline-block">PortfolioMaster</span>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <img src={profilePicture || "/default-profile.png"} alt="Profile" className="h-8 w-8 rounded-full" />
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

