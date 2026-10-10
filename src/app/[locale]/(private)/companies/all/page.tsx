import { isFailure } from "@/core/types/results";
import { companyRepo } from "@/repositories/company";
import { AllCompaniesTable } from "./all-companies-table";

export default async function AllCompaniesPage() {
  const companiesResult = await companyRepo.getCompanies({
    include: "translations",
  });
  if (isFailure(companiesResult)) {
    return <div>Error: {companiesResult.failure.message}</div>;
  }
  const companies = companiesResult.data?.data ?? [];
  return <AllCompaniesTable data={companies} />;
}
