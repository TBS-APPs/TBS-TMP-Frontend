import { Result, ResultType } from "@/core/types/results";
import { Module, ModuleWritePayload } from ".";

export type TranslationIncludeOptions = {
  include?: string;
};

export interface ModuleRepo {
  getModules(
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<Module[]>>>;
  getModule(
    id: string,
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<Module>>>;
  addModule(module: ModuleWritePayload): Promise<Result<ResultType<void>>>;
  updateModule(
    id: string,
    module: ModuleWritePayload,
  ): Promise<Result<ResultType<void>>>;
  deleteModule(id: string): Promise<Result<ResultType<void>>>;
}
