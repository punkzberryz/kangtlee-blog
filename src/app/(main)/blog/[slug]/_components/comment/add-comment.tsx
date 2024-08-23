"use client";
import { UseFormReturn } from "react-hook-form";
import { AddCommentForm } from "./add-comment-form";
import { AddCommentSchema } from "./add-comment-schema";

interface AddCommentProps {
  loading: boolean;
  form: UseFormReturn<AddCommentSchema>;
  handleSubmit: (data: AddCommentSchema, parentId: string | null) => void;
}
export const AddComment = (props: AddCommentProps) => {
  return (
    <div className="flex flex-col items-start gap-4 space-y-4 py-10">
      <div className="space-y-2">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          เพิ่มคอมเมนท์
        </h4>
        <p className="text-gray-500">
          อีเมลของคุณจะถูกซ่อน เพื่อไม่ให้คนอื่นรบกวน 😊
        </p>
      </div>
      <AddCommentForm {...props} />
    </div>
  );
};
