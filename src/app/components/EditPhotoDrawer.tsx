import { useEffect, useState } from "react";
import type { ComponentPropsWithRef } from "react";
import Image, { ImageLoaderProps } from "next/image";
import SampleImage from "@/processed-1735321072689.png";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type EditPhotoDrawerProps = {
  image: string;
  height: number;
  width: number;
  onCloseDrawer: () => void;
};

const imageLoader = ({ src }: ImageLoaderProps) => {
  return src;
};
const predefinedColors = [
  "#ffffff",
  "#000000",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
];

export default function EditPhotoDrawer({
  image,
  height,
  width,
  onCloseDrawer,
}: EditPhotoDrawerProps) {
  const [open, setOpen] = useState<boolean>(true);
  const [isClient, setIsClient] = useState(false);
  const [bgcolor, setBgcolor] = useState<string>("#ffffff");
  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      onCloseDrawer();
    }, 500);
  };

  const handleSavePhoto = () => {};

  return (
    <Drawer open={open} onClose={handleClose} onOpenChange={handleClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl md:py-6">
          <div className="flex flex-col md:flex-row justify-center">
            <div className="w-full md:w-4/6">
              {image && (
                <Image
                  src={SampleImage}
                  alt={"background removal"}
                  loader={imageLoader}
                  style={{
                    objectFit: "contain",
                    resize: "horizontal",
                    backgroundColor: bgcolor,
                  }}
                  width={width}
                  height={height}
                  loading="lazy"
                  className={`max-h-[80vh]`}
                />
              )}
            </div>
            <div className="w-full md:w-2/6">
              <DrawerHeader
                className="text-left 
                  pt-6 pr-8 pl-8 md:pt-0 md:pl-10 md:pr-2"
              >
                <DrawerTitle className="leading-tight">Edit Photo</DrawerTitle>
                <DrawerDescription className="leading-none text-md">
                  Predefined Color
                </DrawerDescription>
                <div className="flex items-center my-4 md:my-6">
                  <div>
                    {predefinedColors.map((color) => (
                      <Button
                        key={color}
                        className="
                        mr-2 mb-2 outline rounded-sm 
                        px-4 py-4 h-8 border-solid border-2 border-gray-200"
                        onClick={() => setBgcolor(color)}
                        style={{
                          backgroundColor: color,
                          outlineOffset: color === bgcolor ? "1px" : undefined,
                          outlineColor: color === bgcolor ? "black" : undefined,
                          outlineWidth: color === bgcolor ? "2px" : undefined,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </DrawerHeader>
              <DrawerFooter className="mt-2 md:mt-10 pt-2">
                <Button onClick={handleSavePhoto}>Save</Button>
                <Button onClick={handleClose} variant="outline">
                  Close
                </Button>
              </DrawerFooter>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
