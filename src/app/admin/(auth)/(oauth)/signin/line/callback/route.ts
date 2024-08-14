import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { line, lucia } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { config } from "@/lib/config";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("line_oauth_state")?.value ?? null;
  const storeCodeVerifier =
    cookies().get("line_oauth_code_verifier")?.value ?? null;
  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storeCodeVerifier
  ) {
    return NextResponse.json(null, {
      status: 400,
    });
  }

  try {
    const tokens = await line.validateAuthorizationCode(
      code,
      storeCodeVerifier,
    );

    const lineUserResponse = await fetch(
      "https://api.line.me/oauth2/v2.1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    const lineUser: LineUser = await lineUserResponse.json();

    // get user if exists
    const existingUser = await db.user.findFirst({
      where: {
        lineLoginId: lineUser.sub,
      },
    });

    if (existingUser) {
      //user exists, let's login
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return NextResponse.json(null, {
        status: 302,
        headers: {
          Location: "/admin",
        },
      });
    }

    //user not found, let's check if there is a secret
    const secret = cookies().get("admin_secret")?.value ?? null;

    if (!secret) {
      //secret not found, let's redirect to signup
      return NextResponse.json(null, {
        status: 302,
        headers: {
          Location: "/admin/signup",
        },
      });
    }
    //secret found, let's validate
    if (secret !== config.signUpAdminSecret) {
      //secret not match, let's redirect to signup-error
      return NextResponse.json(null, {
        status: 302,
        headers: {
          Location: "/admin/signup/error",
        },
      });
    }

    //secret match, let's create new user

    //clear secret
    cookies().set("admin_secret", "some_secret", {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60,
      sameSite: "lax",
    });
    const userId = generateIdFromEntropySize(10); // 16 characters long

    // create new user
    await db.user.create({
      data: {
        id: userId,
        lineLoginId: lineUser.sub,
        displayName: lineUser.name,
        email: lineUser.email,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return NextResponse.json(null, {
      status: 302,
      headers: {
        Location: "/admin",
      },
    });
  } catch (err) {
    // the specific error message depends on the provider
    if (err instanceof OAuth2RequestError) {
      // invalid code
      return NextResponse.json(null, {
        status: 400,
      });
    }
    console.log({ err });
    return NextResponse.json(null, {
      status: 500,
    });
  }
}
interface LineUser {
  sub: string;
  name: string;
  picture: string;
  email?: string;
}
