"use client";

import Footer from "./../components/Footer";
import Header from "./../components/Header";
import dynamic from "next/dynamic";

const PhotoRemovalClientComponent = dynamic(
  () => import("../components/PhotoRemoval"),
  { ssr: false }, // Disable server-side rendering
);

export default function Page() {
  return (
    <div>
      <Header withBrand />
      <PhotoRemovalClientComponent />
      <Footer />
    </div>
  );
}
