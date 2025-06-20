import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { FetchData } from "./_components/fetch-data";

interface AuthorByIdPageProps {
  params: Promise<{ authorId: string }>;
}
const AuthorByIdPage = async (props: AuthorByIdPageProps) => {
  const params = await props.params;
  const title = "แก้ไขผู้เขียน | Author";

  return (
    <PageWrapper
      title={title}
      links={[
        {
          href: "/admin",
          title: "Dashboard",
        },
        {
          href: "/admin/author",
          title: "Author",
        },
        {
          href: "#",
          title: "Edit Author",
        },
      ]}
      options={{ hasMaxWidth: true }}
    >
      <FetchData authorId={params.authorId} title={title} />
    </PageWrapper>
  );
};
export default AuthorByIdPage;

export const metadata = {
  title: "แก้ไขผู้เขียน | Author",
  description: "สร้างหรือแก้ไขหมวดหมู่บทความ",
};
