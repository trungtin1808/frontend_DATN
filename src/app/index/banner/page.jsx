import React, { useState, useEffect } from 'react';
import styles from "@/app/ui/index/banner/banner.module.css"; // Import CSS module for styling

export default function BannerPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Replace with your actual image URLs
  const bannerImages = [
    "https://topdev.vn/page/wp-content/uploads/2019/01/techtuyendungtopdev.png"
    // Add more image URLs here
  ];

  return (
    <div className={styles.bannerContainer}>
      <img
        src={bannerImages[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
        className={styles.bannerImage}
      />
      {/* Optional: Add indicators for the slides */}
      <div className={styles.indicators}>
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={index === currentIndex ? styles.active : ''}
            onClick={() => setCurrentIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}