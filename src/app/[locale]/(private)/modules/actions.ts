"use server";

import { moduleRepo } from "@/repositories/module";
import { ModuleFormValues } from "./module-form-schema";
import { isFailure } from "@/core/types/results";
import { getTranslations } from "next-intl/server";
import { moduleEndpoint } from "@/core/constants/endpoints";
import { updateTag } from "next/cache";
import { AddActionResult } from "@/core/types/add-action-result";
import { nameFieldsToTranslations } from "@/core/utils/entity-translation";

export async function addModule(
  values: ModuleFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const result = await moduleRepo.addModule({
    translations: nameFieldsToTranslations(values),
  });

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }
  updateTag(moduleEndpoint);
  return {
    success: true,
    message: t("moduleAddedSuccessfully"),
    data: result.data?.data,
  };
}

export async function updateModule(
  id: string,
  values: ModuleFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const result = await moduleRepo.updateModule(id, {
    translations: nameFieldsToTranslations(values),
  });

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }
  updateTag(moduleEndpoint);
  return {
    success: true,
    message: t("moduleUpdatedSuccessfully"),
    data: result.data?.data,
  };
}
