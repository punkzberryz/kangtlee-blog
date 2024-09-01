import { cn } from "@/lib/utils";
import { UploadCloud, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";

export interface FileWithUrl {
  name: string;
  getUrl: string;
  isError: boolean;
  isLoading: boolean;
}

export const ImageInput = ({
  id,
  imageState,
  maxFileSize,
  onInputChange,
  loadingChildren,
}: {
  id: string;
  maxFileSize: number;
  imageState: FileWithUrl | null;
  onInputChange: ({ isValid, file }: { file: File; isValid: boolean }) => void;
  loadingChildren?: ReactNode;
}) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      const isValid = validateFileTypeAndSize(e.target.files[0], maxFileSize);
      onInputChange({ file: e.target.files[0], isValid });
    }
  };
  // triggers when file is dropped
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const isValid = validateFileTypeAndSize(
        e.dataTransfer.files[0],
        maxFileSize,
      );
      onInputChange({ file: e.dataTransfer.files[0], isValid });
      e.dataTransfer.clearData();
    }
  };
  return (
    <SingleImageInputUi
      id={id}
      handleChange={handleChange}
      handleDrop={handleDrop}
      imageState={imageState}
      maxFileSize={maxFileSize}
      loadingChildren={loadingChildren}
    />
  );
};
const SingleImageInputUi = ({
  imageState: input,
  handleChange,
  handleDrop,
  maxFileSize,
  id,
  loadingChildren,
}: {
  imageState: FileWithUrl | null;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxFileSize: number;
  id: string;
  loadingChildren?: ReactNode;
}) => {
  const [dragActive, setDragActive] = useState(false);
  const noInput = input === null;
  const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  return (
    <ImageUploadWrapper
      noInput={noInput}
      dragActive={dragActive}
      handleDrag={handleDrag}
      id={id}
    >
      <div
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-10"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          onChange={handleChange}
          accept="image/jpeg, image/jpg, image/png, image/webp"
          id={id}
          type="file"
          className="hidden"
        />
        {input ? (
          <div className="relative flex h-96 w-96 cursor-pointer">
            {input.isLoading && (
              <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center">
                {loadingChildren ? (
                  loadingChildren
                ) : (
                  <>
                    <UploadCloud className="h-10 w-10 animate-bounce text-black" />
                    <p className="text-lg font-semibold">กำลังอัพโหลด...</p>
                  </>
                )}
              </div>
            )}
            {input.isError ? (
              <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center">
                <XCircleIcon className="h-10 w-10 text-red-500" />
                <p className="text-lg font-semibold">
                  เกิดข้อผิดพลาดในการอัพโหลด...
                </p>
              </div>
            ) : (
              <Image
                style={{ objectFit: "contain" }}
                src={input.getUrl}
                fill
                alt={input.name}
                className={input.isLoading ? "opacity-40" : ""}
              />
            )}
          </div>
        ) : (
          <>
            <UploadCloud className="mb-3 h-10 w-10 text-gray-400 dark:text-gray-600" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">คลิกเพื่ออัพโหลดรูป</span>{" "}
              หรือลากรูปมาวางในกล่อง
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              อัพโหลดได้สูงสุด 1 รูป ขนาดไม่เกิน{" "}
              {(maxFileSize / 1000000).toFixed(0)}MB ต่อรูป
            </p>
          </>
        )}
      </div>
    </ImageUploadWrapper>
  );
};
const ImageUploadWrapper = ({
  children,
  noInput,
  handleDrag,
  id,
  dragActive,
}: {
  children: ReactNode;
  noInput: boolean;
  id: string;
  handleDrag: (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => void;
  dragActive: boolean;
}) => {
  return (
    <div
      onDragEnter={handleDrag}
      className="flex h-full w-full max-w-4xl items-center"
    >
      <label
        htmlFor={id}
        className={cn(
          "group relative flex aspect-video h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 transition dark:border-gray-600",
          { "dark:border-slate-400 dark:bg-slate-800": dragActive },
          { "aspect-auto h-fit": !noInput },
          { "items-start justify-start": !noInput },
          { "dark:hover:border-gray-500 dark:hover:bg-slate-800": noInput },
        )}
      >
        <div
          className={cn(
            "relative flex h-full w-full flex-col items-center justify-center",
            {
              "item-start": !noInput,
            },
          )}
        >
          {children}
        </div>
      </label>
    </div>
  );
};

function validateFileTypeAndSize(file: File, maxFileSize: number) {
  let valid = ALLOWED_FILE_TYPES.includes(file.type);
  valid = valid && file.size <= maxFileSize;
  return valid;
}

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];
