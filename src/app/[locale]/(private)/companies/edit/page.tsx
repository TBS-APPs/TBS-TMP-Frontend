import { redirect } from "@/core/i18n/navigation";
import { routes } from "@/core/constants/routes";
import { getLocale } from "next-intl/server";

export default async function EditCompanyPage() {
  const locale = await getLocale();
  redirect({ href: routes.companies.all, locale: locale });

  return <></>;
}
