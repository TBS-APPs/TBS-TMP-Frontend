"use client";

import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Company } from "@/repositories/company";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { shareQrImage } from "./share-qr-image";

/** Renders outside dropdown content so the menu closing does not unmount the dialog. */
export function CompanyQrDialog({
  company,
  open,
  onOpenChange,
}: {
  company: Pick<Company, "name" | "alias">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations();
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const alias = company.alias?.trim() ?? "";
  const hasAlias = alias.length > 0;
  const fileName = `company-${alias || "qr"}.png`;

  const handleCopyAlias = async () => {
    if (!hasAlias) return;
    try {
      await navigator.clipboard.writeText(alias);
      toast.success(t("aliasCopied"));
    } catch {
      toast.error(t("shareNotSupported"));
    }
  };

  const handleShareQr = async () => {
    const svg = qrContainerRef.current?.querySelector("svg");
    if (!svg || !hasAlias) return;

    setIsSharing(true);
    try {
      const result = await shareQrImage(svg, fileName, company.name);
      if (result === "shared") {
        toast.success(t("qrShared"));
      } else if (result === "downloaded") {
        toast.success(t("qrDownloaded"));
      }
    } catch {
      toast.error(t("shareNotSupported"));
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("companyQrCode")}</DialogTitle>
          <DialogDescription>
            {t("companyQrCodeDescription", { name: company.name })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-2">
          {hasAlias ? (
            <>
              <div
                ref={qrContainerRef}
                className="rounded-lg border bg-white p-4"
              >
                <QRCode value={alias} size={200} />
              </div>
              <p className="text-sm text-muted-foreground">{alias}</p>
            </>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              {t("companyAliasRequiredForQr")}
            </p>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleCopyAlias}
            disabled={!hasAlias}
          >
            {t("copyAlias")}
          </Button>
          <Button
            type="button"
            onClick={handleShareQr}
            disabled={!hasAlias || isSharing}
          >
            {isSharing ? <Spinner /> : t("shareQrCode")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
