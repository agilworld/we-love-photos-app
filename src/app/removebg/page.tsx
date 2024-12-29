"use client";

import Footer from "./../components/Footer";
import Hero from "./../components/Hero";
import Header from "./../components/Header";
import PhotoRemoval from "../components/PhotoRemoval";

export default function Removebg() {
  return (
    <div className="">
      <Header withBrand />
      <div className="container w-full md:w-5/6 mx-auto px-4">
        <PhotoRemoval />
        <Footer />
      </div>
    </div>
  );
}
