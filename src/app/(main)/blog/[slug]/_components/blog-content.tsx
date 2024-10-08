import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { GetPostResponse } from "../../_components/fetch-post";
import { formatDateToThaiDate } from "@/lib/format/format-date";
import { DotIcon } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import "katex/dist/katex.min.css";
import "./blog.css";
import { TagsSection } from "./tags-section";
import { ContentWithLatex } from "./content-with-latex";

interface BlogContentProps {
  post: GetPostResponse;
}

export const BlogContent = ({ post }: BlogContentProps) => {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-8">
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-center font-bold">{post.title}</h1>
        <div className="flex items-center space-x-2">
          <AuthorAvatar author={post.author} />
          <DotIcon className="h-6 w-6" />
          <div className="text-center text-sm text-gray-500">
            อัพเดทล่าสุดวันที่ {formatDateToThaiDate(post.updatedAt)}
          </div>
        </div>
      </header>
      {/* Hero-image */}
      {/* <HeroImage alt={post.title} imgUrl={post.imgUrl} /> */}
      <div className="mx-12 w-fit overflow-hidden rounded-lg">
        <Image alt={post.title} src={post.imgUrl} height={630} width={1200} />
      </div>
      {/* Body */}
      <ContentWithLatex>
        <div
          className="ProseMirror prose-headings:font-title font-default prose prose-lg -mx-2.5 w-screen dark:prose-invert focus:outline-none md:mx-auto md:w-full md:max-w-screen-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </ContentWithLatex>
      {/* Author Card */}
      <AuthorCard author={post.author} />
      {/* Tags */}
      <TagsSection tags={post.TagsOnPosts.map((t) => t.tag)} />
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
      <div className="flex w-full gap-4 rounded-md border p-10 shadow-md dark:border-primary dark:shadow-lg dark:shadow-primary">
        {author.imgUrl ? (
          <div className="mt-8 h-fit overflow-hidden rounded-md">
            <Image
              className="object-contain"
              alt={author.displayName}
              src={author.imgUrl}
              height={100}
              width={100}
            />
          </div>
        ) : (
          <div className="h-[100px] w-[100px]"></div>
        )}
        <div>
          <div className="w-fit">
            <Separator className="my-4 border-2 border-primary" />
            <h2>{author.displayName}</h2>
          </div>
          <p className="whitespace-pre-wrap">{author.bio}</p>
        </div>
      </div>
    </div>
  );
};
function getThumbnailUrl(url: string) {
  return url.replace(/\.webp/, ".th.webp");
}
const HeroImage = ({ imgUrl, alt }: { imgUrl: string; alt: string }) => {
  const thumbnail = getThumbnailUrl(imgUrl);

  return (
    <div className="mx-12 w-fit overflow-hidden rounded-lg">
      <Image
        alt={alt}
        src={imgUrl}
        placeholder="blur"
        blurDataURL={thumbnail}
        height={630}
        width={1200}
        // priority
      />
    </div>
  );
};
