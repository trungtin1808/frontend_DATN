import React from "react";

export default function Footer() {
  return (
        <footer className="bg-gradient-to-r from-gray-600 to-gray-400 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cột 1: Thông tin cửa hàng */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Job Hunt</h3>
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
                        © {new Date().getFullYear()} Job Hunt. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
