"use client"
import Style from "../../ui/admin/recentActivities.module.css";
export default function RecentActivities() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <p className="text-gray-600">No recent activities to display.</p>
      </div>
    </div>
  );
}
