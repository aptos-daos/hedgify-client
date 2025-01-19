import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onChange?: (file: File | null) => void;
  maxSizeMB?: number;
  acceptedTypes?: string[];
}

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onChange,
  maxSizeMB = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError(null);
    
    if (!acceptedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload an image.');
      return false;
    }
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return false;
    }
    
    return true;
  };

  const handleImageChange = (file: File | null): void => {
    if (!file) {
      setImage(null);
      setPreview(null);
      onChange?.(null);
      return;
    }

    if (!validateFile(file)) {
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onChange?.(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    handleImageChange(null);
  };

  return (
    <div className="w-full">
      <motion.div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover="animate"
        // className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center">

          {error && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2"
            >
              {error}
            </motion.p>
          )}
          
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {preview && image ? (
              <motion.div
                layoutId="image-upload"
                className={cn(
                  "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start h-64 w-full mx-auto rounded-md",
                  "shadow-sm"
                )}
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative w-full h-full"
                >
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={handleRemove}
                    className="absolute top-2 right-2 p-2 rounded-full bg-neutral-900/50 hover:bg-neutral-900/75 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent"
                  >
                    <p className="text-white text-sm font-medium truncate">
                      {image.name}
                    </p>
                    <p className="text-white/80 text-xs mt-1">
                      {(image.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  layoutId="image-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col items-center"
                    >
                      Drop it
                      <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-400 mt-2" />
                    </motion.p>
                  ) : (
                    <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                  )}
                </motion.div>

                <motion.div
                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                />
              </>
            )}
          </div>

          <p className="pt-4 relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload image
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag and drop your image or click to browse
          </p>
        </div>
      </motion.div>
    </div>
  );
};
