import { Result, ResultType } from "@/core/types/results";
import { Company, CompanyRepo } from ".";
import { getCompaniesEndpoint } from "@/core/constants/endpoints";
import { callGet } from "@/core/services/api-services";

export class CompanyImpl implements CompanyRepo {
  getCompanies(): Promise<Result<ResultType<Company[]>>> {
    const endpoint = getCompaniesEndpoint;
    return callGet<ResultType<Company[]>>(endpoint);
  }
}
