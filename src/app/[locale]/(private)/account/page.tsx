import { getLocale, getTranslations } from "next-intl/server";
import { logoutAction } from "@/app/[locale]/(public)/(auth)/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/core/constants/routes";
import { redirect } from "@/core/i18n/navigation";
import { getAuthUser } from "@/core/utils/cookie-service";

export default async function AccountPage() {
  const locale = await getLocale();
  const authUser = await getAuthUser();
  const t = await getTranslations();

  if (authUser == null) {
    return redirect({ href: routes.auth.login, locale });
  }

  const user = authUser;

  const rows = [
    { key: "name", label: t("name"), value: user.name },
    { key: "email", label: t("email"), value: user.email },
    { key: "id", label: t("id"), value: String(user.id) },
    { key: "status", label: t("statusLabel"), value: user.status },
  ] as const;

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader className="border-b">
        <CardTitle>{t("accountPageTitle")}</CardTitle>
        <CardDescription>{t("accountDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <dl className="grid gap-4">
          {rows.map(({ key, label, value }) => (
            <div key={key}>
              <dt className="text-xs font-medium text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-0.5 text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
      <CardFooter className="flex shrink-0 flex-wrap justify-end gap-2 border-t">
        <form action={logoutAction}>
          <Button type="submit" variant="outline">
            {t("logout")}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
