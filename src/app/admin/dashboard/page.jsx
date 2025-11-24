"use client";

import React, { useState, useEffect } from "react";
import styles from "../../ui/admin/adminDashboard.module.css";
import { mockJobs, mockApplications, mockUsers } from "../libs/mock-data";
import RecentActivities from "./recent-activities";

export default function AdminDashboard() {

  // giữ nguyên toàn bộ state + hàm logout
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [pendingJobs, setPendingJobs] = useState([]);


  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Hoạt động" ? "Khóa" : "Hoạt động" }
          : u
      )
    );
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? selectedUser : u))
    );
    setShowEditModal(false);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === "all" || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleJobAction = (id, action) => {
    if (action === "approve") {
      alert(`Đã duyệt bài đăng #${id}`);
    } else if (action === "delete") {
      setPendingJobs((prev) => prev.filter((j) => j.id !== id));
    }
  };

  const stats = [
    { label: "Total Jobs", value: mockJobs.length.toString()},
    { label: "Applications", value: mockApplications.length.toString()},
    { label: "Total Users", value: mockUsers.length.toString()},
    {
      label: "Active Postings",
      value: mockJobs.filter((j) => j.status === "active").length.toString(),
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back to JobHunt Admin
        </p>
      </div>

      {/* Recent Activities */}
      <div className={styles.recentWrapper}>
        <RecentActivities />
      </div>

    </div>
  );
}
