import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FetchData } from "./_components/fetch-data";

const PostTagsPage = () => {
  return (
    <PageWrapper
      title="จัดการ Tag | Tag"
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
          title: "Tag",
        },
      ]}
    >
      <div className="flex items-center justify-between">
        <CardTitle>รายการ Tag</CardTitle>
        <Link href="/admin/blog/tag/new" className={buttonVariants()}>
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:block">สร้างใหม่</span>
        </Link>
      </div>
      <FetchData />
    </PageWrapper>
  );
};

export default PostTagsPage;
export const metadata = {
  title: "Tag",
  description: "จัดการ Tag สำหรับบทความ",
};
