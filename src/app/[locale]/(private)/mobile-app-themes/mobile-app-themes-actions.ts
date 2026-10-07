"use server";

import {
  MobileAppThemePaletteCreatePayload,
  MobileAppThemePaletteUpdatePayload,
  mobileAppThemesRepo,
} from "@/repositories/mobile-app-themes";
import { MobileAppThemesFormValues } from "./mobile-app-themes-form-schema";
import { isFailure } from "@/core/types/results";
import { getTranslations } from "next-intl/server";
import { mobileAppThemesEndpoint } from "@/core/constants/endpoints";
import { updateTag } from "next/cache";
import {
  AddActionResult,
  DeleteActionResult,
} from "@/core/types/add-action-result";

function toCreatePayload(
  values: MobileAppThemesFormValues,
): MobileAppThemePaletteCreatePayload {
  return {
    code: values.code.trim(),
    name: values.name.trim(),
    isDefault: values.isDefault,
    isActive: values.isActive,
    sortOrder: Number(values.sortOrder),
    primary: values.primary.trim(),
    secondary: values.secondary.trim(),
    tertiary: values.tertiary.trim(),
  };
}

function toUpdatePayload(
  values: MobileAppThemesFormValues,
): MobileAppThemePaletteUpdatePayload {
  const { code: _code, ...rest } = toCreatePayload(values);
  return rest;
}

export async function addThemePalette(
  values: MobileAppThemesFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const result = await mobileAppThemesRepo.addThemePalette(
    toCreatePayload(values),
  );

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  updateTag(mobileAppThemesEndpoint);
  return {
    success: true,
    message: t("themePaletteAddedSuccessfully"),
    data: result.data?.data,
  };
}

export async function updateThemePalette(
  id: string,
  values: MobileAppThemesFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const result = await mobileAppThemesRepo.updateThemePalette(
    id,
    toUpdatePayload(values),
  );

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  updateTag(mobileAppThemesEndpoint);
  return {
    success: true,
    message: t("themePaletteUpdatedSuccessfully"),
    data: result.data?.data,
  };
}

export async function deleteThemePalette(
  id: string,
): Promise<DeleteActionResult<unknown>> {
  const t = await getTranslations();
  const result = await mobileAppThemesRepo.deleteThemePalette(id);

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  updateTag(mobileAppThemesEndpoint);
  return {
    success: true,
    message: t("themePaletteDeletedSuccessfully"),
    data: result.data?.data,
  };
}
