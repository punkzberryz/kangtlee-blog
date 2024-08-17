"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FieldErrors, useForm } from "react-hook-form";
import { authorSchema, AuthorSchema } from "../../_components/author-schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingBars } from "@/components/ui/loading-bars";
import { CustomInputField } from "@/components/custom-form-fields";
import { CustomTextAreaField } from "@/components/custom-form-fields/custom-textarea-field";
import { ImageUrlField } from "./image-url-field";
import { editAuthorAction } from "../../_components/author-action";
interface AuthorFormProps {
  title: string;
  initialData: User;
}
export const AuthorForm = ({ initialData, title }: AuthorFormProps) => {
  const { form, onSubmit, loading, router } = useAuthorForm({ initialData });

  return (
    <>
      {/* Title */}
      <div className="flex items-center space-x-4">
        <h1 className="font-semibold md:text-3xl">{title}</h1>
      </div>
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
          className="flex flex-col space-y-4"
        >
          <CustomInputField
            control={form.control}
            name="displayName"
            label="ชื่อแสดง | Display name"
          />
          <CustomTextAreaField
            control={form.control}
            name="bio"
            label="ประวัติ | คำบรรยาย | Bio"
          />
          <ImageUrlField control={form.control} />
          {/* Buttons */}
          <div className="flex flex-col gap-4 md:flex-row-reverse">
            <Button type="submit" className="min-w-[150px]" disabled={loading}>
              {loading ? <LoadingBars /> : "บันทึก"}
            </Button>
            <Button
              className="min-w-[150px]"
              variant="secondary"
              onClick={() => router.push("/admin/author")}
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

const useAuthorForm = ({ initialData }: { initialData: User }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<AuthorSchema>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      displayName: initialData.displayName,
      bio: initialData.bio || "",
      imgUrl: initialData.imgUrl || "",
    },
  });
  const onSubmit = async (data: AuthorSchema) => {
    setLoading(true);
    const { error, author } = await editAuthorAction({
      data,
      id: initialData.id,
    });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการแก้ไขผู้เขียน");
      return;
    }
    toast.success("แก้ไขผู้เขียนสำเร็จ");
    router.push(`/admin/author/${author.id}`);
    router.refresh();
    return;
  };

  return { form, onSubmit, router, loading };
};
const onSubmitError = (error: FieldErrors<AuthorSchema>) => {
  toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
};
