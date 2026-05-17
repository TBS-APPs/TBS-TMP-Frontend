"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { Company } from "@/repositories/company";
import { createCompanyColumns } from "./columns";

export function AllCompaniesTable({ data }: { data: Company[] }) {
  const t = useTranslations();
  const columns = useMemo(() => createCompanyColumns(t), [t]);
  return <DataTable columns={columns} data={data} />;
}
