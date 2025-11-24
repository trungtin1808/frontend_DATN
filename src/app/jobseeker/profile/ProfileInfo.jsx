import { useState } from "react";
import styles from "../../ui/jobseeker/ProfileInfo.module.css";

export default function ProfileInfo({ profile, setProfile }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // TODO: gọi API để lưu dữ liệu
    alert("Cập nhật thông tin cá nhân thành công!");
    setIsEditing(false);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Thông tin cá nhân</h2>

      {!isEditing ? (
        <div className={styles.infoGrid}>
          <div className={styles.row}>
            <span className={styles.label}>Họ tên:</span>
            <span className={styles.value}>{profile.name}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{profile.email}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Số điện thoại:</span>
            <span className={styles.value}>{profile.phone}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Địa chỉ:</span>
            <span className={styles.value}>{profile.address}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Quận/Huyện:</span>
            <span className={styles.value}>{profile.state}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Thành phố:</span>
            <span className={styles.value}>{profile.city}</span>
          </div>

          <button className={styles.editBtn} onClick={handleEditToggle}>
            Chỉnh sửa
          </button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSaveProfile}>
          <input
            className={styles.input}
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Họ tên"
          />
          <input
            className={styles.input}
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="Email"
          />
          <input
            className={styles.input}
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            placeholder="Số điện thoại"
          />
          <input
            className={styles.input}
            value={profile.address}
            onChange={(e) =>
              setProfile({ ...profile, address: e.target.value })
            }
            placeholder="Địa chỉ"
          />
          <input
            className={styles.input}
            value={profile.state}
            onChange={(e) => setProfile({ ...profile, state: e.target.value })}
            placeholder="Quận/Huyện"
          />
          <input
            className={styles.input}
            value={profile.city}
            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            placeholder="Thành phố"
          />

          <div className={styles.buttonGroup}>
            <button className={styles.saveBtn} type="submit">
              Lưu thay đổi
            </button>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={handleEditToggle}
            >
              Hủy
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
