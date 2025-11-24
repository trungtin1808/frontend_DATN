"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../ui/jobseeker/dashboard.module.css";

import AppliedJobs from "./AppliedJobs";
import CvManager from "./CvManager";
import ProfileInfo from "./ProfileInfo";
import { 
  LogOut, 
  User, 
  Briefcase, 
  FileText, 
  UserCircle 
} from "lucide-react";

export default function JobseekerDashboard() {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_API;
  const [activeTab, setActiveTab] = useState("appliedJobs");

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [cvList, setCvList] = useState([]);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
  });

  // Mock data
  useEffect(() => {
    setAppliedJobs([
      { id: 1, title: "Frontend Developer", company: "TechCorp", status: "Đang xét duyệt", applied_at: "2025-10-20" },
      { id: 2, title: "UI/UX Designer", company: "Designify", status: "Đã phỏng vấn", applied_at: "2025-10-25" },
    ]);

    setCvList([
      { id: 1, title: "CV - Nguyễn Văn A", updated_at: "2025-10-15" },
      { id: 2, title: "CV - Developer", updated_at: "2025-11-01" },
    ]);

    setProfile({
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phone: "0123456789",
      experience: "2 năm kinh nghiệm Frontend React",
    });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const menuItems = [
    { 
      key: "appliedJobs", 
      label: "Công việc đã ứng tuyển", 
      icon: Briefcase 
    },
    { 
      key: "cvManager", 
      label: "Quản lý CV", 
      icon: FileText 
    },
    { 
      key: "profile", 
      label: "Thông tin cá nhân", 
      icon: UserCircle 
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          {/* Avatar với icon User */}
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <User size={24} />
            </div>
            <span className={styles.userName}>{profile.name}</span>
          </div>

          {/* Navigation Menu */}
          <nav className={styles.navMenu}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`${styles.menuItem} ${
                    activeTab === item.key ? styles.active : ""
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button - Đặt ở dưới cùng */}
          <div className={styles.logoutSection}>
            <button
              onClick={handleLogout}
              className={`${styles.menuItem} ${styles.logoutButton}`}
            >
              <LogOut size={20} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        {activeTab === "profile" && (
          <ProfileInfo profile={profile} setProfile={setProfile} />
        )}
        {activeTab === "appliedJobs" && (
          <AppliedJobs appliedJobs={appliedJobs} />
        )}
        {activeTab === "cvManager" && (
          <CvManager cvList={cvList} setCvList={setCvList} />
        )}
      </main>
    </div>
  );
}