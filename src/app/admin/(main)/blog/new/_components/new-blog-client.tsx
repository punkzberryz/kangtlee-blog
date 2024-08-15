"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { postSchema, PostSchema } from "./post-schema";
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
import { useState } from "react";
import { usePostStore } from "@/app/hooks/use-post-store";
import { createPost } from "./post-action";
import { toast } from "react-toastify";

export const NewBlogClient = () => {
  const { form, onSubmit, saveStatus, setSaveStatus } = useBlogState();
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
            <CustomInputField
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

const useBlogState = () => {
  const { setPost } = usePostStore();
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Unsaved">("Saved");
  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      description: "",
      title: "",
      htmlContent: "",
      keywords: "",
      isPublished: false,
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
