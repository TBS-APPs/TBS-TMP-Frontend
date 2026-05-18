import { Result, ResultType } from "@/core/types/results";
import { Company, CompanyRepo } from ".";
import {
  callDelete,
  callGet,
  callPatch,
  callPost,
} from "@/core/services/api-services";
import { companyEndpoints } from "@/core/constants/endpoints";

export class CompanyImpl implements CompanyRepo {
  getCompanies(): Promise<Result<ResultType<Company[]>>> {
    const endpoint = companyEndpoints.baseUrl;
    return callGet<ResultType<Company[]>>(endpoint, "force-cache", {
      tags: [endpoint],
    });
  }

  getCompany(id: string): Promise<Result<ResultType<Company>>> {
    const endpoint = companyEndpoints.company(id);
    return callGet<ResultType<Company>>(endpoint, "force-cache", {
      tags: [endpoint],
    });
  }

  addCompany(
    company: Pick<Company, "name" | "alias">,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = companyEndpoints.baseUrl;
    return callPost<ResultType<void>>(endpoint, JSON.stringify(company));
  }

  updateCompany(
    id: string,
    company: Pick<Company, "name" | "alias">,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = companyEndpoints.company(id);
    return callPatch<ResultType<void>>(endpoint, JSON.stringify(company));
  }

  deleteCompany(id: string): Promise<Result<ResultType<void>>> {
    const endpoint = companyEndpoints.company(id);
    return callDelete<ResultType<void>>(endpoint);
  }

  getCompanyDetail(
    id?: string,
    alias?: string,
  ): Promise<Result<ResultType<Company>>> {
    const endpoint = companyEndpoints.details(id, alias);
    return callGet<ResultType<Company>>(endpoint, "force-cache", {
      tags: [endpoint],
    });
  }
}
