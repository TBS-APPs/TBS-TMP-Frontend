"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TranslationRow } from "@/repositories/mobile-app-translations";
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
import { DeleteTranslationKeyDialog } from "./components/delete-dialog";

function truncate(value: string, max = 60) {
  if (!value) return "—";
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

function TranslationRowActions({
  row,
  onEdit,
  t,
}: {
  row: TranslationRow;
  onEdit: (row: TranslationRow) => void;
  t: (key: string) => string;
}) {
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
            onClick={() => onEdit(row)}
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
      <DeleteTranslationKeyDialog
        id={String(row.keyId)}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

export function createMobileAppTranslationsColumns(
  t: (key: string) => string,
  onEdit: (row: TranslationRow) => void,
): ColumnDef<TranslationRow>[] {
  return [
    {
      accessorKey: "key",
      meta: { columnLabel: t("translationKey") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("translationKey")} />
      ),
      cell: ({ row }) => (
        <button
          type="button"
          className="text-left font-mono text-sm hover:underline"
          onClick={() => onEdit(row.original)}
        >
          {row.original.key}
        </button>
      ),
    },
    {
      accessorKey: "en",
      meta: { columnLabel: t("englishValue") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("englishValue")} />
      ),
      cell: ({ row }) => (
        <span className="line-clamp-2 max-w-[280px]" dir="ltr">
          {truncate(row.original.en)}
        </span>
      ),
    },
    {
      accessorKey: "ar",
      meta: { columnLabel: t("arabicValue") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("arabicValue")} />
      ),
      cell: ({ row }) => (
        <span className="line-clamp-2 max-w-[280px]" dir="rtl">
          {truncate(row.original.ar)}
        </span>
      ),
    },
    {
      id: "actions",
      header: t("actions"),
      meta: { narrow: true, columnLabel: t("actions") },
      cell: ({ row }) => (
        <TranslationRowActions
          row={row.original}
          onEdit={onEdit}
          t={t}
        />
      ),
    },
  ];
}
