import { EntityTranslationItem } from "@/core/utils/entity-translation";

export interface Module {
  id?: string;
  name?: string;
  alias?: string;
  translations?: EntityTranslationItem[];
}

export type ModuleWritePayload = {
  alias?: string;
  translations: EntityTranslationItem[];
};
