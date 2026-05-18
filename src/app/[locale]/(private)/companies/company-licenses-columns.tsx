"use client";

import { ColumnDef } from "@tanstack/react-table";
import { License } from "@/repositories/license/types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export function createCompanyLicenseColumns(
  t: (key: string) => string,
): ColumnDef<License>[] {
  return [
    {
      accessorKey: "id",
      meta: { narrow: true, columnLabel: t("id") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("id")} />
      ),
    },
    {
      accessorKey: "seatsLimit",
      meta: { narrow: true, columnLabel: t("licenseSeatsLimit") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("licenseSeatsLimit")} />
      ),
    },
    {
      id: "moduleName",
      meta: { columnLabel: t("moduleName") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("moduleName")} />
      ),
      cell: ({ row }) => row.original.module?.name ?? "—",
    },
    {
      accessorKey: "startDate",
      meta: { columnLabel: t("licenseStartDate") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("licenseStartDate")} />
      ),
      cell: ({ row }) => formatDate(row.original.startDate),
    },
    {
      accessorKey: "expirationDate",
      meta: { columnLabel: t("licenseExpirationDate") },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("licenseExpirationDate")}
        />
      ),
      cell: ({ row }) => formatDate(row.original.expirationDate),
    },
  ];
}
