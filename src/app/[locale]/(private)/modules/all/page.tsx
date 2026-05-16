import { isFailure } from "@/core/types/results";
import { moduleRepo } from "@/repositories/module";
import { AllModulesTable } from "./all-modules-table";

export default async function AllModulesPage() {
  const modulesResult = await moduleRepo.getModules();
  if (isFailure(modulesResult)) {
    return <div>Error: {modulesResult.failure.message}</div>;
  }
  const modules = modulesResult.data?.data ?? [];
  return <AllModulesTable data={modules} />;
}
