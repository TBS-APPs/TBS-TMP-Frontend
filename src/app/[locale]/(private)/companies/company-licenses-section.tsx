import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { License } from "@/repositories/license/types";
import { CompanyLicensesTable } from "./company-licenses-table";
import { AddLicenseButton } from "./add-license-button";

type Props = {
  companyId: number;
  licenses?: License[];
};

export async function CompanyLicensesSection({
  companyId: _companyId,
  licenses,
}: Props) {
  void _companyId;
  const t = await getTranslations();
  const items = licenses ?? [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>{t("licenses")}</CardTitle>
          <CardDescription>{t("companyLicensesSectionDescription")}</CardDescription>
        </div>
        <AddLicenseButton />
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            {t("noLicensesForCompany")}
          </p>
        ) : (
          <CompanyLicensesTable data={items} />
        )}
      </CardContent>
    </Card>
  );
}
