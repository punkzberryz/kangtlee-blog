import { Metadata } from "next";
import { FetchBlogPage } from "../blog/_components/fetch-blog-page";

const BlogsPage = () => {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-10">
      <h1>บทความ</h1>
      <FetchBlogPage pageId={1} />
    </div>
  );
};

export default BlogsPage;
export const metadata: Metadata = {
  title: "บทความ",
  description:
    "สวัสดีครับ ผม KangTLee ผมชอบเขียนบทความเกี่ยวกับ Web development และ Lifestyle ครับ",
};
