import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getTranslations } from "next-intl/server";
import { User2 } from "lucide-react";
import { SidebarLanguageSwitcher } from "./sidebar-language-switcher";
import { getLangDir } from "rtl-detect";
import {
  SidebarNavGroups,
  type SidebarNavGroupDef,
} from "./sidebar-nav-groups";
import { Separator } from "./ui/separator";

export async function AppSidebar({ locale }: { locale: string }) {
  const t = await getTranslations();

  const groups: SidebarNavGroupDef[] = [
    {
      label: t("companies"),
      items: [
        {
          label: t("companies"),
          href: "/companies/all",
          icon: "eye",
        },
        {
          label: t("addCompany"),
          href: "/companies/add",
          icon: "plus",
        },
      ],
    },
    {
      label: t("modules"),
      items: [
        {
          label: t("addModule"),
          href: "/modules/add",
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 /> {t("account")}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
