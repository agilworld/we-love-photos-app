"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import ImageProcess from "@/app/components/ImageProcess";
import { urlToFile } from "@/lib/utils";
import { ImageFile } from "@/_types/removal";
import Image from "next/image";

export default function PhotoRemoval() {
  const [isClient, setIsClient] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const searchParams = useSearchParams();
  const imageSrc = decodeURIComponent(searchParams.get("src") ?? "");
  const imageOrigWidth = decodeURIComponent(searchParams.get("w") ?? "");
  const imageOrigHeight = decodeURIComponent(searchParams.get("h") ?? "");
  const [imageFile, setImageFile] = useState<ImageFile>({
    originDim: {
      width: parseInt(imageOrigWidth),
      height: parseInt(imageOrigHeight),
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function initImage() {
      if (imageRef.current?.width && imageRef.current?.height) {
        const srcFile = await urlToFile(imageSrc, "image.jpg", "image/jpeg");
        console.log("set image file");
        setImageFile({
          ...imageFile,
          src: srcFile,
          placeDim: {
            width: imageRef.current.width,
            height: imageRef.current.height,
          },
        });
      }
    }
    initImage();
  }, [imageSrc, imageRef.current?.width, imageRef.current?.height]);
  console.log("imageRef", imageRef.current?.width);

  return (
    <div className="flex mx-auto mt-20 px-4 gap-10">
      <div className="cursor-pointer w-1/2">
        <Image
          ref={imageRef}
          className="h-auto max-w-full rounded-lg shadow-lg"
          src={imageSrc}
          width={500}
          height={500}
          priority={true}
          alt="source image"
        />
      </div>

      {imageFile.placeDim && imageFile.placeDim?.width > 0 && (
        <div
          className="flex flex-col w-1/2 "
          style={{
            width: imageFile?.placeDim.width + 4,
          }}
        >
          <ImageProcess imageFile={imageFile} />
        </div>
      )}
    </div>
  );
}
