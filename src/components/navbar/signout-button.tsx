"use client";
import { LogOut } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import React, { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LoadingBars } from "../ui/loading-bars";
import { toast } from "react-toastify";

export const SignOutDropdownItem = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <DropdownMenuItem
      disabled={loading}
      className="hover:cursor-pointer"
      onClick={() => handleSignout(router, setLoading)}
    >
      <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
      {loading ? <LoadingBars className="h-6 w-6" /> : <span>ออกจากระบบ</span>}
    </DropdownMenuItem>
  );
};

async function handleSignout(
  router: ReturnType<typeof useRouter>,
  setLoading: (loading: boolean) => void,
) {
  setLoading(true);
  const resp = await fetch("/admin/signout", {
    method: "GET",
    cache: "no-store",
  });
  setLoading(false);
  if (!resp.ok) {
    console.error({
      status: resp.status,
      text: resp.statusText,
      data: await resp.json(),
    });
    toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
    return;
  }
  toast.success("ออกจากระบบสำเร็จ");
  router.push("/");
  router.refresh();
  return;
}
