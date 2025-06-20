import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { BadRequestError } from "@/lib/error";
import { FetchData } from "./_components/fetch-data";
interface BlogByIdPageProps {
  params: Promise<{ blogId: string }>;
}
const NewBlogPage = async (props: BlogByIdPageProps) => {
  const params = await props.params;
  const isNew = params.blogId === "new";
  const title = `${isNew ? "สร้าง" : "แก้ไข"}บทความ | Blog`;

  //validate productId is number
  const blogId = isNew ? 0 : parseInt(params.blogId);
  if (isNaN(blogId)) throw new BadRequestError();

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
          href: "#",
          title: `${isNew ? "New" : "Edit"} Blog`,
        },
      ]}
    >
      <FetchData blogId={blogId} title={title} isNew={isNew} />
    </PageWrapper>
  );
};

export default NewBlogPage;
export async function generateMetadata(props: BlogByIdPageProps) {
  const params = await props.params;
  const title = `${params.blogId === "new" ? "สร้าง" : "แก้ไข"}บทความ | Blog`;
  return {
    title,
    description: "เขียนหรือแก้ไขบทความ",
  };
}
