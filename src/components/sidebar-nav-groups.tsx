"use client";

import { ChevronDown, Home, Plus, type LucideIcon } from "lucide-react";
import { usePathname } from "@/core/i18n/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarLink } from "@/components/sidebar-link";

export type SidebarNavIconName = "plus";

const ICONS: Record<SidebarNavIconName, LucideIcon> = {
  plus: Plus,
};

export interface SidebarNavGroupDef {
  label: string;
  items: {
    label: string;
    href: string;
    icon: SidebarNavIconName;
  }[];
}

interface SidebarNavGroupsProps {
  homeLabel: string;
  groups: SidebarNavGroupDef[];
}

function normalizePath(path: string) {
  const trimmed = path.replace(/\/$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function isActivePath(pathname: string, href: string) {
  const p = normalizePath(pathname);
  const h = normalizePath(href);
  if (h === "/") return p === "/";
  return p === h || p.startsWith(`${h}/`);
}

export function SidebarNavGroups({ homeLabel, groups }: SidebarNavGroupsProps) {
  const pathname = usePathname();

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActivePath(pathname, "/")}>
                <SidebarLink
                  href="/"
                  icon={<Home size={16} />}
                  label={homeLabel}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {groups.map((group) => (
        <Collapsible
          key={group.label}
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                {group.label}
                <ChevronDown className="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const Icon = ICONS[item.icon];
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(pathname, item.href)}
                        >
                          <SidebarLink
                            href={item.href}
                            icon={<Icon size={16} />}
                            label={item.label}
                          />
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}
