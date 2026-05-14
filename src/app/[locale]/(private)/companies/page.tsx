import { redirect, useRouter } from "@/core/i18n/navigation";
import { getLocale } from "next-intl/server";

export default async function CompaniesPage() {
  const locale = await getLocale();
  redirect({ href: "/companies/all", locale: locale });

  return <></>;
}
