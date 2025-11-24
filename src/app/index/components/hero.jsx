import React from "react";
import Navbar from "./navbar";

export default function Hero() {
  return (
    <div
      className="w-full h-[550px] bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80')",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />

      {/* NAVBAR */}
      <Navbar />

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-24">
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            BẮT ĐẦU HÀNH TRÌNH TÌM VIỆC CỦA BẠN
        </h1>
        <p className="text-white text-lg mb-10 max-w-2xl drop-shadow-lg">
          Khám phá hàng ngàn cơ hội việc làm từ các công ty hàng đầu trên toàn
        </p>

        {/* SEARCH BAR */}
        <div className="bg-white rounded-full shadow-xl p-4 w-full max-w-4xl flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            className="flex-1 px-4 py-3 rounded-full border focus:outline-none w-full"
          />

          <input
            type="text"
            placeholder="City, state, or zip code"
            className="flex-1 px-4 py-3 rounded-full border focus:outline-none w-full"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition w-full md:w-auto">
            Search Jobs
          </button>
        </div>

        <p className="text-white mt-6 text-sm drop-shadow-lg">
          Các tìm kiếm phổ biến: <span className="font-semibold">Designer, Developer, Marketing, Sales</span>
        </p>
      </div>
    </div>
  );
}
