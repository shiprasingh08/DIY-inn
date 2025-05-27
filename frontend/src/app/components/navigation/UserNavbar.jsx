'use client'

import React, { useState } from "react"
import { Search, Heart, ShoppingBag, User, Home, Info, Phone, Package, ShoppingCart, Eye, Settings } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"

const navigationItems = [
  { title: "Home", url: "/user", icon: Home },
  { title: "About Us", url: "/user/About Us", icon: Info },
  { title: "Contact", url: "/user/Contact", icon: Phone },
  { title: "Browse Kits", url: "/user/Browse Kits", icon: Package },
]

const userItems = [
  { title: "Favorites", url: "/user/favorites", icon: Heart },
  { title: "Shopping Cart", url: "/user/cart", icon: ShoppingBag },
  { title: "Profile", url: "/user/profile", icon: User },
]

const orderItems = [
  { title: "Cart System", url: "/cart-system", icon: ShoppingCart },
  { title: "View Orders", url: "/view-order", icon: Eye },
  { title: "Manage Orders", url: "/user/manage-order", icon: Settings },
]

export default function UserNavbar(props) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  return (
    <SidebarProvider>
      <Sidebar {...props} className="border-r border-pink-200 bg-gradient-to-b from-black to-gray-900">
        <SidebarHeader className="border-b border-pink-200/20 bg-black/50">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500">
            <Package className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-pink-400">Nest&Needle</span>
            <span className="text-xs text-pink-300/70">DIY Craft Kits</span>
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="px-4 pb-3">
          <div className="relative">
            <Label htmlFor="search" className="sr-only">
              Search DIYs
            </Label>
            <SidebarInput
              id="search"
              placeholder="Search DIYs..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-8 bg-gray-800 border-pink-300/20 text-white placeholder-pink-300/50 focus:border-pink-400 focus:ring-pink-400"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-300/50" />
          </div>
        </form>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-gray-900 to-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-pink-300 font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-white hover:bg-pink-900/30 hover:text-pink-300 data-[active=true]:bg-pink-500 data-[active=true]:text-white"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-pink-300 font-semibold">My Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-white hover:bg-pink-900/30 hover:text-pink-300 data-[active=true]:bg-pink-500 data-[active=true]:text-white"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-pink-300 font-semibold">Order Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {orderItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-white hover:bg-pink-900/30 hover:text-pink-300 data-[active=true]:bg-pink-500 data-[active=true]:text-white"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
    </SidebarProvider>
  )
}
