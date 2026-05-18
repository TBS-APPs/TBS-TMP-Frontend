import { Result, ResultType } from "@/core/types/results";
import { DynamicsSettings, DynamicsSettingsRepo } from ".";
import { dynamicsSettingsEndpoints } from "@/core/constants/endpoints";
import { callPost } from "@/core/services/api-services";

export class DynamicsSettingsImpl implements DynamicsSettingsRepo {
  upsertByCompanyId(
    companyId: string,
    payload: DynamicsSettings,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = dynamicsSettingsEndpoints.company(companyId);
    return callPost<ResultType<void>>(endpoint, JSON.stringify(payload));
  }
}
