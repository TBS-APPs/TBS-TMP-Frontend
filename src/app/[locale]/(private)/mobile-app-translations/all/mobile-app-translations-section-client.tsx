"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TranslationRow } from "@/repositories/mobile-app-translations";
import { MobileAppTranslationsTable } from "./mobile-app-translations-table";
import { TranslationFormSheet } from "../translation-form-sheet";

type Props = {
  rows: TranslationRow[];
};

export function MobileAppTranslationsSectionClient({ rows }: Props) {
  const t = useTranslations();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<TranslationRow | undefined>();

  const handleAdd = () => {
    setEditingRow(undefined);
    setSheetOpen(true);
  };

  const handleEdit = useCallback((row: TranslationRow) => {
    setEditingRow(row);
    setSheetOpen(true);
  }, []);

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open);
    if (!open) {
      setEditingRow(undefined);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="space-y-1.5">
            <CardTitle>{t("mobileAppTranslations")}</CardTitle>
            <CardDescription>
              {t("mobileAppTranslationsSectionDescription")}
            </CardDescription>
          </div>
          <Button type="button" size="sm" onClick={handleAdd}>
            {t("addTranslationKey")}
          </Button>
        </CardHeader>
        <CardContent>
          <MobileAppTranslationsTable data={rows} onEdit={handleEdit} />
        </CardContent>
      </Card>
      <TranslationFormSheet
        row={editingRow}
        open={sheetOpen}
        onOpenChange={handleSheetOpenChange}
      />
    </>
  );
}
