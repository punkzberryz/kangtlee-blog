"use client";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { signUpSchema, SignUpSchema } from "./signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminSecretField } from "./admin-secret-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GoogleIcon, LineIcon } from "@/lib/icons";
export const SignUpForm = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { adminSecret: "" },
  });

  const handleSignUp = async (type: "Google" | "LINE") => {
    const secret = form.getValues("adminSecret");
    if (type === "Google") {
      router.push(`/admin/signin/google?secret=${secret}`);
      return;
    }
    router.push(`/admin/signin/line?secret=${secret}`);
    return;
  };

  const handleFormSubmit = async (data: SignUpSchema) => {
    setOpenDialog(true);
  };
  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เลือกวิธีเข้าสู่ระบบ</DialogTitle>
            <DialogDescription>
              เลือกวิธีเข้าสู่ระบบด้วย LINE หรือ Google
            </DialogDescription>
            <div className="flex w-full flex-col gap-4">
              <Button onClick={() => handleSignUp("Google")}>
                <GoogleIcon />
                <span className="w-40 pl-2">เข้าสู่ระบบด้วย Google</span>
              </Button>

              <Button onClick={() => handleSignUp("LINE")}>
                <LineIcon />
                <span className="w-40 pl-2">เข้าสู่ระบบด้วย Google</span>
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
          className="flex flex-col space-y-4"
        >
          <AdminSecretField form={form} />
          <Button>ยืนยัน</Button>
        </form>
      </Form>
    </>
  );
};

const handleFormError = (error: FieldErrors<SignUpSchema>) => {};
