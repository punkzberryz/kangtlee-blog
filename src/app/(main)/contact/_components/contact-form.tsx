"use client";

import { useForm } from "react-hook-form";
import { contachSchema, ContactSchema } from "./contact-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomInputField } from "@/components/custom-form-fields";
import { CustomTextAreaField } from "@/components/custom-form-fields/custom-textarea-field";
import { Button } from "@/components/ui/button";
import { sendContactEmailAction } from "./contact-action";
import { toast } from "react-toastify";
import { useState } from "react";

export const ContactForm = () => {
  const { form, onSubmit, loading, success } = useContactForm();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
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
          <CustomTextAreaField
            control={form.control}
            name="message"
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
          <Button disabled={loading || success} className="md:min-w-[200px]">
            ส่งข้อความ
          </Button>
        </div>
        {/* Success Message */}
        {success ? (
          <div className="space-y-2 rounded-md border border-green-400 p-6 text-green-600">
            <h2 className="font-semibold">ส่งข้อความสำเร็จ</h2>
            <p>
              เราได้รับข้อความของคุณแล้ว และทางเราจะทำการติดต่อกลับโดยเร็วที่สุด
              ขอขอบคุณในความสนใจ
            </p>
          </div>
        ) : null}
      </form>
    </Form>
  );
};
const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contachSchema),
    defaultValues: { name: "", email: "", message: "", phone: "" },
  });
  const onSubmit = async (data: ContactSchema) => {
    setLoading(true);
    const { error } = await sendContactEmailAction({ data });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการส่งข้อความ");
      return;
    }
    setSuccess(true);
    toast.success("ส่งข้อความสำเร็จ");
  };
  return { form, onSubmit, loading, success };
};
