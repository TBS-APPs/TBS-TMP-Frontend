import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
      <main>
        <div>
          <SidebarTrigger />
        </div>

        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
