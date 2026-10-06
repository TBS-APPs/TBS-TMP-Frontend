"use server";

import { mobileAppTranslationsEndpoint } from "@/core/constants/endpoints";
import {
  AddActionResult,
  DeleteActionResult,
} from "@/core/types/add-action-result";
import { isFailure } from "@/core/types/results";
import { mobileAppTranslationsRepo } from "@/repositories/mobile-app-translations";
import { getTranslations } from "next-intl/server";
import { updateTag } from "next/cache";
import {
  parseMetadataJson,
  TranslationFormValues,
} from "./translation-form-schema";

async function upsertLocaleValues(values: TranslationFormValues) {
  const enResult = await mobileAppTranslationsRepo.upsertTranslation({
    key: values.key,
    localeCode: "en",
    value: values.en,
  });
  if (isFailure(enResult)) {
    return enResult;
  }

  const arResult = await mobileAppTranslationsRepo.upsertTranslation({
    key: values.key,
    localeCode: "ar",
    value: values.ar,
  });
  return arResult;
}

export async function addTranslationKey(
  values: TranslationFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const metadata = parseMetadataJson(values.metadataJson);

  const createResult = await mobileAppTranslationsRepo.createKey({
    key: values.key,
    ...(values.description.trim()
      ? { description: values.description.trim() }
      : {}),
    ...(metadata ? { metadata } : {}),
  });

  if (isFailure(createResult)) {
    return { success: false, message: createResult.failure.message };
  }

  const upsertResult = await upsertLocaleValues(values);
  if (isFailure(upsertResult)) {
    return { success: false, message: upsertResult.failure.message };
  }

  updateTag(mobileAppTranslationsEndpoint);
  return {
    success: true,
    message: t("translationKeyAddedSuccessfully"),
    data: createResult.data?.data,
  };
}

export async function updateTranslationKey(
  id: string,
  values: TranslationFormValues,
): Promise<AddActionResult<unknown>> {
  const t = await getTranslations();
  const metadata = parseMetadataJson(values.metadataJson);

  const updateResult = await mobileAppTranslationsRepo.updateKey(id, {
    description: values.description.trim() || null,
    metadata,
  });

  if (isFailure(updateResult)) {
    return { success: false, message: updateResult.failure.message };
  }

  const upsertResult = await upsertLocaleValues(values);
  if (isFailure(upsertResult)) {
    return { success: false, message: upsertResult.failure.message };
  }

  updateTag(mobileAppTranslationsEndpoint);
  return {
    success: true,
    message: t("translationKeyUpdatedSuccessfully"),
    data: updateResult.data?.data,
  };
}

export async function deleteTranslationKey(
  id: string,
): Promise<DeleteActionResult<unknown>> {
  const t = await getTranslations();
  const result = await mobileAppTranslationsRepo.deleteKey(id);

  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  updateTag(mobileAppTranslationsEndpoint);
  return {
    success: true,
    message: t("translationKeyDeletedSuccessfully"),
    data: result.data?.data,
  };
}
