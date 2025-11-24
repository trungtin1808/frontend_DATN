"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/app/ui/employer/dashboard.module.css";

export default function EmployerDashboard() {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_API;
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    description: "",
    website: "",
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // ✅ Lấy danh sách bài đăng
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/employer/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Lỗi tải danh sách bài viết:", err);
    }
  };

  // ✅ Lấy danh sách ứng viên cho 1 bài viết
  const fetchApplicants = async (jobId) => {
    try {
      const res = await axios.get(`${apiUrl}/employer/jobs/${jobId}/applicants`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplicants(res.data);
      setSelectedJob(jobId);
      setActiveTab("applicants");
    } catch (err) {
      console.error("Lỗi tải ứng viên:", err);
    }
  };

  // ✅ Thêm bài viết mới
  const handleAddJob = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await axios.post(`${apiUrl}/employer/jobs`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Thêm bài viết thành công!");
      fetchPosts();
      setActiveTab("posts");
    } catch (err) {
      alert("Lỗi khi thêm bài viết.");
    }
  };

  // ✅ Cập nhật thông tin công ty
  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/employer/company`, companyInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cập nhật thành công!");
    } catch (err) {
      alert("Cập nhật thất bại.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <h3>Nhà tuyển dụng</h3>
        <button onClick={() => setActiveTab("posts")}>Danh sách Bài đăng</button>
        <button onClick={() => setActiveTab("addJob")}> Thêm bài viết</button>
        <button onClick={() => setActiveTab("company")}> Thông tin công ty</button>
        <button
            onClick={() => {
                localStorage.clear();
                window.location.href = "/";
            }}
            className={styles.logoutButton}
            >
                 Logout
        </button>
      </aside>

      <main className={styles.main}>
        {/* --- Danh sách bài đăng --- */}
        {activeTab === "posts" && (
          <div>
            <h2>Danh sách bài đăng</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Ngày đăng</th>
                  <th>Trạng thái</th>
                  <th>Ứng viên</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{new Date(job.created_at).toLocaleDateString()}</td>
                    <td>{job.status}</td>
                    <td>
                      <button onClick={() => fetchApplicants(job.id)}>Xem</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- Danh sách ứng viên --- */}
        {activeTab === "applicants" && (
          <div>
            <h2>Ứng viên cho bài viết #{selectedJob}</h2>
            <button onClick={() => setActiveTab("posts")}>⬅ Quay lại</button>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Kinh nghiệm</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((a) => (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.email}</td>
                    <td>{a.experience}</td>
                    <td>{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- Thêm bài viết --- */}
        {activeTab === "addJob" && (
          <div>
            <h2>Thêm bài viết mới</h2>
            <form onSubmit={handleAddJob} className={styles.form}>
              <input name="title" placeholder="Tiêu đề công việc" required />
              <textarea name="description" placeholder="Mô tả" required />
              <input name="salary" placeholder="Mức lương" />
              <input name="location" placeholder="Địa điểm" />
              <button type="submit">Thêm bài</button>
            </form>
          </div>
        )}

        {/* --- Chỉnh sửa thông tin công ty --- */}
        {activeTab === "company" && (
          <div>
            <h2>Thông tin công ty</h2>
            <form onSubmit={handleUpdateCompany} className={styles.form}>
              <input
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                placeholder="Tên công ty"
              />
              <input
                value={companyInfo.website}
                onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                placeholder="Website"
              />
              <textarea
                value={companyInfo.description}
                onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                placeholder="Mô tả công ty"
              />
              <button type="submit">Lưu thay đổi</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
