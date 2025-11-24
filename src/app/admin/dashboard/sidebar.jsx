"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, Users, FileText, Settings, BarChart3, LogOut } from "lucide-react"
import styles from "../../ui/admin/sidebar.module.css"

const menuItems = [
  { href: "/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/jobs", label: "Job Listings", icon: Briefcase },
  { href: "/dashboard/applications", label: "Applications", icon: FileText },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const handleLogout = () => {
  if (typeof window !== "undefined") {
    localStorage.clear()
    window.location.href = "/login"
  }
}

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          !isOpen ? styles.hidden : ""
        } lg:translate-x-0 lg:relative`}
      >
        {/* Logo */}
        <div className={styles.logo}>JobHunt</div>

        {/* Menu */}
        <nav className={styles.menu}>
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/")

            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.menuItem} ${
                  isActive ? styles.active : styles.inactive
                }`}
              >
                <Icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout menu item */}
        <button
          onClick={handleLogout}
          className={`${styles.menuItem} ${styles.logoutButton}`}
        >
          <LogOut size={20} />
          {isOpen && <span>Đăng xuất</span>}
        </button>
      </aside>
    </>
  )
}
