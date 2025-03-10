"use client";

import {
  env,
  AutoModel,
  AutoModelForImageSegmentation,
  AutoProcessor,
  RawImage,
  PreTrainedModel,
  Processor,
  ProgressInfo,
} from "@huggingface/transformers";

// Initialize different model configurations
const WEBGPU_MODEL_ID = "Xenova/modnet";
const FALLBACK_MODEL_ID = "briaai/RMBG-1.4";

interface ModelState {
  model: PreTrainedModel | null;
  processor: Processor | null;
  isWebGPUSupported: boolean;
  currentModelId: string;
  isIOS: boolean;
}

interface ModelInfo {
  currentModelId: string;
  isWebGPUSupported: boolean;
  isIOS: boolean;
}

// iOS detection
const isIOS = () => {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};

const state: ModelState = {
  model: null,
  processor: null,
  isWebGPUSupported: false,
  currentModelId: FALLBACK_MODEL_ID,
  isIOS: isIOS(),
};

// Initialize WebGPU with proper error handling
async function initializeWebGPU() {
  const gpu = (navigator as any).gpu;
  if (!gpu) {
    throw new Error("WebGPU is not supported in this browser");
  }

  try {
    // Configure environment for WebGPU
    env.allowLocalModels = false;
    if (env.backends?.onnx?.wasm) {
      env.backends.onnx.wasm.proxy = false;
    }

    // Wait for WebAssembly initialization
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Initialize model with WebGPU
    state.model = await AutoModelForImageSegmentation.from_pretrained(
      WEBGPU_MODEL_ID,
      {
        device: "webgpu",
      },
    );
    state.processor = await AutoProcessor.from_pretrained(WEBGPU_MODEL_ID, {
      config: {
        do_normalize: true,
        do_pad: false,
        do_rescale: true,
        do_resize: true,
        image_mean: [0.5, 0.5, 0.5],
        feature_extractor_type: "ImageFeatureExtractor",
        image_std: [1, 1, 1],
        resample: 2,
        rescale_factor: 0.00392156862745098,
        size: { width: 1024, height: 1024 },
      },
    });
    return true;
  } catch (error) {
    console.error("WebGPU initialization failed:", error);
    throw new Error(
      "Failed to initialize WebGPU model. Falling back to cross-browser version.",
    );
  }
}

