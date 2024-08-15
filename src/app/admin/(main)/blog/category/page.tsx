import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FetchData } from "./_components/fetch-data";

const PostCategoriesPage = () => {
  return (
    <PageWrapper
      title="จัดการหมวดหมู่ | Category"
      links={[
        {
          href: "/admin",
          title: "Dashboard",
        },
        {
          href: "/admin/blog",
          title: "Blog",
        },
        {
          href: "#",
          title: "Category",
        },
      ]}
    >
      <div className="flex items-center justify-between">
        <CardTitle>รายการหมวดหมู่บทความ</CardTitle>
        <Link href="/admin/blog/category/new" className={buttonVariants()}>
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:block">สร้างใหม่</span>
        </Link>
      </div>
      <FetchData />
    </PageWrapper>
  );
};

export default PostCategoriesPage;
export const metadata = {
  title: "หมวดหมู่ | Category",
  description: "หมวดหมู่บทความ",
};
