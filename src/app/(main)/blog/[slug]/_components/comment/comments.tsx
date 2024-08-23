"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCommentsAction } from "./comment-action";
import { formatDateToThaiDate } from "@/lib/format/format-date";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AddComment } from "./add-comment";
import { Separator } from "@/components/ui/separator";
import { useAddCommentForm } from "./use-add-comment-form";
import { Comment } from "@prisma/client";
import { cn } from "@/lib/utils";

interface CommentsProps {
  postId: number;
}
export const Comments = ({ postId }: CommentsProps) => {
  const { data, refetch, isLoading } = useComments(postId);
  const addCommentProps = useAddCommentForm(postId, refetch);

  if (isLoading) return null;
  if (!data || !data.length) return <AddComment {...addCommentProps} />;
  return (
    <>
      <div className="mt-10 flex flex-col items-start gap-4 space-y-4">
        <h4 className="text-xl font-semibold text-primary">
          คอมเมนท์ ({data.length})
        </h4>
        <ul className="space-y-8">
          {data.map((comment) => (
            <li key={comment.id} className="space-y-4">
              <CommentDisplay comment={comment} />
              {comment.children.length > 0 && (
                <ul className="space-y-4 py-2">
                  {comment.children.map((comment) => (
                    <CommentDisplay
                      key={comment.id}
                      comment={comment}
                      className="ml-4"
                    />
                  ))}
                </ul>
              )}
              <Separator />
            </li>
          ))}
        </ul>
      </div>

      <AddComment {...addCommentProps} />
    </>
  );
};

const CommentDisplay = ({
  comment,
  className,
}: {
  comment: Comment;
  className?: string;
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {comment.website ? (
        <Link
          href={comment.website}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline"
        >
          <p className="text-xl font-semibold">{comment.name}</p>
        </Link>
      ) : (
        <p className="text-xl font-semibold">{comment.name}</p>
      )}
      <p className="text-sm text-gray-500">
        {formatDateToThaiDate(comment.createdAt, {
          format: "dd-LLLL-yyyy - HH:mm น.",
        })}
      </p>
      <p className="whitespace-pre-wrap">{comment.comment}</p>
      {comment.parentId ? null : (
        <Button variant="secondary" asChild size="sm">
          <Link
            href={`?parentId=${comment.id}&name=${comment.name}#add-comment`}
          >
            ตอบข้อความ
          </Link>
        </Button>
      )}
    </div>
  );
};

const useComments = (postId: number) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["getAllCommentsAction", postId],
    queryFn: async () => {
      const { comments, error } = await getAllCommentsAction({ postId });
      if (error) throw new Error(error.message);
      if (!comments) throw new Error("comments not found");
      return comments;
    },
  });
  return { data, refetch, isLoading };
};
