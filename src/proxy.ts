import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest): NextResponse {
  //CSRF protection
  const response = cSRFProtectionResponse(request);
  return response;
}

function cSRFProtectionResponse(request: NextRequest): NextResponse {
  //CSRF protection
  if (request.method === "GET") {
    return NextResponse.next();
  }
  const originHeader = request.headers.get("Origin");
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get("Host");
  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {
      status: 403,
    });
  }
  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, {
      status: 403,
    });
  }
  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403,
    });
  }
  return NextResponse.next();
}
