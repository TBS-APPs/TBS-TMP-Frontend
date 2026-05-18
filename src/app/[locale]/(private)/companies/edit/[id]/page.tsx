import { companyRepo } from "@/repositories/company";
import { CompanyForm } from "../../company-form";
import { DynamicsSettingsForm } from "../../dynamics-settings-form";
import { isFailure } from "@/core/types/results";
import { routes } from "@/core/constants/routes";
import { redirect } from "@/core/i18n/navigation";
import { getLocale } from "next-intl/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCompanyPage({ params }: Props) {
  const { id } = await params;
  const locale = await getLocale();
  if(!id) {
    redirect({ href: routes.companies.all, locale: locale });
  }
  const companyResult = await companyRepo.getCompanyDetail(id);
  if (isFailure(companyResult)) {
    return <div>Error: {companyResult.failure.message}</div>;
  }
  const company = companyResult.data?.data;
  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <CompanyForm company={company} />
      {company.id != null && (
        <DynamicsSettingsForm
          companyId={company.id}
          dynamicsSettings={company.dynamicsSettings}
        />
      )}
    </div>
  );
}
