"use server";

import { dynamicsSettingsRepo } from "@/repositories/dynamics-settings";
import { DynamicsSettingsFormValues } from "./dynamics-settings-form-schema";
import { isFailure } from "@/core/types/results";
import { getTranslations } from "next-intl/server";
import {
  companyEndpoints,
  dynamicsSettingsEndpoints,
} from "@/core/constants/endpoints";
import { updateTag } from "next/cache";
import { AddActionResult } from "@/core/types/add-action-result";

export async function upsertDynamicsSettings(
  companyId: number,
  values: DynamicsSettingsFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const payload = {
    baseUrl: values.baseUrl,
    tokenUrl: values.tokenUrl,
    clientId: values.clientId,
    clientSecret: values.clientSecret,
    tenantId: values.tenantId,
    resource: values.resource,
  };

  const result = await dynamicsSettingsRepo.upsertByCompanyId(
    String(companyId),
    payload,
  );

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  const companyIdStr = String(companyId);
  updateTag(companyEndpoints.details(companyIdStr));
  updateTag(dynamicsSettingsEndpoints.company(companyIdStr));

  return {
    success: true,
    message: t("dynamicsSettingSavedSuccessfully"),
    data: result.data?.data,
  };
}
