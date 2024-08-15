"use server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  BadRequestError,
  UnauthorizedError,
  UnauthorizedMessageCode,
} from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { TagSchema, tagSchema } from "./tag-schema";
export const createNewTagAction = async ({ data }: { data: TagSchema }) => {
  try {
    //validate body
    const validatedData = tagSchema.safeParse(data);
    if (!validatedData.success) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    }
    //create new tag
    const tag = await db.postTag.create({
      data: { name: data.name },
    });
    return { tag };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
export const editTagAction = async ({
  data,
  id,
}: {
  data: TagSchema;
  id: number;
}) => {
  try {
    //validate body
    const validatedData = tagSchema.safeParse(data);
    if (!validatedData.success || !id) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    }
    //edit Tag
    const tag = await db.postTag.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });

    return { tag };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const deleteTagAction = async ({ id }: { id: number }) => {
  try {
    //validate body
    if (!id) throw new BadRequestError();
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    }
    //delete Tag
    await db.postTag.delete({
      where: {
        id,
      },
    });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const getManyTagAction = async ({
  pageId,
  limit,
}: {
  limit: number;
  pageId: number;
}) => {
  try {
    //validate user
    if (!pageId || !limit) {
      throw new BadRequestError();
    }
    //validate user
    const userReq = validateRequest();
    //get tags
    const tagsReq = db.postTag.findMany({
      skip: (pageId - 1) * limit,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });
    const [tags, { user }] = await Promise.all([tagsReq, userReq]);
    if (!user) {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    }

    return { tags };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
