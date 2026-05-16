import { Result, ResultType } from "@/core/types/results";
import { Module } from ".";

export interface ModuleRepo {
  getModules(): Promise<Result<ResultType<Module[]>>>;
}
