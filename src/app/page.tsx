'use client'

import Footer from "./components/Footer";
import Hero from "./components/Hero";
import PhotoGrid from "./components/PhotoGrid";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="container container-lg w-4/6 mx-auto px-4">
        <Header />
        <Hero />
        <SearchBar />
        <Footer />
    </div>
  );
}
