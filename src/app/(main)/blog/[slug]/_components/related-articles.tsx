import { CancelMaxWidthWrapper } from "@/components/max-width-wrapper";
import { Post } from "@prisma/client";

interface RelatedArticlesProps {
  post: Post;
}
export const RelatedArticles = ({ post }: RelatedArticlesProps) => {
  return (
    <CancelMaxWidthWrapper className="bg-gray-400 px-2 md:px-20">
      <h4>บทความที่เกี่ยวข้อง</h4>
    </CancelMaxWidthWrapper>
  );
};
