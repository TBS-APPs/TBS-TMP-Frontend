"use client";

import { ChevronDown, LogOut, User2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { logoutAction } from "@/app/[locale]/(public)/(auth)/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/core/i18n/navigation";
import { routes } from "@/core/constants/routes";
import { cn } from "@/lib/utils";

export type SidebarAccountMenuUser =
  | { name: string; email: string }
  | null
  | undefined;

export interface SidebarAccountMenuProps {
  locale: string;
  user: SidebarAccountMenuUser;
}

export function SidebarAccountMenu({ locale, user }: SidebarAccountMenuProps) {
  const t = useTranslations();

  const title = user?.name?.trim() || t("account");
  const email = user?.email?.trim();
  const menuAlign = locale === "ar" ? "end" : "start";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="h-auto gap-2 py-2">
              <User2 className="shrink-0" size={16} />
              <div className="grid min-w-0 flex-1 text-start leading-tight">
                <span className="truncate font-semibold">{title}</span>
                {email ? (
                  <span className="truncate text-xs text-muted-foreground">
                    {email}
                  </span>
                ) : null}
              </div>
              <ChevronDown className="ms-auto size-4 shrink-0 rtl:rotate-180" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={menuAlign} className="w-(--radix-dropdown-menu-trigger-width) min-w-52">
            <DropdownMenuItem asChild>
              <Link
                href={routes.account}
                className={cn(
                  "flex cursor-pointer items-center gap-2",
                )}
              >
                <User2 size={16} />
                <span>{t("account")}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild variant="destructive" className="p-0">
              <form action={logoutAction} className="w-full">
                <button
                  type="submit"
                  className="text-destructive flex w-full cursor-pointer items-center gap-2 px-2 py-1 text-sm outline-none"
                >
                  <LogOut size={16} />
                  {t("logout")}
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
