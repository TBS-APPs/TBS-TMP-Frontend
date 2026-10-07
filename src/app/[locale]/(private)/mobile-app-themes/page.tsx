import { redirect } from "@/core/i18n/navigation";
import { routes } from "@/core/constants/routes";
import { getLocale } from "next-intl/server";

export default async function MobileAppThemesPage() {
  const locale = await getLocale();
  redirect({ href: routes.mobileAppThemes.all, locale: locale });

  return <></>;
}
