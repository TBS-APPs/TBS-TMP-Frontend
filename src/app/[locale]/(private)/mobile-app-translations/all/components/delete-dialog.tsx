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
import { deleteTranslationKey } from "../../translation-actions";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "@/core/i18n/navigation";

export function DeleteTranslationKeyDialog({
  id,
  open,
  onOpenChange,
  onDeleted,
}: {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deleteTranslationKey(id);
    setIsLoading(false);
    if (result.success) {
      onOpenChange(false);
      toast.success(result.message);
      router.refresh();
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
            {t("areYouSureYouWantToDeleteThisTranslationKey")}
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
