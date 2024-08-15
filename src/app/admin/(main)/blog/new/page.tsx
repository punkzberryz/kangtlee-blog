import { getPost } from "@/app/(main)/blog/_components/fetch-post";
import { UploadNewBlog } from "./_components/upload-new-blog";
import { NewBlogClient } from "./_components/new-blog-client";
import { PageWrapper } from "@/components/navbar/admin-sidenav/page-wrapper";

const NewBlogPage = async () => {
  const post = await getPost("welcome");

  return (
    <PageWrapper
      title="เขียนบทความ | Write new blog"
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
          title: "New",
        },
      ]}
    >
      <NewBlogClient />
      <div>{/* <UploadNewBlog /> */}</div>
    </PageWrapper>
  );
};

export default NewBlogPage;
