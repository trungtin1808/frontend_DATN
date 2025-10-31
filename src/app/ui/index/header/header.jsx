"use client";
"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  //const [userName, setUserName] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  // 👇 Giả lập người dùng đã đăng nhập
  const [userName, setUserName] = useState("Nguyễn Phương");

  // 👇 Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // 👇 Hàm lấy chữ cái đầu tên
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  // 👇 Hàm logout (test)
  const handleLogout = () => {
    alert("Đã logout (giả lập)");
    setUserName("");
  };

  // 👇 Đóng dropdown nếu click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) params.append("q", searchQuery.trim());
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedLocation) params.append("location", selectedLocation);
    if (selectedSalary) params.append("salary", selectedSalary);

    router.push(`/search?${params.toString()}`);
    setSearchQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
  <header className={styles.header}>
    <div className={styles.container}>
      {/* Logo + Menu */}
      <div className={styles.leftSection}>
        <div className={styles.hamburger} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <Link href="/" className={styles.logo}>
          <img src="/logo.jpg" alt="Logo" />
        </Link>
      </div>

      {/* Thanh tìm kiếm việc làm + Bộ lọc */}
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

      {/* Đăng nhập */}
      <div className={styles.loginSection}>
        {userName ? (
          <div className={styles.userWrapper} ref={dropdownRef}>
            <span
              className={styles.userInitial}
              onClick={toggleDropdown}
              style={{ cursor: "pointer" }}
            >
              {getInitial(userName)}
            </span>
            {isDropdownOpen && (
              <ul className={`${styles.dropdown} ${styles.open}`}>
                <li>
                  <Link
                    href="/profile"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
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

      {/* Sidebar (cho mobile) */}
      <div className={`${styles.sidebar} ${isMenuOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" onClick={toggleMenu}>
            <img src="/logo.jpg" alt="Logo" className={styles.sidebarLogo} />
          </Link>
          <FaTimes className={styles.closeIcon} onClick={toggleMenu} />
        </div>
        <ul className={styles.sidebarList}>
          <li>
            <Link href="/" onClick={toggleMenu} className={styles.sidebarLink}>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link href="/login" onClick={toggleMenu} className={styles.sidebarLink}>
              Đăng nhập
            </Link>
          </li>
        </ul>
      </div>

      {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </div>
  </header>
);
}
