"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteCompany } from "../actions";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

/** Renders outside dropdown content so the menu closing does not unmount the dialog. */
export function DeleteCompanyDialog({
  id,
  open,
  onOpenChange,
  onDeleted,
}: {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called after a successful delete (e.g. navigate away from edit page). */
  onDeleted?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deleteCompany(id);
    setIsLoading(false);
    if (result.success) {
      onOpenChange(false);
      onDeleted?.();
    } else {
      toast.error(result.message);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("areYouSureYouWantToDeleteThisCompany")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              handleDelete();
            }}
          >
            {isLoading ? <Spinner /> : t("yes")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
