"use client";

import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { InvoiceFormSchema } from "./invoice-schema";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const CompanyLogoField = ({
  form,
}: {
  form: UseFormReturn<InvoiceFormSchema>;
}) => {
  const [imagePath, setImagePath] = useState<string | null>(
    // "/img/error/sadPanda.jpg"
    form.getValues("companyLogoUrl") ?? null,
  );
  const [error, setError] = useState(false);
  const onInputChange = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    if (!files || files?.length === 0) return;
    const file = files[0];
    if (file.size > MAX_IMAGE_SIZE) {
      setError(true);
      setImagePath(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setImagePath(url);
    form.setValue("companyLogoUrl", url);
  };
  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError(false);
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    const file = e.dataTransfer.files[0];
    if (file.size > MAX_IMAGE_SIZE) {
      setError(true);
      setImagePath(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setImagePath(url);
    form.setValue("companyLogoUrl", url);
  };

  return (
    <div>
      <div
        className="group overflow-hidden"
        onDrop={handleOnDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          className="sr-only"
          id="company-logo"
          hidden
          type="file"
          accept="image/*"
          onChange={onInputChange}
        />

        <label
          className="relative flex cursor-pointer flex-col items-start"
          htmlFor="company-logo"
        >
          {imagePath ? (
            // eslint-disable-next-line
            <img
              src={imagePath}
              alt="image display"
              className="h-[140px] w-[140px] rounded-3xl object-contain transition group-hover:opacity-20"
            />
          ) : (
            <div className="flex h-[140px] w-[140px] items-center justify-center rounded-3xl bg-blue-100">
              <ImageIcon className="text-gray-700" size={60} />
            </div>
          )}
          <div className="absolute top-10 w-full opacity-0 transition group-hover:opacity-100">
            <ImageIcon className="mx-auto" size={60} />
          </div>
        </label>
        {error && (
          <p className="absolute font-semibold text-red-400">
            ขนาดรูปต้องไม่เกิน 5MB
          </p>
        )}
      </div>
    </div>
  );
};
