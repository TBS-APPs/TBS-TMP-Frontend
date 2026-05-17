import { Result, ResultType } from "@/core/types/results";
import { Company } from ".";

export interface CompanyRepo {
  getCompanies(): Promise<Result<ResultType<Company[]>>>;
  getCompany(id: string): Promise<Result<ResultType<Company>>>;
  addCompany(company: Pick<Company, "name" | "alias">): Promise<Result<ResultType<void>>>;
  updateCompany(
    id: string,
    company: Pick<Company, "name" | "alias">,
  ): Promise<Result<ResultType<void>>>;
  deleteCompany(id: string): Promise<Result<ResultType<void>>>;
}
