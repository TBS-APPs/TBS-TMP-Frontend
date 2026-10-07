"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { MobileAppThemePalette } from "@/repositories/mobile-app-themes";
import { createMobileAppThemesColumns } from "./columns";

type Props = {
  data: MobileAppThemePalette[];
  onEdit: (palette: MobileAppThemePalette) => void;
};

export function MobileAppThemesTable({ data, onEdit }: Props) {
  const t = useTranslations();
  const columns = useMemo(
    () => createMobileAppThemesColumns(t, onEdit),
    [t, onEdit],
  );
  return <DataTable columns={columns} data={data} />;
}
