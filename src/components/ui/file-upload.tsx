import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload, IconTrash } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import { formatDate } from "date-fns";

const mainVariant = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    // scale: 1.02,
    y: -4,
  },
};

const iconVariant = {
  initial: { rotate: 0 },
  hover: { rotate: 10 },
};

export const FileUpload = ({
  onChange,
  title = "Whitelist",
  subtitle = "If its blank then DAO is Public",
}: {
  onChange?: (files: File[]) => void;
  title?: string;
  subtitle?: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: (acceptedFiles) => {
      // Only take the first file if multiple files are dropped
      if (acceptedFiles.length > 0) {
        handleFileChange([acceptedFiles[0]]);
      }
    },
    maxFiles: 1,
    onDropRejected: () => {
      // Optional: Add error handling for rejected files
      console.warn("Only one file can be uploaded at a time");
    },
  });

  return (
    <div {...getRootProps()}>
      {files.length === 0 && (
        <motion.div
          onClick={handleClick}
          variants={mainVariant}
          initial="initial"
          whileHover="hover"
          className={cn(
            "group/file flex items-center justify-between p-4 rounded-lg",
            "bg-white/10",
            "shadow-xs hover:shadow-lg transition-shadow duration-300",
            isDragActive && "border-sky-400 border-dashed"
          )}
        >
          <div className="flex items-center gap-4">
            <motion.div
              variants={iconVariant}
              className={cn(
                "w-16 h-16 flex items-center justify-center rounded-lg bg-primary-foreground",
                "transition-colors duration-300 group-hover/file:bg-primary"
              )}
            >
              <IconUpload
                className={cn(
                  "h-6 w-6 text-primary",
                  "transition-colors duration-300 group-hover/file:text-black"
                )}
              />
            </motion.div>
            <div>
              <motion.p 
                layout 
                className="text-base font-medium"
                animate={{ opacity: isDragActive ? 0 : 1 }}
              >
                {isDragActive ? "" : title}
              </motion.p>
              <motion.p 
                layout 
                className="text-sm text-muted mt-1"
                animate={{ opacity: 1 }}
              >
                {isDragActive ? "Drop to upload" : subtitle}
              </motion.p>
            </div>
          </div>

          <Button
            className={"transition-all duration-300 shadow-xs hover:shadow-md"}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Upload
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
            className="hidden"
            accept=".csv"
          />
        </motion.div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((file, idx) => (
            <motion.div
              key={"file" + idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
              className={cn(
                "relative overflow-hidden z-40",
                "bg-white/10 shadow-xs",
                "flex flex-col items-start justify-start md:h-24 p-4",
                "w-full mx-auto rounded-md",
                "hover:shadow-md transition-shadow duration-300"
              )}
            >
              <div className="flex justify-between w-full items-center gap-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="text-base truncate max-w-xs"
                >
                  {file.name}
                </motion.p>
                <div className="flex items-center gap-2">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className={cn(
                      "rounded-lg px-2 py-1 w-fit shrink-0",
                      "text-sm text-neutral-600 bg-neutral-100 shadow-xs"
                    )}
                  >
                    {(file.size / (1024 * 1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                      const newFiles = files.filter((_, i) => i !== idx);
                      setFiles(newFiles);
                      onChange && onChange(newFiles);
                    }}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <IconTrash className="h-4 w-4 text-red-500" />
                  </motion.button>
                </div>
              </div>

              <div className="flex text-sm md:flex-row items-start md:items-center w-full mt-2 justify-between text-neutral-600">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="px-1 py-0.5 rounded-md bg-neutral-100 text-black"
                >
                  {file.type}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                >
                  {`Modified: ${formatDate(
                    new Date(file.lastModified),
                    "dd MMM yyyy"
                  )}`}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
