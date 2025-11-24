"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";

export default function Header() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // ✅ Lấy dữ liệu người dùng từ localStorage
  useEffect(() => {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    if (name && role) setUser({ name, role });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    router.push("/");
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 200);
  };

  // -------------------- Mobile menu --------------------
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // -------------------- Search + Filter --------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append("q", searchQuery.trim());
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedLocation) params.append("location", selectedLocation);
    if (selectedSalary) params.append("salary", selectedSalary);
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo + Hamburger */}
        <div className={styles.leftSection}>
          <div className={styles.hamburger} onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>

        {/* Search + Filter */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Tìm kiếm việc làm..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FaSearch className={styles.searchIcon} onClick={handleSearch} />

          <select
            className={styles.filterSelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Ngành nghề</option>
            <option value="it">Công nghệ thông tin</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Tài chính / Kế toán</option>
            <option value="sales">Bán hàng</option>
          </select>

          <select
            className={styles.filterSelect}
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Khu vực</option>
            <option value="hanoi">Hà Nội</option>
            <option value="hcm">TP. Hồ Chí Minh</option>
            <option value="danang">Đà Nẵng</option>
          </select>

          <select
            className={styles.filterSelect}
            value={selectedSalary}
            onChange={(e) => setSelectedSalary(e.target.value)}
          >
            <option value="">Mức lương</option>
            <option value="under10">Dưới 10 triệu</option>
            <option value="10-20">10 - 20 triệu</option>
            <option value="over20">Trên 20 triệu</option>
          </select>
        </div>

        {/* User / Login */}
        <div className={styles.loginSection}>
          {user ? (
            <div
              className={styles.userWrapper}
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className={styles.userInitial}>{getInitial(user.name)}</span>
              {isDropdownOpen && (
                <ul className={styles.dropdown}>
                  <li>
                    <Link
                      href={
                        user.role === "employer"
                          ? "/employer/dashboard"
                          : "/jobseeker/profile"
                      }
                      className={styles.dropdownItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {user.role === "employer" ? "Dashboard" : "Profile"}
                    </Link>
                  </li>
                  <li>
                    <button className={styles.dropdownItem} onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link href="/login" className={styles.loginButton}>
              <FaUser className={styles.icon} />
            </Link>
          )}
        </div>

        {/* Sidebar mobile */}
        <div className={`${styles.sidebar} ${isMenuOpen ? styles.open : ""}`}>
          <div className={styles.sidebarHeader}>
            <Link href="/" className={styles.logo}>
              <img src="/logo.png" alt="Logo" />
            </Link>
            <FaTimes className={styles.closeIcon} onClick={toggleMenu} />
          </div>
          <ul className={styles.sidebarList}>
            <li>
              <Link href="/" onClick={toggleMenu} className={styles.sidebarLink}>
                Trang chủ
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    href={
                      user.role === "employer"
                        ? "/employer/dashboard"
                        : "/jobseeker/profile"
                    }
                    onClick={toggleMenu}
                    className={styles.sidebarLink}
                  >
                    {user.role === "employer" ? "Dashboard" : "Profile"}
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className={styles.sidebarLink}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" onClick={toggleMenu} className={styles.sidebarLink}>
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <Link href="/register" onClick={toggleMenu} className={styles.sidebarLink}>
                    Đăng ký
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
      </div>
    </header>
  );
}
