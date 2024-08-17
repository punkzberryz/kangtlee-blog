"use client";

import { FieldErrors } from "react-hook-form";
import { PostSchema } from "../../_components/post-schema";
import { Form } from "@/components/ui/form";
import { CustomInputField } from "@/components/custom-form-fields";
import {
  CustomCheckboxField,
  CustomCheckboxWrapper,
} from "@/components/custom-form-fields/custom-checkbox-field";
import { ImageUrlField } from "./image-url-field";
import { Button } from "@/components/ui/button";
import { PostCategory, PostTag } from "@prisma/client";
import { CustomSelectBoxField } from "@/components/custom-form-fields/custom-select-field";
import { CustomTextAreaField } from "@/components/custom-form-fields/custom-textarea-field";
import { FetchPostById } from "../../_components/fetch-data";
import { EditorField } from "./editor-field";
import { useBlogForm } from "./use-blog-form";
import { useEditorStore } from "@/components/editor";
import { LoadingBars } from "@/components/ui/loading-bars";
import { toast } from "react-toastify";
import { SlugField } from "./slug-field";

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
  const { form, onSubmit, loading, router } = useBlogForm({
    initialData,
    isNew,
  });
  const { isUnsaved } = useEditorStore();
  //TODO: keywords field, split words by comma
  //TODO: description,title max word
  //TODO: image upload info
  return (
    <>
      {/* Title */}
      <div className="flex items-center space-x-4">
        <h1 className="font-semibold md:text-3xl">{title}</h1>
      </div>
      {/* Form */}
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
              name="slug"
              label="Link บทความ"
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
            <EditorField
              form={form}
              initialContent={initialData?.content}
              isNew={isNew}
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row-reverse">
            <Button
              type="submit"
              className="min-w-[150px]"
              disabled={loading || isUnsaved}
            >
              {loading ? <LoadingBars /> : isNew ? "สร้าง" : "บันทึก"}
            </Button>
            <Button
              className="min-w-[150px]"
              variant="secondary"
              onClick={() => router.push("/admin/blog")}
              disabled={loading}
              type="button"
            >
              ยกเลิก
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

const onSubmitError = (err: FieldErrors<PostSchema>) => {
  toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
};
