import { redirect } from "@/core/i18n/navigation";
import { routes } from "@/core/constants/routes";
import { getLocale } from "next-intl/server";

export default async function MobileAppSettingsPage() {
  const locale = await getLocale();
  redirect({ href: routes.mobileAppSettings.all, locale: locale });

  return <></>;
}
