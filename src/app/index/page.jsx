// app/index/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BottomContent from "./bottomContent/page";
import styles from "@/app/ui/index/index.module.css";
import BannerPage from "./banner/page";
import IndexLayout from './layout';
import Navbar from '../ui/index/navbar/Navbar'
import Header from '../ui/index/header/header'
import Footer from "../ui/index/footer/footer";

export default function IndexPage() {

    useEffect(() => {
        document.title = "Trang Chủ - Jobs Seek";
        
    }, []);

    return (
        <>
            <Header  />
            <Navbar /> {/* Render Navbar */}
            <BannerPage />
            <BottomContent />
            <Footer />
        </>
    );
}