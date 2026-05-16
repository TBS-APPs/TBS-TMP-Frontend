"use server";

import { Module, moduleRepo } from "@/repositories/module";
import { AddModuleFormValues } from "./add-module-form-schema";
import { isFailure } from "@/core/types/results";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

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
    return {
      success: true,
      message: t("moduleAddedSuccessfully"),
      data: result.data?.data,
    };
  }
}
