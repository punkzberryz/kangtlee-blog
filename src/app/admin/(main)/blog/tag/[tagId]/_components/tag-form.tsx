"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostTag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { TagSchema, tagSchema } from "../../_components/tag-schema";
import { toast } from "react-toastify";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { CustomInputField } from "@/components/custom-form-fields";
import { LoadingBars } from "@/components/ui/loading-bars";
import {
  createNewTagAction,
  deleteTagAction,
  editTagAction,
} from "../../_components/tag-action";
interface TagFormProps {
  isNew?: boolean;
  title: string;
  initialData: PostTag | null;
}
export const TagForm = ({ initialData, title, isNew }: TagFormProps) => {
  const {
    form,
    openDeleteConfirm,
    setOpenDeleteConfirm,
    loading,
    onDelete,
    onSubmit,
    router,
  } = useTagForm({
    initialData,
  });
  return (
    <>
      {/* Delete Modal */}
      <DeleteConfirmModal
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        title="ยืนยันการลบ tag"
        description="การลบ tag จะไม่สามารถย้อนกลับได้ คุณแน่ใจหรือไม่ที่จะลบ tag นี้"
        loading={loading}
        onDelete={onDelete}
      />
      {/* Title */}
      <div className="flex items-center space-x-4">
        <h1 className="font-semibold md:text-3xl">{title}</h1>
        {isNew ? null : (
          <Button
            size="sm"
            onClick={() => setOpenDeleteConfirm(true)}
            variant="destructive"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (data) => onSubmit(data, isNew),
            onSubmitError,
          )}
          className="flex max-w-lg flex-col space-y-4"
        >
          <CustomInputField
            control={form.control}
            name="name"
            label="ชื่อ tag"
          />
          {/* Buttons */}
          <div className="flex flex-col gap-4 md:flex-row-reverse">
            <Button type="submit" className="min-w-[150px]" disabled={loading}>
              {loading ? <LoadingBars /> : isNew ? "สร้าง" : "บันทึก"}
            </Button>
            <Button
              className="min-w-[150px]"
              variant="secondary"
              onClick={() => router.push("/admin/blog/tag")}
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

const useTagForm = ({ initialData }: { initialData: PostTag | null }) => {
  const router = useRouter();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });
  const onDelete = async () => {
    if (!initialData) return;
    setLoading(true);
    const { error } = await deleteTagAction({ id: initialData.id });
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการลบ tag");
      setLoading(false);
      return;
    }
    toast.success("ลบ tag สำเร็จ");
    setLoading(false);
    router.push("/admin/blog/tag");
    router.refresh();
  };
  const onSubmit = async (data: TagSchema, isNew: boolean | undefined) => {
    setLoading(true);

    if (isNew) {
      const { error, tag } = await createNewTagAction({ data });
      setLoading(false);
      if (error) {
        toast.error("เกิดข้อผิดพลาดในการสร้าง tag");
        return;
      }
      toast.success("สร้าง tagสำเร็จ");
      router.push(`/admin/blog/tag/${tag.id}`);
      router.refresh();
      return;
    }
    if (!initialData) {
      toast.error("ไม่พบข้อมูล tag");
      return;
    }

    const { error, tag } = await editTagAction({
      data,
      id: initialData.id,
    });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการแก้ไข tag");
      return;
    }
    toast.success("แก้ไข tagสำเร็จ");
    router.push(`/admin/blog/tag/${tag.id}`);
    router.refresh();
    return;
  };
  return {
    form,
    openDeleteConfirm,
    setOpenDeleteConfirm,
    loading,
    onDelete,
    onSubmit,
    router,
  };
};
const onSubmitError = (error: FieldErrors<TagSchema>) => {
  toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
};
