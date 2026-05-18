"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AddLicenseButton() {
  const t = useTranslations();

  return (
    <Button
      type="button"
      size="sm"
      onClick={() => toast.info(t("addLicenseComingSoon"))}
    >
      {t("addLicense")}
    </Button>
  );
}
