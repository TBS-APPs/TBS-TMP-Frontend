"use server";

import { companyRepo } from "@/repositories/company";
import { CompanyFormValues } from "./company-form-schema";
import { isFailure } from "@/core/types/results";
import { getTranslations } from "next-intl/server";
import { companyEndpoint } from "@/core/constants/endpoints";
import { updateTag } from "next/cache";
import { AddActionResult } from "@/core/types/add-action-result";

export async function addCompany(
  values: CompanyFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const result = await companyRepo.addCompany({
    name: values.name,
    alias: values.alias,
  });

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }
  updateTag(companyEndpoint);
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
    name: values.name,
    alias: values.alias,
  });

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }
  updateTag(companyEndpoint);
  return {
    success: true,
    message: t("companyUpdatedSuccessfully"),
    data: result.data?.data,
  };
}
