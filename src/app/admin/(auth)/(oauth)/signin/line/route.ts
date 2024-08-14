import { generateCodeVerifier, generateState } from "arctic";
import { line } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const secret = query.get("secret");
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await line.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  cookies().set("line_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  cookies().set("line_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  // get admin secret from query param
  if (secret) {
    cookies().set("admin_secret", secret, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 2,
      sameSite: "lax",
    });
  }
  return Response.redirect(url);
}
