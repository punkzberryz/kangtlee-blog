import { Lucia } from "lucia";
import { dbAdapter } from "../db";
import { COOKIE_NAME } from "../config";
import { User } from "@prisma/client";
export const lucia = new Lucia(dbAdapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    name: COOKIE_NAME,
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      id: attributes.id,
      displayName: attributes.displayName,
      email: attributes.email,
      googleId: attributes.googleId,
      lineLoginId: attributes.lineLoginId,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: User;
  }
}
