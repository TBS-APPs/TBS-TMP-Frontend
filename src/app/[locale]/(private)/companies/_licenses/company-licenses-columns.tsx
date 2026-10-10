"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { License } from "@/repositories/license/types";
import { Button } from "@/components/ui/button";
import { EditIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { useTranslations } from "next-intl";
import { DeleteLicenseDialog } from "./delete-license-dialog";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

type ColumnOptions = {
  companyId: string;
  onEdit: (license: License) => void;
};

function LicenseRowActions({
  license,
  companyId,
  onEdit,
}: {
  license: License;
  companyId: string;
  onEdit: (license: License) => void;
}) {
  const t = useTranslations();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
          <DropdownMenuItem
            className="text-primary"
            onClick={() => onEdit(license)}
          >
            <EditIcon /> {t("edit")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <TrashIcon /> {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteLicenseDialog
        companyId={companyId}
        licenseId={String(license.id)}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

export function createCompanyLicenseColumns(
  t: (key: string) => string,
  options: ColumnOptions,
): ColumnDef<License>[] {
  const { companyId, onEdit } = options;

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
    {
      id: "actions",
      header: t("actions"),
      meta: { narrow: true, columnLabel: t("actions") },
      cell: ({ row }) => (
        <LicenseRowActions
          license={row.original}
          companyId={companyId}
          onEdit={onEdit}
        />
      ),
    },
  ];
}
