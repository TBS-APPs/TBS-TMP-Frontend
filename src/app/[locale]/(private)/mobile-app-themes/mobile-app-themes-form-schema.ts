import * as z from "zod";

const hexColorRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
const themeCodeRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;

export function createMobileAppThemesFormSchema(t: (key: string) => string) {
  return z.object({
    code: z
      .string()
      .min(1, t("fieldRequired"))
      .regex(themeCodeRegex, t("invalidThemeCode")),
    name: z.string().min(1, t("fieldRequired")),
    isDefault: z.boolean(),
    isActive: z.boolean(),
    sortOrder: z
      .string()
      .min(1, t("fieldRequired"))
      .refine((value) => /^\d+$/.test(value), t("fieldRequired")),
    primary: z
      .string()
      .min(1, t("fieldRequired"))
      .regex(hexColorRegex, t("invalidHexColor")),
    secondary: z
      .string()
      .min(1, t("fieldRequired"))
      .regex(hexColorRegex, t("invalidHexColor")),
    tertiary: z
      .string()
      .min(1, t("fieldRequired"))
      .regex(hexColorRegex, t("invalidHexColor")),
  });
}

export type MobileAppThemesFormValues = z.infer<
  ReturnType<typeof createMobileAppThemesFormSchema>
>;
