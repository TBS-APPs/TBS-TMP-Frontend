import { Result, ResultType } from "@/core/types/results";
import { DynamicsSettings } from ".";

export interface DynamicsSettingsRepo {
  upsertByCompanyId(
    companyId: string,
    payload: DynamicsSettings,
  ): Promise<Result<ResultType<void>>>;
}
