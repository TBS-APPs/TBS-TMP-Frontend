export type MobileAppPlatform = "android" | "ios";

export interface MobileAppSetting {
  id?: number;
  platform: MobileAppPlatform;
  minimumVersion: string;
  recommendedVersion: string;
  latestVersion: string;
  minimumBuildNumber?: number;
  recommendedBuildNumber?: number;
  storeUrl?: string;
  updateMessage?: string;
  isMaintenanceModeEnabled?: boolean;
  maintenanceMessage?: string;
}

export type MobileAppSettingPayload = Omit<MobileAppSetting, "id">;

export type MobileAppSettingsRow = {
  platform: MobileAppPlatform;
  configured: boolean;
  setting?: MobileAppSetting;
};

export const MOBILE_APP_PLATFORMS: MobileAppPlatform[] = ["ios", "android"];

export function mergeMobileAppSettingsRows(
  settings: MobileAppSetting[],
): MobileAppSettingsRow[] {
  return MOBILE_APP_PLATFORMS.map((platform) => {
    const setting = settings.find((item) => item.platform === platform);
    return {
      platform,
      configured: setting != null,
      setting,
    };
  });
}
