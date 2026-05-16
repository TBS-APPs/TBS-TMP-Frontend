import { Result, ResultType } from "@/core/types/results";
import { Module, ModuleRepo } from ".";
import { getModulesEndpoint } from "@/core/constants/endpoints";
import { callGet } from "@/core/services/api-services";

export class ModuleImpl implements ModuleRepo {
  getModules(): Promise<Result<ResultType<Module[]>>> {
    const endpoint = getModulesEndpoint;
    return callGet<ResultType<Module[]>>(endpoint);
  }
}
