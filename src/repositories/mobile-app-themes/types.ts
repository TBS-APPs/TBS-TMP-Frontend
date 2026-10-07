export interface MobileAppThemePalette {
  id: number;
  code: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
  sortOrder: number;
  primary: string;
  secondary: string;
  tertiary: string;
}

export type MobileAppThemePaletteCreatePayload = {
  code: string;
  name: string;
  isDefault?: boolean;
  isActive?: boolean;
  sortOrder?: number;
  primary: string;
  secondary: string;
  tertiary: string;
};

export type MobileAppThemePaletteUpdatePayload = Omit<
  MobileAppThemePaletteCreatePayload,
  "code"
>;
