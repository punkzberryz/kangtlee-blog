import { Metadata } from "next";
import { redirect } from "next/navigation";

const BlogsPage = () => {
  redirect("/");
};

export default BlogsPage;
export const metadata: Metadata = {
  title: "บทความ",
  description: "บทความทั้งหมด",
};
