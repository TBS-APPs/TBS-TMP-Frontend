import { Result, ResultType } from "@/core/types/results";
import { Module } from ".";

export interface ModuleRepo {
  getModules(): Promise<Result<ResultType<Module[]>>>;
  addModule(module: Module): Promise<Result<ResultType<void>>>;
  deleteModule(id: string): Promise<Result<ResultType<void>>>;
}
