import { moduleRepo } from "@/repositories/module";
import { ModuleForm } from "../../module-form";
import { isFailure } from "@/core/types/results";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditModulePage({ params }: Props) {
  const { id } = await params;
  const moduleResult = await moduleRepo.getModule(id);
  if (isFailure(moduleResult)) {
    return <div>Error: {moduleResult.failure.message}</div>;
  }
  const module = moduleResult.data?.data;
  if (!module) {
    return <div>Module not found</div>;
  }
  return <ModuleForm module={module} />;
}
