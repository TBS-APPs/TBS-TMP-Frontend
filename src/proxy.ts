import createMiddleware from "next-intl/middleware";
import { routing } from "./core/i18n/routing";
import { NextRequest } from "next/server";

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  /// TODO: Remove the comment from this code when the authentication is done, and modify it to fit the project.
  //   const localeUrl = request.nextUrl.clone();
  //   const pathname = localeUrl.pathname;

  //   const localeMatch = pathname.match(/^\/([^/]+)/);
  //   const locale = localeMatch ? localeMatch[1] : "en";

  //   const token = request.cookies.get("token")?.value;

  //   if (!pathname.startsWith(`/${locale}/auth`) && !token) {
  //     const authUrl = request.nextUrl.clone();
  //     authUrl.pathname = `/${locale}/auth`;
  //     return NextResponse.redirect(authUrl);
  //   } else if (pathname.startsWith(`/${locale}/auth`) && token) {
  //     const homeUrl = request.nextUrl.clone();
  //     homeUrl.pathname = `/${locale}/`;
  //     return NextResponse.redirect(homeUrl);
  //   }

  return intlResponse;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
