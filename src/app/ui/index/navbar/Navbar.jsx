// app/layout/navbar/Navbar.jsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css"; // Đảm bảo đường dẫn CSS đúng
import Link from "next/link";
import axios from "axios";

export default function Navbar() {


    // Hàm chuyển đổi tên thành kebab-case (không đổi)
    const toKebabCase = (str) => {
        if (!str) return ''; // Thêm kiểm tra null/undefined
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };



    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                {/* Có thể thêm link Trang chủ ở đây nếu muốn */}
                <li className={styles.navItem}>
                    <Link href="/" className={styles.navLink}>
                        Trang chủ
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/" className={styles.navLink}>
                        Hot Job
                    </Link>
                </li>
                
            </ul>
        </nav>
    );
}