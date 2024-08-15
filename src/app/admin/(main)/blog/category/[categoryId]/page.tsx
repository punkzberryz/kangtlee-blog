import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { BadRequestError } from "@/lib/error";
import { FetchData } from "./_components/fetch-data";

interface CategoryByIdPageProps {
  params: { categoryId: string };
}
const CategoryByIdPage = ({ params }: CategoryByIdPageProps) => {
  const isNew = params.categoryId === "new";
  const title = `${isNew ? "สร้าง" : "แก้ไข"}หมวดหมู่ | Category`;
  //validate categoryId is number
  const categoryId = isNew ? 0 : parseInt(params.categoryId);
  if (isNaN(categoryId)) throw new BadRequestError();

  return (
    <PageWrapper
      title={title}
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
          href: "/admin/blog/category",
          title: "Category",
        },
        {
          href: "#",
          title: `${isNew ? "New" : "Edit"} Category`,
        },
      ]}
      options={{ hasMaxWidth: true }}
    >
      <FetchData categoryId={categoryId} title={title} isNew={isNew} />
    </PageWrapper>
  );
};
export default CategoryByIdPage;

export function generateMetadata({ params }: CategoryByIdPageProps) {
  const title = `${params.categoryId === "new" ? "สร้าง" : "แก้ไข"}หมวดหมู่ | Category`;
  return {
    title,
    description: "สร้างหรือแก้ไขหมวดหมู่บทความ",
  };
}
