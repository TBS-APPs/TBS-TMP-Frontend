"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/core/i18n/navigation";
import { routing } from "@/core/i18n/routing";
import { cn } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const LOCALE_LABELS: Record<(typeof routing.locales)[number], string> = {
  en: "English",
  ar: "العربية",
};

export function SidebarLanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Sidebar");

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupLabel className="gap-2">
        <Globe className="size-4 shrink-0" aria-hidden />
        {t("language")}
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <select
            aria-label={t("language")}
            className={cn(
              "border-sidebar-border bg-sidebar-accent/30 text-sidebar-foreground",
              "focus-visible:ring-sidebar-ring h-8 w-full rounded-md border px-2 text-sm",
              "focus-visible:outline-none focus-visible:ring-2"
            )}
            value={locale}
            onChange={(e) =>
              router.replace(pathname, { locale: e.target.value })
            }
          >
            {routing.locales.map((loc) => (
              <option key={loc} value={loc}>
                {LOCALE_LABELS[loc]}
              </option>
            ))}
          </select>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
