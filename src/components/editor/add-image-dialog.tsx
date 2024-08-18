"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { z } from "zod";
import { useAddImageEditorDialog } from "./use-add-image-editor-dialog-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useEditor } from "novel";

const imageUrlSchema = z.object({
  url: z
    .string()
    .min(1)
    .regex(/https?:\/\/.*.pic\.in\.th\/.*\.(?:png|jpg|jpeg|webp|svg)/, {
      message: "Url ที่ใช้จะต้องเป็นรูปจาก pic.in.th เท่านั้น",
    }),
});

export const AddImageDialog = () => {
  const { editor } = useEditor();
  const { open, setOpen } = useAddImageEditorDialog();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageCaptionRef = useRef<HTMLInputElement>(null);
  // const { editor } = useEditor();
  const handleSubmit = () => {
    if (!imageInputRef.current) return;
    const url = imageInputRef.current.value;
    const alt = imageCaptionRef.current?.value;
    if (url === "" || !url) {
      toast.error("กรุณาใส่ Url ของรูปภาพ");
      return;
    }
    const parse = imageUrlSchema.safeParse({ url });
    if (!parse.success) {
      toast.error(parse.error.errors[0].message);
      return;
    }

    editor?.chain().focus().setImage({ src: url, alt, title: alt }).run();
    toast.success("เพิ่มรูปภาพเรียบร้อยแล้ว");
    setOpen(false);
  };
  if (!editor) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>เพิ่มรูปจาก Url</DialogTitle>
          <DialogDescription>
            <span>ใส่ Url ของรูปภาพที่ต้องการเพิ่ม</span>
            <span>
              url ที่ใช้จะต้องเป็นรูปจาก
              <Link
                href="https://pic.in.th/"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "link" })}
              >
                pic.in.th
              </Link>
              เท่านั้น
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Label htmlFor="img-url">Image Url</Label>
          <Input id="img-url" ref={imageInputRef} />
        </div>
        <div className="space-y-4">
          <Label htmlFor="img-url">Image Caption</Label>
          <Input
            id="img-url"
            ref={imageCaptionRef}
            placeholder="A yellow crocodile"
          />
        </div>
        <Button onClick={handleSubmit} type="button">
          ยืนยัน
        </Button>
        <Button
          variant="secondary"
          onClick={() => setOpen(false)}
          type="button"
        >
          ยกเลิก
        </Button>
      </DialogContent>
    </Dialog>
  );
};
