"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { License } from "@/repositories/license/types";
import { createCompanyLicenseColumns } from "./company-licenses-columns";

type Props = {
  data: License[];
  companyId: string;
  onEdit: (license: License) => void;
};

export function CompanyLicensesTable({ data, companyId, onEdit }: Props) {
  const t = useTranslations();
  const columns = useMemo(
    () => createCompanyLicenseColumns(t, { companyId, onEdit }),
    [t, companyId, onEdit],
  );
  return <DataTable columns={columns} data={data} />;
}
