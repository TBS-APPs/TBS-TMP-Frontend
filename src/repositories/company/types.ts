import { EntityTranslationItem } from "@/core/utils/entity-translation";
import { DynamicsSettings } from "../dynamics-settings/types";
import { License } from "../license/types";

export interface Company {
  id?: string;
  name?: string;
  alias: string;
  status?: string;
  translations?: EntityTranslationItem[];
  dynamicsSettings?: DynamicsSettings;
  licenses?: License[];
}

export type CompanyWritePayload = {
  alias: string;
  translations: EntityTranslationItem[];
};
