import { Result, ResultType } from "@/core/types/results";
import {
  MobileAppThemePalette,
  MobileAppThemePaletteCreatePayload,
  MobileAppThemePaletteUpdatePayload,
} from "./types";

export type TranslationIncludeOptions = {
  include?: string;
};

export interface MobileAppThemesRepo {
  getThemePalettes(
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<MobileAppThemePalette[]>>>;
  getThemePalette(
    id: string,
    options?: TranslationIncludeOptions,
  ): Promise<Result<ResultType<MobileAppThemePalette>>>;
  addThemePalette(
    payload: MobileAppThemePaletteCreatePayload,
  ): Promise<Result<ResultType<void>>>;
  updateThemePalette(
    id: string,
    payload: Partial<MobileAppThemePaletteUpdatePayload>,
  ): Promise<Result<ResultType<void>>>;
  deleteThemePalette(id: string): Promise<Result<ResultType<void>>>;
}