// Initialize the model based on the selected model ID
export async function initializeModel(forceModelId?: string): Promise<boolean> {
  try {
    // Always use RMBG-1.4 for iOS
    if (state.isIOS) {
      console.log("iOS detected, using RMBG-1.4 model");
      env.allowLocalModels = false;
      if (env.backends?.onnx?.wasm) {
        env.backends.onnx.wasm.proxy = true;
      }

      state.model = await AutoModel.from_pretrained(FALLBACK_MODEL_ID, {
        config: {
          model_type: "custom",
          is_encoder_decoder: false,
          max_position_embeddings: 1024,
          "transformers.js_config": {
            kv_cache_dtype: undefined,
            free_dimension_overrides: undefined,
            device: undefined,
            dtype: undefined,
            use_external_data_format: undefined,
          },
          normalized_config: undefined,
        },
      });

      state.processor = await AutoProcessor.from_pretrained(FALLBACK_MODEL_ID, {
        config: {
          do_normalize: true,
          do_pad: false,
          do_rescale: true,
          do_resize: true,
          image_mean: [0.5, 0.5, 0.5],
          feature_extractor_type: "ImageFeatureExtractor",
          image_std: [1, 1, 1],
          resample: 2,
          rescale_factor: 0.00392156862745098,
          size: { width: 1024, height: 1024 },
        },
      });

      state.currentModelId = FALLBACK_MODEL_ID;
      return true;
    }

    // Non-iOS flow remains the same
    const gpu = (navigator as any).gpu;
    state.isWebGPUSupported = Boolean(gpu);

    const selectedModelId = forceModelId || FALLBACK_MODEL_ID;
    const useWebGPU = selectedModelId === WEBGPU_MODEL_ID && gpu;

    console.log(
      `Initializing model: ${selectedModelId} ${useWebGPU ? "(WebGPU)" : "(Cross-browser)"}`,
    );

    if (useWebGPU) {
      await initializeWebGPU();
    } else {
      env.allowLocalModels = false;
      if (env.backends?.onnx?.wasm) {
        env.backends.onnx.wasm.proxy = true;
      }

      state.model = await AutoModel.from_pretrained(FALLBACK_MODEL_ID, {
        progress_callback: (progress: ProgressInfo) => {
          const progress_info =
            progress.status === "initiate"
              ? 0.05
              : progress.status === "download"
                ? 0.25
                : progress.status === "progress"
                  ? 0.5
                  : progress.status === "done"
                    ? 0.85
                    : 1;
          console.log(`Loading model: ${Math.round(progress_info * 100)}%`);
        },
      });

      state.processor = await AutoProcessor.from_pretrained(FALLBACK_MODEL_ID, {
        revision: "main",
        config: {
          do_normalize: true,
          do_pad: true,
          do_rescale: true,
          do_resize: true,
          image_mean: [0.5, 0.5, 0.5],
          feature_extractor_type: "ImageFeatureExtractor",
          image_std: [0.5, 0.5, 0.5],
          resample: 2,
          rescale_factor: 0.00392156862745098,
          size: { width: 1024, height: 1024 },
        },
      });
    }

    if (!state.model || !state.processor) {
      throw new Error("Failed to initialize model or processor");
    }

    state.currentModelId = selectedModelId;
    return true;
  } catch (error) {
    console.log("Error initializing model:", error);
    if (forceModelId === WEBGPU_MODEL_ID) {
      console.log("Falling back to cross-browser model...");
      return initializeModel(FALLBACK_MODEL_ID);
    }
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to initialize background removal model",
    );
  }
}

// Get current model info
export function getModelInfo(): ModelInfo {
  return {
    currentModelId: state.currentModelId,
    isWebGPUSupported: state.isWebGPUSupported,
    isIOS: state.isIOS,
  };
}

export async function processImage(image: File): Promise<File> {
  if (!state.model || !state.processor) {
    throw new Error("Model not initialized. Call initializeModel() first.");
  }

  const img = await RawImage.fromURL(URL.createObjectURL(image));

  try {
    // Pre-process image
    const { pixel_values } = await state.processor(img);

    // Predict alpha matte
    const { output } = await state.model({ input: pixel_values });

    // Resize mask back to original size
    const maskData = (
      await RawImage.fromTensor(output[0].mul(255).to("uint8")).resize(
        img.width,
        img.height,
      )
    ).data;

    // Create new canvas
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Could not get 2d context");

    // Draw original image output to canvas
    ctx.drawImage(img.toCanvas(), 0, 0);

    // Update alpha channel
    const pixelData = ctx.getImageData(0, 0, img.width, img.height);
    for (let i = 0; i < maskData.length; ++i) {
      pixelData.data[4 * i + 3] = maskData[i];
    }
    ctx.putImageData(pixelData, 0, 0);

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("Failed to create blob")),
        "image/png",
      ),
    );

    const [fileName] = image.name.split(".");
    const processedFile = new File([blob], `${fileName}-bg-blasted.png`, {
      type: "image/png",
    });
    return processedFile;
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process image");
  }
}

export async function processImages(images: File[]): Promise<File[]> {
  console.log("Processing images...");
  const processedFiles: File[] = [];

  for (const image of images) {
    try {
      const processedFile = await processImage(image);
      processedFiles.push(processedFile);
      console.log("Successfully processed image", image.name);
    } catch (error) {
      console.error("Error processing image", image.name, error);
    }
  }

  console.log("Processing images done");
  return processedFiles;
}
