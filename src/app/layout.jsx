// app/layout.js
import "./ui/globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "JobHunt - Nền tảng tìm kiếm việc làm",
  description: "Nền tảng tìm kiếm việc làm và kết nối ứng viên - nhà tuyển dụng",
  icons: {
    icon: "/vnen.icon",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
