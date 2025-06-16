import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";
import { BadRequestError } from "@/lib/error";
import { FetchData } from "./_components/fetch-data";

interface TagByIdPageProps {
  params: Promise<{ tagId: string }>;
}
const TagByIdPage = async (props: TagByIdPageProps) => {
  const params = await props.params;
  const isNew = params.tagId === "new";
  const title = `${isNew ? "สร้าง" : "แก้ไข"}หมวดหมู่ | Tag`;
  //validate tagId is number
  const tagId = isNew ? 0 : parseInt(params.tagId);
  if (isNaN(tagId)) throw new BadRequestError();

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
          href: "/admin/blog/tag",
          title: "Tag",
        },
        {
          href: "#",
          title: `${isNew ? "New" : "Edit"} Tag`,
        },
      ]}
      options={{ hasMaxWidth: true }}
    >
      <FetchData tagId={tagId} title={title} isNew={isNew} />
    </PageWrapper>
  );
};
export default TagByIdPage;

export async function generateMetadata(props: TagByIdPageProps) {
  const params = await props.params;
  const title = `${params.tagId === "new" ? "สร้าง" : "แก้ไข"} tag | Tag`;
  return {
    title,
    description: "สร้างหรือแก้ไข tag ของบทความ",
  };
}
