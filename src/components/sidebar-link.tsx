"use client";

import { Link } from "@/core/i18n/navigation";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function SidebarLink({ href, icon, label }: SidebarLinkProps) {
  return (
    <Link href={href} className="flex items-center gap-2">
      {icon} <span>{label}</span>
    </Link>
  );
}
