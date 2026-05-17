"use server";

import { companyRepo } from "@/repositories/company";
import { isFailure } from "@/core/types/results";
import { getTranslations } from "next-intl/server";
import { companyEndpoint } from "@/core/constants/endpoints";
import { updateTag } from "next/cache";
import { DeleteActionResult } from "@/core/types/add-action-result";

export async function deleteCompany(
  id: string,
): Promise<DeleteActionResult<unknown>> {
  const t = await getTranslations();
  const result = await companyRepo.deleteCompany(id);

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }
  updateTag(companyEndpoint);
  return {
    success: true,
    message: t("companyDeletedSuccessfully"),
    data: result.data?.data,
  };
}
