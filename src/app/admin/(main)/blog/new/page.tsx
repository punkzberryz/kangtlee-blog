import { getPost } from "@/app/(main)/blog/_components/fetch-post";
import { Editor } from "@/components/editor/editor";
import { UploadNewBlog } from "./_components/upload-new-blog";
import { NewBlogClient } from "./_components/new-blog-client";

const NewBlogPage = async () => {
  const post = await getPost("welcome");

  return (
    <div className="h-svh p-20">
      <h1>Create New Blog</h1>
      <NewBlogClient />
      <div className="mb-10 rounded-md border border-blue-500 p-6">
        <Editor />
      </div>
      <div>
        <UploadNewBlog />
      </div>
    </div>
  );
};

export default NewBlogPage;
