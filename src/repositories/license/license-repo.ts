import { Result, ResultType } from "@/core/types/results";
import { LicenseByCompanyPayload } from "./types";

export interface LicenseRepo {
  createByCompanyId(
    companyId: string,
    payload: LicenseByCompanyPayload,
  ): Promise<Result<ResultType<void>>>;
  updateByCompanyId(
    companyId: string,
    licenseId: string,
    payload: LicenseByCompanyPayload,
  ): Promise<Result<ResultType<void>>>;
  deleteByCompanyId(
    companyId: string,
    licenseId: string,
  ): Promise<Result<ResultType<void>>>;
}
