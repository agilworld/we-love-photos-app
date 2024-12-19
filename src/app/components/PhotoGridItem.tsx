"use client";

import { PhotoResult } from "@/_types/photos";
import { useEffect, useState } from "react";
import Image, { ImageLoaderProps } from "next/image";
import type { ComponentPropsWithRef } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type PhotoGridItemProps = {
  item: Partial<PhotoResult>;
  isFetching: boolean;
  isLast: boolean;
} & ComponentPropsWithRef<"div">;

export default function PhotoGridItem({
  item,
  isFetching,
  isLast,
  ...rest
}: PhotoGridItemProps) {
  return (
    <div key={item.id} className="cursor-pointer" {...rest}>
      <img
        className="h-auto max-w-full rounded-lg shadow-lg hover:scale-105 duration-200 delay-75	ease-in-out"
        src={item.urls?.small}
      />
      {isLast && isFetching && (
        <Skeleton className="w-full mt-10 h-[250px] rounded-lg" />
      )}
    </div>
  );
}

type PhotoDrawerProps = {
  item: PhotoResult;
  onCloseDrawer: () => void;
};

const imageLoader = ({ src }: ImageLoaderProps) => {
  return src;
};

export const PhotoDetailDrawer = ({
  item,
  onCloseDrawer,
}: PhotoDrawerProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      onCloseDrawer();
    }, 500);
  };

  const downloadPhoto = () => {
    //window.open(item.urls.full, "_blank")
    if (item.urls?.full) {
      const url = item.urls?.full as string;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.blob();
        })
        .then((response) => {
          const element = document.createElement("a");
          const urlRes = URL.createObjectURL(response);
          element.href = urlRes;
          element.setAttribute("download", `welovephoto-${item.slug}.jpg`);
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
          URL.revokeObjectURL(urlRes);
        })
        .catch((error) => {
          console.error("Error downloading the image:", error);
        });
    }
  };

  const initialName = () => {
    let f, l;
    if (item.user.first_name && item.user.last_name) {
      f = item.user.first_name.charAt(0);
      l = item.user.last_name.charAt(0);
    } else {
      f = item.user.name?.charAt(0) ?? "U";
      l = item.user.name?.charAt(1) ?? "n";
    }
    return `${f}${l}`;
  };

  const desc = () => {
    return (
      item.description?.slice(0, 100) ??
      "" + (item.description?.length >= 100 ? "..." : "")
    );
  };

  const altDesc = () => {
    return (
      item.alt_description?.slice(0, 100) ??
      "" + (item.alt_description?.length >= 100 ? "..." : "")
    );
  };

  return (
    <Drawer open={open} onClose={handleClose} onOpenChange={handleClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl md:py-6">
          <div className="flex flex-col md:flex-row justify-center">
            <div className="w-full md:w-4/6">
              {item.urls?.regular && isClient && (
                <Image
                  src={item.urls?.regular}
                  alt={item.alt_description}
                  loader={imageLoader}
                  style={{
                    objectFit: "contain",
                    resize: "horizontal",
                  }}
                  width={item.width / 5}
                  height={item.height / 5}
                  loading="lazy"
                  className={`max-h-[80vh]`}
                />
              )}
            </div>
            <div className="w-full md:w-2/6">
              <DrawerHeader className="text-left pt-10 pr-10 pl-10 md:pt-0 md:pl-10 md:pr-2">
                <DrawerTitle className="leading-tight">{desc()}</DrawerTitle>
                <DrawerDescription className="leading-none text-md">
                  {altDesc()}
                </DrawerDescription>
                <div className="flex items-center my-6">
                  <Avatar className="mr-3">
                    <AvatarImage src={item.user.profile_image.medium} />
                    <AvatarFallback>{initialName()}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs">
                    <h4 className="font-regular">
                      Photo by{" "}
                      <span className="underline">{item.user.name}</span> on{" "}
                      <span>Unsplash</span>{" "}
                    </h4>
                    <div>
                      {item.user.links.html && (
                        <a
                          className="text-blue-600 visited:text-purple-600"
                          href={item.user.links.html}
                          target="_blank"
                        >
                          View Profile
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </DrawerHeader>
              <DrawerFooter className="mt-10 pt-2">
                <Button onClick={downloadPhoto}>Download</Button>
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
};
