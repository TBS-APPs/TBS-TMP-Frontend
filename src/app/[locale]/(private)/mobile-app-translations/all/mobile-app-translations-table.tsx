"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { TranslationRow } from "@/repositories/mobile-app-translations";
import { createMobileAppTranslationsColumns } from "./columns";

type Props = {
  data: TranslationRow[];
  onEdit: (row: TranslationRow) => void;
};

export function MobileAppTranslationsTable({ data, onEdit }: Props) {
  const t = useTranslations();
  const columns = useMemo(
    () => createMobileAppTranslationsColumns(t, onEdit),
    [t, onEdit],
  );
  return <DataTable columns={columns} data={data} />;
}
