"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SelectOption } from "@/components/form";
import { License } from "@/repositories/license/types";
import { CompanyLicensesTable } from "./company-licenses-table";
import { LicenseFormSheet } from "./license-form-sheet";

type Props = {
  companyId: string;
  licenses: License[];
  moduleOptions: SelectOption[];
};

export function CompanyLicensesSectionClient({
  companyId,
  licenses,
  moduleOptions,
}: Props) {
  const t = useTranslations();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingLicense, setEditingLicense] = useState<License | undefined>();

  const handleAdd = () => {
    setEditingLicense(undefined);
    setSheetOpen(true);
  };

  const handleEdit = useCallback((license: License) => {
    setEditingLicense(license);
    setSheetOpen(true);
  }, []);

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open);
    if (!open) {
      setEditingLicense(undefined);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="space-y-1.5">
            <CardTitle>{t("licenses")}</CardTitle>
            <CardDescription>
              {t("companyLicensesSectionDescription")}
            </CardDescription>
          </div>
          <Button type="button" size="sm" onClick={handleAdd}>
            {t("addLicense")}
          </Button>
        </CardHeader>
        <CardContent>
          {licenses.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t("noLicensesForCompany")}
            </p>
          ) : (
            <CompanyLicensesTable
              data={licenses}
              companyId={companyId}
              onEdit={handleEdit}
            />
          )}
        </CardContent>
      </Card>
      <LicenseFormSheet
        companyId={companyId}
        moduleOptions={moduleOptions}
        license={editingLicense}
        open={sheetOpen}
        onOpenChange={handleSheetOpenChange}
      />
    </>
  );
}
