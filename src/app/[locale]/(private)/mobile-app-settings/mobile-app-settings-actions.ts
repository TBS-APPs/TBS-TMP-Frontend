"use server";

import {
  MobileAppSettingPayload,
  mobileAppSettingsRepo,
} from "@/repositories/mobile-app-settings";
import { MobileAppSettingsFormValues } from "./mobile-app-settings-form-schema";
import { isFailure } from "@/core/types/results";
import { getTranslations } from "next-intl/server";
import { mobileAppSettingsEndpoint } from "@/core/constants/endpoints";
import { updateTag } from "next/cache";
import {
  AddActionResult,
  DeleteActionResult,
} from "@/core/types/add-action-result";

function toPayload(values: MobileAppSettingsFormValues): MobileAppSettingPayload {
  const payload: MobileAppSettingPayload = {
    platform: values.platform,
    minimumVersion: values.minimumVersion,
    recommendedVersion: values.recommendedVersion,
    latestVersion: values.latestVersion,
    isMaintenanceModeEnabled: values.isMaintenanceModeEnabled,
  };

  if (values.minimumBuildNumber.trim()) {
    payload.minimumBuildNumber = Number(values.minimumBuildNumber);
  }
  if (values.recommendedBuildNumber.trim()) {
    payload.recommendedBuildNumber = Number(values.recommendedBuildNumber);
  }
  if (values.storeUrl.trim()) {
    payload.storeUrl = values.storeUrl.trim();
  }
  if (values.updateMessage.trim()) {
    payload.updateMessage = values.updateMessage.trim();
  }
  if (values.maintenanceMessage.trim()) {
    payload.maintenanceMessage = values.maintenanceMessage.trim();
  }

  return payload;
}

export async function addMobileAppSetting(
  values: MobileAppSettingsFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const result = await mobileAppSettingsRepo.addMobileAppSetting(toPayload(values));

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  updateTag(mobileAppSettingsEndpoint);
  return {
    success: true,
    message: t("mobileAppSettingAddedSuccessfully"),
    data: result.data?.data,
  };
}

export async function updateMobileAppSetting(
  id: string,
  values: MobileAppSettingsFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const { platform: _platform, ...updatePayload } = toPayload(values);
  const result = await mobileAppSettingsRepo.updateMobileAppSetting(
    id,
    updatePayload,
  );

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  updateTag(mobileAppSettingsEndpoint);
  return {
    success: true,
    message: t("mobileAppSettingUpdatedSuccessfully"),
    data: result.data?.data,
  };
}

export async function deleteMobileAppSetting(
  id: string,
): Promise<DeleteActionResult<unknown>> {
  const t = await getTranslations();
  const result = await mobileAppSettingsRepo.deleteMobileAppSetting(id);

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  updateTag(mobileAppSettingsEndpoint);
  return {
    success: true,
    message: t("mobileAppSettingDeletedSuccessfully"),
    data: result.data?.data,
  };
}
