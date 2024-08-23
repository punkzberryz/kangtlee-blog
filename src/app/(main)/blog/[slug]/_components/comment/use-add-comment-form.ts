import { useState } from "react";
import { addCommentSchema, AddCommentSchema } from "./add-comment-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCommentAction } from "./comment-action";
import { toast } from "react-toastify";

export const useAddCommentForm = (postId: number, refetch: () => void) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<AddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
      website: "",
      phone: "",
    },
  });
  const handleSubmit = async (
    data: AddCommentSchema,
    parentId: string | null,
  ) => {
    setLoading(true);
    const { error } = addCommentAction({ data, postId, parentId });
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการส่งข้อความ");
      return;
    }

    toast.success("ส่งข้อความสำเร็จ");
    //refetch comments data
    refetch();
    form.reset();
    setLoading(false);
  };
  return { form, handleSubmit, loading };
};
