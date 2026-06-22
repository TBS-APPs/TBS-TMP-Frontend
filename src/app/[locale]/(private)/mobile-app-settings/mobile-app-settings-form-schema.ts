import * as z from "zod";

const semverRegex = /^\d+\.\d+\.\d+$/;

export function createMobileAppSettingsFormSchema(t: (key: string) => string) {
  return z.object({
    platform: z.enum(["android", "ios"]),
    minimumVersion: z
      .string()
      .min(1, t("fieldRequired"))
      .regex(semverRegex, t("invalidSemver")),
    recommendedVersion: z
      .string()
      .min(1, t("fieldRequired"))
      .regex(semverRegex, t("invalidSemver")),
    latestVersion: z
      .string()
      .min(1, t("fieldRequired"))
      .regex(semverRegex, t("invalidSemver")),
    minimumBuildNumber: z.string(),
    recommendedBuildNumber: z.string(),
    storeUrl: z
      .string()
      .refine(
        (value) => value === "" || z.string().url().safeParse(value).success,
        t("invalidUrl"),
      ),
    updateMessage: z.string(),
    isMaintenanceModeEnabled: z.boolean(),
    maintenanceMessage: z.string(),
  });
}

export type MobileAppSettingsFormValues = z.infer<
  ReturnType<typeof createMobileAppSettingsFormSchema>
>;
