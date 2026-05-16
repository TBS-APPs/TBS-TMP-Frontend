"use server";

import { Module, moduleRepo } from "@/repositories/module";
import { AddModuleFormValues } from "./add-module-form-schema";
import { isFailure } from "@/core/types/results";
import { getTranslations } from "next-intl/server";
import { moduleEndpoint } from "@/core/constants/endpoints";
import { updateTag } from "next/cache";

export async function addModule(
  values: AddModuleFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const module: Module = {
    name: values.name,
  };
  const result = await moduleRepo.addModule(module);

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  } else {
    updateTag(moduleEndpoint);
    // revalidateTag(moduleEndpoint, { expire: 60 });
    return {
      success: true,
      message: t("moduleAddedSuccessfully"),
      data: result.data?.data,
    };
  }
}
