import createMiddleware from "next-intl/middleware";
import { ACCESS_TOKEN_COOKIE } from "./core/constants/auth-cookies";
import { routes } from "./core/constants/routes";
import { routing } from "./core/i18n/routing";
import { NextResponse, NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

const locales = routing.locales;
const DEFAULT_LOCALE = locales[0] ?? "en";

function normalizeRestPath(restPath: string): string {
  const trimmedTrailing = restPath.replace(/\/+$/, "");
  return trimmedTrailing === "" ? "/" : trimmedTrailing;
}

function getLocaleAndRestPath(pathname: string): {
  locale: string;
  restPath: string;
} {
  let p = pathname.trim();
  if (!p.startsWith("/")) {
    p = `/${p}`;
  }
  const parts = p.split("/").filter(Boolean);
  if (
    parts.length > 0 &&
    locales.includes(parts[0] as (typeof locales)[number])
  ) {
    const locale = parts[0];
    const sub = parts.slice(1);
    const restRaw = sub.length === 0 ? "/" : `/${sub.join("/")}`;
    return { locale, restPath: normalizeRestPath(restRaw) };
  }
  const restRaw = parts.length === 0 ? "/" : `/${parts.join("/")}`;
  return {
    locale: DEFAULT_LOCALE,
    restPath: normalizeRestPath(restRaw),
  };
}

function isPublicAuthPath(restPath: string): boolean {
  return (
    restPath === routes.auth.login || restPath === routes.auth.register
  );
}

export function proxy(request: NextRequest) {
  const hasAuth = Boolean(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value);

  const { locale, restPath } = getLocaleAndRestPath(request.nextUrl.pathname);
  const publicAuth = isPublicAuthPath(restPath);

  if (!hasAuth && !publicAuth) {
    return NextResponse.redirect(
      new URL(`/${locale}${routes.auth.login}`, request.url),
    );
  }

  if (hasAuth && publicAuth) {
    return NextResponse.redirect(
      new URL(`/${locale}${routes.home}`, request.url),
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
