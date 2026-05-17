"use client";

import { forwardRef } from "react";
import { Link } from "@/core/i18n/navigation";
import { cn } from "@/lib/utils";

export type SidebarLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  "children"
> & {
  icon: React.ReactNode;
  label: string;
};

export const SidebarLink = forwardRef<HTMLAnchorElement, SidebarLinkProps>(
  ({ href, icon, label, className, ...props }, ref) => (
    <Link
      ref={ref}
      href={href}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {icon} <span>{label}</span>
    </Link>
  )
);
SidebarLink.displayName = "SidebarLink";
