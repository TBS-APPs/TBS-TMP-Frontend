"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Module } from "@/repositories/module";
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
import { DeleteModuleDialog } from "./components/delete-alert";

function ModuleRowActions({ module }: { module: Module }) {
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
              router.push(routes.modules.edit(module.id?.toString() ?? ""));
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
      <DeleteModuleDialog
        id={module.id?.toString() ?? ""}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

export function createModuleColumns(
  t: (key: string) => string,
): ColumnDef<Module>[] {
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
      id: "actions",
      header: t("actions"),
      meta: { narrow: true, columnLabel: t("actions") },
      cell: ({ row }) => <ModuleRowActions module={row.original} />,
    },
  ];
}
