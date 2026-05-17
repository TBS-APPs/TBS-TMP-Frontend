import { companyRepo } from "@/repositories/company";
import { CompanyForm } from "../../company-form";
import { isFailure } from "@/core/types/results";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCompanyPage({ params }: Props) {
  const { id } = await params;
  const companyResult = await companyRepo.getCompany(id);
  if (isFailure(companyResult)) {
    return <div>Error: {companyResult.failure.message}</div>;
  }
  const company = companyResult.data?.data;
  if (!company) {
    return <div>Company not found</div>;
  }
  return <CompanyForm company={company} />;
}
