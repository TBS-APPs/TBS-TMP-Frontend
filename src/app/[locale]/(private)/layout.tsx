import { AppSidebar } from "@/components/app-sidebar";
import { PrivateHeaderBreadcrumb } from "@/components/private-header-breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default async function PrivateLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <SidebarProvider>
      <AppSidebar locale={locale} />
      <SidebarInset className="flex min-h-svh flex-col">
        <header className="flex min-h-14 shrink-0 items-center gap-2 border-b border-border p-2">
          <SidebarTrigger />
          <div className="min-w-0 flex-1 overflow-hidden">
            <PrivateHeaderBreadcrumb />
          </div>
        </header>
        <div className="flex-1 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
