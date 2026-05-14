import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getTranslations } from "next-intl/server";
import { ChevronDown, Plus, User2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { SidebarLink } from "./sidebar-link";
import { SidebarLanguageSwitcher } from "./sidebar-language-switcher";
import { getLangDir } from "rtl-detect";

interface AppSidebarGroups {
  label: string;
  items: AppSidebarItem[];
}

interface AppSidebarItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export async function AppSidebar({ locale }: { locale: string }) {
  const t = await getTranslations("Sidebar");

  const groups: AppSidebarGroups[] = [
    {
      label: t("companies"),
      items: [
        {
          label: t("addCompany"),
          icon: <Plus size={16} />,
          href: "/companies/add",
        },
      ],
    },
  ];

  const direction = getLangDir(locale);

  return (
    <Sidebar dir={direction} side={direction === "rtl" ? "right" : "left"}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        {groups.map((group, index) => (
          <Collapsible key={index} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {group.label}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {group.items.map((item, index) => (
                    <SidebarMenu key={index}>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <SidebarLink
                            href={item.href}
                            icon={item.icon}
                            label={item.label}
                          />
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarLanguageSwitcher />
        <SidebarSeparator className="my-1" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 /> Username
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
