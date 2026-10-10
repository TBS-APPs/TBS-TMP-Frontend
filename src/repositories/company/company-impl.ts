import { Result, ResultType } from "@/core/types/results";
import { Company, CompanyRepo, CompanyWritePayload } from ".";
import {
  callDelete,
  callGet,
  callPatch,
  callPost,
} from "@/core/services/api-services";
import { companyEndpoints } from "@/core/constants/endpoints";
import { withInclude } from "@/core/utils/entity-translation";
import { getLocale } from "next-intl/server";
import { TranslationIncludeOptions } from "./company-repo";

export class CompanyImpl implements CompanyRepo {
  async getCompanies(
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<Company[]>>> {
    const endpoint = withInclude(
      companyEndpoints.baseUrl,
      options?.include,
    );
    const locale = await getLocale();
    return callGet<ResultType<Company[]>>(endpoint, "force-cache", {
      tags: [companyEndpoints.baseUrl, `${endpoint}:${locale}`],
    });
  }

  async getCompany(
    id: string,
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<Company>>> {
    const endpoint = withInclude(
      companyEndpoints.company(id),
      options?.include,
    );
    const locale = await getLocale();
    return callGet<ResultType<Company>>(endpoint, "force-cache", {
      tags: [companyEndpoints.company(id), `${endpoint}:${locale}`],
    });
  }

  addCompany(
    company: CompanyWritePayload,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = companyEndpoints.baseUrl;
    return callPost<ResultType<void>>(endpoint, JSON.stringify(company));
  }

  updateCompany(
    id: string,
    company: CompanyWritePayload,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = companyEndpoints.company(id);
    return callPatch<ResultType<void>>(endpoint, JSON.stringify(company));
  }

  deleteCompany(id: string): Promise<Result<ResultType<void>>> {
    const endpoint = companyEndpoints.company(id);
    return callDelete<ResultType<void>>(endpoint);
  }

  async getCompanyDetail(
    id?: string,
    alias?: string,
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<Company>>> {
    const endpoint = withInclude(
      companyEndpoints.details(id, alias),
      options?.include,
    );
    const locale = await getLocale();
    return callGet<ResultType<Company>>(endpoint, "force-cache", {
      tags: [companyEndpoints.details(id, alias), `${endpoint}:${locale}`],
    });
  }
}
