import { MainLayout } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <MainLayout className="flex flex-col items-center gap-8 pt-28">
      <h1 className="text-2xl md:text-3xl">ไม่พบหน้าที่คุณต้องการเข้าถึง...</h1>
      <Button asChild>
        <Link href="/">กลับไปยังหน้าหลัก</Link>
      </Button>
    </MainLayout>
  );
};

export default NotFound;
