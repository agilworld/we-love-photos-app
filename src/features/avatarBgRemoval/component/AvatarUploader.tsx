import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  CSSProperties,
} from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, Check, Loader2 } from "lucide-react";
import { ImageFile } from "@/_types/removal";
import exifr from "exifr";
import { getResizeResolutionImage } from "@/libs/utils";
type AvatarUploadProps = {
  onUploaded: (imgFile: ImageFile) => void;
  originDim: {
    width: number;
    height: number;
  };
};
export const AvatarUploader: React.FC<AvatarUploadProps> = ({
  onUploaded,
  originDim,
}) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imageRef.current && imageRef.current?.width && file) {
      const imgResize = getResizeResolutionImage(
        {
          width: imageRef.current.naturalWidth,
          height: imageRef.current.naturalHeight,
        },
        imageRef.current.height,
      );
      console.log("image resize", imageRef);
      onUploaded({
        src: file,
        originDim: {
          width: imgResize.width,
          height: imgResize.height,
        },
      });
    }
  }, [imageRef.current, file]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setError(null);
    setIsSuccess(false);

    const file = acceptedFiles[0];

    // Only accept image files
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    // validate image size
    const img = new Image();
    const previewUrl = URL.createObjectURL(file);

    img.onload = () => {
      if (img.width >= 512 && img.height >= 512) {
        console.log("Accepted:", file.name, `(${img.width}x${img.height})`); // Create a preview URL
        setAvatar(previewUrl);
        setFile(file);

        // Simulate processing
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setIsSuccess(true);
        }, 1500);
      } else {
        setError(
          `Rejected: ${file.name} has resolution ${img.width}x${img.height}. Min required is 512 px x 512 px`,
        );
        return;
      }
      //URL.revokeObjectURL(previewUrl);
    };

    img.onerror = () => {
      console.error("Error loading image");
      URL.revokeObjectURL(previewUrl);
    };
    img.src = previewUrl;
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const getDropzoneClassName = () => {
    let className =
      "flex flex-col items-center justify-center w-full p-8 border-dashed rounded-lg transition duration-200 ease-in-out border-4";

    if (isFocused) {
      className += " border-blue-400 bg-blue-50";
    } else if (isDragAccept) {
      className += " border-green-400 bg-green-50";
    } else if (isDragReject) {
      className += " border-red-400 bg-red-50";
    } else if (isDragActive) {
      className += " border-blue-400 bg-blue-50";
    } else {
      className +=
        " border-slate-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-400";
    }

    return className;
  };

  const getCustomStyle = (): CSSProperties => {
    return {
      height:
        imageRef.current?.naturalHeight &&
        imageRef.current?.naturalHeight < originDim.height
          ? imageRef.current.naturalHeight
          : originDim.height,
    };
  };

  const handleReset = () => {
    if (avatar) {
      URL.revokeObjectURL(avatar);
    }
    setAvatar(null);
    setIsSuccess(false);
    setIsProcessing(false);
    setError(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="relative">
        <div>
          {!avatar && (
            <div
              {...getRootProps({
                style: getCustomStyle(),
                className: getDropzoneClassName(),
              })}
            >
              <input {...getInputProps()} />
              <UploadCloud className="w-12 h-12 text-blue-500 mb-3" />
              <p className="text-gray-700 font-medium">
                {isDragActive
                  ? "Drop your image here"
                  : "Drag & drop your image here"}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                or click to select a file
              </p>
              <p className="text-xs text-gray-400 mt-4">
                Supports JPG, PNG, GIF up to 10MB
              </p>
            </div>
          )}

          {avatar && (
            <div className="flex flex-col">
              <div className="border border-gray-200 rounded-lg mb-4">
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <img
                    src={avatar}
                    alt="Preview"
                    ref={imageRef}
                    className="w-full h-full object-contain"
                  />

                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Loader2 className="w-10 h-10 text-white animate-spin" />
                    </div>
                  )}

                  {isSuccess && (
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={handleReset}
                        className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                        aria-label="Remove image"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    "Save Profile Picture"
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Your Profile
          </h2>
          <AvatarPreview imageUrl={avatar} />

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Profile Picture Tips
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Use a clear photo of your face</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Good lighting makes a big difference</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Neutral backgrounds work best</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Square images are preferred</span>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};
