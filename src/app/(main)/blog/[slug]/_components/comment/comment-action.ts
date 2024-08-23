"use server";

import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { addCommentSchema, AddCommentSchema } from "./add-comment-schema";
import { BadRequestError } from "@/lib/error";
import { db } from "@/lib/db";

export const addCommentAction = ({
  data,
  postId,
  parentId,
}: {
  data: AddCommentSchema;
  postId: number;
  parentId: null | string;
}) => {
  try {
    //validate body
    if (!postId) throw new BadRequestError("Post ID is required");
    const parse = addCommentSchema.safeParse(data);
    if (!parse.success) throw new BadRequestError("invalid body");
    if (data.phone !== "") return {};
    if (!parentId) {
      //create comment
      const comment = db.comment.create({
        data: {
          comment: data.comment,
          email: data.email,
          name: data.name,
          website: data.website,
          postId: postId,
        },
      });
      return { comment };
    }
    //has parent, let's check if it exists
    const parentComment = db.comment.findUnique({
      where: {
        id: parentId,
      },
    });
    if (!parentComment) throw new BadRequestError("parent comment not found");
    //create child comment
    const comment = db.comment.create({
      data: {
        comment: data.comment,
        email: data.email,
        name: data.name,
        website: data.website,
        postId: postId,
        parentId,
      },
    });
    return { comment };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const getAllCommentsAction = async ({ postId }: { postId: number }) => {
  try {
    const comments = await db.comment.findMany({
      where: {
        postId: postId,
        parentId: null,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        children: true,
      },
    });
    return { comments };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
