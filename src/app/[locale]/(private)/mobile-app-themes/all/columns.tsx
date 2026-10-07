"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MobileAppThemePalette } from "@/repositories/mobile-app-themes";
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
import { DeleteThemePaletteDialog } from "./components/delete-dialog";

function ColorSwatches({
  primary,
  secondary,
  tertiary,
}: {
  primary: string;
  secondary: string;
  tertiary: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {[primary, secondary, tertiary].map((color) => (
        <span
          key={color}
          title={color}
          className="size-5 rounded-full border border-border"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function MobileAppThemesRowActions({
  palette,
  onEdit,
  t,
}: {
  palette: MobileAppThemePalette;
  onEdit: (palette: MobileAppThemePalette) => void;
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
            onClick={() => onEdit(palette)}
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
      <DeleteThemePaletteDialog
        id={String(palette.id)}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

export function createMobileAppThemesColumns(
  t: (key: string) => string,
  onEdit: (palette: MobileAppThemePalette) => void,
): ColumnDef<MobileAppThemePalette>[] {
  return [
    {
      accessorKey: "code",
      meta: { columnLabel: t("themeCode") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("themeCode")} />
      ),
    },
    {
      accessorKey: "name",
      meta: { columnLabel: t("themeName") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("themeName")} />
      ),
    },
    {
      id: "colors",
      meta: { columnLabel: t("themeColors") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("themeColors")} />
      ),
      cell: ({ row }) => (
        <ColorSwatches
          primary={row.original.primary}
          secondary={row.original.secondary}
          tertiary={row.original.tertiary}
        />
      ),
    },
    {
      accessorKey: "isDefault",
      meta: { columnLabel: t("themeIsDefault") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("themeIsDefault")} />
      ),
      cell: ({ row }) => (row.original.isDefault ? t("yes") : t("no")),
    },
    {
      accessorKey: "isActive",
      meta: { columnLabel: t("themeIsActive") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("themeIsActive")} />
      ),
      cell: ({ row }) => (row.original.isActive ? t("yes") : t("no")),
    },
    {
      accessorKey: "sortOrder",
      meta: { columnLabel: t("themeSortOrder") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("themeSortOrder")} />
      ),
    },
    {
      id: "actions",
      header: t("actions"),
      meta: { narrow: true, columnLabel: t("actions") },
      cell: ({ row }) => (
        <MobileAppThemesRowActions
          palette={row.original}
          onEdit={onEdit}
          t={t}
        />
      ),
    },
  ];
}
