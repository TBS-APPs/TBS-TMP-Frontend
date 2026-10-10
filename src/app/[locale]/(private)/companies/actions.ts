"use server";

import { companyRepo } from "@/repositories/company";
import { CompanyFormValues } from "./_licenses/company-form-schema";
import { isFailure } from "@/core/types/results";
import { getTranslations } from "next-intl/server";
import { companyEndpoints } from "@/core/constants/endpoints";
import { updateTag } from "next/cache";
import { AddActionResult } from "@/core/types/add-action-result";
import { nameFieldsToTranslations } from "@/core/utils/entity-translation";

export async function addCompany(
  values: CompanyFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const result = await companyRepo.addCompany({
    alias: values.alias,
    translations: nameFieldsToTranslations(values),
  });

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }
  updateTag(companyEndpoints.baseUrl);
  return {
    success: true,
    message: t("companyAddedSuccessfully"),
    data: result.data?.data,
  };
}

export async function updateCompany(
  id: string,
  values: CompanyFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const result = await companyRepo.updateCompany(id, {
    alias: values.alias,
    translations: nameFieldsToTranslations(values),
  });

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }
  updateTag(companyEndpoints.baseUrl);
  return {
    success: true,
    message: t("companyUpdatedSuccessfully"),
    data: result.data?.data,
  };
}
