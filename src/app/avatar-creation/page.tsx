"use client";

import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";
import dynamic from "next/dynamic";

const AvatarBgRemovalClientComponent = dynamic(
  () => import("../../features/avatarBgRemoval/AvatarBgRemoval"),
  { ssr: false }, // Disable server-side rendering
);

export default function Page() {
  return (
    <div className="">
      <Header withBrand />
      <div className="container w-full md:w-5/6 mx-auto px-4">
        <AvatarBgRemovalClientComponent />
        <Footer />
      </div>
    </div>
  );
}
