import styles from "../../ui/jobseeker/AppliedJobs.module.css";

export default function AppliedJobs({ appliedJobs }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Công việc đã ứng tuyển</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theadRow}>
              <th className={styles.th}>Tiêu đề</th>
              <th className={styles.th}>Công ty</th>
              <th className={styles.th}>Ngày ứng tuyển</th>
              <th className={styles.th}>Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {appliedJobs.map((job) => (
              <tr key={job.id} className={styles.tbodyRow}>
                <td className={styles.td}>{job.title}</td>
                <td className={styles.td}>{job.company}</td>
                <td className={styles.td}>{job.applied_at}</td>
                <td className={styles.td}>
                  <span
                    className={`${styles.statusBadge} ${
                      job.status === "Đang xét duyệt"
                        ? styles.statusPending
                        : job.status === "Đã phỏng vấn"
                        ? styles.statusInterviewed
                        : styles.statusDefault
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
