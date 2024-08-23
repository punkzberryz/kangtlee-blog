"use client";

import { UseFormReturn } from "react-hook-form";
import { AddCommentSchema } from "./add-comment-schema";

import { Form } from "@/components/ui/form";
import { CustomInputField } from "@/components/custom-form-fields";
import { CustomTextAreaField } from "@/components/custom-form-fields/custom-textarea-field";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface AddCommentFormProps {
  loading: boolean;
  form: UseFormReturn<AddCommentSchema>;
  handleSubmit: (data: AddCommentSchema, parentId: string | null) => void;
}

export const AddCommentForm = ({
  loading,
  form,
  handleSubmit,
}: AddCommentFormProps) => {
  const searchParams = useSearchParams();
  const parentId = searchParams.get("parentId");
  const name = searchParams.get("name");
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => handleSubmit(data, parentId))}
        className="flex w-full flex-col space-y-4"
        id="add-comment"
      >
        <ReplyCommentInfo name={name} parentId={parentId} />
        <div>
          <CustomInputField
            control={form.control}
            name="name"
            label="ชื่อ"
            required
          />
        </div>
        <div>
          <CustomInputField
            control={form.control}
            name="email"
            label="Email"
            type="email"
            required
          />
        </div>
        <div>
          <CustomInputField
            control={form.control}
            name="website"
            label="Website"
          />
        </div>
        <div>
          <CustomTextAreaField
            control={form.control}
            name="comment"
            label="ข้อความ"
            required
          />
        </div>
        <div className="hidden">
          {/* For bot filter */}
          <CustomInputField control={form.control} name="phone" label="Phone" />
        </div>
        {/* Button */}
        <div className="flex flex-col md:flex-row-reverse">
          <Button disabled={loading} className="md:min-w-[200px]">
            ส่งข้อความ
          </Button>
        </div>
      </form>
    </Form>
  );
};

const ReplyCommentInfo = ({
  name,
  parentId,
}: {
  parentId: string | null;
  name: string | null;
}) => {
  if (!parentId || !name) return null;
  return (
    <div className="flex items-center space-x-4">
      <p className="py-4 text-gray-500">
        คุณกำลังตอบข้อความของคุณ
        <span className="px-1 font-semibold text-primary">{name}</span>
      </p>
      <Button asChild className="" size="sm" variant="outline">
        <Link href="?parentId=&name=#add-comment">ยกเลิก</Link>
      </Button>
    </div>
  );
};
