"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Company } from "@/repositories/company";
import { Button } from "@/components/ui/button";
import { EditIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { useRouter } from "@/core/i18n/navigation";
import { routes } from "@/core/constants/routes";
import { useTranslations } from "next-intl";
import { DeleteCompanyDialog } from "./components/delete-alert";

function CompanyRowActions({ company }: { company: Company }) {
  const t = useTranslations();
  const router = useRouter();
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
            onClick={() => {
              router.push(routes.companies.edit(company.id?.toString() ?? ""));
            }}
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
      <DeleteCompanyDialog
        id={company.id?.toString() ?? ""}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

export function createCompanyColumns(
  t: (key: string) => string,
): ColumnDef<Company>[] {
  return [
    {
      id: "select",
      meta: { narrow: true },

      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="me-2"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      meta: { narrow: true, columnLabel: t("id") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("id")} />
      ),
    },
    {
      accessorKey: "name",
      meta: { columnLabel: t("name") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("name")} />
      ),
    },
    {
      accessorKey: "alias",
      meta: { columnLabel: t("companyAlias") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("companyAlias")} />
      ),
    },
    {
      accessorKey: "status",
      meta: { columnLabel: t("statusLabel") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("statusLabel")} />
      ),
      cell: ({ row }) => row.original.status ?? "—",
    },
    {
      id: "actions",
      header: t("actions"),
      meta: { narrow: true, columnLabel: t("actions") },
      cell: ({ row }) => <CompanyRowActions company={row.original} />,
    },
  ];
}
