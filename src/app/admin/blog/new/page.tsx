import { getPost } from "@/app/(main)/blog/_components/fetch-post";
import { Tiptap } from "./_components/tiptap";

const NewBlogPage = async () => {
  const post = await getPost("welcome");
  return (
    <div className="h-svh bg-red-50 p-20">
      <h1>Create New Blog</h1>
      <div className="h-full rounded-md border border-blue-500 p-6">
        <Tiptap content={post?.body} />
      </div>
    </div>
  );
};

export default NewBlogPage;
