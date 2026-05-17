import { Result, ResultType } from "@/core/types/results";
import { Module, ModuleRepo } from ".";
import { moduleEndpoint } from "@/core/constants/endpoints";
import {
  callDelete,
  callGet,
  callPatch,
  callPost,
} from "@/core/services/api-services";

export class ModuleImpl implements ModuleRepo {
  getModules(): Promise<Result<ResultType<Module[]>>> {
    const endpoint = moduleEndpoint;
    return callGet<ResultType<Module[]>>(endpoint, "force-cache", {
      tags: [endpoint],
    });
  }
  getModule(id: string): Promise<Result<ResultType<Module>>> {
    const endpoint = `${moduleEndpoint}/${id}`;
    return callGet<ResultType<Module>>(endpoint, "force-cache", {
      tags: [endpoint],
    });
  }
  addModule(module: Module): Promise<Result<ResultType<void>>> {
    const endpoint = moduleEndpoint;
    return callPost<ResultType<void>>(endpoint, JSON.stringify(module));
  }
  updateModule(id: string, module: Module): Promise<Result<ResultType<void>>> {
    const endpoint = `${moduleEndpoint}/${id}`;
    return callPatch<ResultType<void>>(endpoint, JSON.stringify(module));
  }
  deleteModule(id: string): Promise<Result<ResultType<void>>> {
    const endpoint = `${moduleEndpoint}/${id}`;
    console.log(endpoint);
    return callDelete<ResultType<void>>(endpoint);
  }
}
