import { Result, ResultType } from "@/core/types/results";
import { Company, CompanyWritePayload } from ".";

export type TranslationIncludeOptions = {
  include?: string;
};

export interface CompanyRepo {
  getCompanies(
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<Company[]>>>;
  getCompany(
    id: string,
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<Company>>>;
  addCompany(
    company: CompanyWritePayload,
  ): Promise<Result<ResultType<void>>>;
  updateCompany(
    id: string,
    company: CompanyWritePayload,
  ): Promise<Result<ResultType<void>>>;
  deleteCompany(id: string): Promise<Result<ResultType<void>>>;

  getCompanyDetail(
    id?: string,
    alias?: string,
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<Company>>>;
}
