import { clearSession, validateRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/error";
import { catchRouteErrorHelper } from "@/lib/error/catch-route-error-helper";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  unstable_noStore();
  try {
    const { session, user } = await validateRequest();
    if (!session || !user) {
      throw new UnauthorizedError("invalid session");
    }
    await clearSession(session.id);
    return NextResponse.json({});
  } catch (err) {
    return catchRouteErrorHelper(err, "GET api/auth/signout");
  }
};
