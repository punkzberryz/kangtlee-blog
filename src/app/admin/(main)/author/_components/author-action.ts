"use server";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  BadRequestError,
  UnauthorizedError,
  UnauthorizedMessageCode,
} from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { AuthorSchema, authorSchema } from "./author-schema";

export const editAuthorAction = async ({
  data,
  id,
}: {
  data: AuthorSchema;
  id: string;
}) => {
  try {
    //validate body
    const validatedData = authorSchema.safeParse(data);
    if (!validatedData.success || !id) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    }
    //edit author
    const author = await db.user.update({
      where: {
        id,
      },
      data: {
        displayName: data.displayName,
        bio: data.bio,
        imgUrl: data.imgUrl,
      },
    });

    return { author };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const getManyAuthorsAction = async ({
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
    //get authors
    const authorsReq = db.user.findMany({
      skip: (pageId - 1) * limit,
      take: limit,
    });
    const [authors, { user }] = await Promise.all([authorsReq, userReq]);
    if (!user) {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    }

    return { authors };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
