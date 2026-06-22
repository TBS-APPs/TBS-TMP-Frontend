import { Result, ResultType } from "@/core/types/results";
import { MobileAppSetting, MobileAppSettingPayload } from "./types";

export interface MobileAppSettingsRepo {
  getMobileAppSettings(): Promise<Result<ResultType<MobileAppSetting[]>>>;
  getMobileAppSetting(id: string): Promise<Result<ResultType<MobileAppSetting>>>;
  addMobileAppSetting(
    payload: MobileAppSettingPayload,
  ): Promise<Result<ResultType<void>>>;
  updateMobileAppSetting(
    id: string,
    payload: Partial<MobileAppSettingPayload>,
  ): Promise<Result<ResultType<void>>>;
  deleteMobileAppSetting(id: string): Promise<Result<ResultType<void>>>;
}
