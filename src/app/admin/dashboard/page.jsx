"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/admin/adminDashboard.module.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [pendingJobs, setPendingJobs] = useState([]);

  // Fake data
  useEffect(() => {
    const fakeUsers = [
      {
        id: 1,
        name: "Nguyễn Việt Phương",
        email: "phuong@example.com",
        role: "Ứng viên",
        status: "Hoạt động",
        created_at: "2025-10-01",
      },
      {
        id: 2,
        name: "Công ty ABC",
        email: "abc@company.com",
        role: "Nhà tuyển dụng",
        status: "Hoạt động",
        created_at: "2025-09-18",
      },
      {
        id: 3,
        name: "Admin",
        email: "admin@example.com",
        role: "Admin",
        status: "Hoạt động",
        created_at: "2025-09-01",
      },
    ];
    setUsers(fakeUsers);

    const fakeJobs = [
      {
        id: 101,
        title: "Frontend Developer",
        company: "Công ty ABC",
        status: "Chờ duyệt",
        date: "2025-10-25",
      },
      {
        id: 102,
        title: "Backend Engineer",
        company: "Công ty XYZ",
        status: "Chờ duyệt",
        date: "2025-10-22",
      },
    ];
    setPendingJobs(fakeJobs);
  }, []);

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
      alert(` Đã duyệt bài đăng #${id}`);
    } else if (action === "delete") {
      setPendingJobs((prev) => prev.filter((j) => j.id !== id));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Bảng điều khiển Admin</h1>

      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder=" Tìm kiếm theo tên hoặc email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className={styles.select}
        >
          <option value="all">Tất cả vai trò</option>
          <option value="Admin">Admin</option>
          <option value="Ứng viên">Ứng viên</option>
          <option value="Nhà tuyển dụng">Nhà tuyển dụng</option>
        </select>

        <button
          className={styles.jobButton}
          onClick={() => setShowJobModal(true)}
        >
           Danh sách bài viết tuyển dụng
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`${styles.roleBadge} ${
                      user.role === "Admin"
                        ? styles.admin
                        : user.role === "Nhà tuyển dụng"
                        ? styles.employer
                        : styles.candidate
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`${styles.status} ${
                      user.status === "Hoạt động"
                        ? styles.active
                        : styles.blocked
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>{user.created_at}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user)}
                    className={styles.editBtn}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`${styles.actionBtn} ${
                      user.status === "Hoạt động"
                        ? styles.blockBtn
                        : styles.unblockBtn
                    }`}
                  >
                    {user.status === "Hoạt động" ? "Khóa" : "Mở"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className={styles.noData}>
                Không tìm thấy người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal chỉnh sửa */}
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Chỉnh sửa tài khoản</h3>
            <label>Tên</label>
            <input
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />
            <label>Email</label>
            <input
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />
            <label>Vai trò</label>
            <select
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
            >
              <option>Admin</option>
              <option>Ứng viên</option>
              <option>Nhà tuyển dụng</option>
            </select>
            <label>Trạng thái</label>
            <select
              value={selectedUser.status}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, status: e.target.value })
              }
            >
              <option>Hoạt động</option>
              <option>Khóa</option>
            </select>

            <div className={styles.modalActions}>
              <button onClick={handleSaveEdit}>Lưu</button>
              <button onClick={() => setShowEditModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/*  Modal duyệt bài */}
      {showJobModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalLarge}>
            <h3>Bài tuyển dụng chờ duyệt</h3>
            {pendingJobs.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Công ty</th>
                    <th>Ngày đăng</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingJobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.date}</td>
                      <td>{job.status}</td>
                      <td>
                        <button
                          onClick={() => handleJobAction(job.id, "approve")}
                          className={styles.approveBtn}
                        >
                          Duyệt
                        </button>
                        <button
                          onClick={() => handleJobAction(job.id, "delete")}
                          className={styles.deleteBtn}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không có bài tuyển dụng nào chờ duyệt.</p>
            )}
            <div className={styles.modalActions}>
              <button onClick={() => setShowJobModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
