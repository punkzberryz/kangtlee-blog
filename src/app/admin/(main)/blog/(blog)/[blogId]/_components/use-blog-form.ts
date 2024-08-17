import { useEditorStore } from "@/components/editor";
import { FetchPostById } from "../../_components/fetch-data";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostSchema } from "../../_components/post-schema";
import { toast } from "react-toastify";
import {
  createPostAction,
  editPostAction,
} from "../../_components/post-action";
import { useRouter } from "next/navigation";

export const useBlogForm = ({
  initialData,
  isNew,
}: {
  initialData: FetchPostById | null;
  isNew: boolean | undefined;
}) => {
  const { setJSONContent, charCount } = useEditorStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),

    defaultValues: {
      description: initialData?.description || "",
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      htmlContent: initialData?.content || "",
      keywords: initialData?.keywords || "",
      categoryId: initialData?.categoryId.toString() || "",
      tagIds: initialData?.tags.map((t) => t.id.toString()) || [],
      isPublished: initialData?.isPublished || false,
      imgUrl: initialData?.imgUrl || "",
    },
  });
  const onSubmit = async (data: PostSchema) => {
    if (!charCount) {
      toast.error("กรุณาเพิ่มข้อมูล");
      form.setError("htmlContent", { message: "กรุณาเพิ่มข้อมูล" });
      return;
    }
    setLoading(true);

    if (isNew) {
      const { error, post } = await createPostAction({ data });
      setLoading(false);
      if (error) {
        toast.error("เกิดข้อผิดพลาดในการสร้างบทความ");
        return;
      }
      toast.success("สร้างบทความสำเร็จ");
      setJSONContent(null); //clear cache
      router.push(`/admin/blog/${post.id}`);
      router.refresh();
      return;
    }
    if (!initialData) {
      toast.error("ไม่พบข้อมูล");
      return;
    }
    //edit post
    const { error, post } = await editPostAction({ data, id: initialData.id });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการแก้ไขบทความ");
      return;
    }
    toast.success("แก้ไขบทความสำเร็จ");
    router.push(`/admin/blog/${post.id}`);
    router.refresh();
    return;
  };
  return {
    form,
    onSubmit,
    router,
    loading,
  };
};
