"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Footer() {
   
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API;

    // Hàm chuyển tên danh mục thành slug
    const toSlug = (name) => {
        return name
            .toLowerCase()
            .normalize("NFD") // Chuyển ký tự có dấu thành không dấu
            .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
            .replace(/[^a-z0-9\s-]/g, "") // Xóa ký tự đặc biệt
            .trim()
            .replace(/\s+/g, "-"); // Thay khoảng trắng bằng dấu gạch ngang
    };

    useEffect(() => {
        // Ví dụ gọi API để lấy danh mục công việc
    }, [apiUrl]);

    return (
        <footer className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cột 1: Thông tin cửa hàng */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Job Seek</h3>
                        <p className="text-sm">
                            Giúp bạn tìm kiếm công việc mơ ước một cách dễ dàng và nhanh chóng.
                        </p>
                    </div>

                    {/* Cột 2: Công ty Nổi Bật */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Công ty Nổi Bật</h3>
                    </div>

                    {/* Cột 3: Liên hệ */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Liên Hệ</h3>
                        <p className="text-sm">Email: nguyenvietphuong@gmail.com</p>
                        <p className="text-sm">Hotline: 0123 456 789</p>
                    </div>
                </div>

                {/* Bản quyền */}
                <div className="mt-8 pt-8 border-t border-white/20 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Job Seek. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}