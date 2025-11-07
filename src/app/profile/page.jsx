"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/ui/profile/profile.module.css";

export default function ProfileDashboard() {
  const [user, setUser] = useState(null);
  const [missing, setMissing] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("cv"); // 🟢 Tab hiện tại
  const [formData, setFormData] = useState({
    phone: "",
    city: "",
    skills: "",
    experience: "",
    position: "",
  });

  useEffect(() => {
    const fakeUser = {
      name: "Nguyễn Việt Phương",
      email: "phuong@example.com",
      phone: "",
      city: "",
      skills: [],
      experience: "",
      position: "",
      avatar: "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/523366882_2702716550088192_736062811198131684_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=W2Kaj-Jp5WcQ7kNvwGNqV2S&_nc_oc=AdkWcgbRgktUy6wf9UX9oten7pNUiNhGhRhZ_rfeNd8MUZzFBBhTX9cdfeZeqfJepD-7cVXzXFxY1mT_vT-MKJDx&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=pIR5XHO7CtVzg8mXrhHHqA&oh=00_AfdfNlC4UbiqBWYgp3T370LFvl9dS8yu6JD3HL35N24zYg&oe=69039E8B",
    };
    setUser(fakeUser);
  }, []);

  useEffect(() => {
    if (!user) return;

    const requiredFields = [
      { key: "phone", label: "Số điện thoại" },
      { key: "city", label: "Thành phố hoặc tỉnh" },
      { key: "skills", label: "Kỹ năng công nghệ" },
      { key: "experience", label: "Số năm kinh nghiệm" },
      { key: "position", label: "Vị trí" },
    ];

    const missingFields = requiredFields.filter((f) => {
      const value = user[f.key];
      return !value || (Array.isArray(value) && value.length === 0);
    });

    const percentEach = 100 / requiredFields.length;
    const completed = requiredFields.length - missingFields.length;

    setMissing(missingFields.map((f) => ({ label: f.label, percent: percentEach })));
    setProgress(Math.round((completed / requiredFields.length) * 100));
  }, [user]);

  const toggleModal = () => setShowModal(!showModal);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser({
      ...user,
      phone: formData.phone,
      city: formData.city,
      skills: formData.skills
        ? formData.skills.split(",").map((s) => s.trim())
        : [],
      experience: formData.experience,
      position: formData.position,
    });
    setShowModal(false);
  };

  if (!user) return <p>Đang tải...</p>;

  // 🟢 Nội dung cho từng tab
  const renderContent = () => {
    switch (activeTab) {
      case "cv":
        return (
          <div className={styles.card}>
            <h3>Thông tin cá nhân</h3>
            <p>Email: {user.email}</p>
            <p>Số điện thoại: {user.phone || "Chưa có số điện thoại"}</p>
            <p>Thành phố: {user.city || "Chưa có thành phố"}</p>
            <p>Vị trí: {user.position || "Chưa có vị trí"}</p>
            <p>
              Kỹ năng:{" "}
              {user.skills.length > 0 ? user.skills.join(", ") : "Chưa có kỹ năng"}
            </p>
            <p>Kinh nghiệm: {user.experience || "Chưa có số năm kinh nghiệm"}</p>
          </div>
        );
      case "jobs":
        return (
          <div className={styles.card}>
            <h3>Quản lý việc làm</h3>
            <p> Bạn chưa có việc làm nào đã ứng tuyển.</p>
            <p>
              Hãy cập nhật hồ sơ và bắt đầu ứng tuyển để hiển thị danh sách tại đây.
            </p>
          </div>
        );
      case "mycv":
        return (
          <div className={styles.card}>
            <h3>Quản lý CV</h3>
              <button className={styles.primaryBtn} onClick={toggleModal}>
                    Tạo CV mới
              </button>
            <p> Danh sách CV của bạn (chưa có dữ liệu)</p>   
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Navbar */}
      <div className={styles.navbar}>
        <button
          className={`${styles.navItem} ${
            activeTab === "cv" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("cv")}
        >
          Saramin CV của tôi
        </button>
        <button
          className={`${styles.navItem} ${
            activeTab === "jobs" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("jobs")}
        >
          Quản lý việc làm
        </button>
        <button
          className={`${styles.navItem} ${
            activeTab === "mycv" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("mycv")}
        >
          Quản lý CV
        </button>
      </div>

      <div className={styles.mainContent}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.profileCard}>
            <img src={user.avatar} alt="Avatar" className={styles.avatar} />
            <h3 className={styles.name}>{user.name}</h3>
            <p className={styles.progress}>{progress}% hoàn thiện</p>

            {missing.length > 0 ? (
              <>
                <p className={styles.intro}>Bổ sung các mục sau:</p>
                <div className={styles.missingList}>
                  {missing.map((item, i) => (
                    <div key={i} className={styles.missingItem}>
                      <span>{item.label}</span>
                      <span className={styles.percent}>+{item.percent}%</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className={styles.intro}>🎉 Hồ sơ của bạn đã hoàn thiện!</p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.contentArea}>
          <div className={styles.header}>
            {activeTab === "cv" && (
              <>
                <h2>Saramin CV</h2>
                <button className={styles.primaryBtn} onClick={toggleModal}>
                  Nhập nhanh hồ sơ
                </button>
              </>
            )}
            {activeTab === "jobs" && <h2>Quản lý việc làm</h2>}
            {activeTab === "mycv" && <h2>Quản lý CV</h2>}
          </div>

          {/* 🟢 Nội dung thay đổi tùy tab */}
          {renderContent()}
        </div>
      </div>

      {/* Modal Nhập Hồ Sơ */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Nhập nhanh hồ sơ</h3>
            <label>Số điện thoại</label>
            <input name="phone" onChange={handleChange} value={formData.phone} />

            <label>Thành phố hoặc tỉnh</label>
            <input name="city" onChange={handleChange} value={formData.city} />

            <label>Kỹ năng công nghệ (cách nhau bằng dấu phẩy)</label>
            <input name="skills" onChange={handleChange} value={formData.skills} />

            <label>Số năm kinh nghiệm</label>
            <input
              name="experience"
              onChange={handleChange}
              value={formData.experience}
            />

            <label>Vị trí công việc</label>
            <input
              name="position"
              onChange={handleChange}
              value={formData.position}
            />

            <div className={styles.modalActions}>
              <button onClick={handleSave} className={styles.primaryBtn}>
                Lưu thông tin
              </button>
              <button onClick={toggleModal} className={styles.cancelBtn}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
