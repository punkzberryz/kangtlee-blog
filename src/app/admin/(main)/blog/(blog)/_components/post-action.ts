"use server";

import { db } from "@/lib/db";
import { postSchema, PostSchema } from "./post-schema";
import {
  BadRequestError,
  UnauthorizedError,
  UnauthorizedMessageCode,
} from "@/lib/error";
import { validateRequest } from "@/lib/auth";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

export const createPostAction = async ({ data }: { data: PostSchema }) => {
  try {
    //validate data
    const parse = postSchema.safeParse(data);
    if (parse.error) throw new BadRequestError("invalid post body");
    const { categoryId, tagIds } = validateCategoryAndTagIds(data);
    //validate user
    const { user } = await validateRequest();
    if (!user)
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    const {
      description,
      htmlContent,
      isPublished,
      keywords,
      title,
      imgUrl,
      slug,
    } = data;
    const post = await db.post.create({
      data: {
        title,
        keywords,
        isPublished,
        description,
        content: htmlContent,
        imgUrl,
        slug,
        categoryId,
        authorId: user.id,
        TagsOnPosts: {
          createMany: {
            data: [...tagIds.map((id) => ({ tagId: id }))],
          },
        },
      },
    });

    return { post };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
export const editPostAction = async ({
  data,
  id,
}: {
  data: PostSchema;
  id: number;
}) => {
  try {
    //validate data
    const parse = postSchema.safeParse(data);
    if (parse.error) throw new BadRequestError("invalid post body");
    const { categoryId, tagIds } = validateCategoryAndTagIds(data);
    //validate user
    const { user } = await validateRequest();
    if (!user)
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    const {
      description,
      htmlContent,
      isPublished,
      keywords,
      title,
      imgUrl,
      slug,
    } = data;
    //edit post
    const post = await db.$transaction(async (tx) => {
      //first delete all tags on post
      await tx.post.update({
        where: { id },
        data: { TagsOnPosts: { deleteMany: {} } },
      });
      //then we update the post and add new tags
      const updatedPost = await tx.post.update({
        where: { id },
        data: {
          title,
          keywords,
          isPublished,
          description,
          content: htmlContent,
          imgUrl,
          categoryId,
          slug,
          TagsOnPosts: {
            createMany: {
              data: [...tagIds.map((id) => ({ tagId: id }))],
            },
          },
        },
      });
      return updatedPost;
    });
    return { post };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

function validateCategoryAndTagIds(data: PostSchema) {
  const categoryId = parseInt(data.categoryId);
  if (isNaN(categoryId)) throw new BadRequestError();
  const tagIds = data.tagIds.map((id) => parseInt(id));
  if (tagIds.some((id) => isNaN(id))) throw new BadRequestError();
  return { categoryId, tagIds };
}

export const getManyPostAction = async ({
  pageId,
  limit,
}: {
  limit: number;
  pageId: number;
}) => {
  try {
    // Validate input
    if (!pageId || !limit) {
      throw new BadRequestError();
    }
    // Validate user
    const userReq = validateRequest();
    // Get posts
    const postsReq = db.post.findMany({
      skip: (pageId - 1) * limit,
      take: limit,
      orderBy: { id: "desc" },
    });
    const [posts, { user }] = await Promise.all([postsReq, userReq]);
    if (!user)
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    return { posts };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
