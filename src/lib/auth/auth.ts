import { lucia } from "./lucia";
import { cookies } from "next/headers";
import { cache } from "react";

export const createSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return session;
};

export const clearSession = async (sessionId: string) => {
  await lucia.invalidateSession(sessionId);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const getSessionId = () => {
  return cookies().get(lucia.sessionCookieName)?.value;
};

export const validateRequest = cache(async () => {
  let sessionId = getSessionId() ?? null;
  // console.log(`[validateRequest] sessionId: ${sessionId}`);
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (err) {
    console.error(`[ERROR - validateRequest] `, err);
  }
  return result;
});
