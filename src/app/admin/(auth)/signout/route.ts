import { deleteSessionTokenCookie, validateRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/error";
import { catchRouteErrorHelper } from "@/lib/error/catch-route-error-helper";
import { unstable_noStore } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async () => {
  unstable_noStore();
  try {
    const { session, user } = await validateRequest();
    if (!session || !user) {
      throw new UnauthorizedError("invalid session");
    }
    await deleteSessionTokenCookie();
    return NextResponse.json({});
  } catch (err) {
    return catchRouteErrorHelper(err, "GET api/auth/signout");
  }
};
