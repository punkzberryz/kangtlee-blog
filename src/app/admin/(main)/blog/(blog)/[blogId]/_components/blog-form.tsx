"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { postSchema, PostSchema } from "../../_components/post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CustomInputField } from "@/components/custom-form-fields";
import {
  CustomCheckboxField,
  CustomCheckboxWrapper,
} from "@/components/custom-form-fields/custom-checkbox-field";
import { Editor } from "@/components/editor/editor";
import { ImageUrlField } from "./image-url-field";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePostStore } from "@/app/hooks/use-post-store";
import { createPost } from "../../_components/post-action";
import { toast } from "react-toastify";
import { Post, PostCategory, PostTag } from "@prisma/client";
import { CustomSelectBoxField } from "@/components/custom-form-fields/custom-select-field";
import { CustomTextAreaField } from "@/components/custom-form-fields/custom-textarea-field";
import { FetchPostById } from "../../_components/fetch-data";

interface BlogFormProps {
  isNew?: boolean;
  title: string;
  categories: PostCategory[];
  tags: PostTag[];
  initialData: FetchPostById | null;
}
export const BlogForm = ({
  categories,
  initialData,
  tags,
  title,
  isNew,
}: BlogFormProps) => {
  const { form, onSubmit, saveStatus, setSaveStatus } = useBlogState({
    initialData,
  });
  const { post } = usePostStore();
  useEffect(() => {
    if (!post.htmlContent || !isNew) return;
    if (isNew) {
      form.setValue("htmlContent", post.htmlContent);
    }
  }, [post.htmlContent, isNew, form]);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)}>
          <div className="space-y-4">
            <CustomInputField
              control={form.control}
              name="title"
              label="Title"
            />
            <CustomTextAreaField
              control={form.control}
              name="description"
              label="Description"
            />
            <CustomInputField
              control={form.control}
              name="keywords"
              label="Keywords"
            />
            <ImageUrlField control={form.control} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <CustomSelectBoxField
                control={form.control}
                name="categoryId"
                label="หมวดหมู่"
                options={categories.map((cat) => ({
                  label: cat.name,
                  value: cat.id.toString(),
                }))}
                emptyPlaceholder="ไม่พบหมวดหมู่"
                placeholder="เลือกหมวดหมู่..."
                inputPlaceholder="ค้นหาหมวดหมู่"
              />
              <CustomSelectBoxField
                control={form.control}
                name="tagIds"
                label="tags"
                options={tags.map((tag) => ({
                  label: tag.name,
                  value: tag.id.toString(),
                }))}
                emptyPlaceholder="ไม่พบ tag"
                placeholder="เลือก tag ..."
                inputPlaceholder="ค้นหา tag"
                multiple
              />
            </div>
            <CustomCheckboxWrapper label="ตีพิมพ์">
              <CustomCheckboxField
                control={form.control}
                label="Publish"
                name="isPublished"
              />
            </CustomCheckboxWrapper>
            <FormField
              control={form.control}
              name="htmlContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Editor
                      onUpdate={field.onChange}
                      saveStatus={saveStatus}
                      setSaveStatus={setSaveStatus}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-full lg:w-fit"
            disabled={saveStatus === "Unsaved"}
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

const useBlogState = ({
  initialData,
}: {
  initialData: FetchPostById | null;
}) => {
  const { setPost } = usePostStore();
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Unsaved">("Saved");
  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    //TODO: a bug where on initial load, htmlContent is empty while cache is not
    defaultValues: {
      description: initialData?.description || "",
      title: initialData?.title || "",
      htmlContent: initialData?.content || "",
      keywords: initialData?.keywords || "",
      categoryId: initialData?.categoryId.toString() || "",
      tagIds: initialData?.tags.map((t) => t.id.toString()) || [],
      isPublished: initialData?.isPublished || false,
      imgUrl: initialData?.imgUrl || "",
    },
  });
  const onSubmit = async (data: PostSchema) => {
    const { error, post } = await createPost({ data });
    if (error) {
      console.error({ error });
      toast.error("เกิดข้อผิดพลาดในการสร้างบทความ");
      return;
    }
    toast.success("สร้างบทความสำเร็จ");
    console.log({ post });
    setPost({ htmlContent: "" });
  };
  return { form, onSubmit, saveStatus, setSaveStatus };
};

const onSubmitError = (err: FieldErrors<PostSchema>) => {};
