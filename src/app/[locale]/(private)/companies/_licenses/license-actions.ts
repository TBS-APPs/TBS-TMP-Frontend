"use server";

import { licenseRepo } from "@/repositories/license";
import { LicenseFormValues } from "./license-form-schema";
import { toIsoDatetime } from "./license-datetime";
import { isFailure } from "@/core/types/results";
import { getTranslations } from "next-intl/server";
import { companyEndpoints } from "@/core/constants/endpoints";
import { updateTag } from "next/cache";
import {
  AddActionResult,
  DeleteActionResult,
} from "@/core/types/add-action-result";

function toPayload(values: LicenseFormValues) {
  return {
    seatsLimit: Number(values.seatsLimit),
    startDate: toIsoDatetime(values.startDate),
    expirationDate: toIsoDatetime(values.expirationDate),
    moduleId: Number(values.moduleId),
  };
}

function invalidateCompanyDetail(companyId: number) {
  updateTag(companyEndpoints.details(String(companyId)));
}

export async function addLicense(
  companyId: number,
  values: LicenseFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const result = await licenseRepo.createByCompanyId(
    String(companyId),
    toPayload(values),
  );

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  invalidateCompanyDetail(companyId);
  return {
    success: true,
    message: t("licenseAddedSuccessfully"),
    data: result.data?.data,
  };
}

export async function updateLicense(
  companyId: number,
  licenseId: string,
  values: LicenseFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const result = await licenseRepo.updateByCompanyId(
    String(companyId),
    licenseId,
    toPayload(values),
  );

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  invalidateCompanyDetail(companyId);
  return {
    success: true,
    message: t("licenseUpdatedSuccessfully"),
    data: result.data?.data,
  };
}

export async function deleteLicense(
  companyId: number,
  licenseId: string,
): Promise<DeleteActionResult<unknown>> {
  const t = await getTranslations();
  const result = await licenseRepo.deleteByCompanyId(
    String(companyId),
    licenseId,
  );

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  invalidateCompanyDetail(companyId);
  return {
    success: true,
    message: t("licenseDeletedSuccessfully"),
    data: result.data?.data,
  };
}
