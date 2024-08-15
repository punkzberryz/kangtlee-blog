import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FetchData } from "./_components/fetch-data";

const PostBlogsPage = () => {
  return (
    <PageWrapper
      title="จัดการบทความ | Blog"
      links={[
        {
          href: "/admin",
          title: "Dashboard",
        },
        {
          href: "#",
          title: "Blog",
        },
      ]}
    >
      <div className="flex items-center justify-between">
        <CardTitle>รายการบทความ</CardTitle>
        <Link href="/admin/blog/new" className={buttonVariants()}>
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:block">สร้างใหม่</span>
        </Link>
      </div>
      <FetchData />
    </PageWrapper>
  );
};

export default PostBlogsPage;
export const metadata = {
  title: "บทความ | Blog",
  description: "จัดการบทความ",
};
