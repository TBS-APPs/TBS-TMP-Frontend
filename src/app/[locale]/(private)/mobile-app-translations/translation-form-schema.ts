import * as z from "zod";

const keyRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

export function createTranslationFormSchema(t: (key: string) => string) {
  return z.object({
    key: z
      .string()
      .min(1, t("fieldRequired"))
      .regex(keyRegex, t("invalidTranslationKey")),
    en: z.string().min(1, t("fieldRequired")),
    ar: z.string().min(1, t("fieldRequired")),
    description: z.string(),
    metadataJson: z.string().refine((value) => {
      const trimmed = value.trim();
      if (!trimmed) return true;
      try {
        const parsed = JSON.parse(trimmed) as unknown;
        return (
          typeof parsed === "object" &&
          parsed !== null &&
          !Array.isArray(parsed)
        );
      } catch {
        return false;
      }
    }, t("invalidJsonObject")),
  });
}

export type TranslationFormValues = z.infer<
  ReturnType<typeof createTranslationFormSchema>
>;

export function parseMetadataJson(
  metadataJson: string,
): Record<string, unknown> | null {
  const trimmed = metadataJson.trim();
  if (!trimmed) return null;
  return JSON.parse(trimmed) as Record<string, unknown>;
}

export function stringifyMetadata(
  metadata?: Record<string, unknown> | null,
): string {
  if (!metadata || Object.keys(metadata).length === 0) return "";
  return JSON.stringify(metadata, null, 2);
}
