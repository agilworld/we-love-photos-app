import React, { useCallback, useState } from "react";
import { UserCircle } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import { ImageFile } from "@/_types/removal";
import { AvatarUploader } from "./component/AvatarUploader";
import ImageProcess from "@/components/shared/ImageProcess";

export default function AvatarBgRemoval() {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageFile, setImageFile] = useState<ImageFile>({
    originDim: {
      width: 500,
      height: 300,
    },
  });

  const onAvatarDoneUpload = useCallback((imgFile: ImageFile) => {
    if (imgFile?.src) {
      setImageFile({
        src: imgFile.src,
        originDim: {
          width: imgFile.originDim.width,
          height: imgFile.originDim.height,
        },
        placeDim: {
          width: imgFile.originDim.width,
          height: imgFile.originDim.height,
        },
      });
      const previewUrl = URL.createObjectURL(imgFile.src as File);
      setImageSrc(previewUrl);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <PageHeader
        title="AI Photo Editor"
        description="Remove background, apply effects, and customize your profile picture"
        icon={<UserCircle className="w-6 h-6" />}
      />

      <div className="relative">
        <div className="flex mx-auto mt-8 py-4 gap-10">
          <div className="cursor-pointer w-1/2">
            <AvatarUploader
              originDim={imageFile.originDim}
              onUploaded={onAvatarDoneUpload}
            />
          </div>

          {imageFile.originDim && imageFile.originDim?.width > 0 && (
            <div
              className="flex flex-col w-1/2 "
              style={{
                height: imageFile?.originDim.height,
              }}
            >
              <ImageProcess imageSrc={imageSrc} imageFile={imageFile} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
