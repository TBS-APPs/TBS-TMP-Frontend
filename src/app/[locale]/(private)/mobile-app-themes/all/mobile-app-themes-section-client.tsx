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
import { MobileAppThemePalette } from "@/repositories/mobile-app-themes";
import { MobileAppThemesTable } from "./mobile-app-themes-table";
import { MobileAppThemesFormSheet } from "../mobile-app-themes-form-sheet";

type Props = {
  palettes: MobileAppThemePalette[];
};

export function MobileAppThemesSectionClient({ palettes }: Props) {
  const t = useTranslations();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingPalette, setEditingPalette] = useState<
    MobileAppThemePalette | undefined
  >();

  const handleAdd = () => {
    setEditingPalette(undefined);
    setSheetOpen(true);
  };

  const handleEdit = useCallback((palette: MobileAppThemePalette) => {
    setEditingPalette(palette);
    setSheetOpen(true);
  }, []);

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open);
    if (!open) {
      setEditingPalette(undefined);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="space-y-1.5">
            <CardTitle>{t("mobileAppThemes")}</CardTitle>
            <CardDescription>
              {t("mobileAppThemesSectionDescription")}
            </CardDescription>
          </div>
          <Button type="button" size="sm" onClick={handleAdd}>
            {t("addThemePalette")}
          </Button>
        </CardHeader>
        <CardContent>
          <MobileAppThemesTable data={palettes} onEdit={handleEdit} />
        </CardContent>
      </Card>
      <MobileAppThemesFormSheet
        palette={editingPalette}
        open={sheetOpen}
        onOpenChange={handleSheetOpenChange}
      />
    </>
  );
}
