"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { License } from "@/repositories/license/types";
import { createCompanyLicenseColumns } from "./company-licenses-columns";

export function CompanyLicensesTable({ data }: { data: License[] }) {
  const t = useTranslations();
  const columns = useMemo(() => createCompanyLicenseColumns(t), [t]);
  return <DataTable columns={columns} data={data} />;
}
