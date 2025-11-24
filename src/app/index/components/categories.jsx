import React from "react";

export default function Categories() {
  const categoryList = [
    "Engineering",
    "Design",
    "Finance",
    "Sales",
    "Healthcare",
    "Support",
    "Marketing",
    "IT & Admin",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-4">Khám Phá Theo Danh Mục</h2>
      <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
        Duyệt việc làm theo ngành để tìm vai trò phù hợp với kỹ năng của bạn.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto px-6">
        {categoryList.map((cat) => (
          <div
            key={cat}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center cursor-pointer border"
          >
            <p className="text-lg font-semibold">{cat}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
