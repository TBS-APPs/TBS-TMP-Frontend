import { isFailure } from "@/core/types/results";
import { mobileAppSettingsRepo } from "@/repositories/mobile-app-settings";
import { MobileAppSettingsSectionClient } from "./mobile-app-settings-section-client";

export default async function AllMobileAppSettingsPage() {
  const settingsResult = await mobileAppSettingsRepo.getMobileAppSettings();
  if (isFailure(settingsResult)) {
    return <div>Error: {settingsResult.failure.message}</div>;
  }
  const settings = settingsResult.data?.data ?? [];
  return <MobileAppSettingsSectionClient settings={settings} />;
}
