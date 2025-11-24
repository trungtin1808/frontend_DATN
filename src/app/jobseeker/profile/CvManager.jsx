import styles from "../../ui/jobseeker/CvManager.module.css";

export default function CvManager({ cvList, setCvList }) {
  const handleAddCv = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCv = {
      id: Date.now(),
      title: formData.get("title"),
      updated_at: new Date().toLocaleDateString(),
    };
    setCvList((prev) => [...prev, newCv]);
    e.target.reset();
  };

  const handleDeleteCv = (id) => {
    setCvList((prev) => prev.filter((cv) => cv.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quản lý CV</h2>

      <form className={styles.form} onSubmit={handleAddCv}>
        <input className={styles.input} name="title" placeholder="Tên CV mới..." required />
        <button type="submit" className={styles.button}>Thêm CV</button>
      </form>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theadRow}>
              <th className={styles.th}>Tên CV</th>
              <th className={styles.th}>Ngày cập nhật</th>
              <th className={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cvList.map((cv) => (
              <tr key={cv.id} className={styles.tbodyRow}>
                <td className={styles.td}>{cv.title}</td>
                <td className={styles.td}>{cv.updated_at}</td>
                <td className={styles.td}>
                  <button className={styles.deleteBtn} onClick={() => handleDeleteCv(cv.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
