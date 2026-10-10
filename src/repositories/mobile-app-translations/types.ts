export interface MobileAppTranslationKey {
  id: string;
  key: string;
  description?: string | null;
  metadata?: Record<string, unknown> | null;
}

export interface MobileAppTranslationLocale {
  id: string;
  code: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
}

export interface MobileAppTranslation {
  id: string;
  value: string;
  translationKey: MobileAppTranslationKey;
  locale: MobileAppTranslationLocale;
}

export type CreateMobileAppTranslationKeyPayload = {
  key: string;
  description?: string;
  metadata?: Record<string, unknown>;
};

export type UpdateMobileAppTranslationKeyPayload = {
  description?: string | null;
  metadata?: Record<string, unknown> | null;
};

export type UpsertMobileAppTranslationPayload = {
  key: string;
  localeCode: string;
  value: string;
};

export type TranslationRow = {
  keyId: string;
  key: string;
  description?: string | null;
  metadata?: Record<string, unknown> | null;
  en: string;
  ar: string;
};

export function mergeTranslationRows(
  keys: MobileAppTranslationKey[],
  translations: MobileAppTranslation[],
): TranslationRow[] {
  const valuesByKeyId = new Map<string, { en: string; ar: string }>();

  for (const translation of translations) {
    const keyId = translation.translationKey?.id;
    if (keyId == null) continue;
    const current = valuesByKeyId.get(keyId) ?? { en: "", ar: "" };
    const code = translation.locale?.code;
    if (code === "en") current.en = translation.value;
    if (code === "ar") current.ar = translation.value;
    valuesByKeyId.set(keyId, current);
  }

  return keys
    .map((item) => {
      const values = valuesByKeyId.get(item.id) ?? { en: "", ar: "" };
      return {
        keyId: item.id,
        key: item.key,
        description: item.description ?? null,
        metadata: item.metadata ?? null,
        en: values.en,
        ar: values.ar,
      };
    })
    .sort((a, b) => a.key.localeCompare(b.key));
}
