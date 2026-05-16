import { Result, ResultType } from "@/core/types/results";
import { Company } from ".";

export interface CompanyRepo {
  getCompanies(): Promise<Result<ResultType<Company[]>>>;
}
