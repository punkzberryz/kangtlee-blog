"use client";

import { MainLayout } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  return (
    <MainLayout className="flex flex-col items-center gap-8 pt-28">
      <h1 className="text-2xl md:text-3xl">เกิดข้อผิดพลาด...</h1>
      <Button onClick={handleRetry} className="min-w-[150px]">
        ลองใหม่อีกครั้ง
      </Button>
      <Button asChild className="min-w-[150px]">
        <Link href="/">กลับไปยังหน้าหลัก</Link>
      </Button>
    </MainLayout>
  );
}
