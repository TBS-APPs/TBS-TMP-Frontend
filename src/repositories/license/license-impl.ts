import { Result, ResultType } from "@/core/types/results";
import { LicenseByCompanyPayload, LicenseRepo } from ".";
import { licenseEndpoints } from "@/core/constants/endpoints";
import {
  callDelete,
  callPatch,
  callPost,
} from "@/core/services/api-services";

export class LicenseImpl implements LicenseRepo {
  createByCompanyId(
    companyId: string,
    payload: LicenseByCompanyPayload,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = licenseEndpoints.company(companyId);
    return callPost<ResultType<void>>(endpoint, JSON.stringify(payload));
  }

  updateByCompanyId(
    companyId: string,
    licenseId: string,
    payload: LicenseByCompanyPayload,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = licenseEndpoints.companyLicense(companyId, licenseId);
    return callPatch<ResultType<void>>(endpoint, JSON.stringify(payload));
  }

  deleteByCompanyId(
    companyId: string,
    licenseId: string,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = licenseEndpoints.companyLicense(companyId, licenseId);
    return callDelete<ResultType<void>>(endpoint);
  }
}
