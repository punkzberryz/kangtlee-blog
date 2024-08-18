import { Post } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPreviewItemProps {
  post: Post;
}
export const BlogPreviewItem = ({ post }: BlogPreviewItemProps) => {
  const href = `/blog/${post.slug}`;

  return (
    <li className="group flex w-[350px] flex-col items-center gap-4 overflow-clip rounded-xl border shadow-xl dark:border-primary dark:shadow-primary/30">
      <Link href={href}>
        <Image
          className="aspect-[4/3] w-[350px] rounded-none object-cover"
          src={post.imgUrl}
          alt={post.title}
          width={350}
          height={350}
        />
      </Link>
      <div className="relative px-4 py-10">
        <Link href={href}>
          <p className="text-center text-xl font-semibold">{post.title}</p>
        </Link>
        <div className="relative h-24 overflow-hidden">
          <div
            className="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-background"
            aria-hidden
          ></div>
          <p className="text-base leading-snug">{post.description}</p>
        </div>
        <Link
          className="absolute font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          href={href}
        >
          <div className="flex space-x-2">
            <span className="">อ่านเพิ่ม</span>
            <ArrowRight className="w-4 transition-transform duration-500 group-hover:translate-x-2" />
          </div>
        </Link>
      </div>
    </li>
  );
};
