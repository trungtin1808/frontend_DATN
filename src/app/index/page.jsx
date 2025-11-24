import React, { useState } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Categories from "./components/categories";
import FeaturedJobs from "./components/featuredjobs";
import Footer from "./components/footer";

export default function IndexPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Hero />
      <Categories />
      <FeaturedJobs />
      <Footer />
    </div>
  );
}
