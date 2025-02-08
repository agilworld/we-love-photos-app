"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import { initializeModel, getModelInfo } from "@/lib/aiProcess";
import LoaderModel from "@/components/LoaderModel";
import { processImages } from "@/lib/aiProcess";
import ImageProcess from "@/app/components/ImageProcess";

export default function PhotoRemoval() {
  const imageRef = useRef<HTMLImageElement>(null);
  const searchParams = useSearchParams();
  const imageSrc = decodeURIComponent(searchParams.get("src") ?? "");
  const [imgDimensions, setImgDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    // (async () => {
    //   try {
    //     const initialized = await initializeModel();
    //     if (!initialized) {
    //       throw new Error("Failed to initialize background removal model");
    //     }
    //     const { isWebGPUSupported, isIOS: isIOSDevice } = getModelInfo();
    //     setIsWebGPU(isWebGPUSupported);
    //     setIsIOS(isIOSDevice);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();
  }, []);

  useEffect(() => {
    if (imageRef.current?.offsetWidth && imageRef.current?.offsetHeight) {
      setImgDimensions({
        width: imageRef.current.offsetWidth,
        height: imageRef.current.offsetHeight,
      });
    }
  }, [imageRef.current]);

  const handleClickProcess = useCallback(() => {}, []);

  // if (isLoading) {
  //   return <LoaderModel />;
  // }

  return (
    <div className="flex items-center mx-auto mt-20 px-4 gap-10">
      <div className="cursor-pointer w-1/2">
        <img
          ref={imageRef}
          className="h-auto max-w-full rounded-lg shadow-lg"
          src={imageSrc}
        />
      </div>

      {imgDimensions.width > 0 && (
        <div
          style={{
            width: imgDimensions.width + 4,
            height: imgDimensions.height + 4,
          }}
          className="cursor-pointer w-1/2 rounded-lg border-4 border-slate-200 border-dashed"
        >
          <ImageProcess src={imageSrc} dimension={imgDimensions} />
          {/* <img
          className="h-auto max-w-full rounded-lg shadow-lg"
          src={imageSrc}
        /> */}
        </div>
      )}
    </div>
  );
}
