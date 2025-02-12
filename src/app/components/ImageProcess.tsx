import { useCallback, useState } from "react";
import { initializeModel, getModelInfo, processImage } from "@/lib/aiProcess";
import Image from "next/image";
import LoaderModel from "@/components/LoaderModel";
import { urlToFile } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import EditPhotoDrawer from "./EditPhotoDrawer";

type ImageProps = {
  src: string;
  dimension: { width: number; height: number };
};

export default function ImageProcess(props: ImageProps) {
  const [isModelLoading, setIsModelLoading] = useState<boolean>(false);
  const [isProcessLoading, setIsProcessLoading] = useState<boolean>(false);
  const [isWebGPU, setIsWebGPU] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [imageAi, setImageAi] = useState<string>();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);

  const handleClickProcess = useCallback(() => {
    setIsModelLoading(true);
    setIsProcessLoading(true);
    (async () => {
      try {
        const initialized = await initializeModel();
        if (!initialized) {
          throw new Error("Failed to initialize background removal model");
        }
        const { isWebGPUSupported, isIOS: isIOSDevice } = getModelInfo();
        setIsWebGPU(isWebGPUSupported);
        setIsIOS(isIOSDevice);
        setIsModelLoading(false);
        await processAiImage();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const processAiImage = useCallback(async () => {
    // process
    try {
      const imageai = await urlToFile(props.src, "image.jpg", "image/jpeg");
      if (imageai) {
        const resImage = await processImage(imageai);
        if (resImage) {
          console.log("resImage", resImage);
          resImage.arrayBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob);
            setIsProcessLoading(false);
            setImageAi(url);
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onShowEditDrawer = () => {
    setIsEditDrawerOpen(true);
  };

  return (
    <div className="flex relative h-full justify-center items-center">
      <div
        onClick={onShowEditDrawer}
        className="absolute flex w-8 h-8 bg-black right-2.5 shadow-lg top-2.5 rounded-full"
      >
        <PencilIcon className="text-white w-4 h-4 mx-auto my-auto" />
      </div>

      {isEditDrawerOpen && (
        <EditPhotoDrawer
          image={props.src}
          width={props.dimension.width}
          height={props.dimension.height}
          onCloseDrawer={() => setIsEditDrawerOpen(false)}
        />
      )}

      {imageAi ? (
        <Image
          alt={"background removal"}
          width={props.dimension.width}
          height={props.dimension.height}
          src={imageAi}
        />
      ) : isModelLoading || isProcessLoading ? (
        <LoaderModel
          text={
            isModelLoading
              ? "Loading background removal model"
              : "Processing removal"
          }
        />
      ) : (
        <button
          onClick={handleClickProcess}
          className="absolute px-4 py-2 z2 text-white bg-black rounded-md"
        >
          Start to Remove
        </button>
      )}
    </div>
  );
}
