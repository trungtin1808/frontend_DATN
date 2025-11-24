"use client"

import { Menu, Bell, User } from "lucide-react"
import Style from "../../ui/admin/topNavbar.module.css"


export default function TopNavbar({ toggleSidebar }) {
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      {/* Left - Menu Toggle */}
      <button onClick={toggleSidebar}><Menu size={20} /></button>

      {/* Right - User Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <button variant="ghost" size="icon"><Bell size={20} /></button>
        <button variant="ghost" size="icon"><User size={20} /></button>
      </div>
    </div>
  )
}