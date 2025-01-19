import imageCompression from "browser-image-compression";

const compressOption = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 512,
  useWebWorker: true,
};

export const compressImage = async (file: File): Promise<File> => {
  try {
    const compressedFile = await imageCompression(file, compressOption);
    return compressedFile;
  } catch (error) {
    console.error("Image compression failed:", error);
    return file;
  }
};
