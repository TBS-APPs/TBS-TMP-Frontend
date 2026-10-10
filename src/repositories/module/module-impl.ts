import { Result, ResultType } from "@/core/types/results";
import { Module, ModuleRepo, ModuleWritePayload } from ".";
import { moduleEndpoint } from "@/core/constants/endpoints";
import {
  callDelete,
  callGet,
  callPatch,
  callPost,
} from "@/core/services/api-services";
import { withInclude } from "@/core/utils/entity-translation";
import { getLocale } from "next-intl/server";
import { TranslationIncludeOptions } from "./module-repo";

export class ModuleImpl implements ModuleRepo {
  async getModules(
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<Module[]>>> {
    const endpoint = withInclude(moduleEndpoint, options?.include);
    const locale = await getLocale();
    return callGet<ResultType<Module[]>>(endpoint, "force-cache", {
      tags: [moduleEndpoint, `${endpoint}:${locale}`],
    });
  }

  async getModule(
    id: string,
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<Module>>> {
    const base = `${moduleEndpoint}/${id}`;
    const endpoint = withInclude(base, options?.include);
    const locale = await getLocale();
    return callGet<ResultType<Module>>(endpoint, "force-cache", {
      tags: [base, `${endpoint}:${locale}`],
    });
  }

  addModule(module: ModuleWritePayload): Promise<Result<ResultType<void>>> {
    const endpoint = moduleEndpoint;
    return callPost<ResultType<void>>(endpoint, JSON.stringify(module));
  }

  updateModule(
    id: string,
    module: ModuleWritePayload,
  ): Promise<Result<ResultType<void>>> {
    const endpoint = `${moduleEndpoint}/${id}`;
    return callPatch<ResultType<void>>(endpoint, JSON.stringify(module));
  }

  deleteModule(id: string): Promise<Result<ResultType<void>>> {
    const endpoint = `${moduleEndpoint}/${id}`;
    return callDelete<ResultType<void>>(endpoint);
  }
}
