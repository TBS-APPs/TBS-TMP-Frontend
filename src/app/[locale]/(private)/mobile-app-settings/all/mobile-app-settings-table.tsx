"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { MobileAppSettingsRow } from "@/repositories/mobile-app-settings";
import { createMobileAppSettingsColumns } from "./columns";

type Props = {
  data: MobileAppSettingsRow[];
  onConfigure: (platform: MobileAppSettingsRow["platform"]) => void;
  onEdit: (row: MobileAppSettingsRow) => void;
};

export function MobileAppSettingsTable({
  data,
  onConfigure,
  onEdit,
}: Props) {
  const t = useTranslations();
  const columns = useMemo(
    () => createMobileAppSettingsColumns(t, onConfigure, onEdit),
    [t, onConfigure, onEdit],
  );
  return <DataTable columns={columns} data={data} />;
}
