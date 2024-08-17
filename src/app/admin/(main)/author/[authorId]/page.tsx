import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { FetchData } from "./_components/fetch-data";

interface AuthorByIdPageProps {
  params: { authorId: string };
}
const AuthorByIdPage = ({ params }: AuthorByIdPageProps) => {
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
          href: "/admin/Author",
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
