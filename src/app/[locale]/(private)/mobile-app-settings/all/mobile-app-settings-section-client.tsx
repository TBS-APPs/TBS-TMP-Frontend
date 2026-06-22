"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  mergeMobileAppSettingsRows,
  MobileAppPlatform,
  MobileAppSetting,
  MobileAppSettingsRow,
} from "@/repositories/mobile-app-settings";
import { MobileAppSettingsTable } from "./mobile-app-settings-table";
import { MobileAppSettingsFormSheet } from "../mobile-app-settings-form-sheet";

type Props = {
  settings: MobileAppSetting[];
};

export function MobileAppSettingsSectionClient({ settings }: Props) {
  const t = useTranslations();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<
    MobileAppSetting | undefined
  >();
  const [defaultPlatform, setDefaultPlatform] = useState<
    MobileAppPlatform | undefined
  >();

  const rows = useMemo(
    () => mergeMobileAppSettingsRows(settings),
    [settings],
  );

  const handleConfigure = useCallback((platform: MobileAppPlatform) => {
    setEditingSetting(undefined);
    setDefaultPlatform(platform);
    setSheetOpen(true);
  }, []);

  const handleEdit = useCallback((row: MobileAppSettingsRow) => {
    setEditingSetting(row.setting);
    setDefaultPlatform(undefined);
    setSheetOpen(true);
  }, []);

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open);
    if (!open) {
      setEditingSetting(undefined);
      setDefaultPlatform(undefined);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t("mobileAppSettings")}</CardTitle>
          <CardDescription>
            {t("mobileAppSettingsSectionDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MobileAppSettingsTable
            data={rows}
            onConfigure={handleConfigure}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>
      <MobileAppSettingsFormSheet
        setting={editingSetting}
        defaultPlatform={defaultPlatform}
        open={sheetOpen}
        onOpenChange={handleSheetOpenChange}
      />
    </>
  );
}
