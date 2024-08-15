"use server";

import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { categorySchema, CategorySchema } from "./category-schema";
import {
  BadRequestError,
  UnauthorizedError,
  UnauthorizedMessageCode,
} from "@/lib/error";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";

export const createNewCategoryAction = async ({
  data,
}: {
  data: CategorySchema;
}) => {
  try {
    //validate body
    const validatedData = categorySchema.safeParse(data);
    if (!validatedData.success) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    }
    //create new category
    const category = await db.postCategory.create({
      data: { name: data.name },
    });
    return { category };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
export const editCategoryAction = async ({
  data,
  id,
}: {
  data: CategorySchema;
  id: number;
}) => {
  try {
    //validate body
    const validatedData = categorySchema.safeParse(data);
    if (!validatedData.success || !id) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    }
    //edit category
    const category = await db.postCategory.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });

    return { category };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const deleteCategoryAction = async ({ id }: { id: number }) => {
  try {
    //validate body
    if (!id) throw new BadRequestError();
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    }
    //delete category
    await db.postCategory.delete({
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

export const getManyCategoryAction = async ({
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
    //get categories
    const categoriesReq = db.postCategory.findMany({
      skip: (pageId - 1) * limit,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });
    const [categories, { user }] = await Promise.all([categoriesReq, userReq]);
    if (!user) {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    }

    return { categories };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
