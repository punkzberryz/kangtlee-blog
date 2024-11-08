import { Session, User } from "@prisma/client";
import { cookies } from "next/headers";
import { cache } from "react";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { db } from "../db";
import { COOKIE_NAME } from "../config";

export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};

export const createSession = async (
  token: string,
  userId: string,
): Promise<Session> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
  };
  await db.session.create({ data: session });
  return session;
};

export const validateSessionToken = async (
  token: string,
): Promise<SessionValidationResult> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db.session.findUnique({
    where: {
      id: sessionId,
    },
    include: { user: true },
  });
  if (result === null) return { session: null, user: null };
  const { user, ...session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    //expired
    await db.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    //going to expire in 15 days (or less), but still valid
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // extend for 30 days
    await db.session.update({
      where: { id: sessionId },
      data: { expiresAt: session.expiresAt },
    });
  }
  return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await db.session.delete({ where: { id: sessionId } });
};

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export const setSessionTokenCookie = (token: string, expiresAt: Date): void => {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
};

export const deleteSessionTokenCookie = () => {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
};

const getTokenId = () => cookies().get(COOKIE_NAME)?.value;
/*
  We separate validateRequest into two functions:
  - validateRequestOnServerComponent: for server component
  - validateRequest: for Server Action, Or Middleware Or API Route

  validateRequestOnServerComponent doesn't set cookie, because it's not possible to set cookie in server component
  (Think of it as Server component has already shown on client side, hence you can't modify cookie that is already set)
  (You can only set cookie when you send a new request to the server) (this is only Next.js behavior)
*/
export const validateRequestOnServerComponent = cache(async () => {
  //In server component, we can't set cookie
  let token = getTokenId() ?? null;
  if (!token) {
    return {
      user: null,
      session: null,
    };
  }
  try {
    const result = await validateSessionToken(token);
    return result;
  } catch (err) {
    console.error(`[ERROR - validateRequestOnServerComponent] `, err);
    return {
      user: null,
      session: null,
    };
  }
});

export const validateRequest = cache(async () => {
  let token = getTokenId() ?? null;
  // console.log(`[validateRequest] sessionId: ${sessionId}`);
  if (!token) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await validateSessionToken(token);
  try {
    //if not expired, we have session back
    if (result.session) {
      //update cookie regardless of fresh or not
      setSessionTokenCookie(token, result.session.expiresAt);
    } else {
      //if expired, delete cookie
      deleteSessionTokenCookie();
    }
  } catch (err) {
    console.error(`[ERROR - validateRequest] `, err);
    // if it's called
  }
  return result;
});
