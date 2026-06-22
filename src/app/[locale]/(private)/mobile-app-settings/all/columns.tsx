"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  MobileAppPlatform,
  MobileAppSettingsRow,
} from "@/repositories/mobile-app-settings";
import { Button } from "@/components/ui/button";
import {
  EditIcon,
  MoreHorizontal,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DeleteMobileAppSettingDialog } from "./components/delete-dialog";

function platformLabel(
  platform: MobileAppPlatform,
  t: (key: string) => string,
) {
  return platform === "ios" ? t("platformIos") : t("platformAndroid");
}

function MobileAppSettingsRowActions({
  row,
  onConfigure,
  onEdit,
  t,
}: {
  row: MobileAppSettingsRow;
  onConfigure: (platform: MobileAppPlatform) => void;
  onEdit: (row: MobileAppSettingsRow) => void;
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
          {row.configured ? (
            <>
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
            </>
          ) : (
            <DropdownMenuItem
              className="text-primary"
              onClick={() => onConfigure(row.platform)}
            >
              <SettingsIcon /> {t("configure")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {row.configured && row.setting?.id != null && (
        <DeleteMobileAppSettingDialog
          id={String(row.setting.id)}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
        />
      )}
    </>
  );
}

export function createMobileAppSettingsColumns(
  t: (key: string) => string,
  onConfigure: (platform: MobileAppPlatform) => void,
  onEdit: (row: MobileAppSettingsRow) => void,
): ColumnDef<MobileAppSettingsRow>[] {
  return [
    {
      accessorKey: "platform",
      meta: { columnLabel: t("platform") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("platform")} />
      ),
      cell: ({ row }) => platformLabel(row.original.platform, t),
    },
    {
      id: "configured",
      meta: { columnLabel: t("statusLabel") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("statusLabel")} />
      ),
      cell: ({ row }) =>
        row.original.configured ? t("configured") : t("notConfigured"),
    },
    {
      id: "latestVersion",
      meta: { columnLabel: t("latestVersion") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("latestVersion")} />
      ),
      cell: ({ row }) => row.original.setting?.latestVersion ?? "—",
    },
    {
      id: "recommendedVersion",
      meta: { columnLabel: t("recommendedVersion") },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("recommendedVersion")}
        />
      ),
      cell: ({ row }) => row.original.setting?.recommendedVersion ?? "—",
    },
    {
      id: "minimumVersion",
      meta: { columnLabel: t("minimumVersion") },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("minimumVersion")} />
      ),
      cell: ({ row }) => row.original.setting?.minimumVersion ?? "—",
    },
    {
      id: "maintenanceMode",
      meta: { columnLabel: t("maintenanceModeEnabled") },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("maintenanceModeEnabled")}
        />
      ),
      cell: ({ row }) => {
        if (!row.original.configured) return "—";
        return row.original.setting?.isMaintenanceModeEnabled
          ? t("yes")
          : t("no");
      },
    },
    {
      id: "actions",
      header: t("actions"),
      meta: { narrow: true, columnLabel: t("actions") },
      cell: ({ row }) => (
        <MobileAppSettingsRowActions
          row={row.original}
          onConfigure={onConfigure}
          onEdit={onEdit}
          t={t}
        />
      ),
    },
  ];
}
