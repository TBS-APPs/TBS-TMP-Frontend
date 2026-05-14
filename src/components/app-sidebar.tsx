import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
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
import { Link } from "@/core/i18n/navigation";
import { SidebarLink } from "./sidebar-link";

interface AppSidebarGroups {
  label: string;
  items: AppSidebarItem[];
}

interface AppSidebarItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export async function AppSidebar() {
  const t = await getTranslations("Sidebar");

  const groups: AppSidebarGroups[] = [
    {
      label: t("companies"),
      items: [
        { label: t("addCompany"), icon: <Plus size={16} />, href: "/companies/add" },
      ],
    },
  ];

  return (
    <Sidebar>
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
