"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../ui/index/navbar/navbar.module.css";

export default function Navbar() {
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false); // mobile menu
  const router = useRouter();

  // Lấy dữ liệu user từ localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("name");
      const userRole = localStorage.getItem("role");
      setUserName(name);
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("sessionId");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
    }
    setUserName(null);
    setRole(null);
    router.push("/login");
  };

  return (
    <nav className="relative z-20 w-full px-6 py-4 flex items-center justify-between text-white absolute top-0 left-0">
      <div className="text-2xl font-bold flex items-center gap-2">
        <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="Logo" />
          </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 text-lg">
        <li className="cursor-pointer hover:text-blue-300">Find Jobs</li>
        <li className="cursor-pointer hover:text-blue-300">Companies</li>
        <li className="cursor-pointer hover:text-blue-300">Salaries</li>
      </ul>

      {/* Desktop User / Login */}
      <div className="hidden md:flex items-center gap-4 relative">
        {userName ? (
          <div className="relative group">
            {/* Avatar chữ cái đầu */}
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer">
              {userName.charAt(0).toUpperCase()}
            </div>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200">
              {role === "jobseeker" && (
                <Link href="/jobseeker/profile">
                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</p>
                </Link>
              )}
              {role === "employer" && (
                <Link href="/employer/dashboard">
                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Dashboard</p>
                </Link>
              )}
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <Link href="/login">
            <button className="hover:text-blue-300">Log In</button>
          </Link>
        )}
      </div>

      {/* Mobile Button */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-3xl">
        {open ? "✖" : "☰"}
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white/95 text-black md:hidden px-6 py-4 space-y-4 rounded-b-xl shadow-lg">
          <p className="hover:text-blue-600">Find Jobs</p>
          <p className="hover:text-blue-600">Companies</p>
          <p className="hover:text-blue-600">Salaries</p>
          <hr />
          {userName ? (
            <>
              {role === "jobseeker" && (
                <Link href="/profile">
                  <p className="hover:text-blue-600 cursor-pointer">Profile</p>
                </Link>
              )}
              {role === "employer" && (
                <Link href="/employer/dashboard">
                  <p className="hover:text-blue-600 cursor-pointer">Dashboard</p>
                </Link>
              )}
              <p className="hover:text-blue-600 cursor-pointer" onClick={handleLogout}>
                Logout
              </p>
            </>
          ) : (
            <Link href="/login">
              <p className="hover:text-blue-600 cursor-pointer">Log In</p>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
