export type EntityTranslationItem = {
  localeCode: string;
  name: string;
};

export type NameFields = {
  nameEn: string;
  nameAr: string;
};

export function translationsToNameFields(
  translations?: EntityTranslationItem[] | null,
): NameFields {
  const byCode = new Map(
    (translations ?? []).map((row) => [row.localeCode, row.name] as const),
  );
  return {
    nameEn: byCode.get("en") ?? "",
    nameAr: byCode.get("ar") ?? "",
  };
}

export function nameFieldsToTranslations({
  nameEn,
  nameAr,
}: NameFields): EntityTranslationItem[] {
  return [
    { localeCode: "en", name: nameEn.trim() },
    { localeCode: "ar", name: nameAr.trim() },
  ];
}

export function withInclude(
  endpoint: string,
  include?: string,
): string {
  if (!include?.trim()) {
    return endpoint;
  }
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${endpoint}${separator}include=${encodeURIComponent(include.trim())}`;
}
