import { DynamicsSettings } from "../dynamics-settings/types";
import { License } from "../license/types";

export interface Company {
  id?: number;
  name: string;
  alias: string;
  status?: string;
  dynamicsSettings?: DynamicsSettings;
  licenses?: License[];
}
