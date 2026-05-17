import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getTranslations } from "next-intl/server";
import { SidebarLanguageSwitcher } from "./sidebar-language-switcher";
import { getLangDir } from "rtl-detect";
import {
  SidebarNavGroups,
  type SidebarNavGroupDef,
} from "./sidebar-nav-groups";
import { Separator } from "./ui/separator";
import { SidebarAccountMenu } from "./sidebar-account-menu";
import { routes } from "@/core/constants/routes";
import { getAuthUser } from "@/core/utils/cookie-service";

export async function AppSidebar({ locale }: { locale: string }) {
  const t = await getTranslations();
  const user = await getAuthUser();

  const groups: SidebarNavGroupDef[] = [
    {
      label: t("companies"),
      items: [
        {
          label: t("companies"),
          href: routes.companies.all,
          icon: "eye",
        },
        {
          label: t("addCompany"),
          href: routes.companies.add,
          icon: "plus",
        },
      ],
    },
    {
      label: t("modules"),
      items: [
        {
          label: t("modules"),
          href: routes.modules.all,
          icon: "eye",
        },
        {
          label: t("addModule"),
          href: routes.modules.add,
          icon: "plus",
        },
      ],
    },
  ];

  const direction = getLangDir(locale);

  return (
    <Sidebar dir={direction} side={direction === "rtl" ? "right" : "left"}>
      <SidebarHeader className="min-h-14 justify-center bg-sidebar-primary">
        <h1 className="scroll-m-20 text-2l font-bold tracking-tight text-balance text-sidebar-primary-foreground">
          {t("appName")}
        </h1>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarNavGroups homeLabel={t("home")} groups={groups} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarLanguageSwitcher />
        <SidebarSeparator className="my-1" />
        <SidebarAccountMenu
          locale={locale}
          user={
            user
              ? { name: user.name, email: user.email }
              : null
          }
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
