"use client";

import { Fragment, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/core/i18n/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function normalizePathname(pathname: string) {
  let p = pathname.trim();
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/+$/, "") || "/";
  return p;
}

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function segmentLabel(
  segments: string[],
  index: number,
  t: (key: string) => string
) {
  const segment = segments[index];
  const prev = index > 0 ? segments[index - 1] : undefined;
  if (segment === "companies") return t("companies");
  if (segment === "modules") return t("modules");
  if (segment === "account") return t("account");
  if (segment === "add" && prev === "companies") return t("addCompany");
  if (segment === "edit" && prev === "companies") return t("editCompany");
  if (segment === "add" && prev === "modules") return t("addModule");
  if (segment === "edit" && prev === "modules") return t("editModule");
  return humanizeSlug(segment);
}

export function PrivateHeaderBreadcrumb() {
  const pathname = usePathname();
  const t = useTranslations();

  const crumbs = useMemo(() => {
    const normalized = normalizePathname(pathname);
    const segments =
      normalized === "/"
        ? []
        : normalized.slice(1).split("/").filter(Boolean);

    const out: { href?: string; label: string }[] = [];

    if (segments.length === 0) {
      out.push({ label: t("home") });
      return out;
    }

    out.push({ href: "/", label: t("home") });
    for (let i = 0; i < segments.length; i++) {
      const prefix = `/${segments.slice(0, i + 1).join("/")}`;
      const label = segmentLabel(segments, i, t);
      const isLast = i === segments.length - 1;
      out.push(isLast ? { label } : { href: prefix, label });
    }
    return out;
  }, [pathname, t]);

  return (
    <Breadcrumb className="min-w-0">
      <BreadcrumbList className="min-w-0 flex-nowrap overflow-hidden sm:flex-wrap">
        {crumbs.map((crumb, i) => (
          <Fragment key={crumb.href ?? `page-${i}-${crumb.label}`}>
            {i > 0 ? <BreadcrumbSeparator /> : null}
            <BreadcrumbItem className="max-w-[45%] shrink-0 sm:max-w-none">
              {crumb.href ? (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="truncate">{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
