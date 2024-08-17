"use client";

import { Control } from "react-hook-form";
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
import { AuthorSchema } from "../../_components/author-schema";

export const ImageUrlField = ({
  control,
}: {
  control: Control<AuthorSchema>;
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
        <InfoIcon className="size-3 text-edit" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>วิธีอัพโหลดรูป</DialogTitle>
          <DialogDescription>
            วิธีอัพโหลดรูปและ copy url ของรูป
          </DialogDescription>
        </DialogHeader>
        <div className="px-4">
          <ul className="list-decimal">
            {UPLOAD_INSTRUCTION.map((item, index) => (
              <li key={index}>{item.children}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const UPLOAD_INSTRUCTION = [
  {
    children: (
      <p>
        ตัดและตกแต่งรูปด้วย
        <Link
          href="https://www.canva.com/design/DAGIlAGKPJc/7SxW4rTv9dVQkfDS3YAbwA/edit?utm_content=DAGIlAGKPJc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "link" })}
        >
          Canva
        </Link>
        เพื่อให้ได้ขนาด 377x377 px
      </p>
    ),
  },
  {
    children: <p>Download รูป ที่ปุ่ม Share (มุมขวาบน)</p>,
  },
  {
    children: (
      <p>
        ลดขนากรูปด้วย
        <Link
          href="https://squoosh.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "link" })}
        >
          squoosh
        </Link>
        โดยเลือกโหมด Compress เป็น Webp
      </p>
    ),
  },
  {
    children: (
      <p>
        อัพโหลดรูปลงใน
        <Link
          href="https://pic.in.th/"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "link" })}
        >
          pic.in.th
        </Link>
      </p>
    ),
  },
  {
    children: <p>ก็อป Url จากหัวข้อ Link &gt; Direct</p>,
  },
];
