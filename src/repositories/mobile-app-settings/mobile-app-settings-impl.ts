import { Result, ResultType } from "@/core/types/results";
import {
  mobileAppSettingsEndpoint,
  mobileAppSettingsEndpoints,
} from "@/core/constants/endpoints";
import {
  callDelete,
  callGet,
  callPatch,
  callPost,
} from "@/core/services/api-services";
import {
  MobileAppSetting,
  MobileAppSettingPayload,
} from "./types";
import { MobileAppSettingsRepo } from "./mobile-app-settings-repo";

export class MobileAppSettingsImpl implements MobileAppSettingsRepo {
  getMobileAppSettings(): Promise<Result<ResultType<MobileAppSetting[]>>> {
    const endpoint = mobileAppSettingsEndpoint;
    return callGet<ResultType<MobileAppSetting[]>>(endpoint, "force-cache", {
      tags: [endpoint],
    });
  }

  getMobileAppSetting(id: string): Promise<Result<ResultType<MobileAppSetting>>> {
    const endpoint = mobileAppSettingsEndpoints.byId(id);
    return callGet<ResultType<MobileAppSetting>>(endpoint, "force-cache", {
      tags: [endpoint],
    });
  }

  addMobileAppSetting(
    payload: MobileAppSettingPayload,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = mobileAppSettingsEndpoint;
    return callPost<ResultType<void>>(endpoint, JSON.stringify(payload));
  }

  updateMobileAppSetting(
    id: string,
    payload: Partial<MobileAppSettingPayload>,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = mobileAppSettingsEndpoints.byId(id);
    return callPatch<ResultType<void>>(endpoint, JSON.stringify(payload));
  }

  deleteMobileAppSetting(id: string): Promise<Result<ResultType<void>>> {
    const endpoint = mobileAppSettingsEndpoints.byId(id);
    return callDelete<ResultType<void>>(endpoint);
  }
}
