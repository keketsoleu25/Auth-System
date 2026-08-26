import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keep middleware lightweight.
 *
 * Authentication for protected pages is handled server-side inside the page
 * using Auth.js `auth()`. This avoids middleware making an incorrect session
 * decision before the dashboard/admin route can read the persisted session.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};