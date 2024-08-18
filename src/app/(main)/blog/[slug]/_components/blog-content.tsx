import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { GetPostResponse } from "../../_components/fetch-post";
import { formatDateToThaiDate } from "@/lib/format/format-date";
import { DotIcon } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import "./blog.css";
interface BlogContentProps {
  post: GetPostResponse;
}
export const BlogContent = ({ post }: BlogContentProps) => {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-8">
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-center text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center space-x-2">
          <AuthorAvatar author={post.author} />
          <DotIcon className="h-6 w-6" />
          <div className="text-center text-sm text-gray-500">
            อัพเดทล่าสุดวันที่ {formatDateToThaiDate(post.updatedAt)}
          </div>
        </div>
      </header>
      {/* Hero-image */}
      <div className="mx-12 w-fit overflow-hidden rounded-lg">
        <Image alt={post.title} src={post.imgUrl} height={630} width={1200} />
      </div>
      {/* Body */}
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className={cn(
          "ProseMirror",
          "prose-headings:font-title font-default prose prose-lg dark:prose-invert focus:outline-none",
          "mx-auto max-w-screen-lg",
        )}
      ></div>
      {/* Author Card */}

      <AuthorCard author={post.author} />
    </div>
  );
};

const AuthorAvatar = ({ author }: { author: GetPostResponse["author"] }) => {
  if (!author) return null;
  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src={author.imgUrl || ""} alt={author.displayName} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <span className="font-semibold">{author.displayName}</span>
    </div>
  );
};
const AuthorCard = ({ author }: { author: GetPostResponse["author"] }) => {
  if (!author) return null;
  return (
    <div className="w-full px-12">
      <div className="flex w-full gap-4 rounded-md border p-10 shadow-md">
        {author.imgUrl ? (
          <Image
            alt={author.displayName}
            src={author.imgUrl}
            height={100}
            width={100}
          />
        ) : (
          <div className="h-[100px] w-[100px]"></div>
        )}
        <div>
          <div className="w-fit">
            <Separator className="my-4 border-2 border-primary" />
            <h2>{author.displayName}</h2>
          </div>
          <p>{author.bio}</p>
        </div>
      </div>
    </div>
  );
};
