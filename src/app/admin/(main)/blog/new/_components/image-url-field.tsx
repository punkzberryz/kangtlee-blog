"use client";

import { Control, UseFormReturn } from "react-hook-form";
import { PostSchema } from "./post-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const ImageUrlField = ({
  control,
}: {
  control: Control<PostSchema>;
}) => {
  return (
    <FormField
      control={control}
      name="imgUrl"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-end space-x-2 overflow-x-clip pb-1">
            <FormLabel className="text-nowrap">Image url</FormLabel>
            <ImageUploadTip />
          </div>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ImageUploadTip = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <InfoIcon className="text-edit size-3" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>วิธีอัพโหลดรูป</DialogTitle>
          <DialogDescription>
            วิธีอัพโหลดรูปและ copy url ของรูป
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <p>1. ตัดและตกแต่งรูป เพื่อให้ได้ขนาด 1200x630 px</p>
            <p>2. Download รูป</p>
            <p>
              2. เข้าไปที่
              <Link
                href="pic.in.th"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "link" })}
              >
                pic.in.th
              </Link>
              เพื่ออัพโหลดรูป
            </p>
            <div>
              <p>3. ก็อป Url</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
