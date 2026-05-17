"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { Module } from "@/repositories/module";
import { createModuleColumns } from "./columns";

export function AllModulesTable({ data }: { data: Module[] }) {
  const t = useTranslations();
  const columns = useMemo(() => createModuleColumns(t), [t]);
  return <DataTable columns={columns} data={data} />;
}
