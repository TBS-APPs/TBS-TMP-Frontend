"use server";

import { Module, moduleRepo } from "@/repositories/module";
import { isFailure } from "@/core/types/results";
import { getTranslations } from "next-intl/server";
import { moduleEndpoint } from "@/core/constants/endpoints";
import { updateTag } from "next/cache";
import { DeleteActionResult } from "@/core/types/add-action-result";

export async function deleteModule(
  id: string,
): Promise<DeleteActionResult<unknown>> {
  const t = await getTranslations();
  const result = await moduleRepo.deleteModule(id);

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  } else {
    updateTag(moduleEndpoint);
    return {
      success: true,
      message: t("moduleDeletedSuccessfully"),
      data: result.data?.data,
    };
  }
}
