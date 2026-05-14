import { redirect } from "@/core/i18n/navigation";
import { getLocale } from "next-intl/server";

export default async function ModulesPage() {
  const locale = await getLocale();
  redirect({ href: "/modules/all", locale: locale });

  return <></>;
}
