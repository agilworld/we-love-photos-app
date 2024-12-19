"use client";

import Footer from "./components/Footer";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="container w-full md:w-4/6 mx-auto px-4">
      <Header />
      <Hero />
      <SearchBar />
      <Footer />
    </div>
  );
}
