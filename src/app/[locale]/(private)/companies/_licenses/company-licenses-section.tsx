import { isFailure } from "@/core/types/results";
import { moduleRepo } from "@/repositories/module";
import { License } from "@/repositories/license/types";
import type { SelectOption } from "@/components/form";
import { CompanyLicensesSectionClient } from "./company-licenses-section-client";

type Props = {
  companyId: string;
  licenses?: License[];
};

export async function CompanyLicensesSection({ companyId, licenses }: Props) {
  const modulesResult = await moduleRepo.getModules();
  if (isFailure(modulesResult)) {
    return <div>Error: {modulesResult.failure.message}</div>;
  }

  const moduleOptions: SelectOption[] = (modulesResult.data?.data ?? []).map(
    (module) => ({
      value: String(module.id),
      label: module.name ?? "—",
    }),
  );

  return (
    <CompanyLicensesSectionClient
      companyId={companyId}
      licenses={licenses ?? []}
      moduleOptions={moduleOptions}
    />
  );
}
