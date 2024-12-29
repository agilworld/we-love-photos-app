"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { initializeModel, getModelInfo } from "@/lib/aiProcess";
import LoaderModel from "@/components/LoaderModel";

export default function PhotoRemoval() {
  const imageRef = useRef<HTMLImageElement>(null);
  const searchParams = useSearchParams();
  const imageSrc = decodeURIComponent(searchParams.get("src") ?? "");
  console.log(imageSrc, "img src");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWebGPU, setIsWebGPU] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const initialized = await initializeModel();
        if (!initialized) {
          throw new Error("Failed to initialize background removal model");
        }
        const { isWebGPUSupported, isIOS: isIOSDevice } = getModelInfo();
        setIsWebGPU(isWebGPUSupported);
        setIsIOS(isIOSDevice);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <LoaderModel />;
  }

  console.log(imageRef);

  return (
    <div className="flex items-center mx-auto mt-20 px-4 gap-10">
      <div className="cursor-pointer w-1/2">
        <img
          ref={imageRef}
          className="h-auto max-w-full rounded-lg shadow-lg"
          src={imageSrc}
        />
      </div>

      <div className="cursor-pointer w-1/2 h-64 rounded-lg border-4 border-slate-200 border-dashed">
        <div className=""></div>
        {/* <img
          className="h-auto max-w-full rounded-lg shadow-lg"
          src={imageSrc}
        /> */}
      </div>
    </div>
  );
}
