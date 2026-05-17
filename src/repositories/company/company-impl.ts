import { Result, ResultType } from "@/core/types/results";
import { Company, CompanyRepo } from ".";
import { companyEndpoint } from "@/core/constants/endpoints";
import {
  callDelete,
  callGet,
  callPatch,
  callPost,
} from "@/core/services/api-services";

export class CompanyImpl implements CompanyRepo {
  getCompanies(): Promise<Result<ResultType<Company[]>>> {
    return callGet<ResultType<Company[]>>(companyEndpoint, "force-cache", {
      tags: [companyEndpoint],
    });
  }

  getCompany(id: string): Promise<Result<ResultType<Company>>> {
    const endpoint = `${companyEndpoint}/${id}`;
    return callGet<ResultType<Company>>(endpoint, "force-cache", {
      tags: [endpoint],
    });
  }

  addCompany(
    company: Pick<Company, "name" | "alias">,
  ): Promise<Result<ResultType<void>>> {
    return callPost<ResultType<void>>(
      companyEndpoint,
      JSON.stringify(company),
    );
  }

  updateCompany(
    id: string,
    company: Pick<Company, "name" | "alias">,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = `${companyEndpoint}/${id}`;
    return callPatch<ResultType<void>>(endpoint, JSON.stringify(company));
  }

  deleteCompany(id: string): Promise<Result<ResultType<void>>> {
    const endpoint = `${companyEndpoint}/${id}`;
    return callDelete<ResultType<void>>(endpoint);
  }
}
