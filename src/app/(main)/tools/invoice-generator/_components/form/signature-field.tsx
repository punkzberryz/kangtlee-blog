"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SignatureCanvas from "react-signature-canvas";
import { Button, buttonVariants } from "@/components/ui/button";
import { ImageUp, PenIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { InvoiceFormSchema } from "./invoice-schema";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
interface SignatureFieldProps {
  form: UseFormReturn<InvoiceFormSchema>;
}
export const SignatureField = ({ form }: SignatureFieldProps) => {
  const [openCanvas, setOpenCanvas] = useState(false);
  const [signatureImg, setSignatureImg] = useState<string | null>("");
  const [error, setError] = useState(false);

  const onImageInputChange = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    if (!files || files?.length === 0) return;
    const file = files[0];
    if (file.size > MAX_IMAGE_SIZE) {
      setError(true);
      setSignatureImg(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setSignatureImg(url);
    form.setValue("authorizedBy.signatureUrl", url);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError(false);
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    const file = e.dataTransfer.files[0];
    if (file.size > MAX_IMAGE_SIZE) {
      setError(true);
      setSignatureImg(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setSignatureImg(url);
    form.setValue("authorizedBy.signatureUrl", url);
  };
  return (
    <>
      {/* Signature */}
      <div
        className="group overflow-hidden"
        onDrop={handleOnDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          className="sr-only"
          id="signature-image-input"
          hidden
          type="file"
          accept="image/*"
          onChange={onImageInputChange}
        />
        <label
          htmlFor="signature-image-input"
          className="relative flex h-[200px] w-[350px] cursor-pointer flex-col items-start rounded-xl bg-blue-50"
        >
          {/* Image */}
          {signatureImg ? (
            // eslint-disable-next-line
            <img
              src={signatureImg}
              alt="signature"
              className="h-full w-full rounded-3xl object-contain"
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-center space-y-2 p-10 text-center text-gray-500 group-hover:text-gray-400">
              <p className="text-3xl">_ลายเซ็น_</p>
              <div className="text-base font-light">
                <p>(ลากรูปลงช่อง หรือกดปุ่มเพื่ออัพโหลดรูป)</p>
                <p>(หรือเซ็นลายเซ็นด้วยการคลิก และลาก)</p>
              </div>
            </div>
          )}
          {/* Action buttons */}
          <div className="absolute right-0 flex flex-col space-y-4 p-4 opacity-0 transition group-hover:opacity-100">
            <label
              className={buttonVariants({
                variant: "default",
                size: "icon",
                className: "h-fit w-fit cursor-pointer p-2",
              })}
              htmlFor="signature-image-input"
            >
              <ImageUp className="h-5 w-5" />
            </label>
            <Button
              type="button"
              size="icon"
              className="h-fit w-fit p-2"
              onClick={() => setOpenCanvas(true)}
            >
              <PenIcon className="h-5 w-5" />
            </Button>
          </div>
        </label>
        {error && (
          <p className="text-center font-semibold text-red-400">
            ขนาดรูปต้องไม่เกิน 5MB
          </p>
        )}
      </div>
      {/* Modal */}
      <SignatureCanvasDialog
        openCanvas={openCanvas}
        setOpenCanvas={setOpenCanvas}
        setSignature={(url) => {
          if (!url) return;
          setSignatureImg(url);
          form.setValue("authorizedBy.signatureUrl", url);
        }}
      />
    </>
  );
};

interface SignatureCanvasDialogProps {
  openCanvas: boolean;
  setOpenCanvas: React.Dispatch<React.SetStateAction<boolean>>;
  setSignature: (url: string | null) => void;
}
const SignatureCanvasDialog = ({
  openCanvas,
  setOpenCanvas,
  setSignature,
}: SignatureCanvasDialogProps) => {
  const signatureRef = React.useRef<SignatureCanvas>(null);
  const handleConfirm = () => {
    if (!signatureRef.current) return;
    setSignature(signatureRef.current.toDataURL());
    setOpenCanvas(false);
  };
  return (
    <Dialog open={openCanvas} onOpenChange={setOpenCanvas}>
      <DialogContent className="max-w-xl overflow-x-auto">
        <DialogHeader>
          <DialogTitle>ลายเซ็น</DialogTitle>
          <DialogDescription>
            โปรดตลิก และลากเพื่อเซ็นชื่อของคุณ และกดยืนยันเมื่อเสร็จ
          </DialogDescription>
        </DialogHeader>
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className:
              "cursor-[url(http://icons.iconarchive.com/icons/designcontest/vintage/32/Patent-Pen-icon.png)_0_30,progress] bg-red-50 mx-auto rounded-xl bg-blue-50",
          }}
        />
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => signatureRef.current?.clear()}
          >
            ลบ
          </Button>
          <Button type="button" onClick={handleConfirm}>
            ยืนยัน
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
