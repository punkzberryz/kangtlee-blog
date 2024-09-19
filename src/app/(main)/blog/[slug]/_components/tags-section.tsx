import { Badge } from "@/components/ui/badge";
import { PostTag } from "@prisma/client";
import Link from "next/link";

interface TagsSectionProps {
  tags: PostTag[];
}
export const TagsSection = ({ tags }: TagsSectionProps) => {
  if (tags.length === 0) return null;

  return (
    <section id="tags" className="mx-auto w-full max-w-screen-lg">
      <div className="mx-12 flex space-x-4">
        <div>Tags:</div>
        <div className="flex flex-wrap gap-4">
          {tags.map((t) => (
            <Link href={`/blog/tags/${t.name}`} key={t.id}>
              <Badge>{t.name}</Badge>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
