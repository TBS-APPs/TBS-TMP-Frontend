import { EntityTranslationItem } from "@/core/utils/entity-translation";

export interface MobileAppThemePalette {
  id: string;
  code: string;
  name?: string;
  isDefault: boolean;
  isActive: boolean;
  sortOrder: number;
  primary: string;
  secondary: string;
  tertiary: string;
  translations?: EntityTranslationItem[];
}

export type MobileAppThemePaletteCreatePayload = {
  code: string;
  isDefault?: boolean;
  isActive?: boolean;
  sortOrder?: number;
  primary: string;
  secondary: string;
  tertiary: string;
  translations: EntityTranslationItem[];
};

export type MobileAppThemePaletteUpdatePayload = Omit<
  MobileAppThemePaletteCreatePayload,
  "code"
>;
