import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { CardTitle } from "@/components/ui/card";
import { FetchData } from "./_components/fetch-data";

const AuthorPage = () => {
  return (
    <PageWrapper
      links={[
        {
          href: "/admin",
          title: "Dashboard",
        },
        { href: "#", title: "Author" },
      ]}
      title="จัดการผู้เขียนบทความ | Author"
    >
      <div className="flex items-center justify-between">
        <CardTitle>รายชื่อผู้เขียนบทความ</CardTitle>
      </div>
      <FetchData />
    </PageWrapper>
  );
};

export default AuthorPage;
export const metadata = {
  title: "ผู้เขียน | Author",
  description: "ผู้เขียนบทความ",
};
